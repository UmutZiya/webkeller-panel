'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, Users, Calendar, Briefcase, TrendingUp, Clock, CheckCircle, AlertCircle, Plus, List, Wallet, Crown, Zap, CreditCard, ExternalLink, Headphones } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { StatsCard } from '@/components/ui/StatsCard';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { format, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';
import { tr } from 'date-fns/locale';

export default function Dashboard() {
  const { businesses, services, staff, customers, appointments, cashTransactions } = useApp();
  const [mounted, setMounted] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState({ days: 15, hours: 0, minutes: 0, seconds: 0 });

  React.useEffect(() => {
    setMounted(true);

    // Calculate trial time left - 15 days from now
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 15);

    const updateTimer = () => {
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
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000); // Update every second

    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="space-y-6">
        {/* Loading Alert */}
        <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 rounded-xl p-6 shadow-lg animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            <div>
              <h1 className="text-2xl font-bold text-white">Yükleniyor...</h1>
              <p className="text-blue-100 text-sm mt-1">Dashboard hazırlanıyor</p>
            </div>
          </div>
        </div>

        {/* Loading Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
                <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Loading Secondary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-3"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Calculate stats
  const totalRevenue = appointments
    .filter(apt => apt.status === 'completed')
    .reduce((sum, apt) => {
      const service = services.find(s => s.id === apt.serviceId);
      return sum + (service?.price || 0);
    }, 0);

  const thisWeekStart = startOfWeek(new Date(), { locale: tr });
  const thisWeekEnd = endOfWeek(new Date(), { locale: tr });

  const thisWeekAppointments = appointments.filter(apt =>
    isWithinInterval(apt.date, { start: thisWeekStart, end: thisWeekEnd })
  );

  const pendingAppointments = appointments.filter(apt => apt.status === 'pending').length;
  const completedAppointments = appointments.filter(apt => apt.status === 'completed').length;

  // Recent appointments
  const recentAppointments = appointments
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const getBusinessName = (businessId: string) =>
    businesses.find(b => b.id === businessId)?.name || 'Bilinmeyen İşletme';

  const getServiceName = (serviceId: string) =>
    services.find(s => s.id === serviceId)?.name || 'Bilinmeyen Hizmet';

  const getStaffName = (staffId: string) =>
    staff.find(s => s.id === staffId)?.name || 'Bilinmeyen Personel';

  const getCustomerName = (customerId: string) =>
    customers.find(c => c.id === customerId)?.name || 'Bilinmeyen Müşteri';

  const getStatusBadge = (status: string) => {
    const statusMap = {
      pending: { text: 'Bekliyor', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' },
      confirmed: { text: 'Onaylandı', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' },
      completed: { text: 'Tamamlandı', color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' },
      cancelled: { text: 'İptal Edildi', color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' }
    };

    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.pending;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
        {statusInfo.text}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Trial Period Alert - Non-dismissible */}
      <Alert variant="warning" className="border-l-4 border-l-amber-500">
        <Zap className="h-5 w-5" />
        <AlertDescription className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Crown className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <span className="font-semibold">Deneme süreniz:</span>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200">
                {timeLeft.days} Gün
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200">
                {timeLeft.hours} Saat
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200">
                {timeLeft.minutes} Dakika
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200">
                {timeLeft.seconds} Saniye
              </span>
            </div>
            <span className="text-sm">kaldı</span>
          </div>
          <button className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-sm font-semibold rounded-lg transition-all duration-200 hover:shadow-lg">
            <Crown className="h-4 w-4" />
            Premium&apos;a Geç
          </button>
        </AlertDescription>
      </Alert>

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Hoş Geldiniz! 👋
            </h1>
            <p className="text-blue-100 text-sm md:text-base">
              İşletmenizi yönetmek için harika bir gün
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right">
              <p className="text-xs text-blue-200">Bugün</p>
              <p className="text-sm font-semibold text-white">
                {format(new Date(), 'dd MMMM yyyy', { locale: tr })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatsCard
          title="Toplam Şube"
          value={businesses.length}
          icon={Building2}
          color="blue"
          change="+12% bu ay"
          changeType="positive"
        />
        <StatsCard
          title="Aktif Personel"
          value={staff.length}
          icon={Users}
          color="green"
          change="+5% bu ay"
          changeType="positive"
        />
        <StatsCard
          title="Bu Hafta Randevu"
          value={thisWeekAppointments.length}
          icon={Calendar}
          color="purple"
          change="+8% geçen haftaya göre"
          changeType="positive"
        />
        <StatsCard
          title="Toplam Gelir"
          value={`₺${totalRevenue.toLocaleString('tr-TR')}`}
          icon={TrendingUp}
          color="orange"
          change="+15% bu ay"
          changeType="positive"
        />
      </div>

      {/* Secondary Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <StatsCard
          title="Bekleyen Randevular"
          value={pendingAppointments}
          icon={Clock}
          color="orange"
        />
        <StatsCard
          title="Tamamlanan Randevular"
          value={completedAppointments}
          icon={CheckCircle}
          color="green"
        />
        <StatsCard
          title="Toplam Hizmet"
          value={services.length}
          icon={Briefcase}
          color="purple"
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-blue-500" />
            Son Aktiviteler
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            En son yapılan işlemler
          </p>
        </div>
        <div className="p-6 space-y-3">
          {appointments.length === 0 && cashTransactions.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-gray-400 dark:text-gray-500" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Henüz aktivite yok</p>
              <p className="text-xs text-gray-500 dark:text-gray-500">İşlemler burada görünecek</p>
            </div>
          ) : (
            <>
              {appointments
                .slice()
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .slice(0, 3)
                .map((appointment) => (
                  <div key={appointment.id} className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:shadow-sm border border-transparent hover:border-gray-200 dark:hover:border-gray-600">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        Randevu oluşturuldu
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5">
                        {getCustomerName(appointment.customerId)} - {getServiceName(appointment.serviceId)}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {format(appointment.createdAt, 'dd MMM yyyy HH:mm', { locale: tr })}
                      </p>
                    </div>
                    {getStatusBadge(appointment.status)}
                  </div>
                ))}

              {cashTransactions
                .slice()
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .slice(0, 3)
                .map((tx) => (
                  <div key={tx.id} className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:shadow-sm border border-transparent hover:border-gray-200 dark:hover:border-gray-600">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${tx.type === 'income'
                          ? 'bg-green-100 dark:bg-green-900/30'
                          : 'bg-red-100 dark:bg-red-900/30'
                        }`}>
                        <Wallet className={`w-5 h-5 ${tx.type === 'income'
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-red-600 dark:text-red-400'
                          }`} />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {tx.type === 'income' ? 'Gelir eklendi' : 'Gider eklendi'}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5">
                        ₺{tx.amount.toFixed(2)} {tx.company ? `- ${tx.company}` : ''}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {format(tx.createdAt, 'dd MMM yyyy HH:mm', { locale: tr })}
                      </p>
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-orange-500" />
            Hızlı İşlemler
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Sık kullanılan işlemler
          </p>
        </div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Link
            href="/dashboard/randevu/yeni"
            className="group flex flex-col items-center justify-center p-5 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 hover:scale-105 hover:shadow-lg"
          >
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3 group-hover:bg-white/30 transition-colors">
              <Calendar className="w-6 h-6" />
            </div>
            <span className="font-semibold text-center">Yeni Randevu</span>
          </Link>
          <Link
            href="/dashboard/musteriler/ekle"
            className="group flex flex-col items-center justify-center p-5 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 hover:scale-105 hover:shadow-lg"
          >
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3 group-hover:bg-white/30 transition-colors">
              <Users className="w-6 h-6" />
            </div>
            <span className="font-semibold text-center">Müşteri Ekle</span>
          </Link>
          <Link
            href="/dashboard/isletmem/isletmelerim"
            className="group flex flex-col items-center justify-center p-5 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-200 hover:scale-105 hover:shadow-lg"
          >
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3 group-hover:bg-white/30 transition-colors">
              <Building2 className="w-6 h-6" />
            </div>
            <span className="font-semibold text-center">Şube Ekle</span>
          </Link>
          <Link
            href="/dashboard/isletmem/hizmetler"
            className="group flex flex-col items-center justify-center p-5 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 hover:scale-105 hover:shadow-lg"
          >
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3 group-hover:bg-white/30 transition-colors">
              <Briefcase className="w-6 h-6" />
            </div>
            <span className="font-semibold text-center">Hizmet Ekle</span>
          </Link>
          <Link
            href="/dashboard/isletmem/kasa"
            className="group flex flex-col items-center justify-center p-5 bg-gradient-to-br from-fuchsia-500 to-pink-600 text-white rounded-xl hover:from-fuchsia-600 hover:to-pink-700 transition-all duration-200 hover:scale-105 hover:shadow-lg"
          >
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3 group-hover:bg-white/30 transition-colors">
              <Wallet className="w-6 h-6" />
            </div>
            <span className="font-semibold text-center">Kasa İşlemi</span>
          </Link>
          <a
            href="https://odeme.webkeller.com/merchant/login"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center justify-center p-5 text-white rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #49b0ec 0%, #0d2494 100%)'
            }}
          >
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3 group-hover:bg-white/30 transition-colors relative">
              <CreditCard className="w-6 h-6" />
              <ExternalLink className="w-3 h-3 absolute -top-1 -right-1 opacity-70" />
            </div>
            <span className="font-semibold text-center">WebkellerPay</span>
            <div className="absolute top-2 right-2 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
          </a>
          <button
            className="group flex flex-col items-center justify-center p-5 bg-gradient-to-br from-teal-500 to-cyan-600 text-white rounded-xl hover:from-teal-600 hover:to-cyan-700 transition-all duration-200 hover:scale-105 hover:shadow-lg"
          >
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3 group-hover:bg-white/30 transition-colors">
              <Headphones className="w-6 h-6" />
            </div>
            <span className="font-semibold text-center">Destek</span>
          </button>
        </div>
      </div>
    </div>
  );
}