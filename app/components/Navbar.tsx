  'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  Bell,
  Menu,
  ChevronDown,
  Wifi,
  WifiOff,
  Settings,
  Moon,
  Sun,
  LogOut,
  UserPlus,
  MessageSquare,
  Check
} from 'lucide-react';
import Link from 'next/link';

interface NavbarProps {
  sidebarCollapsed: boolean;
  onMobileMenuToggle: () => void;
}

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  '/dashboard': { title: 'Dashboard', subtitle: 'Welcome back to IdiomaMate' },
  '/find-partner': { title: 'Find Partner', subtitle: 'Match with a native speaker' },
  '/lobbies': { title: 'Lobbies', subtitle: 'Join group conversations' },
  '/friends': { title: 'Friends', subtitle: 'Your language partners' },
  '/messages': { title: 'Messages', subtitle: 'Direct conversations' },
  '/profile': { title: 'Profile', subtitle: 'Manage your account' },
};

export default function Navbar({ sidebarCollapsed, onMobileMenuToggle }: NavbarProps) {
  const pathname = usePathname();
  const [wsConnected, setWsConnected] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Mock Notifications Data
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'friend_request', user: 'Maria G.', message: 'sent you a friend request.', time: '2m ago', read: false },
    { id: 2, type: 'message', user: 'Kenji M.', message: 'sent you a new message: "That sounds great!"', time: '1h ago', read: false },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const currentPage = pageTitles[pathname] || { title: 'IdiomaMate', subtitle: '' };

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/find-partner', label: 'Match' },
    { href: '/lobbies', label: 'Lobbies' },
    { href: '/friends', label: 'Friends' },
    { href: '/messages', label: 'Messages' },
  ];

  // Simulate WebSocket connection status toggle
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate occasional disconnects (10% chance)
      setWsConnected((prev) => (Math.random() > 0.1 ? true : !prev));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Theme toggle logic
  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkTheme]);

  return (
    <header className={`navbar ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="navbar-left flex items-center gap-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg mr-4">
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-black to-gray-800 flex items-center justify-center text-white">
            iM
          </div>
          IdiomaMate
        </Link>
        
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link 
                key={link.href} 
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-black text-white' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="navbar-right">
        {/* WebSocket Status Indicator */}
        <div
          className={`navbar-ws-status ${wsConnected ? 'connected' : 'disconnected'}`}
          id="ws-status-indicator"
        >
          <span className="ws-dot" />
          {wsConnected ? (
            <>
              <Wifi size={14} />
              <span>Connected</span>
            </>
          ) : (
            <>
              <WifiOff size={14} />
              <span>Disconnected</span>
            </>
          )}
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            className="navbar-icon-btn"
            aria-label="Notifications"
            id="notification-bell"
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setSettingsOpen(false);
            }}
          >
            <Bell size={20} />
            {unreadCount > 0 && <span className="notification-dot" />}
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-fadeIn">
              <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-gray-900">Notifications</h3>
                {unreadCount > 0 && (
                  <button 
                    onClick={() => setNotifications(prev => prev.map(n => ({...n, read: true})))}
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 transition-colors"
                  >
                    <Check size={12} /> Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="px-4 py-8 text-center text-gray-500 text-sm">No new notifications</div>
                ) : (
                  notifications.map(notification => (
                    <div 
                      key={notification.id} 
                      onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
                      className={`px-4 py-3 hover:bg-gray-50 flex gap-3 transition-colors cursor-pointer ${!notification.read ? 'bg-blue-50/30' : ''}`}
                    >
                      <div className={`mt-0.5 shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        notification.type === 'friend_request' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {notification.type === 'friend_request' ? <UserPlus size={14} /> : <MessageSquare size={14} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-800 leading-tight">
                          <span className="font-semibold">{notification.user}</span> {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 shrink-0"></div>
                      )}
                    </div>
                  ))
                )}
              </div>
              <div className="border-t border-gray-100 pt-1 mt-1">
                <button className="w-full px-4 py-2 text-sm text-center font-medium text-gray-600 hover:text-black transition-colors">
                  View All Activity
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile & Settings */}
        <div className="relative">
          <button 
            className="navbar-profile flex items-center gap-2" 
            id="user-profile-menu"
            onClick={() => {
              setSettingsOpen(!settingsOpen);
              setNotificationsOpen(false);
            }}
          >
            <div className="navbar-avatar bg-[#E56A45]">
              U
              <span className="online-dot" />
            </div>
            <div className="navbar-profile-info hidden sm:flex">
              <span className="navbar-profile-name">User</span>
            </div>
            <ChevronDown size={14} style={{ color: 'var(--text-tertiary)' }} />
          </button>
          
          {settingsOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50 animate-fadeIn">
              <button 
                onClick={() => setIsDarkTheme(!isDarkTheme)}
                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
              >
                {isDarkTheme ? <Sun size={16} /> : <Moon size={16} />} 
                {isDarkTheme ? 'Light Theme' : 'Dark Theme'}
              </button>
              <Link 
                href="/profile"
                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
              >
                <Settings size={16} /> Settings
              </Link>
              <div className="h-px bg-gray-100 my-1"></div>
              <Link 
                href="/login"
                className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 font-medium"
              >
                <LogOut size={16} /> Log Out
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
