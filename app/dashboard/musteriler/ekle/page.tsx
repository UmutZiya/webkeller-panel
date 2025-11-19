'use client';

import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { User, Mail, Phone, CheckCircle } from 'lucide-react';

export default function MusteriEklePage() {
  const { addCustomer, businesses } = useApp();
  const [formData, setFormData] = useState({
    businessId: '',
    name: '',
    email: '',
    phone: '',
    taxNumber: '',
    taxOffice: '',
    companyName: '',
    city: '',
    district: '',
    customerType: 'individual' as 'corporate' | 'individual',
    website: '',
    address: '',
    notes: ''
  });
  const [success, setSuccess] = useState(false);
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
    
    if (!formData.businessId) return;
    addCustomer(formData);
    setSuccess(true);
    setFormData({ businessId: '', name: '', email: '', phone: '', taxNumber: '', taxOffice: '', companyName: '', city: '', district: '', customerType: 'individual', website: '', address: '', notes: '' });
    setErrors({ phone: '', taxNumber: '' });
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Anlık validasyon hatalarını temizle
    if (name === 'phone' && errors.phone) {
      setErrors({ ...errors, phone: '' });
    }
    if (name === 'taxNumber' && errors.taxNumber) {
      setErrors({ ...errors, taxNumber: '' });
    }
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

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Yeni Müşteri Ekle
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Müşteri bilgilerini doldurun ve sisteme ekleyin
        </p>
      </div>

      {success && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-center">
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-3" />
          <span className="text-green-800 dark:text-green-400 font-medium">
            Müşteri başarıyla eklendi!
          </span>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              İşletme *
            </label>
            <select
              required
              value={formData.businessId}
              onChange={e => setFormData({ ...formData, businessId: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 transition-all duration-200"
            >
              <option value="">Şube seçin</option>
              {businesses.map(b => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Ad Soyad *
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 transition-all duration-200"
              placeholder="Müşteri adını girin"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Firma Adı
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 transition-all duration-200"
              placeholder="Firma adını girin"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              E-posta Adresi *
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 transition-all duration-200"
              placeholder="ornek@email.com"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Phone className="w-4 h-4 inline mr-2" />
              Telefon Numarası *
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handlePhoneChange}
              className={`w-full px-4 py-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 transition-all duration-200`}
              placeholder="+905340103014"
              maxLength={13}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
            )}
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Vergi Numarası (10 haneli)
            </label>
            <input
              type="text"
              name="taxNumber"
              value={formData.taxNumber}
              onChange={handleTaxNumberChange}
              className={`w-full px-4 py-3 border ${errors.taxNumber ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 transition-all duration-200`}
              placeholder="1234567890"
              maxLength={10}
            />
            {errors.taxNumber && (
              <p className="mt-1 text-sm text-red-500">{errors.taxNumber}</p>
            )}
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Vergi Dairesi
            </label>
            <input
              type="text"
              name="taxOffice"
              value={formData.taxOffice}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 transition-all duration-200"
              placeholder="Beşiktaş"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Şehir
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 transition-all duration-200"
              placeholder="İstanbul"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              İlçe
            </label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 transition-all duration-200"
              placeholder="Beşiktaş"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Müşteri Tipi
            </label>
            <select
              name="customerType"
              value={formData.customerType}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 transition-all duration-200"
            >
              <option value="individual">Bireysel Müşteri</option>
              <option value="corporate">Kurumsal Müşteri</option>
            </select>
          </div>

          <div className="md:col-span-2 lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              İnternet Sitesi (varsa)
            </label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 transition-all duration-200"
              placeholder="https://"
            />
          </div>

          <div className="md:col-span-2 lg:col-span-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Adres
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 transition-all duration-200"
              placeholder="Adres"
            />
          </div>

          <div className="md:col-span-2 lg:col-span-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Açıklama
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 transition-all duration-200"
              placeholder="Opsiyonel açıklama"
            />
          </div>

          <div className="md:col-span-2 lg:col-span-3 flex flex-col sm:flex-row gap-4 pt-2">
            <button
              type="button"
              onClick={() => setFormData({ businessId: '', name: '', email: '', phone: '', taxNumber: '', taxOffice: '', companyName: '', city: '', district: '', customerType: 'individual', website: '', address: '', notes: '' })}
              className="w-full sm:w-auto flex-1 px-6 py-3 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Temizle
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
            >
              Müşteri Ekle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}