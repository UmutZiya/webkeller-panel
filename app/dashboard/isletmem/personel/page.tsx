'use client';

import React, { useState } from 'react';
import { useApp, Staff } from '@/contexts/AppContext';
import { DataTable } from '@/components/ui/DataTable';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

export default function PersonelPage() {
  const { staff, businesses, services, addStaff, updateStaff, deleteStaff } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessId: '',
    serviceIds: [] as string[],
    nationalId: '',
    address: '',
    notes: ''
  });
  const [errors, setErrors] = useState({
    phone: '',
    nationalId: ''
  });

  const validatePhone = (phone: string) => {
    // +905xxxxxxxxx formatı - toplam 13 karakter
    const phoneRegex = /^\+90[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const validateNationalId = (nationalId: string) => {
    // 11 haneli TC kimlik numarası
    return /^[0-9]{11}$/.test(nationalId);
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', phone: '', businessId: '', serviceIds: [], nationalId: '', address: '', notes: '' });
    setEditingStaff(null);
    setErrors({ phone: '', nationalId: '' });
  };

  const handleAdd = () => {
    resetForm();
    setShowModal(true);
  };

  const handleEdit = (staff: Staff) => {
    setEditingStaff(staff);
    setFormData({
      name: staff.name,
      email: staff.email,
      phone: staff.phone,
      businessId: staff.businessId,
      serviceIds: staff.serviceIds,
      nationalId: (staff as any).nationalId || '',
      address: (staff as any).address || '',
      notes: (staff as any).notes || ''
    });
    setShowModal(true);
  };

  const handleDelete = (staff: Staff) => {
    if (confirm(`${staff.name} personelini silmek istediğinizden emin misiniz?`)) {
      deleteStaff(staff.id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasyon kontrolü
    const newErrors = { phone: '', nationalId: '' };
    
    if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Telefon numarası +905xxxxxxxxx formatında olmalıdır (13 karakter)';
    }
    
    if (formData.nationalId && !validateNationalId(formData.nationalId)) {
      newErrors.nationalId = 'T.C. Kimlik No 11 haneli olmalıdır';
    }
    
    setErrors(newErrors);
    
    if (newErrors.phone || newErrors.nationalId) {
      return;
    }
    
    if (editingStaff) {
      updateStaff(editingStaff.id, formData);
    } else {
      addStaff(formData);
    }
    setShowModal(false);
    resetForm();
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    // Sadece rakam ve + işaretine izin ver
    value = value.replace(/[^0-9+]/g, '');
    // + işareti sadece başta olabilir
    if (value.includes('+') && !value.startsWith('+')) {
      value = value.replace(/\+/g, '');
    }
    // Maksimum 13 karakter
    if (value.length > 13) {
      value = value.substring(0, 13);
    }
    setFormData({ ...formData, phone: value });
    if (errors.phone) {
      setErrors({ ...errors, phone: '' });
    }
  };

  const handleNationalIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    // Sadece rakamlara izin ver
    value = value.replace(/[^0-9]/g, '');
    // Maksimum 11 karakter
    if (value.length > 11) {
      value = value.substring(0, 11);
    }
    setFormData({ ...formData, nationalId: value });
    if (errors.nationalId) {
      setErrors({ ...errors, nationalId: '' });
    }
  };

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      serviceIds: prev.serviceIds.includes(serviceId)
        ? prev.serviceIds.filter(id => id !== serviceId)
        : [...prev.serviceIds, serviceId]
    }));
  };

  const getBusinessName = (businessId: string) => 
    businesses.find(b => b.id === businessId)?.name || 'Bilinmeyen İşletme';

  const getServiceNames = (serviceIds: string[] = []) => 
    (serviceIds || []).map(id => services.find(s => s.id === id)?.name).filter(Boolean).join(', ') || 'Hizmet yok';

  const getAvailableServices = () => 
    services.filter(s => s.businessId === formData.businessId);

  const columns = [
    {
      header: 'Personel Adı',
      accessor: 'name' as keyof Staff,
      render: (value: string) => (
        <span className="font-medium text-gray-900 dark:text-gray-100">{value}</span>
      )
    },
    {
      header: 'E-posta',
      accessor: 'email' as keyof Staff,
      render: (value: string) => (
        <span className="text-gray-600 dark:text-gray-400">{value}</span>
      )
    },
    {
      header: 'Telefon',
      accessor: 'phone' as keyof Staff
    },
    {
      header: 'İşletme',
      accessor: 'businessId' as keyof Staff,
      render: (value: string) => (
        <span className="text-blue-600 dark:text-blue-400 font-medium">{getBusinessName(value)}</span>
      )
    },
    {
      header: 'Hizmetler',
      accessor: 'serviceIds' as keyof Staff,
      render: (value: string[]) => (
        <span className="text-green-600 dark:text-green-400 text-sm">{getServiceNames(value)}</span>
      )
    },
    {
      header: 'Oluşturulma',
      accessor: 'createdAt' as keyof Staff,
      render: (value: Date) => format(new Date(value), 'dd MMM yyyy', { locale: tr })
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Personel Yönetimi</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Şubelerinizin personellerini yönetin
          </p>
        </div>
      </div>

      <DataTable
        data={staff}
        columns={columns}
        title="Personel Listesi"
        searchPlaceholder="Personel ara..."
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        addButtonText="Yeni Personel"
      />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {editingStaff ? 'Personel Düzenle' : 'Yeni Personel'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  İşletme *
                </label>
                <select
                  required
                  value={formData.businessId}
                  onChange={(e) => setFormData({ ...formData, businessId: e.target.value, serviceIds: [] })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                >
                  <option value="">Şube seçin</option>
                  {businesses.map(business => (
                    <option key={business.id} value={business.id}>{business.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Personel Adı *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                  placeholder="Personel adını girin"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  E-posta *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                  placeholder="personel@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Telefon *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  className={`w-full px-3 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100`}
                  placeholder="+905340103014"
                  maxLength={13}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                )}
              </div>

              {formData.businessId && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Hizmetler
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                    {getAvailableServices().length > 0 ? (
                      getAvailableServices().map(service => {
                        const active = formData.serviceIds.includes(service.id);
                        return (
                          <button
                            key={service.id}
                            type="button"
                            onClick={() => handleServiceToggle(service.id)}
                            className={`w-full text-left p-3 rounded-lg border transition-all ${
                              active
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">{service.name}</span>
                              <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                                active ? 'bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                              }`}>
                                {active ? 'Seçili' : 'Seç'}
                              </span>
                            </div>
                          </button>
                        );
                      })
                    ) : (
                      <p className="text-sm text-gray-500 dark:text-gray-400">Bu işletme için henüz hizmet yok</p>
                    )}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    T.C. Kimlik No (11 haneli)
                  </label>
                  <input
                    type="text"
                    value={formData.nationalId}
                    onChange={handleNationalIdChange}
                    className={`w-full px-3 py-2 border ${errors.nationalId ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100`}
                    placeholder="12345678901"
                    maxLength={11}
                  />
                  {errors.nationalId && (
                    <p className="mt-1 text-sm text-red-500">{errors.nationalId}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Adres
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                    placeholder="Adres"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Açıklama
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                  placeholder="Opsiyonel açıklama"
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
                  {editingStaff ? 'Güncelle' : 'Ekle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}