import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home, 
  FileText, 
  BarChart3, 
  Settings, 
  Users,
  Calendar,
  Bell,
  HelpCircle
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Templates', href: '/dashboard/templates', icon: FileText },
  { name: 'Analysis', href: '/dashboard/analysis', icon: BarChart3 },
  { name: 'Interviews', href: '/dashboard/interviews', icon: Calendar },
  { name: 'Team', href: '/dashboard/team', icon: Users },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

const bottomNavigation = [
  { name: 'Notifications', href: '/dashboard/notifications', icon: Bell },
  { name: 'Help & Support', href: '/dashboard/help', icon: HelpCircle },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-40 hidden lg:block">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#0ea5e9] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">IA</span>
          </div>
          <div>
            <h1 className="font-bold text-gray-900">InterviewAI</h1>
            <p className="text-xs text-gray-500">Smart Interviews</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href || 
            (item.href === '/dashboard' && location.pathname === '/dashboard');
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-[#0ea5e9] text-white"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="px-4 py-4 border-t border-gray-200 space-y-1">
        {bottomNavigation.map((item) => {
          const isActive = location.pathname === item.href;
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-[#0ea5e9] text-white"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
