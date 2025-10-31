import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { transactionService } from '../services/transactionService';
import { useToast } from '../contexts/ToastContext';
import { useCurrency } from '../contexts/CurrencyContext';
import { useInstallPrompt } from '../hooks/useInstallPrompt';
import { formatDate } from '../utils/formatters';
import { Loader } from '../components/ui/Loader';
import { TrendingUp, TrendingDown, Wallet, Receipt, ArrowRight, Download } from 'lucide-react';
import { QuickAddTransaction } from '../components/dashboard/QuickAddTransaction';

interface Summary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  transactionCount: number;
}

export const Dashboard = () => {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();
  const { formatCurrency } = useCurrency();
  const { isInstallable, isInstalled, showPrompt } = useInstallPrompt();

  const handleInstallClick = async () => {
    try {
      await showPrompt();
    } catch (error) {
      console.error('Install failed:', error);
    }
  };

  const loadData = async () => {
    setIsLoading(true);
    try {
      const now = new Date();
      const month = (now.getMonth() + 1).toString();
      const year = now.getFullYear().toString();

      const [summaryData, transactionsData] = await Promise.all([
        transactionService.getSummary(month, year),
        transactionService.getTransactions(1, 5),
      ]);

      setSummary(summaryData);
      setRecentTransactions(transactionsData.data);
    } catch (error: any) {
      showToast(error.message || 'Failed to load dashboard', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Overview of your finances this month</p>
        </div>

        {isInstallable && !isInstalled && (
          <button
            onClick={handleInstallClick}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm whitespace-nowrap"
          >
            <Download size={18} />
            Install App
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
              <Wallet className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Balance</h3>
          <p className={`text-2xl font-bold ${summary!.balance >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {formatCurrency(summary!.balance)}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Income</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatCurrency(summary!.totalIncome)}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-red-100 dark:bg-red-900 p-3 rounded-lg">
              <TrendingDown className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Expenses</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatCurrency(summary!.totalExpense)}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
              <Receipt className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Transactions</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {summary!.transactionCount}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Transactions</h2>
              <Link
                to="/app/transactions"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium flex items-center gap-1"
              >
                View All
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="p-6">
              {recentTransactions.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">No transactions yet</p>
              ) : (
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${transaction.type === 'income'
                              ? 'bg-green-100 dark:bg-green-900'
                              : 'bg-red-100 dark:bg-red-900'
                            }`}
                        >
                          {transaction.type === 'income' ? (
                            <TrendingUp size={20} className="text-green-600 dark:text-green-400" />
                          ) : (
                            <TrendingDown size={20} className="text-red-600 dark:text-red-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {transaction.categories?.name || 'Uncategorized'}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(transaction.date)}
                          </p>
                        </div>
                      </div>
                      <p
                        className={`text-lg font-semibold ${transaction.type === 'income'
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-red-600 dark:text-red-400'
                          }`}
                      >
                        {transaction.type === 'income' ? '+' : '-'}
                        {formatCurrency(transaction.amount)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <QuickAddTransaction onSuccess={loadData} />
        </div>
      </div>
    </div>
  );
};
