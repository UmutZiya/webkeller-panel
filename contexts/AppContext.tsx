'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

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
  roles: Role[];
  // Auth
  users: User[];
  currentUser: User | null;
  
  // UI State
  sidebarOpen: boolean;
  darkMode: boolean;
  
  // Actions
  setSidebarOpen: (open: boolean) => void;
  toggleDarkMode: () => void;
  // Auth actions
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => Promise<boolean>;
  updateUser: (id: string, user: Partial<User>) => Promise<boolean>;
  deleteUser: (id: string) => Promise<boolean>;
  addRole: (role: Omit<Role, 'id' | 'createdAt'>) => Promise<boolean>;
  
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

export interface Role {
  id: string;
  name: string;
  allowedMenus: string[];
  createdAt: Date;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  roleId?: string;
  role?: Role;
  createdAt: Date;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // Data state
  const [businesses, setBusinesses] = useState<Business[]>([]);
  
  const [services, setServices] = useState<Service[]>([]);
  
  const [staff, setStaff] = useState<Staff[]>([]);
  
  const [customers, setCustomers] = useState<Customer[]>([]);
  
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const [cashTransactions, setCashTransactions] = useState<CashTransaction[]>([]);
  
  // Auth state
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  
  // Client-side initialization
  useEffect(() => {
    setMounted(true);
    try {
      const storedCurrentUser = localStorage.getItem('wk_current_user');
      if (storedCurrentUser) {
        setCurrentUser(JSON.parse(storedCurrentUser));
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);
  
  // UI state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  // UI actions
  const toggleDarkMode = () => setDarkMode(!darkMode);
  
  // Helper function to generate IDs
  const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);
  
  // (removed) eager init now handled in useState initializers

  // Load initial data from API
  useEffect(() => {
    if (!mounted) return;
    
    (async () => {
      try {
        const [b, s, st, c, a, ct, u, r] = await Promise.all([
          fetch('/api/businesses'),
          fetch('/api/services'),
          fetch('/api/staff'),
          fetch('/api/customers'),
          fetch('/api/appointments'),
          fetch('/api/cash-transactions'),
          fetch('/api/users'),
          fetch('/api/roles')
        ]);
        setBusinesses(await b.json());
        setServices(await s.json());
        setStaff(await st.json());
        setCustomers(await c.json());
        setAppointments(await a.json());
        setCashTransactions(await ct.json());
        setUsers(await u.json());
        setRoles(await r.json());
      } catch {}
    })();
  }, [mounted]);

  // Auth actions
  const login = async (username: string, password: string) => {
    try {
      const res = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password }) });
      if (!res.ok) return false;
      const data = await res.json();
      if (data.user) {
        setCurrentUser(data.user);
        localStorage.setItem('wk_current_user', JSON.stringify(data.user));
      }
      return true;
    } catch {
      return false;
    }
  };

  const logout = async () => {
    try { await fetch('/api/auth/logout', { method: 'POST' }); } catch {}
    setCurrentUser(null);
    localStorage.removeItem('wk_current_user');
  };

  const addUser = async (user: Omit<User, 'id' | 'createdAt'>) => {
    try {
      const res = await fetch('/api/users', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...user }) });
      if (!res.ok) return false;
      // refresh list locally for UI
      const listRes = await fetch('/api/users');
      const list = await listRes.json();
      setUsers(list);
      return true;
    } catch {
      return false;
    }
  };

  const updateUser = async (id: string, user: Partial<User>) => {
    try {
      const res = await fetch('/api/users', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, ...user }) });
      if (!res.ok) return false;
      const listRes = await fetch('/api/users');
      const list = await listRes.json();
      setUsers(list);
      return true;
    } catch {
      return false;
    }
  };

  const deleteUser = async (id: string) => {
    try {
      const res = await fetch(`/api/users?id=${id}`, { method: 'DELETE' });
      if (!res.ok) return false;
      const listRes = await fetch('/api/users');
      const list = await listRes.json();
      setUsers(list);
      return true;
    } catch {
      return false;
    }
  };

  const addRole = async (role: Omit<Role, 'id' | 'createdAt'>) => {
    try {
      const res = await fetch('/api/roles', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...role }) });
      if (!res.ok) return false;
      const listRes = await fetch('/api/roles');
      const list = await listRes.json();
      setRoles(list);
      return true;
    } catch {
      return false;
    }
  };

  // removed roles related actions
  
  // Business actions
  const addBusiness = async (business: Omit<Business, 'id' | 'createdAt'>) => {
    const res = await fetch('/api/businesses', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(business) });
    if (res.ok) setBusinesses(await (await fetch('/api/businesses')).json());
  };
  
  const updateBusiness = async (id: string, business: Partial<Business>) => {
    await fetch(`/api/businesses/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(business) });
    setBusinesses(await (await fetch('/api/businesses')).json());
  };
  
  const deleteBusiness = async (id: string) => {
    await fetch(`/api/businesses/${id}`, { method: 'DELETE' });
    setBusinesses(await (await fetch('/api/businesses')).json());
  };
  
  // Service actions
  const addService = async (service: Omit<Service, 'id' | 'createdAt'>) => {
    await fetch('/api/services', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(service) });
    setServices(await (await fetch('/api/services')).json());
  };
  
  const updateService = async (id: string, service: Partial<Service>) => {
    await fetch(`/api/services/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(service) });
    setServices(await (await fetch('/api/services')).json());
  };
  
  const deleteService = async (id: string) => {
    await fetch(`/api/services/${id}`, { method: 'DELETE' });
    setServices(await (await fetch('/api/services')).json());
  };
  
  // Staff actions
  const addStaff = async (staff: Omit<Staff, 'id' | 'createdAt'>) => {
    await fetch('/api/staff', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(staff) });
    setStaff(await (await fetch('/api/staff')).json());
  };
  
  const updateStaff = async (id: string, staff: Partial<Staff>) => {
    await fetch(`/api/staff/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(staff) });
    setStaff(await (await fetch('/api/staff')).json());
  };
  
  const deleteStaff = async (id: string) => {
    await fetch(`/api/staff/${id}`, { method: 'DELETE' });
    setStaff(await (await fetch('/api/staff')).json());
  };
  
  // Customer actions
  const addCustomer = async (customer: Omit<Customer, 'id' | 'createdAt'>) => {
    await fetch('/api/customers', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(customer) });
    setCustomers(await (await fetch('/api/customers')).json());
  };
  
  const updateCustomer = async (id: string, customer: Partial<Customer>) => {
    await fetch(`/api/customers/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(customer) });
    setCustomers(await (await fetch('/api/customers')).json());
  };
  
  const deleteCustomer = async (id: string) => {
    await fetch(`/api/customers/${id}`, { method: 'DELETE' });
    setCustomers(await (await fetch('/api/customers')).json());
  };
  
  // Appointment actions
  const addAppointment = async (appointment: Omit<Appointment, 'id' | 'createdAt'>) => {
    await fetch('/api/appointments', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(appointment) });
    setAppointments(await (await fetch('/api/appointments')).json());
  };
  
  const updateAppointment = async (id: string, appointment: Partial<Appointment>) => {
    await fetch(`/api/appointments/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(appointment) });
    setAppointments(await (await fetch('/api/appointments')).json());
  };
  
  const deleteAppointment = async (id: string) => {
    await fetch(`/api/appointments/${id}`, { method: 'DELETE' });
    setAppointments(await (await fetch('/api/appointments')).json());
  };

  // Cash actions
  const addCashTransaction = async (tx: Omit<CashTransaction, 'id' | 'createdAt'>) => {
    await fetch('/api/cash-transactions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(tx) });
    setCashTransactions(await (await fetch('/api/cash-transactions')).json());
  };

  const updateCashTransaction = async (id: string, tx: Partial<CashTransaction>) => {
    await fetch(`/api/cash-transactions/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(tx) });
    setCashTransactions(await (await fetch('/api/cash-transactions')).json());
  };

  const deleteCashTransaction = async (id: string) => {
    await fetch(`/api/cash-transactions/${id}`, { method: 'DELETE' });
    setCashTransactions(await (await fetch('/api/cash-transactions')).json());
  };
  
  return (
    <AppContext.Provider value={{
      businesses,
      services,
      staff,
      customers,
      appointments,
      cashTransactions,
      roles,
      users,
      currentUser,
      sidebarOpen,
      darkMode,
      setSidebarOpen,
      toggleDarkMode,
      login,
      logout,
      addUser,
      updateUser,
      deleteUser,
      addRole,
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