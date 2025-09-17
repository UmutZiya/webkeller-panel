import { DashboardLayout } from '@/components/layout/DashboardLayout';
import React from 'react';
import AuthGuard from '@/components/layout/auth/AuthGuard';
import DashboardClientWrapper from '@/components/layout/DashboardClientWrapper';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout>
      <AuthGuard>
        <DashboardClientWrapper>
          {children}
        </DashboardClientWrapper>
      </AuthGuard>
    </DashboardLayout>
  );
}