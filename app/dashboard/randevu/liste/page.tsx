'use client';

import React, { useState } from 'react';
import { useApp, Appointment } from '@/contexts/AppContext';
import { DataTable } from '@/components/ui/DataTable';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

export default function RandevuListesiPage() {
  const { appointments, businesses, services, staff, customers, updateAppointment, deleteAppointment } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    status: 'pending' as 'pending' | 'confirmed' | 'completed' | 'cancelled',
    notes: ''
  });

  const resetForm = () => {
    setFormData({ date: '', time: '', status: 'pending', notes: '' });
    setEditingAppointment(null);
  };

  const handleEdit = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    const appointmentDate = new Date(appointment.date);
    setFormData({
      date: format(appointmentDate, 'yyyy-MM-dd'),
      time: format(appointmentDate, 'HH:mm'),
      status: appointment.status,
      notes: appointment.notes || ''
    });
    setShowModal(true);
  };

  const handleDelete = (appointment: Appointment) => {
    const customerName = getCustomerName(appointment.customerId);
    const serviceName = getServiceName(appointment.serviceId);
    if (confirm(`${customerName} - ${serviceName} randevusunu silmek istediğinizden emin misiniz?`)) {
      deleteAppointment(appointment.id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAppointment) {
      const updatedDate = new Date(`${formData.date}T${formData.time}`);
      updateAppointment(editingAppointment.id, {
        date: updatedDate,
        status: formData.status,
        notes: formData.notes
      });
    }
    setShowModal(false);
    resetForm();
  };

  const getBusinessName = (businessId: string) => 
    businesses.find(b => b.id === businessId)?.name || 'Bilinmeyen Şube';

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

  const columns = [
    {
      header: 'Müşteri',
      accessor: 'customerId' as keyof Appointment,
      render: (value: string) => (
        <span className="font-medium text-gray-900 dark:text-gray-100">{getCustomerName(value)}</span>
      )
    },
    {
      header: 'Şube',
      accessor: 'businessId' as keyof Appointment,
      render: (value: string) => (
        <span className="text-blue-600 dark:text-blue-400 font-medium">{getBusinessName(value)}</span>
      )
    },
    {
      header: 'Hizmet',
      accessor: 'serviceId' as keyof Appointment,
      render: (value: string) => (
        <span className="text-purple-600 dark:text-purple-400">{getServiceName(value)}</span>
      )
    },
    {
      header: 'Personel',
      accessor: 'staffId' as keyof Appointment,
      render: (value: string) => (
        <span className="text-green-600 dark:text-green-400">{getStaffName(value)}</span>
      )
    },
    {
      header: 'Tarih',
      accessor: 'date' as keyof Appointment,
      render: (value: Date) => format(new Date(value), 'dd MMM yyyy', { locale: tr })
    },
    {
      header: 'Saat',
      accessor: 'date' as keyof Appointment,
      render: (value: Date) => format(new Date(value), 'HH:mm')
    },
    {
      header: 'Durum',
      accessor: 'status' as keyof Appointment,
      render: (value: string) => getStatusBadge(value)
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Randevu Listesi</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Tüm randevuları görüntüleyin ve yönetin
          </p>
        </div>
      </div>

      <DataTable
        data={appointments}
        columns={columns}
        title="Randevu Listesi"
        searchPlaceholder="Randevu ara..."
        onEdit={handleEdit}
        onDelete={handleDelete}
        hideAddButton={true}
      />

      {/* Modal */}
      {showModal && editingAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Randevu Düzenle
            </h3>
            
            <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Müşteri:</span> {getCustomerName(editingAppointment.customerId)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Hizmet:</span> {getServiceName(editingAppointment.serviceId)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Personel:</span> {getStaffName(editingAppointment.staffId)}
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tarih *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Saat *
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Durum *
                </label>
                <select
                  required
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                >
                  <option value="pending">Bekliyor</option>
                  <option value="confirmed">Onaylandı</option>
                  <option value="completed">Tamamlandı</option>
                  <option value="cancelled">İptal Edildi</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Notlar
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                  placeholder="Randevu notları..."
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
                >
                  Güncelle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}