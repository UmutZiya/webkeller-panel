import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { AppProvider } from '@/contexts/AppContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </AppProvider>
  );
}