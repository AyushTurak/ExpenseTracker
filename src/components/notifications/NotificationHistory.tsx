import { useState, useEffect } from 'react';
import { notificationService, type Notification } from '../../services/notificationService';
import { useToast } from '../../contexts/ToastContext';
import { formatDate } from '../../utils/formatters';
import { Bell, X, Trash2, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';

interface NotificationHistoryProps {
  onClose?: () => void;
}

export const NotificationHistory = ({ onClose }: NotificationHistoryProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 10;
  const { showToast } = useToast();

  useEffect(() => {
    loadNotifications();
  }, [page]);

  const loadNotifications = async () => {
    setIsLoading(true);
    try {
      const offset = (page - 1) * pageSize;
      const result = await notificationService.getNotifications(pageSize, offset);
      setNotifications(result.data);
      setTotalCount(result.total);
    } catch (error: any) {
      showToast(error.message || 'Failed to load notifications', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications(
        notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
      showToast('Notification marked as read', 'success');
    } catch (error: any) {
      showToast(error.message || 'Failed to mark notification', 'error');
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications(notifications.map((n) => ({ ...n, read: true })));
      showToast('All notifications marked as read', 'success');
    } catch (error: any) {
      showToast(error.message || 'Failed to mark notifications', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await notificationService.deleteNotification(id);
      setNotifications(notifications.filter((n) => n.id !== id));
      showToast('Notification deleted', 'success');
    } catch (error: any) {
      showToast(error.message || 'Failed to delete notification', 'error');
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm('Are you sure you want to clear all notifications?')) {
      return;
    }

    try {
      await notificationService.clearAllNotifications();
      setNotifications([]);
      setPage(1);
      showToast('All notifications cleared', 'success');
    } catch (error: any) {
      showToast(error.message || 'Failed to clear notifications', 'error');
    }
  };

  const getTypeColor = (type: Notification['type']) => {
    switch (type) {
      case 'budget_alert':
        return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200';
      case 'expense_alert':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200';
      case 'info':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200';
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 max-w-2xl w-full">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Notifications
          </h2>
          {unreadCount > 0 && (
            <span className="ml-2 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <X size={24} />
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="p-8 text-center">
          <Bell className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            {isLoading ? 'Loading notifications...' : 'No notifications yet'}
          </p>
        </div>
      ) : (
        <>
          {unreadCount > 0 && (
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={handleMarkAllAsRead}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
                Mark all as read
              </button>
            </div>
          )}

          <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                  !notification.read
                    ? 'bg-blue-50 dark:bg-blue-900/20'
                    : 'bg-white dark:bg-gray-800'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className={`px-2 py-1 rounded text-xs font-semibold flex-shrink-0 ${getTypeColor(notification.type)}`}>
                    {notification.type.replace('_', ' ').toUpperCase()}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                      {notification.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                      {formatDate(notification.created_at)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {!notification.read && (
                      <button
                        onClick={() => handleMarkAsRead(notification.id)}
                        title="Mark as read"
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                      >
                        <CheckCircle2 size={18} />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(notification.id)}
                      title="Delete"
                      className="text-gray-400 dark:text-gray-600 hover:text-red-600 dark:hover:text-red-400"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalCount > pageSize && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Page {page} of {Math.ceil(totalCount / pageSize)}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page >= Math.ceil(totalCount / pageSize)}
                className="px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}

          <div className="p-3 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleClearAll}
              className="w-full"
            >
              <Trash2 size={16} className="mr-2" />
              Clear All
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
