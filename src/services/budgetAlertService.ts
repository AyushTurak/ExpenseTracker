import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';

type BudgetAlert = Database['public']['Tables']['budget_alerts']['Row'];
type BudgetAlertInsert = Database['public']['Tables']['budget_alerts']['Insert'];
type BudgetAlertUpdate = Database['public']['Tables']['budget_alerts']['Update'];

export const budgetAlertService = {
  async getBudgetAlert() {
    const { data, error } = await supabase
      .from('budget_alerts')
      .select('*')
      .maybeSingle();

    if (error) throw error;
    return data as BudgetAlert | null;
  },

  async createBudgetAlert(alert: Omit<BudgetAlertInsert, 'user_id'>) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('budget_alerts')
      .insert({ ...alert, user_id: user.id })
      .select()
      .single();

    if (error) throw error;
    return data as BudgetAlert;
  },

  async updateBudgetAlert(id: string, updates: BudgetAlertUpdate) {
    const { data, error } = await supabase
      .from('budget_alerts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as BudgetAlert;
  },

  async deleteBudgetAlert(id: string) {
    const { error } = await supabase
      .from('budget_alerts')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};
