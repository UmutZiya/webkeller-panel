'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types
export interface Business {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  city: string;
  district: string;
  taxOffice: string;
  taxNumber: string;
  createdAt: Date;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  taxRate: number; // percentage
  price: number;
  businessId: string;
  createdAt: Date;
}

export interface Staff {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessId: string;
  serviceIds: string[]; // Can handle multiple services
  nationalId: string; // T.C. Kimlik No
  address: string;
  notes?: string;
  createdAt: Date;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  taxNumber?: string;
  taxOffice?: string;
  companyName?: string;
  city?: string;
  district?: string;
  customerType?: 'corporate' | 'individual';
  website?: string;
  address?: string;
  notes?: string;
  createdAt: Date;
}

export interface Appointment {
  id: string;
  businessId: string;
  serviceId: string;
  staffId: string;
  customerId: string;
  date: Date;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: Date;
}

export type CashType = 'income' | 'expense';

export interface CashTransaction {
  id: string;
  businessId: string;
  type: CashType; // income or expense
  amount: number; // stored as TL amount
  paymentType: 'cash' | 'card' | 'bank' | 'other';
  taxRate: number; // percentage
  company?: string; // counterparty
  documentNo?: string; // invoice/receipt no
  date: Date;
  description?: string;
  createdAt: Date;
}

interface AppContextType {
  // Data
  businesses: Business[];
  services: Service[];
  staff: Staff[];
  customers: Customer[];
  appointments: Appointment[];
  cashTransactions: CashTransaction[];
  
  // UI State
  sidebarOpen: boolean;
  darkMode: boolean;
  
  // Actions
  setSidebarOpen: (open: boolean) => void;
  toggleDarkMode: () => void;
  
  // Business actions
  addBusiness: (business: Omit<Business, 'id' | 'createdAt'>) => void;
  updateBusiness: (id: string, business: Partial<Business>) => void;
  deleteBusiness: (id: string) => void;
  
  // Service actions
  addService: (service: Omit<Service, 'id' | 'createdAt'>) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;
  
  // Staff actions
  addStaff: (staff: Omit<Staff, 'id' | 'createdAt'>) => void;
  updateStaff: (id: string, staff: Partial<Staff>) => void;
  deleteStaff: (id: string) => void;
  
