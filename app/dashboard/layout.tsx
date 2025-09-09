import { DashboardLayout } from '@/components/layout/DashboardLayout';
import React from 'react';
import AuthGuard from '@/components/layout/auth/AuthGuard';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout>
      <AuthGuard>
        {children}
      </AuthGuard>
    </DashboardLayout>
  );
}