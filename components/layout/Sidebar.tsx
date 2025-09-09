'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Building2, 
  Users, 
  Calendar,
  ChevronDown,
  ChevronRight,
  Settings,
  Menu,
  X,
  Briefcase,
  UserPlus,
  List,
  Plus,
  CalendarPlus
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';

interface MenuItem {
  title: string;
  href?: string;
  icon: React.ComponentType<any>;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    title: 'Ana Sayfa',
    href: '/dashboard',
    icon: Home
  },
  {
    title: 'İŞLETMEM',
    icon: Building2,
    children: [
      {
        title: 'İşletmelerim',
        href: '/dashboard/isletmem/isletmelerim',
        icon: Building2
      },
      {
        title: 'Hizmetler',
        href: '/dashboard/isletmem/hizmetler',
        icon: Briefcase
      },
      {
        title: 'Personel Yönetimi',
        href: '/dashboard/isletmem/personel',
        icon: Users
      },
      {
        title: 'Kasa Raporu',
        href: '/dashboard/isletmem/kasa-raporu',
        icon: Calendar
      },
      {
        title: 'Kasa',
        href: '/dashboard/isletmem/kasa',
        icon: List
      }
    ]
  },
  {
    title: 'MÜŞTERİLER',
    icon: Users,
    children: [
      {
        title: 'Müşteri Ekle',
        href: '/dashboard/musteriler/ekle',
        icon: UserPlus
      },
      {
        title: 'Müşteri Listesi',
        href: '/dashboard/musteriler/liste',
        icon: List
      }
    ]
  },
  {
    title: 'RANDEVU',
    icon: Calendar,
    children: [
      {
        title: 'Yeni Randevu',
        href: '/dashboard/randevu/yeni',
        icon: CalendarPlus
      },
      {
        title: 'Randevu Listesi',
        href: '/dashboard/randevu/liste',
        icon: List
      }
    ]
  },
  {
    title: 'KULLANICILAR',
    icon: Users,
    children: [
      {
        title: 'Kullanıcı Yönetimi',
        href: '/dashboard/kullanicilar',
        icon: Users
      }
    ]
  }
];

export function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useApp();
  const [expandedItems, setExpandedItems] = useState<string[]>(['İŞLETMEM']);
  const pathname = usePathname();

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const isExpanded = (title: string) => expandedItems.includes(title);
  const isActive = (href: string) => pathname === href;

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Admin Panel
          </h1>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <div key={item.title}>
            {item.href ? (
              <Link
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group",
                  isActive(item.href)
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5 mr-3 transition-colors",
                  isActive(item.href)
                    ? "text-white"
                    : "text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300"
                )} />
                {item.title}
              </Link>
            ) : (
              <>
                <button
                  onClick={() => toggleExpanded(item.title)}
                  className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-all duration-200 group"
                >
                  <div className="flex items-center">
                    <item.icon className="w-5 h-5 mr-3 text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300" />
                    {item.title}
                  </div>
                  {isExpanded(item.title) ? (
                    <ChevronDown className="w-4 h-4 text-gray-400 transition-transform duration-200" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400 transition-transform duration-200" />
                  )}
                </button>

                {isExpanded(item.title) && item.children && (
                  <div className="ml-4 mt-2 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.title}
                        href={child.href!}
                        onClick={() => setSidebarOpen(false)}
                        className={cn(
                          "flex items-center px-4 py-2.5 text-sm rounded-lg transition-all duration-200 group",
                          isActive(child.href!)
                            ? "bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-blue-600 dark:text-blue-400 border-l-2 border-blue-500"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                        )}
                      >
                        <child.icon className={cn(
                          "w-4 h-4 mr-3 transition-colors",
                          isActive(child.href!)
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300"
                        )} />
                        {child.title}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-all duration-200 w-full group">
          <Settings className="w-5 h-5 mr-3 text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300" />
          Ayarlar
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <SidebarContent />
      </div>
    </>
  );
}