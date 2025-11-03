"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { Menu, Bell, User, Moon, Sun, ChevronDown, LogOut, Clock, Crown, Zap } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';

export function Header() {
  const { setSidebarOpen, darkMode, toggleDarkMode, currentUser, logout } = useApp();
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState({ days: 15, hours: 0, minutes: 0, seconds: 0 });
  
  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (pathname !== '/dashboard') return;
    // 15 gün sonrası için target date
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 15);
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [pathname]);
  const initials = React.useMemo(() => {
    if (!mounted || !currentUser) return 'U';
    return (currentUser.firstName[0] + (currentUser.lastName?.[0] || '')).toUpperCase();
  }, [mounted, currentUser]);
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 lg:px-6 py-1">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Sayaç sadece ana sayfada gözüksün */}
        {pathname === '/dashboard' && (
          <>
            <div className="hidden md:flex items-center justify-center flex-1">
              <div className="relative group">
                {/* Main Container */}
                <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-0.5 rounded-2xl shadow-lg">
                  <div className="bg-white dark:bg-slate-800 rounded-2xl px-8 py-4 flex items-center gap-6 min-w-[600px]">
                    {/* Icon */}
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                        <Clock className="w-7 h-7 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                        <Zap className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    {/* Content */}
                    <div className="flex-1 text-center">
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <Crown className="w-5 h-5 text-amber-500" />
                        <span className="text-base font-bold text-gray-900 dark:text-white">Ücretsiz Deneme Süreniz</span>
                      </div>
                      <div className="flex items-center justify-center gap-3">
                        <div className="flex flex-col items-center">
                          <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-2 rounded-xl text-lg font-bold min-w-[50px] text-center shadow-lg">
                            {timeLeft.days.toString().padStart(2, '0')}
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">GÜN</span>
                        </div>
                        <div className="text-2xl font-bold text-gray-400 dark:text-gray-500">:</div>
                        <div className="flex flex-col items-center">
                          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-2 rounded-xl text-lg font-bold min-w-[50px] text-center shadow-lg">
                            {timeLeft.hours.toString().padStart(2, '0')}
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">SAAT</span>
                        </div>
                        <div className="text-2xl font-bold text-gray-400 dark:text-gray-500">:</div>
                        <div className="flex flex-col items-center">
                          <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-2 rounded-xl text-lg font-bold min-w-[50px] text-center shadow-lg">
                            {timeLeft.minutes.toString().padStart(2, '0')}
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">DAKİKA</span>
                        </div>
                        <div className="text-2xl font-bold text-gray-400 dark:text-gray-500">:</div>
                        <div className="flex flex-col items-center">
                          <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-3 py-2 rounded-xl text-lg font-bold min-w-[50px] text-center animate-pulse shadow-lg">
                            {timeLeft.seconds.toString().padStart(2, '0')}
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">SANİYE</span>
                        </div>
                      </div>
                    </div>
                    {/* CTA Button */}
                    <button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-3 rounded-xl text-base font-bold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 flex items-center gap-2">
                      <Crown className="w-5 h-5" />
                      Yükselt
                    </button>
                  </div>
                </div>
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>
            </div>
            {/* Mobile Trial Info */}
            <div className="md:hidden flex items-center">
              <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-lg">
                <Clock className="w-3.5 h-3.5" />
                {timeLeft.days}g {timeLeft.hours}s {timeLeft.minutes}d
              </div>
            </div>
          </>
        )}

        {/* Right side */}
        <div className="flex items-center space-x-3">
          {/* Theme toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            )}
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
            </span>
          </button>

          {/* Personal Card Dropdown */}
          <div className="relative">
            <button
              className="flex items-center gap-3 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:scale-105 transition-all duration-200 focus:outline-none"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold border-2 border-white/30">
                {mounted ? initials : 'U'}
              </span>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold leading-5">{mounted ? (currentUser?.username || 'Kullanıcı') : 'Kullanıcı'}</p>
                <p className="text-xs text-white/80 leading-4">{mounted ? `${currentUser?.firstName || ''} ${currentUser?.lastName || ''}` : ''}</p>
              </div>
              <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 animate-fade-in-up">
                <div className="flex flex-col items-center p-6 pb-4">
                  <span className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white mb-2">
                    {mounted ? initials : 'U'}
                  </span>
                  <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{mounted ? `${currentUser?.firstName || ''} ${currentUser?.lastName || ''}` : ''}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{mounted ? (currentUser?.username || '') : ''}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{mounted && currentUser?.createdAt ? `Kayıt: ${new Date(currentUser.createdAt).toLocaleDateString()}` : ''}</p>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-3 flex flex-col gap-2">
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium hover:scale-105 transition-all duration-200"
                  >
                    <LogOut className="w-4 h-4" /> Çıkış Yap
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}