'use client';

import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Calendar, Clock, User, Building2, Briefcase, Users, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

export default function YeniRandevuPage() {
  const { businesses, services, staff, customers, addAppointment } = useApp();
  // Seçilen işletmeye ait müşteriler
  const getAvailableCustomers = () =>
    customers.filter(c => c.businessId === formData.businessId);
  const [currentStep, setCurrentStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    businessId: '',
    serviceId: '',
    staffId: '',
    customerId: '',
    date: '',
    time: '',
    notes: ''
  });

  const resetForm = () => {
    setFormData({
      businessId: '',
      serviceId: '',
      staffId: '',
      customerId: '',
      date: '',
      time: '',
      notes: ''
    });
    setCurrentStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const appointmentDate = new Date(`${formData.date}T${formData.time}`);

    await addAppointment({
      businessId: formData.businessId,
      serviceId: formData.serviceId,
      staffId: formData.staffId,
      customerId: formData.customerId,
      date: appointmentDate,
      status: 'pending',
      notes: formData.notes
    });

    setSuccess(true);
    resetForm();
    setTimeout(() => setSuccess(false), 3000);
  };

  const getAvailableServices = () =>
    services.filter(s => s.businessId === formData.businessId);

  const getAvailableStaff = () =>
    staff.filter(s => s.businessId === formData.businessId && (s.serviceIds || []).includes(formData.serviceId));

  const getSelectedBusiness = () => businesses.find(b => b.id === formData.businessId);
  const getSelectedService = () => services.find(s => s.id === formData.serviceId);
  const getSelectedStaff = () => staff.find(s => s.id === formData.staffId);
  const getSelectedCustomer = () => customers.find(c => c.id === formData.customerId);

  const canProceedToStep = (step: number) => {
    switch (step) {
      case 2: return formData.businessId !== '';
      case 3: return formData.serviceId !== '';
      case 4: return formData.staffId !== '';
      case 5: return formData.customerId !== '';
      default: return true;
    }
  };

  const steps = [
    { number: 1, title: 'İşletme', icon: Building2, completed: formData.businessId !== '' },
    { number: 2, title: 'Hizmet', icon: Briefcase, completed: formData.serviceId !== '' },
    { number: 3, title: 'Personel', icon: Users, completed: formData.staffId !== '' },
    { number: 4, title: 'Müşteri', icon: User, completed: formData.customerId !== '' },
    { number: 5, title: 'Tarih & Saat', icon: Calendar, completed: formData.date !== '' && formData.time !== '' }
  ];

  if (success) {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-8">
          <CheckCircle className="w-16 h-16 text-green-600 dark:text-green-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-green-800 dark:text-green-400 mb-2">
            Randevu Başarıyla Oluşturuldu!
          </h1>
          <p className="text-green-700 dark:text-green-300">
            Randevunuz sisteme kaydedildi ve müşterinize bildirim gönderilecek.
          </p>
        </div>
        <button
          onClick={() => setSuccess(false)}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
        >
          Yeni Randevu Oluştur
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Yeni Randevu Oluştur
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Adım adım randevu bilgilerini doldurun
        </p>
      </div>

      {/* Progress Steps */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ${currentStep === step.number
                  ? 'bg-blue-500 border-blue-500 text-white'
                  : step.completed
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-gray-300 dark:border-gray-600 text-gray-400'
                }`}>
                <step.icon className="w-5 h-5" />
              </div>
              <div className="ml-3 hidden sm:block">
                <p className={`text-sm font-medium ${currentStep === step.number
                    ? 'text-blue-600 dark:text-blue-400'
                    : step.completed
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-12 h-0.5 mx-4 ${step.completed ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`} />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: İşletme Seçimi */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center">
                <Building2 className="w-5 h-5 mr-2 text-blue-500" />
                Şube Seçin
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {businesses.map(business => (
                  <div
                    key={business.id}
                    onClick={() => setFormData({ ...formData, businessId: business.id })}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${formData.businessId === business.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                      }`}
                  >
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{business.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{business.address}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">{business.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Hizmet Seçimi */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center">
                <Briefcase className="w-5 h-5 mr-2 text-blue-500" />
                Hizmet Seçin
              </h3>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                İşletme: <span className="font-medium text-blue-600 dark:text-blue-400">{getSelectedBusiness()?.name}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getAvailableServices().map(service => (
                  <div
                    key={service.id}
                    onClick={() => setFormData({ ...formData, serviceId: service.id })}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${formData.serviceId === service.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                      }`}
                  >
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{service.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{service.description}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-medium text-green-600 dark:text-green-400">₺{service.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Personel Seçimi */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-500" />
                Personel Seçin
              </h3>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Hizmet: <span className="font-medium text-blue-600 dark:text-blue-400">{getSelectedService()?.name}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getAvailableStaff().map(staffMember => (
                  <div
                    key={staffMember.id}
                    onClick={() => setFormData({ ...formData, staffId: staffMember.id })}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${formData.staffId === staffMember.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                      }`}
                  >
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{staffMember.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{staffMember.email}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">{staffMember.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Müşteri Seçimi */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-500" />
                Müşteri Seçin
              </h3>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Personel: <span className="font-medium text-blue-600 dark:text-blue-400">{getSelectedStaff()?.name}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                {getAvailableCustomers().map(customer => (
                  <div
                    key={customer.id}
                    onClick={() => setFormData({ ...formData, customerId: customer.id })}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${formData.customerId === customer.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                      }`}
                  >
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{customer.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{customer.email}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">{customer.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Tarih ve Saat */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-500 dark:text-white" />
                Tarih ve Saat Seçin
              </h3>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Müşteri: <span className="font-medium text-blue-600 dark:text-blue-400">{getSelectedCustomer()?.name}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tarih *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    min={format(new Date(), 'yyyy-MM-dd')}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Clock className="w-4 h-4 text-blue-500 dark:text-white" />
                    Saat *
                  </label>
                  <select
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                  >
                    <option value="">Saat seçin</option>
                    {Array.from({ length: 10 }, (_, hour) => 
                      Array.from({ length: 4 }, (_, quarter) => {
                        const h = 9 + hour;
                        const m = quarter * 15;
                        const timeValue = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
                        return (
                          <option key={timeValue} value={timeValue}>
                            {timeValue}
                          </option>
                        );
                      })
                    ).flat()}
                  </select>
                </div>
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
                  placeholder="Randevu ile ilgili notlar..."
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="px-6 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Geri
            </button>

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!canProceedToStep(currentStep + 1)}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                İleri
              </button>
            ) : (
              <button
                type="submit"
                disabled={!formData.date || !formData.time}
                className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Randevu Oluştur
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}