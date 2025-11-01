import { useState, useEffect } from 'react';
import { budgetService, type BudgetAlert } from '../../services/budgetService';
import { useToast } from '../../contexts/ToastContext';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { AlertCircle } from 'lucide-react';

export const BudgetSettings = () => {
  const [monthlyBudget, setMonthlyBudget] = useState('');
  const [thresholdPercentage, setThresholdPercentage] = useState('80');
  const [notificationEmail, setNotificationEmail] = useState(true);
  const [alertEnabled, setAlertEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    loadBudgetAlert();
  }, []);

  const loadBudgetAlert = async () => {
    setIsLoading(true);
    try {
      const budget = await budgetService.getBudgetAlert();
      if (budget) {
        setMonthlyBudget(budget.monthly_budget.toString());
        setThresholdPercentage(budget.threshold_percentage.toString());
        setNotificationEmail(budget.notification_email);
        setAlertEnabled(budget.alert_enabled);
      }
    } catch (error: any) {
      showToast(error.message || 'Failed to load budget settings', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!monthlyBudget || parseFloat(monthlyBudget) <= 0) {
      showToast('Please enter a valid monthly budget', 'error');
      return;
    }

    if (!thresholdPercentage || parseInt(thresholdPercentage) < 0 || parseInt(thresholdPercentage) > 100) {
      showToast('Please enter a threshold between 0 and 100', 'error');
      return;
    }

    setIsSaving(true);
    try {
      await budgetService.createOrUpdateBudgetAlert(
        parseFloat(monthlyBudget),
        parseInt(thresholdPercentage),
        notificationEmail
      );

      showToast('Budget settings saved successfully', 'success');
    } catch (error: any) {
      showToast(error.message || 'Failed to save budget settings', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleAlert = async () => {
    try {
      await budgetService.updateBudgetAlertStatus(!alertEnabled);
      setAlertEnabled(!alertEnabled);
      showToast(
        `Budget alerts ${!alertEnabled ? 'enabled' : 'disabled'}`,
        'success'
      );
    } catch (error: any) {
      showToast(error.message || 'Failed to update alert status', 'error');
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Budget Settings
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Configure your monthly budget and alert thresholds
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Input
          label="Monthly Budget"
          type="number"
          placeholder="5000.00"
          step="0.01"
          min="0"
          value={monthlyBudget}
          onChange={(e) => setMonthlyBudget(e.target.value)}
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Alert Threshold Percentage
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={thresholdPercentage}
              onChange={(e) => setThresholdPercentage(e.target.value)}
              className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-lg font-semibold text-gray-900 dark:text-white w-12 text-right">
              {thresholdPercentage}%
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            You'll be alerted when spending reaches {thresholdPercentage}% of your monthly budget
          </p>
        </div>

        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={notificationEmail}
              onChange={(e) => setNotificationEmail(e.target.checked)}
              className="w-4 h-4 text-blue-600 dark:text-blue-400 rounded border-gray-300 dark:border-gray-600"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Send email notifications
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={alertEnabled}
              onChange={handleToggleAlert}
              className="w-4 h-4 text-blue-600 dark:text-blue-400 rounded border-gray-300 dark:border-gray-600"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Enable budget alerts
            </span>
          </label>
        </div>

        {!alertEnabled && (
          <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              Budget alerts are currently disabled. Enable them above to receive notifications.
            </p>
          </div>
        )}

        <Button type="submit" isLoading={isSaving} className="w-full">
          Save Settings
        </Button>
      </form>
    </div>
  );
};
