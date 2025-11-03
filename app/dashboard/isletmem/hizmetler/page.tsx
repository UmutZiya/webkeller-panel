'use client';

import React, { useState } from 'react';
import { useApp, Service } from '@/contexts/AppContext';
import { DataTable } from '@/components/ui/DataTable';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

export default function HizmetlerPage() {
  const { services, businesses, addService, updateService, deleteService } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    taxRate: 20,
    price: 0,
    businessId: ''
  });

  const resetForm = () => {
    setFormData({ name: '', description: '', taxRate: 20, price: 0, businessId: '' });
    setEditingService(null);
  };

  const handleAdd = () => {
    resetForm();
    setShowModal(true);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description,
      taxRate: (service as any).taxRate ?? 0,
      price: service.price,
      businessId: service.businessId
    });
    setShowModal(true);
  };

  const handleDelete = (service: Service) => {
    if (confirm(`${service.name} hizmetini silmek istediğinizden emin misiniz?`)) {
      deleteService(service.id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingService) {
      updateService(editingService.id, formData);
    } else {
      addService(formData);
    }
    setShowModal(false);
    resetForm();
  };

  const getBusinessName = (businessId: string) => 
    businesses.find(b => b.id === businessId)?.name || 'Bilinmeyen Şube';

  const columns = [
    {
      header: 'Hizmet Adı',
      accessor: 'name' as keyof Service,
      render: (value: string) => (
        <span className="font-medium text-gray-900 dark:text-gray-100">{value}</span>
      )
    },
    {
      header: 'Açıklama',
      accessor: 'description' as keyof Service,
      render: (value: string) => (
        <span className="text-gray-600 dark:text-gray-400 max-w-xs truncate block">{value}</span>
      )
    },
    {
      header: 'Vergi Oranı',
      accessor: 'taxRate' as keyof Service,
      render: (value: number) => `${value}%`
    },
    {
      header: 'Fiyat',
      accessor: 'price' as keyof Service,
      render: (value: number) => `₺${value.toLocaleString('tr-TR')}`
    },
    {
      header: 'Şube',
      accessor: 'businessId' as keyof Service,
      render: (value: string) => (
        <span className="text-blue-600 dark:text-blue-400 font-medium">{getBusinessName(value)}</span>
      )
    },
    {
      header: 'Oluşturulma',
      accessor: 'createdAt' as keyof Service,
      render: (value: Date) => format(new Date(value), 'dd MMM yyyy', { locale: tr })
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Hizmetler</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Şubelerinizin sunduğu hizmetleri yönetin
          </p>
        </div>
      </div>

      <DataTable
        data={services}
        columns={columns}
        title="Hizmet Listesi"
        searchPlaceholder="Hizmet ara..."
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        addButtonText="Yeni Hizmet"
      />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {editingService ? 'Hizmet Düzenle' : 'Yeni Hizmet'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Şube *
                </label>
                <select
                  required
                  value={formData.businessId}
                  onChange={(e) => setFormData({ ...formData, businessId: e.target.value })}
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
                  Hizmet Adı *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                  placeholder="Hizmet adını girin"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Açıklama
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                  placeholder="Hizmet açıklaması"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Vergi Oranı (%) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    max="100"
                    step="0.01"
                    value={(formData as any).taxRate}
                    onChange={(e) => setFormData({ ...formData, taxRate: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Fiyat (₺) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                  />
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
                  {editingService ? 'Güncelle' : 'Ekle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}