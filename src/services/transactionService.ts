import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';

type Transaction = Database['public']['Tables']['transactions']['Row'];
type TransactionInsert = Database['public']['Tables']['transactions']['Insert'];
type TransactionUpdate = Database['public']['Tables']['transactions']['Update'];

export interface TransactionFilters {
  startDate?: string;
  endDate?: string;
  type?: 'income' | 'expense' | '';
  categoryId?: string;
  search?: string;
}

export interface PaginatedTransactions {
  data: Transaction[];
  total: number;
}

export const transactionService = {
  async getTransactions(
    page = 1,
    pageSize = 10,
    filters: TransactionFilters = {}
  ): Promise<PaginatedTransactions> {
    let query = supabase
      .from('transactions')
      .select('*, categories(name, color)', { count: 'exact' });

    if (filters.startDate) {
      query = query.gte('date', filters.startDate);
    }
    if (filters.endDate) {
      query = query.lte('date', filters.endDate);
    }
    if (filters.type) {
      query = query.eq('type', filters.type);
    }
    if (filters.categoryId) {
      query = query.eq('category_id', filters.categoryId);
    }
    if (filters.search) {
      query = query.ilike('notes', `%${filters.search}%`);
    }

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error, count } = await query
      .order('date', { ascending: false })
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) throw error;

    return {
      data: data as any[],
      total: count || 0,
    };
  },

  async getTransaction(id: string) {
    const { data, error } = await supabase
      .from('transactions')
      .select('*, categories(name, color)')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async createTransaction(transaction: Omit<TransactionInsert, 'user_id'>) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('transactions')
      .insert({ ...transaction, user_id: user.id })
      .select('*, categories(name, color)')
      .single();

    if (error) throw error;
    return data;
  },

  async updateTransaction(id: string, updates: TransactionUpdate) {
    const { data, error } = await supabase
      .from('transactions')
      .update(updates)
      .eq('id', id)
      .select('*, categories(name, color)')
      .single();

    if (error) throw error;
    return data;
  },

  async deleteTransaction(id: string) {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async getSummary(month?: string, year?: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    let query = supabase
      .from('transactions')
      .select('amount, type, date');

    if (month && year) {
      const startDate = `${year}-${month.padStart(2, '0')}-01`;
      const endDate = new Date(parseInt(year), parseInt(month), 0).toISOString().split('T')[0];
      query = query.gte('date', startDate).lte('date', endDate);
    }

    const { data, error } = await query;

    if (error) throw error;

    const summary = {
      totalIncome: 0,
      totalExpense: 0,
      balance: 0,
      transactionCount: data?.length || 0,
    };

    data?.forEach((transaction) => {
      if (transaction.type === 'income') {
        summary.totalIncome += Number(transaction.amount);
      } else {
        summary.totalExpense += Number(transaction.amount);
      }
    });

    summary.balance = summary.totalIncome - summary.totalExpense;

    return summary;
  },
};
