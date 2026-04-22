'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <Navbar
        sidebarCollapsed={true}
        onMobileMenuToggle={() => setMobileOpen(!mobileOpen)}
      />
      <main className="main-content">
        {children}
      </main>
    </>
  );
}
