"use client";
import { useApp } from '@/contexts/AppContext';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  allowedMenus?: string[];
  children: React.ReactNode;
}

export default function ProtectedRoute({ allowedMenus, children }: ProtectedRouteProps) {
  const { currentUser } = useApp();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) return;
    if (!allowedMenus || allowedMenus.length === 0) {
      router.replace('/dashboard');
      return;
    }
    
    // Ayarlar ve Websitem sayfaları herkes için erişilebilir olmalı
    if (pathname === '/dashboard/ayarlar' || pathname === '/dashboard/websitem') {
      return;
    }
    
    // Ana sayfa hariç, yetkisi yoksa yönlendir
    if (pathname !== '/dashboard') {
      // /dashboard/alt1/alt2 gibi path'lerde hem ana hem alt segmentleri kontrol et
      const segments = pathname.split('/').filter(Boolean); // örn: ['dashboard','musteriler','ekle']
      // dashboard sonrası segmentlerden herhangi biri allowedMenus'da varsa izin ver
      const menuIds = segments.slice(1); // ilk segment 'dashboard', sonrası menü id'leri olabilir
      const hasAccess = menuIds.some(seg => allowedMenus.includes(seg)) || allowedMenus.includes(segments[1]);
      if (!hasAccess) {
        router.replace('/dashboard');
      }
    }
  }, [currentUser, allowedMenus, pathname, router]);

  return <>{children}</>;
}
