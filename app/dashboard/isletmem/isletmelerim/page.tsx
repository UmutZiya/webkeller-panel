'use client';

import React, { useState } from 'react';
import { useApp, Business } from '@/contexts/AppContext';
import { DataTable } from '@/components/ui/DataTable';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

export default function IsletmelerimPage() {
  const { businesses, addBusiness, updateBusiness, deleteBusiness } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editingBusiness, setEditingBusiness] = useState<Business | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    city: '',
    district: '',
    taxOffice: '',
    taxNumber: ''
  });
  const [errors, setErrors] = useState({
    phone: '',
    taxNumber: ''
  });

  const validatePhone = (phone: string) => {
    // +905xxxxxxxxx formatı - toplam 13 karakter
    const phoneRegex = /^\+90[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const validateTaxNumber = (taxNumber: string) => {
    // 10 haneli vergi numarası
    return /^[0-9]{10}$/.test(taxNumber);
  };

  const resetForm = () => {
    setFormData({ name: '', address: '', phone: '', email: '', city: '', district: '', taxOffice: '', taxNumber: '' });
    setEditingBusiness(null);
    setErrors({ phone: '', taxNumber: '' });
  };

  const handleAdd = () => {
    resetForm();
    setShowModal(true);
  };

  const handleEdit = (business: Business) => {
    setEditingBusiness(business);
    setFormData({
      name: business.name,
      address: business.address,
      phone: business.phone,
      email: business.email,
      city: business.city || '',
      district: business.district || '',
      taxOffice: business.taxOffice || '',
      taxNumber: business.taxNumber || ''
    });
    setShowModal(true);
  };

  const handleDelete = (business: Business) => {
    if (confirm(`${business.name} işletmesini silmek istediğinizden emin misiniz?`)) {
      deleteBusiness(business.id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasyon kontrolü
    const newErrors = { phone: '', taxNumber: '' };
    
    if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Telefon numarası +905xxxxxxxxx formatında olmalıdır (13 karakter)';
    }
    
    if (formData.taxNumber && !validateTaxNumber(formData.taxNumber)) {
      newErrors.taxNumber = 'Vergi numarası 10 haneli olmalıdır';
    }
    
    setErrors(newErrors);
    
    if (newErrors.phone || newErrors.taxNumber) {
      return;
    }
    
    if (editingBusiness) {
      updateBusiness(editingBusiness.id, formData);
    } else {
      addBusiness(formData);
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

  const handleTaxNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    // Sadece rakamlara izin ver
    value = value.replace(/[^0-9]/g, '');
    // Maksimum 10 karakter
    if (value.length > 10) {
      value = value.substring(0, 10);
    }
    setFormData({ ...formData, taxNumber: value });
    if (errors.taxNumber) {
      setErrors({ ...errors, taxNumber: '' });
    }
  };

  const columns = [
    {
      header: 'Şube Adı',
      accessor: 'name' as keyof Business,
      render: (value: string) => (
        <span className="font-medium text-gray-900 dark:text-gray-100">{value}</span>
      )
    },
    {
      header: 'Adres',
      accessor: 'address' as keyof Business,
      render: (value: string) => (
        <span className="text-gray-600 dark:text-gray-400 max-w-xs truncate block">{value}</span>
      )
    },
    {
      header: 'Telefon',
      accessor: 'phone' as keyof Business
    },
    {
      header: 'E-posta',
      accessor: 'email' as keyof Business
    },
    {
      header: 'Oluşturulma',
      accessor: 'createdAt' as keyof Business,
      render: (value: Date) => format(new Date(value), 'dd MMM yyyy', { locale: tr })
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Şubelerim</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Şubelerinizi ekleyin, düzenleyin ve yönetin
          </p>
        </div>
      </div>

      <DataTable
        data={businesses}
        columns={columns}
        title="Şube Listesi"
        searchPlaceholder="Şube ara..."
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        addButtonText="Yeni Şube"
      />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {editingBusiness ? 'Şube Düzenle' : 'Yeni Şube'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Şube Adı *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                  placeholder="Şube adını girin"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Adres *
                </label>
                <textarea
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                  placeholder="Şube adresini girin"
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
                  placeholder="info@isletme.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Şehir
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                    placeholder="Örn. İstanbul"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    İlçe
                  </label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                    placeholder="Örn. Şişli"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Vergi Dairesi
                  </label>
                  <input
                    type="text"
                    value={formData.taxOffice}
                    onChange={(e) => setFormData({ ...formData, taxOffice: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                    placeholder="Örn. Şişli Vergi Dairesi"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Vergi Numarası (10 haneli)
                  </label>
                  <input
                    type="text"
                    value={formData.taxNumber}
                    onChange={handleTaxNumberChange}
                    className={`w-full px-3 py-2 border ${errors.taxNumber ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100`}
                    placeholder="1234567890"
                    maxLength={10}
                  />
                  {errors.taxNumber && (
                    <p className="mt-1 text-sm text-red-500">{errors.taxNumber}</p>
                  )}
                </div>
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
                  {editingBusiness ? 'Güncelle' : 'Ekle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}