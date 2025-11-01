-- Fix budget alert trigger to use correct column name
CREATE OR REPLACE FUNCTION trigger_budget_alert()
RETURNS TRIGGER
SECURITY DEFINER
AS $$
DECLARE
  budget_alert RECORD;
  user_email TEXT;
  current_expenses NUMERIC;
  percentage_used NUMERIC;
  minutes_since_last_notification INT;
BEGIN
  -- Only check for expense transactions
  IF NEW.type != 'expense' THEN
    RETURN NEW;
  END IF;

  -- Get user's budget alert settings and email
  SELECT ba.*, au.email
  INTO budget_alert
  FROM budget_alerts ba
  JOIN auth.users au ON ba.user_id = au.id
  WHERE ba.user_id = NEW.user_id
  AND ba.notification_email = true  -- Changed from alert_enabled to notification_email
  AND ba.alert_enabled = true       -- Added this check for alert_enabled
  LIMIT 1;

  -- If no budget alert set or not enabled, continue
  IF budget_alert IS NULL THEN
    RETURN NEW;
  END IF;

  -- Check if we should skip notification (rate limiting - 1 hour)
  IF budget_alert.last_notified_at IS NOT NULL THEN
    minutes_since_last_notification := EXTRACT(EPOCH FROM (NOW() - budget_alert.last_notified_at)) / 60;
    IF minutes_since_last_notification < 60 THEN
      RETURN NEW;
    END IF;
  END IF;

  -- Calculate current month's expenses
  SELECT COALESCE(SUM(amount), 0)
  INTO current_expenses
  FROM transactions
  WHERE user_id = NEW.user_id
    AND type = 'expense'
    AND date_trunc('month', date) = date_trunc('month', CURRENT_DATE);

  -- Calculate percentage of budget used
  percentage_used := (current_expenses / NULLIF(budget_alert.monthly_budget, 0)) * 100;

  -- Check if we've exceeded the alert threshold
  IF percentage_used >= budget_alert.threshold_percentage THEN  -- Changed from alert_threshold to threshold_percentage
    -- Update last notification timestamp
    UPDATE budget_alerts
    SET last_notified_at = NOW()
    WHERE user_id = NEW.user_id;

    -- Call the edge function to send notification
    PERFORM net.http_post(
      url := CONCAT(
        current_setting('app.settings.edge_function_base_url'),
        '/send-budget-alert'
      ),
      body := json_build_object(
        'email', budget_alert.email,
        'monthly_budget', budget_alert.monthly_budget,
        'current_expenses', current_expenses,
        'percentage_used', percentage_used,
        'alert_threshold', budget_alert.threshold_percentage  -- Changed from alert_threshold to threshold_percentage
      )::jsonb,
      headers := '{"Content-Type": "application/json"}'::jsonb
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;