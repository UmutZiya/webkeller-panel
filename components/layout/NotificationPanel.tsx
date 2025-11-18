'use client';

import React from 'react';
import { X, Bell, Check, Trash2, Calendar, Users, DollarSign, AlertCircle, CheckCircle2, Info, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  time: Date;
  read: boolean;
  icon?: React.ReactNode;
}

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'Yeni Randevu',
    message: 'Ahmet Yılmaz için yeni randevu oluşturuldu',
    time: new Date(Date.now() - 5 * 60000),
    read: false,
  },
  {
    id: '2',
    type: 'info',
    title: 'Ödeme Alındı',
    message: '₺1,250 tutarında ödeme başarıyla alındı',
    time: new Date(Date.now() - 30 * 60000),
    read: false,
  },
  {
    id: '3',
    type: 'warning',
    title: 'Randevu Hatırlatma',
    message: '15:00 randevunuz yaklaşıyor',
    time: new Date(Date.now() - 2 * 60 * 60000),
    read: true,
  },
  {
    id: '4',
    type: 'success',
    title: 'Yeni Müşteri',
    message: 'Zeynep Demir sisteme eklendi',
    time: new Date(Date.now() - 24 * 60 * 60000),
    read: true,
  },
];

export function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
  const [notifications, setNotifications] = React.useState(mockNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="w-5 h-5" />;
      case 'warning': return <AlertCircle className="w-5 h-5" />;
      case 'error': return <AlertCircle className="w-5 h-5" />;
      default: return <Info className="w-5 h-5" />;
    }
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'success': return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400';
      case 'warning': return 'bg-amber-500/10 text-amber-600 dark:text-amber-400';
      case 'error': return 'bg-red-500/10 text-red-600 dark:text-red-400';
      default: return 'bg-blue-500/10 text-blue-600 dark:text-blue-400';
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full sm:w-[480px] bg-gradient-to-br from-white via-gray-50 to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="relative border-b border-gray-200/50 dark:border-gray-700/50 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80">
          {/* Decorative gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-pink-500/10" />
          
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl blur-lg opacity-30" />
                  <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-2.5 rounded-xl">
                    <Bell className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Bildirimler</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {unreadCount > 0 ? `${unreadCount} okunmamış bildirim` : 'Tüm bildirimler okundu'}
                  </p>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 group"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 group-hover:rotate-90 transition-all duration-200" />
              </button>
            </div>

            {/* Actions */}
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-all duration-200"
              >
                <Check className="w-4 h-4" />
                Tümünü Okundu İşaretle
              </button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="h-[calc(100%-140px)] overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-2xl" />
                <div className="relative bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-6 rounded-full">
                  <Sparkles className="w-12 h-12 text-blue-500 dark:text-blue-400" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Henüz bildirim yok
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Yeni bildirimler burada görünecek
              </p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border transition-all duration-300 hover:shadow-lg hover:scale-[1.02]",
                  notification.read
                    ? "bg-white/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50"
                    : "bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-500/30 shadow-md"
                )}
              >
                {/* Unread indicator */}
                {!notification.read && (
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600" />
                )}

                <div className="p-4 pl-5">
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div className={cn(
                      "flex-shrink-0 p-2 rounded-xl",
                      getTypeStyles(notification.type)
                    )}>
                      {getIcon(notification.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className={cn(
                          "text-sm font-semibold",
                          notification.read
                            ? "text-gray-700 dark:text-gray-300"
                            : "text-gray-900 dark:text-white"
                        )}>
                          {notification.title}
                        </h4>
                        <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                          {format(notification.time, 'HH:mm', { locale: tr })}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {format(notification.time, 'dd MMM yyyy', { locale: tr })}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700/50">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-all duration-200"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Okundu
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all duration-200 ml-auto"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Sil
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
