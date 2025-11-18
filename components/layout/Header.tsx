"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Bell, User, Moon, Sun, ChevronDown, LogOut, Settings, UserCircle } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';
import { UserAvatar } from '@/components/ui/user-avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { NotificationPanel } from './NotificationPanel';

export function Header() {
  const { setSidebarOpen, darkMode, toggleDarkMode, currentUser, logout } = useApp();
  const [mounted, setMounted] = React.useState(false);
  const [notificationOpen, setNotificationOpen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const userName = React.useMemo(() => {
    if (!mounted || !currentUser) return 'Kullanıcı';
    return `${currentUser.firstName || ''} ${currentUser.lastName || ''}`.trim();
  }, [mounted, currentUser]);

  const userRole = React.useMemo(() => {
    if (!mounted || !currentUser) return 'Kullanıcı';
    // You can customize this based on user role from context
    return 'Yönetici';
  }, [mounted, currentUser]);
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 lg:px-6 py-3.5">
      <div className="flex items-center justify-between">
        {/* Left side - Mobile menu */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Menüyü Aç"
          >
            <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          
          {/* Logo or Title for mobile */}
          <h1 className="lg:hidden text-lg font-bold text-gray-900 dark:text-white">
            WebKeller
          </h1>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Theme toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Tema Değiştir"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            )}
          </button>

          {/* Notifications */}
          <button 
            onClick={() => setNotificationOpen(true)}
            className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 group"
            aria-label="Bildirimler"
          >
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:scale-110 transition-transform duration-200" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-800 animate-pulse"></span>
          </button>

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400">
                <UserAvatar name={userName} size="md" />
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">
                    {userName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight">
                    {userRole}
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              {/* User Info Section */}
              <div className="flex items-center gap-3 p-3 border-b border-gray-200 dark:border-gray-700">
                <UserAvatar name={userName} size="lg" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                    {userName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {currentUser?.username || 'kullanıcı'}
                  </p>
                  <Badge variant="secondary" className="mt-1 text-xs">
                    {userRole}
                  </Badge>
                </div>
              </div>

              <DropdownMenuLabel className="text-xs text-gray-500 dark:text-gray-400">
                Hesap
              </DropdownMenuLabel>
              
              <DropdownMenuItem className="cursor-pointer">
                <UserCircle className="mr-2 h-4 w-4" />
                <span>Profilim</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem asChild>
                <Link href="/dashboard/ayarlar" className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Ayarlar</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem 
                className="cursor-pointer text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
                onClick={logout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Çıkış Yap</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Notification Panel */}
      <NotificationPanel isOpen={notificationOpen} onClose={() => setNotificationOpen(false)} />
    </header>
  );
}