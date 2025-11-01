import { useState, useEffect } from 'react';
import { budgetService, type BudgetStatus } from '../../services/budgetService';
import { useCurrency } from '../../contexts/CurrencyContext';
import { useToast } from '../../contexts/ToastContext';
import { AlertCircle, TrendingUp } from 'lucide-react';

export const BudgetStatusCard = () => {
  const [budgetStatus, setBudgetStatus] = useState<BudgetStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { formatCurrency } = useCurrency();
  const { showToast } = useToast();

  useEffect(() => {
    loadBudgetStatus();
  }, []);

  const loadBudgetStatus = async () => {
    setIsLoading(true);
    try {
      const status = await budgetService.getBudgetStatus();
      setBudgetStatus(status);
    } catch (error: any) {
      console.error('Failed to load budget status:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!budgetStatus) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-start gap-3">
          <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              Budget Tracking
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              No budget set yet. Configure your monthly budget to get started with alerts.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const isWarning = budgetStatus.percentage_used >= 80;
  const isCritical = budgetStatus.is_threshold_exceeded;

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border-2 p-6 transition-colors ${
        isCritical
          ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/10'
          : isWarning
            ? 'border-yellow-300 dark:border-yellow-600 bg-yellow-50 dark:bg-yellow-900/10'
            : 'border-gray-200 dark:border-gray-700'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          {isCritical && (
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
          )}
          <h3 className={`text-lg font-semibold ${
            isCritical
              ? 'text-red-900 dark:text-red-200'
              : isWarning
                ? 'text-yellow-900 dark:text-yellow-200'
                : 'text-gray-900 dark:text-white'
          }`}>
            {isCritical ? 'Budget Alert!' : isWarning ? 'Budget Warning' : 'Monthly Budget'}
          </h3>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
          isCritical
            ? 'bg-red-200 dark:bg-red-800 text-red-900 dark:text-red-200'
            : isWarning
              ? 'bg-yellow-200 dark:bg-yellow-800 text-yellow-900 dark:text-yellow-200'
              : 'bg-green-200 dark:bg-green-800 text-green-900 dark:text-green-200'
        }`}>
          {budgetStatus.percentage_used.toFixed(1)}%
        </span>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between mb-1">
            <span className={`text-sm font-medium ${
              isCritical
                ? 'text-red-900 dark:text-red-200'
                : isWarning
                  ? 'text-yellow-900 dark:text-yellow-200'
                  : 'text-gray-700 dark:text-gray-300'
            }`}>
              Spent
            </span>
            <span className={`text-sm font-semibold ${
              isCritical
                ? 'text-red-900 dark:text-red-200'
                : isWarning
                  ? 'text-yellow-900 dark:text-yellow-200'
                  : 'text-gray-900 dark:text-white'
            }`}>
              {formatCurrency(budgetStatus.current_expenses)}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full transition-all ${
                isCritical
                  ? 'bg-red-600 dark:bg-red-500'
                  : isWarning
                    ? 'bg-yellow-500 dark:bg-yellow-400'
                    : 'bg-green-600 dark:bg-green-500'
              }`}
              style={{ width: `${Math.min(budgetStatus.percentage_used, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div>
            <p className={`text-xs ${
              isCritical
                ? 'text-red-700 dark:text-red-300'
                : isWarning
                  ? 'text-yellow-700 dark:text-yellow-300'
                  : 'text-gray-600 dark:text-gray-400'
            }`}>
              Monthly Budget
            </p>
            <p className={`text-lg font-semibold ${
              isCritical
                ? 'text-red-900 dark:text-red-200'
                : isWarning
                  ? 'text-yellow-900 dark:text-yellow-200'
                  : 'text-gray-900 dark:text-white'
            }`}>
              {formatCurrency(budgetStatus.monthly_budget)}
            </p>
          </div>
          <div>
            <p className={`text-xs ${
              isCritical
                ? 'text-red-700 dark:text-red-300'
                : isWarning
                  ? 'text-yellow-700 dark:text-yellow-300'
                  : 'text-gray-600 dark:text-gray-400'
            }`}>
              Remaining
            </p>
            <p className={`text-lg font-semibold ${
              budgetStatus.remaining_budget < 0
                ? 'text-red-600 dark:text-red-400'
                : 'text-green-600 dark:text-green-400'
            }`}>
              {formatCurrency(Math.max(budgetStatus.remaining_budget, 0))}
            </p>
          </div>
        </div>

        {isCritical && (
          <p className="text-sm text-red-700 dark:text-red-300 pt-2">
            You have exceeded your {budgetStatus.threshold_percentage}% budget threshold.
          </p>
        )}
      </div>
    </div>
  );
};
