import { supabase } from '../lib/supabase';
import { startOfYear, endOfYear, eachMonthOfInterval, format } from 'date-fns';

export interface MonthlyData {
  month: string;
  income: number;
  expense: number;
}

export interface CategoryBreakdown {
  categoryName: string;
  categoryColor: string;
  total: number;
  percentage: number;
}

export const analyticsService = {
  async getMonthlyTrends(year: number): Promise<MonthlyData[]> {
    const startDate = startOfYear(new Date(year, 0, 1));
    const endDate = endOfYear(new Date(year, 0, 1));

    const { data, error } = await supabase
      .from('transactions')
      .select('date, amount, type')
      .gte('date', format(startDate, 'yyyy-MM-dd'))
      .lte('date', format(endDate, 'yyyy-MM-dd'));

    if (error) throw error;

    const months = eachMonthOfInterval({ start: startDate, end: endDate });
    const monthlyData: MonthlyData[] = months.map((month) => ({
      month: format(month, 'MMM'),
      income: 0,
      expense: 0,
    }));

    data?.forEach((transaction) => {
      const transactionDate = new Date(transaction.date);
      const monthIndex = transactionDate.getMonth();

      if (transaction.type === 'income') {
        monthlyData[monthIndex].income += Number(transaction.amount);
      } else {
        monthlyData[monthIndex].expense += Number(transaction.amount);
      }
    });

    return monthlyData;
  },

  async getCategoryBreakdown(
    month: number,
    year: number,
    type: 'income' | 'expense' = 'expense'
  ): Promise<CategoryBreakdown[]> {
    const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
    const lastDay = new Date(year, month, 0).getDate();
    const endDate = `${year}-${String(month).padStart(2, '0')}-${lastDay}`;

    const { data, error } = await supabase
      .from('transactions')
      .select('amount, category_id, categories(name, color)')
      .eq('type', type)
      .gte('date', startDate)
      .lte('date', endDate);

    if (error) throw error;

    const categoryMap = new Map<string, { name: string; color: string; total: number }>();
    let totalAmount = 0;

    data?.forEach((transaction: any) => {
      const categoryId = transaction.category_id || 'uncategorized';
      const categoryName = transaction.categories?.name || 'Uncategorized';
      const categoryColor = transaction.categories?.color || '#9CA3AF';
      const amount = Number(transaction.amount);

      totalAmount += amount;

      if (categoryMap.has(categoryId)) {
        categoryMap.get(categoryId)!.total += amount;
      } else {
        categoryMap.set(categoryId, {
          name: categoryName,
          color: categoryColor,
          total: amount,
        });
      }
    });

    const breakdown: CategoryBreakdown[] = Array.from(categoryMap.values())
      .map((category) => ({
        categoryName: category.name,
        categoryColor: category.color,
        total: category.total,
        percentage: totalAmount > 0 ? (category.total / totalAmount) * 100 : 0,
      }))
      .sort((a, b) => b.total - a.total);

    return breakdown;
  },
};
