
'use client';
import Image from 'next/image';

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
  CalendarPlus,
  Sparkles
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';


interface MenuItem {
  id: string;
  title: string;
  href?: string;
  icon: React.ComponentType<any>;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    title: 'Ana Sayfa',
    href: '/dashboard',
    icon: Home
  },
  {
    id: 'isletmem',
    title: 'İŞLETMEM',
    icon: Building2,
    children: [
      {
        id: 'isletmelerim',
        title: 'İşletmelerim',
        href: '/dashboard/isletmem/isletmelerim',
        icon: Building2
      },
      {
        id: 'hizmetler',
        title: 'Hizmetler',
        href: '/dashboard/isletmem/hizmetler',
        icon: Briefcase
      },
      {
        id: 'personel',
        title: 'Personel Yönetimi',
        href: '/dashboard/isletmem/personel',
        icon: Users
      },
      {
        id: 'kasa-raporu',
        title: 'Kasa Raporu',
        href: '/dashboard/isletmem/kasa-raporu',
        icon: Calendar
      },
      {
        id: 'kasa',
        title: 'Kasa',
        href: '/dashboard/isletmem/kasa',
        icon: List
      }
    ]
  },
  {
    id: 'musteriler',
    title: 'MÜŞTERİLER',
    icon: Users,
    children: [
      {
        id: 'musteri-ekle',
        title: 'Müşteri Ekle',
        href: '/dashboard/musteriler/ekle',
        icon: UserPlus
      },
      {
        id: 'musteri-liste',
        title: 'Müşteri Listesi',
        href: '/dashboard/musteriler/liste',
        icon: List
      }
    ]
  },
  {
    id: 'randevu',
    title: 'RANDEVU',
    icon: Calendar,
    children: [
      {
        id: 'randevu-yeni',
        title: 'Yeni Randevu',
        href: '/dashboard/randevu/yeni',
        icon: CalendarPlus
      },
      {
        id: 'randevu-liste',
        title: 'Randevu Listesi',
        href: '/dashboard/randevu/liste',
        icon: List
      }
    ]
  },
  {
    id: 'kullanicilar',
    title: 'KULLANICILAR',
    icon: Users,
    children: [
      {
        id: 'kullanici-yonetimi',
        title: 'Kullanıcı Yönetimi',
        href: '/dashboard/kullanicilar',
        icon: Users
      }
    ]
  }
];

export function Sidebar() {
  const { sidebarOpen, setSidebarOpen, currentUser } = useApp();
  // Client-side rendering için state kullan
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  // allowedMenus'da alt menü varsa ana menü expanded olmalı
  const allowedMenus = currentUser?.role?.allowedMenus || [];
  const getDefaultExpanded = () => {
    if (!mounted) return [];
    return menuItems
      .filter(item =>
        item.children &&
        item.children.some(child => allowedMenus.includes(child.id))
      )
      .map(item => item.title);
  };
  const [expandedItems, setExpandedItems] = useState<string[]>(getDefaultExpanded());
  // allowedMenus değişirse expandedItems güncellensin
  React.useEffect(() => {
    setExpandedItems(getDefaultExpanded());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(allowedMenus), mounted]);
  const pathname = usePathname();

  // Kullanıcının rolüne göre menüleri filtrele
  const filterMenusByRole = (items: MenuItem[]): MenuItem[] => {
    if (!mounted) return items;
    if (!currentUser?.role?.allowedMenus || currentUser.role.allowedMenus.length === 0) {
      return [];
    }
    const allowedMenus = currentUser.role.allowedMenus;
    return items
      .map(item => {
        // Ana menü veya alt menü allowedMenus'da varsa göster
        if (allowedMenus.includes(item.id)) {
          if (item.children) {
            // Alt menüleri de allowedMenus ile filtrele
            const filteredChildren = item.children.filter(child => allowedMenus.includes(child.id));
            return { ...item, children: filteredChildren };
          }
          return item;
        } else if (item.children) {
          // Ana menü allowedMenus'da yoksa ama alt menülerden biri varsa, sadece o alt menüleri göster
          const filteredChildren = item.children.filter(child => allowedMenus.includes(child.id));
          if (filteredChildren.length > 0) {
            return { ...item, children: filteredChildren };
          }
        }
        return null;
      })
      .filter(Boolean) as MenuItem[];
  };

  const filteredMenuItems = filterMenusByRole(menuItems);

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
      <div className="relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 dark:from-slate-800 dark:via-slate-700 dark:to-slate-600"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="relative flex items-center justify-between p-6">
          <div className="flex-1 flex justify-center">
            <div className="group cursor-pointer">
              {/* Logo Container */}
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-white/20 dark:bg-white/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                
                {/* Main Logo Container */}
                <div className="relative bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/30 dark:border-slate-600/30 p-6 transition-all duration-300 group-hover:scale-105 group-hover:shadow-3xl">
                  {/* Inner Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-400/5 dark:to-purple-400/5 rounded-2xl"></div>
                  
                  {/* Logo Images */}
                  <div className="relative z-10">
                    {/* Aydınlık mod logosu */}
                    <Image
                      src="/maviwebkeller.png"
                      alt="WebKeller Logo"
                      width={200}
                      height={70}
                      className="object-contain block dark:hidden mx-auto transition-all duration-300 group-hover:brightness-110"
                      priority
                    />
                    {/* Karanlık mod logosu */}
                    <Image
                      src="/beyazwebkeller.png"
                      alt="WebKeller Logo"
                      width={200}
                      height={70}
                      className="object-contain hidden dark:block mx-auto transition-all duration-300 group-hover:brightness-110"
                      priority
                    />
                  </div>
                  
                  {/* Decorative Corner Elements */}
                  <div className="absolute top-2 right-2 w-2 h-2 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-60"></div>
                  <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-40"></div>
                </div>
                
                {/* Subtitle */}
                <div className="mt-3 text-center">
                  <p className="text-xs font-medium text-white/80 dark:text-slate-300 tracking-wider uppercase">
                    Yönetim Paneli
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Close Button */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden absolute top-4 right-4 p-2 rounded-xl bg-white/20 hover:bg-white/30 dark:bg-slate-700/50 dark:hover:bg-slate-600/50 backdrop-blur-sm border border-white/20 dark:border-slate-600/30 transition-all duration-200 group"
          >
            <X className="w-5 h-5 text-white dark:text-slate-300 group-hover:rotate-90 transition-transform duration-200" />
          </button>
        </div>
        
        {/* Bottom Border with Gradient */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent dark:via-slate-500/30"></div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {filteredMenuItems.map((item) => (
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