import { supabase } from '../lib/supabase';

export interface BudgetAlert {
  id: string;
  user_id: string;
  monthly_budget: number;
  threshold_percentage: number;
  notification_email: boolean;
  last_notified_at?: string;
  alert_enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface BudgetStatus {
  monthly_budget: number;
  current_expenses: number;
  remaining_budget: number;
  percentage_used: number;
  threshold_percentage: number;
  alert_enabled: boolean;
  is_threshold_exceeded: boolean;
}

export const budgetService = {
  async getBudgetAlert() {
    const { data, error } = await supabase
      .from('budget_alerts')
      .select('*')
      .maybeSingle();

    if (error) throw error;

    return data as BudgetAlert | null;
  },

  async getBudgetStatus(): Promise<BudgetStatus | null> {
    const { data: budgetData, error: budgetError } = await supabase
      .from('budget_alerts')
      .select('*')
      .maybeSingle();

    if (budgetError) throw budgetError;

    if (!budgetData) {
      return null;
    }

    const { data: summaryData, error: summaryError } = await supabase.rpc(
      'calculate_budget_percentage',
      {}
    );

    if (summaryError) throw summaryError;

    const percentage = summaryData || 0;
    const currentExpenses = (percentage / 100) * budgetData.monthly_budget;

    return {
      monthly_budget: budgetData.monthly_budget,
      current_expenses: currentExpenses,
      remaining_budget: budgetData.monthly_budget - currentExpenses,
      percentage_used: percentage,
      threshold_percentage: budgetData.threshold_percentage,
      alert_enabled: budgetData.alert_enabled,
      is_threshold_exceeded: percentage >= budgetData.threshold_percentage,
    };
  },

  async createOrUpdateBudgetAlert(
    monthly_budget: number,
    threshold_percentage: number,
    notification_email: boolean = true
  ) {
    const { data: existingBudget, error: fetchError } = await supabase
      .from('budget_alerts')
      .select('id')
      .maybeSingle();

    if (fetchError) throw fetchError;

    if (existingBudget) {
      // Update existing
      const { data, error } = await supabase
        .from('budget_alerts')
        .update({
          monthly_budget,
          threshold_percentage,
          notification_email,
        })
        .eq('id', existingBudget.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } else {
      // Create new
      const { data, error } = await supabase
        .from('budget_alerts')
        .insert({
          monthly_budget,
          threshold_percentage,
          notification_email,
          alert_enabled: true,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    }
  },

  async updateBudgetAlertStatus(alert_enabled: boolean) {
    const { data, error } = await supabase
      .from('budget_alerts')
      .update({ alert_enabled })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async triggerManualBudgetCheck() {
    const { data: user, error: userError } = await supabase.auth.getUser();

    if (userError) throw userError;
    if (!user.user) throw new Error('Not authenticated');

    const { data: budgetData, error: budgetError } = await supabase
      .from('budget_alerts')
      .select('*')
      .eq('user_id', user.user.id)
      .maybeSingle();

    if (budgetError) throw budgetError;

    if (!budgetData) {
      throw new Error('No budget alert configured');
    }

    // Call the RPC to check threshold
    const { data: thresholdExceeded, error: rpcError } = await supabase.rpc(
      'check_budget_threshold_exceeded',
      { user_id_param: user.user.id }
    );

    if (rpcError) throw rpcError;

    if (thresholdExceeded) {
      const { data: expenses, error: expensesError } = await supabase.rpc(
        'calculate_user_expenses',
        { user_id_param: user.user.id }
      );

      if (expensesError) throw expensesError;

      const { data: percentage, error: percentageError } = await supabase.rpc(
        'calculate_budget_percentage',
        {}
      );

      if (percentageError) throw percentageError;

      // Trigger the Edge Function
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      await fetch(`${supabaseUrl}/functions/v1/send-budget-alert`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${anonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user.user.id,
          user_email: user.user.email,
          monthly_budget: budgetData.monthly_budget,
          current_expenses: expenses || 0,
          threshold_percentage: budgetData.threshold_percentage,
          percentage_used: percentage || 0,
        }),
      });
    }

    return {
      threshold_exceeded: thresholdExceeded,
      message: thresholdExceeded
        ? 'Budget alert triggered and notification sent'
        : 'Budget is within limits',
    };
  },
};
