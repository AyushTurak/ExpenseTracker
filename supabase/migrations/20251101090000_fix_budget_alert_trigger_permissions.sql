-- Fix budget alert trigger permissions and security
-- This migration fixes the permission issues with the budget alert trigger

-- Grant necessary permissions
GRANT USAGE ON SCHEMA auth TO postgres;
GRANT SELECT ON auth.users TO postgres;

-- Create or replace the trigger function with SECURITY DEFINER
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
  AND ba.alert_enabled = true
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
  IF percentage_used >= budget_alert.alert_threshold THEN
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
        'alert_threshold', budget_alert.alert_threshold
      )::jsonb,
      headers := '{"Content-Type": "application/json"}'::jsonb
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS check_budget_on_transaction_insert ON transactions;
DROP TRIGGER IF EXISTS check_budget_on_transaction_update ON transactions;

-- Create triggers for insert and update
CREATE TRIGGER check_budget_on_transaction_insert
  AFTER INSERT ON transactions
  FOR EACH ROW
  EXECUTE FUNCTION trigger_budget_alert();

CREATE TRIGGER check_budget_on_transaction_update
  AFTER UPDATE ON transactions
  FOR EACH ROW
  WHEN (OLD.* IS DISTINCT FROM NEW.*)
  EXECUTE FUNCTION trigger_budget_alert();

-- Set function owner to postgres (additional security)
ALTER FUNCTION trigger_budget_alert() OWNER TO postgres;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION trigger_budget_alert() TO authenticated;
GRANT EXECUTE ON FUNCTION trigger_budget_alert() TO service_role;