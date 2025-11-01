/*
  # Add RPC Functions for Budget Calculations

  1. Functions
    - `calculate_user_expenses` - Calculate total expenses for a user in current month
    - `calculate_budget_percentage` - Calculate percentage of budget used
    - `check_budget_threshold_exceeded` - Check if user exceeded budget thresholds

  2. Purpose
    - Efficient server-side calculations for budget alerts
    - Used by Edge Functions and database triggers
*/

-- Function to calculate total expenses for current month
CREATE OR REPLACE FUNCTION calculate_user_expenses(user_id_param uuid, month_param integer DEFAULT NULL, year_param integer DEFAULT NULL)
RETURNS numeric AS $$
DECLARE
  total numeric;
  start_date date;
  end_date date;
BEGIN
  -- Use current month/year if not provided
  IF month_param IS NULL OR year_param IS NULL THEN
    start_date := date_trunc('month', CURRENT_DATE)::date;
    end_date := (date_trunc('month', CURRENT_DATE) + interval '1 month' - interval '1 day')::date;
  ELSE
    start_date := make_date(year_param, month_param, 1);
    end_date := (make_date(year_param, month_param, 1) + interval '1 month' - interval '1 day')::date;
  END IF;

  SELECT COALESCE(SUM(amount), 0)
  INTO total
  FROM transactions
  WHERE user_id = user_id_param
    AND type = 'expense'
    AND date >= start_date
    AND date <= end_date;

  RETURN total;
END;
$$ LANGUAGE plpgsql STABLE;

-- Function to calculate budget usage percentage for authenticated user
CREATE OR REPLACE FUNCTION calculate_budget_percentage()
RETURNS numeric AS $$
DECLARE
  budget numeric;
  expenses numeric;
  percentage numeric;
BEGIN
  SELECT monthly_budget INTO budget
  FROM budget_alerts
  WHERE user_id = auth.uid()
  LIMIT 1;

  IF budget IS NULL OR budget = 0 THEN
    RETURN 0;
  END IF;

  expenses := calculate_user_expenses(auth.uid());
  percentage := (expenses / budget) * 100;

  RETURN LEAST(percentage, 100);
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- Function to check if budget threshold is exceeded
CREATE OR REPLACE FUNCTION check_budget_threshold_exceeded(user_id_param uuid)
RETURNS boolean AS $$
DECLARE
  percentage numeric;
  threshold integer;
  is_enabled boolean;
BEGIN
  SELECT threshold_percentage, alert_enabled INTO threshold, is_enabled
  FROM budget_alerts
  WHERE user_id = user_id_param
  LIMIT 1;

  IF threshold IS NULL OR NOT is_enabled THEN
    RETURN false;
  END IF;

  percentage := (calculate_user_expenses(user_id_param) / 
    (SELECT monthly_budget FROM budget_alerts WHERE user_id = user_id_param LIMIT 1)) * 100;

  RETURN percentage >= threshold;
END;
$$ LANGUAGE plpgsql STABLE;