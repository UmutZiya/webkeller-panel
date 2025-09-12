'use client';

import React from 'react';
import { Building2, Users, Calendar, Briefcase, TrendingUp, Clock, CheckCircle, AlertCircle, Plus, List, Wallet } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { StatsCard } from '@/components/ui/StatsCard';
import { format, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';
import { tr } from 'date-fns/locale';

export default function Dashboard() {
  const { businesses, services, staff, customers, appointments, cashTransactions } = useApp();
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Yükleniyor...</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
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
      {/* Welcome */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Webkeller Yönetim Paneline Hoş Geldiniz! 👋</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Toplam İşletme"
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

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-blue-500" />
            Son Aktiviteler
          </h3>
        </div>
        <div className="space-y-4">
          {appointments
            .slice()
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 3)
            .map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-150">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="text-sm text-gray-800 dark:text-gray-200">
                      Randevu oluşturuldu: {getCustomerName(appointment.customerId)} - {getServiceName(appointment.serviceId)}
                    </div>
                    <div className="text-xs text-gray-500">{format(appointment.createdAt, 'dd MMM yyyy HH:mm', { locale: tr })}</div>
                  </div>
                </div>
              </div>
            ))}

          {cashTransactions
            .slice()
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 3)
            .map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-150">
                <div className="flex items-center gap-3">
                  <Wallet className="w-5 h-5 text-purple-500" />
                  <div>
                    <div className="text-sm text-gray-800 dark:text-gray-200">
                      {tx.type === 'income' ? 'Gelir eklendi' : 'Gider eklendi'}: ₺{tx.amount.toFixed(2)} {tx.company ? `- ${tx.company}` : ''}
                    </div>
                    <div className="text-xs text-gray-500">{format(tx.createdAt, 'dd MMM yyyy HH:mm', { locale: tr })}</div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Hızlı İşlemler
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="/dashboard/randevu/yeni"
            className="flex items-center p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <Calendar className="w-6 h-6 mr-3" />
            <span className="font-medium">Yeni Randevu</span>
          </a>
          <a
            href="/dashboard/musteriler/ekle"
            className="flex items-center p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <Users className="w-6 h-6 mr-3" />
            <span className="font-medium">Müşteri Ekle</span>
          </a>
          <a
            href="/dashboard/isletmem/isletmelerim"
            className="flex items-center p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <Building2 className="w-6 h-6 mr-3" />
            <span className="font-medium">İşletme Ekle</span>
          </a>
          <a
            href="/dashboard/isletmem/hizmetler"
            className="flex items-center p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <Briefcase className="w-6 h-6 mr-3" />
            <span className="font-medium">Hizmet Ekle</span>
          </a>
          <a
            href="/dashboard/isletmem/kasa"
            className="flex items-center p-4 bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white rounded-lg hover:from-purple-600 hover:to-fuchsia-700 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <Wallet className="w-6 h-6 mr-3" />
            <span className="font-medium">Kasa İşlemi</span>
          </a>
        </div>
      </div>
    </div>
  );
}