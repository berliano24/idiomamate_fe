'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Search,
  Users,
  UserPlus,
  MessageSquare,
  User,
  ChevronLeft,
  ChevronRight,
  Globe,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const mainNavItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard size={20} />,
  },
  {
    label: 'Find Partner',
    href: '/find-partner',
    icon: <Search size={20} />,
  },
  {
    label: 'Lobbies',
    href: '/lobbies',
    icon: <Globe size={20} />,
  },
];

const socialNavItems: NavItem[] = [
  {
    label: 'Friends',
    href: '/friends',
    icon: <UserPlus size={20} />,
    badge: 3,
  },
  {
    label: 'Messages',
    href: '/messages',
    icon: <MessageSquare size={20} />,
    badge: 5,
  },
];

const accountNavItems: NavItem[] = [
  {
    label: 'Profile',
    href: '/profile',
    icon: <User size={20} />,
  },
];

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname();

  const renderNavItem = (item: NavItem) => {
    const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

    return (
      <Link
        key={item.href}
        href={item.href}
        className={`sidebar-link ${isActive ? 'active' : ''}`}
        onClick={onMobileClose}
        title={collapsed ? item.label : undefined}
      >
        <span className="sidebar-link-icon">{item.icon}</span>
        <span className="sidebar-link-label">{item.label}</span>
        {item.badge && item.badge > 0 && (
          <span className="sidebar-link-badge">{item.badge}</span>
        )}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${mobileOpen ? 'visible' : ''}`}
        onClick={onMobileClose}
      />

      <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">iM</div>
          <span className="sidebar-logo-text">IdiomaMate</span>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <div className="sidebar-section-title">Main</div>
          {mainNavItems.map(renderNavItem)}

          <div className="sidebar-section-title">Social</div>
          {socialNavItems.map(renderNavItem)}

          <div className="sidebar-section-title">Account</div>
          {accountNavItems.map(renderNavItem)}
        </nav>

        {/* Footer toggle */}
        <div className="sidebar-footer">
          <button className="sidebar-toggle" onClick={onToggle}>
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
