import AppShell from '../components/AppShell';
import { PartnerProvider } from '../context/PartnerContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PartnerProvider>
      <AppShell>{children}</AppShell>
    </PartnerProvider>
  );
}