  // Customer actions
  addCustomer: (customer: Omit<Customer, 'id' | 'createdAt'>) => void;
  updateCustomer: (id: string, customer: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
  
  // Appointment actions
  addAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt'>) => void;
  updateAppointment: (id: string, appointment: Partial<Appointment>) => void;
  deleteAppointment: (id: string) => void;

  // Cash actions
  addCashTransaction: (tx: Omit<CashTransaction, 'id' | 'createdAt'>) => void;
  updateCashTransaction: (id: string, tx: Partial<CashTransaction>) => void;
  deleteCashTransaction: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // Data state
  const [businesses, setBusinesses] = useState<Business[]>([
    {
      id: '1',
      name: 'Güzellik Salonu XYZ',
      address: 'Merkez Mah. 123. Sok. No:45 İstanbul',
      phone: '+90 212 555 0123',
      email: 'info@xyzsalon.com',
      city: 'İstanbul',
      district: 'Şişli',
      taxOffice: 'Şişli Vergi Dairesi',
      taxNumber: '1234567890',
      createdAt: new Date('2024-01-15')
    }
  ]);
  
  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      name: 'Saç Kesimi',
      description: 'Profesyonel saç kesimi ve şekillendirme',
      taxRate: 20,
      price: 150,
      businessId: '1',
      createdAt: new Date('2024-01-16')
    },
    {
      id: '2',
      name: 'Makyaj',
      description: 'Özel gün makyajı',
      taxRate: 18,
      price: 250,
      businessId: '1',
      createdAt: new Date('2024-01-16')
    }
  ]);
  
  const [staff, setStaff] = useState<Staff[]>([
    {
      id: '1',
      name: 'Ayşe Yılmaz',
      email: 'ayse@xyzsalon.com',
      phone: '+90 532 123 4567',
      businessId: '1',
      serviceIds: ['1', '2'],
      nationalId: '11111111111',
      address: 'Merkez Mah. Örnek Cad. No:1 İstanbul',
      notes: 'Kıdemli stilist',
      createdAt: new Date('2024-01-17')
    }
  ]);
  
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: '1',
      name: 'Fatma Demir',
      email: 'fatma@email.com',
      phone: '+90 535 987 6543',
      companyName: 'Demo A.Ş.',
      customerType: 'corporate',
      taxNumber: '9999999999',
      taxOffice: 'Beşiktaş',
      city: 'İstanbul',
      district: 'Beşiktaş',
      website: 'https://demo.com',
      address: 'Levazım Mah. Örnek Sok. No:1',
      notes: 'Önemli müşteri',
      createdAt: new Date('2024-01-18')
    }
  ]);
  
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      businessId: '1',
      serviceId: '1',
      staffId: '1',
      customerId: '1',
      date: new Date('2025-01-20T14:00:00'),
      status: 'confirmed',
      notes: 'İlk randevu',
      createdAt: new Date('2024-01-19')
    }
  ]);

  const [cashTransactions, setCashTransactions] = useState<CashTransaction[]>([
    {
      id: 'c1',
      businessId: '1',
      type: 'income',
      amount: 500,
      paymentType: 'card',
      taxRate: 20,
      company: 'Müşteri Ödemesi',
      documentNo: 'FIS-0001',
      date: new Date('2025-01-21'),
      description: 'Hizmet ödemesi',
      createdAt: new Date('2025-01-21')
    },
    {
      id: 'c2',
      businessId: '1',
      type: 'expense',
      amount: 120,
      paymentType: 'bank',
      taxRate: 0,
      company: 'Kırtasiye',
      documentNo: 'GDR-0001',
      date: new Date('2025-01-22'),
      description: 'Ofis malzemeleri',
      createdAt: new Date('2025-01-22')
    }
  ]);
  
  // UI state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  // UI actions
  const toggleDarkMode = () => setDarkMode(!darkMode);
  
  // Helper function to generate IDs
  const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);
  
  // Business actions
  const addBusiness = (business: Omit<Business, 'id' | 'createdAt'>) => {
    setBusinesses(prev => [...prev, {
      ...business,
      id: generateId(),
      createdAt: new Date()
    }]);
  };
  
  const updateBusiness = (id: string, business: Partial<Business>) => {
    setBusinesses(prev => prev.map(b => b.id === id ? { ...b, ...business } : b));
  };
  
  const deleteBusiness = (id: string) => {
    setBusinesses(prev => prev.filter(b => b.id !== id));
    // Also delete related data
    setServices(prev => prev.filter(s => s.businessId !== id));
    setStaff(prev => prev.filter(st => st.businessId !== id));
    setAppointments(prev => prev.filter(a => a.businessId !== id));
    setCashTransactions(prev => prev.filter(t => t.businessId !== id));
  };
  
  // Service actions
  const addService = (service: Omit<Service, 'id' | 'createdAt'>) => {
    setServices(prev => [...prev, {
      ...service,
      id: generateId(),
      createdAt: new Date()
    }]);
  };
  
  const updateService = (id: string, service: Partial<Service>) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...service } : s));
  };
  
  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
    // Remove service from staff
    setStaff(prev => prev.map(st => ({
      ...st,
      serviceIds: st.serviceIds.filter(sid => sid !== id)
    })));
    // Remove appointments for this service
    setAppointments(prev => prev.filter(a => a.serviceId !== id));
  };
  
  // Staff actions
  const addStaff = (staff: Omit<Staff, 'id' | 'createdAt'>) => {
    setStaff(prev => [...prev, {
      ...staff,
      id: generateId(),
      createdAt: new Date()
    }]);
  };
  
  const updateStaff = (id: string, staff: Partial<Staff>) => {
    setStaff(prev => prev.map(st => st.id === id ? { ...st, ...staff } : st));
  };
  
  const deleteStaff = (id: string) => {
    setStaff(prev => prev.filter(st => st.id !== id));
    // Remove appointments for this staff
    setAppointments(prev => prev.filter(a => a.staffId !== id));
  };
  
  // Customer actions
  const addCustomer = (customer: Omit<Customer, 'id' | 'createdAt'>) => {
    setCustomers(prev => [...prev, {
      ...customer,
      id: generateId(),
      createdAt: new Date()
    }]);
  };
  
  const updateCustomer = (id: string, customer: Partial<Customer>) => {
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, ...customer } : c));
  };
  
  const deleteCustomer = (id: string) => {
    setCustomers(prev => prev.filter(c => c.id !== id));
    // Remove appointments for this customer
    setAppointments(prev => prev.filter(a => a.customerId !== id));
  };
  
  // Appointment actions
  const addAppointment = (appointment: Omit<Appointment, 'id' | 'createdAt'>) => {
    setAppointments(prev => [...prev, {
      ...appointment,
      id: generateId(),
      createdAt: new Date()
    }]);
  };
  
  const updateAppointment = (id: string, appointment: Partial<Appointment>) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, ...appointment } : a));
  };
  
  const deleteAppointment = (id: string) => {
    setAppointments(prev => prev.filter(a => a.id !== id));
  };

  // Cash actions
  const addCashTransaction = (tx: Omit<CashTransaction, 'id' | 'createdAt'>) => {
    setCashTransactions(prev => [
      ...prev,
      {
        ...tx,
        id: generateId(),
        createdAt: new Date()
      }
    ]);
  };

  const updateCashTransaction = (id: string, tx: Partial<CashTransaction>) => {
    setCashTransactions(prev => prev.map(t => t.id === id ? { ...t, ...tx } : t));
  };

  const deleteCashTransaction = (id: string) => {
    setCashTransactions(prev => prev.filter(t => t.id !== id));
  };
  
  return (
    <AppContext.Provider value={{
      businesses,
      services,
      staff,
      customers,
      appointments,
      cashTransactions,
      sidebarOpen,
      darkMode,
      setSidebarOpen,
      toggleDarkMode,
      addBusiness,
      updateBusiness,
      deleteBusiness,
      addService,
      updateService,
      deleteService,
      addStaff,
      updateStaff,
      deleteStaff,
      addCustomer,
      updateCustomer,
      deleteCustomer,
      addAppointment,
      updateAppointment,
      deleteAppointment,
      addCashTransaction,
      updateCashTransaction,
      deleteCashTransaction
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}