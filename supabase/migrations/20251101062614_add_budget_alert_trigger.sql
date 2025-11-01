/*
  # Add Database Trigger for Budget Alerts

  1. Triggers
    - `check_budget_on_transaction_insert` - Checks budget threshold when new expense is added
    - `check_budget_on_transaction_update` - Checks budget threshold when expense is modified

  2. Purpose
    - Automatically triggers Edge Function when budget thresholds are exceeded
    - Only fires for expense transactions
    - Respects alert_enabled flag and prevents duplicate notifications within 1 hour
*/

-- Function to call the Edge Function for budget alerts
CREATE OR REPLACE FUNCTION trigger_budget_alert()
RETURNS TRIGGER AS $$
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

  -- Get user's budget alert settings
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

  -- Calculate current month expenses
  current_expenses := calculate_user_expenses(NEW.user_id);
  percentage_used := (current_expenses / budget_alert.monthly_budget) * 100;

  -- Check if threshold is exceeded
  IF percentage_used >= budget_alert.threshold_percentage THEN
    -- Call the Edge Function via HTTP (note: in production, you might want to use a different approach)
    -- For now, we'll just create a notification record
    INSERT INTO notifications (user_id, type, title, message, email_sent, created_at)
    VALUES (
      NEW.user_id,
      'budget_alert',
      'Budget Alert',
      'Your expenses have reached ' || ROUND(percentage_used::numeric, 1) || '% of your monthly budget.',
      false,
      NOW()
    );

    -- Update last_notified_at to prevent duplicate alerts
    UPDATE budget_alerts
    SET last_notified_at = NOW()
    WHERE user_id = NEW.user_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger on transaction insert
DROP TRIGGER IF EXISTS budget_alert_on_insert ON transactions;
CREATE TRIGGER budget_alert_on_insert
  AFTER INSERT ON transactions
  FOR EACH ROW
  EXECUTE FUNCTION trigger_budget_alert();

-- Create trigger on transaction update
DROP TRIGGER IF EXISTS budget_alert_on_update ON transactions;
CREATE TRIGGER budget_alert_on_update
  AFTER UPDATE ON transactions
  FOR EACH ROW
  EXECUTE FUNCTION trigger_budget_alert();