import { useState, useEffect, FormEvent } from 'react';
import { budgetAlertService } from '../services/budgetAlertService';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { useTheme } from '../contexts/ThemeContext';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Loader } from '../components/ui/Loader';
import { User, Bell, AlertCircle, Sun, Moon, Monitor } from 'lucide-react';

export const Settings = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const { theme, setTheme } = useTheme();

  const [budgetAlert, setBudgetAlert] = useState<any>(null);
  const [monthlyBudget, setMonthlyBudget] = useState('');
  const [thresholdPercentage, setThresholdPercentage] = useState('80');
  const [notificationEmail, setNotificationEmail] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadBudgetAlert();
  }, []);

  const loadBudgetAlert = async () => {
    setIsLoading(true);
    try {
      const data = await budgetAlertService.getBudgetAlert();
      if (data) {
        setBudgetAlert(data);
        setMonthlyBudget(data.monthly_budget.toString());
        setThresholdPercentage(data.threshold_percentage.toString());
        setNotificationEmail(data.notification_email);
      }
    } catch (error: any) {
      showToast(error.message || 'Failed to load settings', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!monthlyBudget || parseFloat(monthlyBudget) <= 0) {
      showToast('Please enter a valid budget amount', 'error');
      return;
    }

    const threshold = parseInt(thresholdPercentage);
    if (threshold < 0 || threshold > 100) {
      showToast('Threshold must be between 0 and 100', 'error');
      return;
    }

    setIsSaving(true);

    try {
      const data = {
        monthly_budget: parseFloat(monthlyBudget),
        threshold_percentage: threshold,
        notification_email: notificationEmail,
      };

      if (budgetAlert) {
        await budgetAlertService.updateBudgetAlert(budgetAlert.id, data);
        showToast('Budget alert updated successfully', 'success');
      } else {
        await budgetAlertService.createBudgetAlert(data);
        showToast('Budget alert created successfully', 'success');
      }

      loadBudgetAlert();
    } catch (error: any) {
      showToast(error.message || 'Failed to save settings', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!budgetAlert) return;
    if (!confirm('Are you sure you want to delete the budget alert?')) return;

    try {
      await budgetAlertService.deleteBudgetAlert(budgetAlert.id);
      showToast('Budget alert deleted successfully', 'success');
      setBudgetAlert(null);
      setMonthlyBudget('');
      setThresholdPercentage('80');
      setNotificationEmail(true);
    } catch (error: any) {
      showToast(error.message || 'Failed to delete budget alert', 'error');
    }
  };

  const userName = user?.user_metadata?.name || 'User';
  const userEmail = user?.email || '';

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
              <User className="w-6 h-6 text-blue-600 dark:text-blue-300" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Profile Information</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name
              </label>
              <p className="text-gray-900 dark:text-white font-medium">{userName}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <p className="text-gray-900 dark:text-white font-medium">{userEmail}</p>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Profile information is managed through your authentication provider.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
              {theme === 'dark' ? (
                <Moon className="w-6 h-6 text-purple-600 dark:text-purple-300" />
              ) : (
                <Sun className="w-6 h-6 text-purple-600" />
              )}
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Appearance</h2>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Choose how the application looks to you. Select a single theme, or sync with your system.
            </p>

            <div className="space-y-3">
              <button
                onClick={() => setTheme('light')}
                className={`w-full flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                  theme === 'light'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className={`p-2 rounded-lg ${theme === 'light' ? 'bg-blue-100 dark:bg-blue-900' : 'bg-gray-100 dark:bg-gray-700'}`}>
                  <Sun className={`w-5 h-5 ${theme === 'light' ? 'text-blue-600 dark:text-blue-300' : 'text-gray-600 dark:text-gray-400'}`} />
                </div>
                <div className="flex-1 text-left">
                  <h3 className={`font-semibold ${theme === 'light' ? 'text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-white'}`}>
                    Light
                  </h3>
                  <p className={`text-sm ${theme === 'light' ? 'text-blue-700 dark:text-blue-300' : 'text-gray-500 dark:text-gray-400'}`}>
                    Clean and bright interface
                  </p>
                </div>
                {theme === 'light' && (
                  <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </button>

              <button
                onClick={() => setTheme('dark')}
                className={`w-full flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                  theme === 'dark'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-blue-100 dark:bg-blue-900' : 'bg-gray-100 dark:bg-gray-700'}`}>
                  <Moon className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-600 dark:text-blue-300' : 'text-gray-600 dark:text-gray-400'}`} />
                </div>
                <div className="flex-1 text-left">
                  <h3 className={`font-semibold ${theme === 'dark' ? 'text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-white'}`}>
                    Dark
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-blue-700 dark:text-blue-300' : 'text-gray-500 dark:text-gray-400'}`}>
                    Easy on the eyes
                  </p>
                </div>
                {theme === 'dark' && (
                  <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-lg">
              <Bell className="w-6 h-6 text-orange-600 dark:text-orange-300" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Budget Alerts</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-900">
                Set up alerts to notify you when your monthly expenses reach a certain percentage of your budget.
              </p>
            </div>

            <Input
              type="number"
              label="Monthly Budget"
              placeholder="0.00"
              step="0.01"
              min="0"
              value={monthlyBudget}
              onChange={(e) => setMonthlyBudget(e.target.value)}
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alert Threshold: {thresholdPercentage}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={thresholdPercentage}
                onChange={(e) => setThresholdPercentage(e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <p className="text-sm text-gray-500 mt-1">
                Alert when expenses reach {thresholdPercentage}% of budget
              </p>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="notification_email"
                checked={notificationEmail}
                onChange={(e) => setNotificationEmail(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <label htmlFor="notification_email" className="text-sm text-gray-700">
                Send email notifications
              </label>
            </div>

            <div className="flex gap-3">
              <Button type="submit" isLoading={isSaving} className="flex-1">
                {budgetAlert ? 'Update' : 'Create'} Alert
              </Button>
              {budgetAlert && (
                <Button type="button" variant="danger" onClick={handleDelete}>
                  Delete
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
