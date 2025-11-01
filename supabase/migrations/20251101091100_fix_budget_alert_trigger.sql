-- Fix budget alert trigger with proper error handling
CREATE OR REPLACE FUNCTION trigger_budget_alert()
RETURNS TRIGGER
SECURITY DEFINER
AS $$
DECLARE
  budget_alert RECORD;
  user_email TEXT;
  current_expenses NUMERIC;
  percentage_used NUMERIC;
BEGIN
  -- Only check for expense transactions
  IF NEW.type != 'expense' THEN
    RETURN NEW;
  END IF;

  -- Safely get user's budget alert settings and email
  -- Using COALESCE to handle missing columns gracefully
  SELECT 
    ba.*,
    au.email,
    COALESCE(ba.notification_email, true) as should_notify,
    COALESCE(ba.monthly_budget, 0) as safe_monthly_budget,
    COALESCE(ba.threshold_percentage, 80) as safe_threshold
  INTO budget_alert
  FROM budget_alerts ba
  JOIN auth.users au ON ba.user_id = au.id
  WHERE ba.user_id = NEW.user_id
  LIMIT 1;

  -- If no budget alert set, just return
  IF budget_alert IS NULL THEN
    RETURN NEW;
  END IF;

  -- Calculate current month's expenses safely
  SELECT COALESCE(SUM(amount), 0)
  INTO current_expenses
  FROM transactions
  WHERE user_id = NEW.user_id
    AND type = 'expense'
    AND date_trunc('month', date) = date_trunc('month', CURRENT_DATE);

  -- Calculate percentage safely
  IF budget_alert.safe_monthly_budget > 0 THEN
    percentage_used := (current_expenses / budget_alert.safe_monthly_budget) * 100;
  ELSE
    percentage_used := 0;
  END IF;

  -- Only proceed if notification should be sent and threshold is exceeded
  IF budget_alert.should_notify AND percentage_used >= budget_alert.safe_threshold THEN
    -- Update last notification timestamp
    UPDATE budget_alerts
    SET last_notified_at = NOW()
    WHERE user_id = NEW.user_id;

    -- Try to send notification
    BEGIN
      PERFORM net.http_post(
        url := CONCAT(
          current_setting('app.settings.edge_function_base_url', true),  -- true means don't error if setting missing
          '/send-budget-alert'
        ),
        body := json_build_object(
          'email', budget_alert.email,
          'monthly_budget', budget_alert.safe_monthly_budget,
          'current_expenses', current_expenses,
          'percentage_used', percentage_used,
          'alert_threshold', budget_alert.safe_threshold
        )::jsonb,
        headers := '{"Content-Type": "application/json"}'::jsonb
      );
    EXCEPTION WHEN OTHERS THEN
      -- Log error but don't prevent transaction
      RAISE WARNING 'Failed to send budget alert: %', SQLERRM;
    END;
  END IF;

  -- Always return NEW to allow transaction
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;