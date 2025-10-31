import { useState, useEffect } from 'react';
import { analyticsService, MonthlyData, CategoryBreakdown } from '../services/analyticsService';
import { useToast } from '../contexts/ToastContext';
import { useCurrency } from '../contexts/CurrencyContext';
import { useTheme } from '../contexts/ThemeContext';
import { Loader } from '../components/ui/Loader';
import { Select } from '../components/ui/Select';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';


export const Analytics = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [breakdownType, setBreakdownType] = useState<'income' | 'expense'>('expense');
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [categoryBreakdown, setCategoryBreakdown] = useState<CategoryBreakdown[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();
  const { formatCurrency } = useCurrency();
  const { theme } = useTheme();

  const chartGridColor = theme === 'dark' ? '#374151' : '#E5E7EB';
  const chartTextColor = theme === 'dark' ? '#9CA3AF' : '#6B7280';
  const chartTooltipBg = theme === 'dark' ? '#1F2937' : '#FFFFFF';
  const chartTooltipText = theme === 'dark' ? '#F3F4F6' : '#1F2937';

  useEffect(() => {
    loadAnalytics();
  }, [year, month, breakdownType]);

  const loadAnalytics = async () => {
    setIsLoading(true);
    try {
      const [monthly, breakdown] = await Promise.all([
        analyticsService.getMonthlyTrends(year),
        analyticsService.getCategoryBreakdown(month, year, breakdownType),
      ]);

      setMonthlyData(monthly);
      setCategoryBreakdown(breakdown);
    } catch (error: any) {
      showToast(error.message || 'Failed to load analytics', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const currentYearOptions = Array.from({ length: 5 }, (_, i) => {
    const y = new Date().getFullYear() - i;
    return { value: y.toString(), label: y.toString() };
  });

  const monthOptions = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(2000, i, 1);
    return {
      value: (i + 1).toString(),
      label: date.toLocaleString('en-US', { month: 'long' }),
    };
  });

  const breakdownTypeOptions = [
    { value: 'expense', label: 'Expenses' },
    { value: 'income', label: 'Income' },
  ];

  const totalIncome = monthlyData.reduce((sum, m) => sum + m.income, 0);
  const totalExpense = monthlyData.reduce((sum, m) => sum + m.expense, 0);
  const netSavings = totalIncome - totalExpense;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Visualize your financial trends</p>
      </div>

      <div className="flex flex-wrap gap-4">
        <Select
          label="Year"
          options={currentYearOptions}
          value={year.toString()}
          onChange={(e) => setYear(parseInt(e.target.value))}
        />
        <Select
          label="Month (for breakdown)"
          options={monthOptions}
          value={month.toString()}
          onChange={(e) => setMonth(parseInt(e.target.value))}
        />
        <Select
          label="Breakdown Type"
          options={breakdownTypeOptions}
          value={breakdownType}
          onChange={(e) => setBreakdownType(e.target.value as 'income' | 'expense')}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader size="lg" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Income ({year})</h3>
              </div>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {formatCurrency(totalIncome)}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-red-100 dark:bg-red-900 p-2 rounded-lg">
                  <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Expenses ({year})</h3>
              </div>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                {formatCurrency(totalExpense)}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg ${netSavings >= 0 ? 'bg-blue-100 dark:bg-blue-900' : 'bg-orange-100 dark:bg-orange-900'}`}>
                  <TrendingUp className={`w-5 h-5 ${netSavings >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'}`} />
                </div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Net Savings ({year})</h3>
              </div>
              <p className={`text-2xl font-bold ${netSavings >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'}`}>
                {formatCurrency(netSavings)}
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Income vs Expenses ({year})
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={monthlyData}>
                <CartesianGrid stroke={chartGridColor} strokeDasharray="3 3" />
                <XAxis dataKey="month" stroke={chartTextColor} />
                <YAxis stroke={chartTextColor} />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{
                    borderRadius: '8px',
                    backgroundColor: chartTooltipBg,
                    color: chartTooltipText,
                    border: 'none',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#10B981"
                  strokeWidth={2}
                  name="Income"
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="expense"
                  stroke="#EF4444"
                  strokeWidth={2}
                  name="Expenses"
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Category Breakdown - {monthOptions.find(m => m.value === month.toString())?.label} {year}
            </h2>

            {categoryBreakdown.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400 py-12">
                No {breakdownType} data for this period
              </p>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryBreakdown as any}
                      dataKey="total"
                      nameKey="categoryName"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={(entry: any) => `${entry.percentage.toFixed(1)}%`}
                    >
                      {categoryBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.categoryColor} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => formatCurrency(value)}
                      contentStyle={{
                        borderRadius: '8px',
                        backgroundColor: chartTooltipBg,
                        color: chartTooltipText,
                        border: 'none',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>

                <div className="space-y-3">
                  {categoryBreakdown.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: item.categoryColor }}
                        />
                        <span className="font-medium text-gray-900 dark:text-white">{item.categoryName}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {formatCurrency(item.total)}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.percentage.toFixed(1)}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
