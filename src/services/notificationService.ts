import { supabase } from '../lib/supabase';

export interface Notification {
  id: string;
  user_id: string;
  type: 'budget_alert' | 'expense_alert' | 'info';
  title: string;
  message: string;
  read: boolean;
  email_sent: boolean;
  created_at: string;
}

export const notificationService = {
  async getNotifications(limit = 20, offset = 0) {
    const { data, error, count } = await supabase
      .from('notifications')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    return {
      data: data as Notification[],
      total: count || 0,
    };
  },

  async getUnreadNotificationsCount() {
    const { count, error } = await supabase
      .from('notifications')
      .select('*', { count: 'exact' })
      .eq('read', false);

    if (error) throw error;

    return count || 0;
  },

  async markAsRead(notificationId: string) {
    const { data, error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId)
      .select()
      .single();

    if (error) throw error;

    return data;
  },

  async markAllAsRead() {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('read', false);

    if (error) throw error;
  },

  async deleteNotification(notificationId: string) {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', notificationId);

    if (error) throw error;
  },

  async clearAllNotifications() {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .gte('created_at', '1970-01-01');

    if (error) throw error;
  },
};
