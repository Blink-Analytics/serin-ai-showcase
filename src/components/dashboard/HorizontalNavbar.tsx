import React, { useState } from 'react';
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
  HelpCircle,
  Search,
  User,
  ChevronDown,
  LogOut
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OrganizationSelector } from "@/components/OrganizationSelector";

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Templates', href: '/dashboard/templates', icon: FileText },
  { name: 'Analysis', href: '/dashboard/analysis', icon: BarChart3 },
  { name: 'Interviews', href: '/dashboard/interviews', icon: Calendar },
];

export const HorizontalNavbar = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-5xl">
      <nav className="bg-black/90 backdrop-blur-xl border border-gray-700 rounded-full px-4 py-2 shadow-2xl">
        <div className="flex items-center justify-between w-full">
          {/* Left: Organization Selector */}
          <div className="flex items-center">
            <OrganizationSelector />
          </div>

          {/* Center: Navigation Items */}
          <div className="flex items-center space-x-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href || 
              (item.href === '/dashboard' && location.pathname === '/dashboard');
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                  isActive
                    ? "text-white bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-blue-500/30 backdrop-blur-md border border-white/30 shadow-inner shadow-blue-500/20"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                )}
              >
                <item.icon className="w-4 h-4" />
                <span className="hidden sm:block">{item.name}</span>
                
                {/* Active indicator glow */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-full" />
                )}
              </Link>
            );
          })}
          </div>

          {/* Right: Search Bar */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search templates, interviews..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10 pr-4 py-2 bg-black/50 border-gray-600 text-white placeholder-gray-400 focus:border-gray-400 rounded-full text-sm"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* User Actions - positioned to the right */}
      <div className="absolute top-0 right-0 transform translate-x-full ml-4 flex items-center gap-3">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative bg-black/90 backdrop-blur-xl border border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 rounded-full w-12 h-12 shadow-2xl"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-black/95 backdrop-blur-xl border-gray-700 text-white shadow-2xl">
            <DropdownMenuLabel className="text-gray-300">Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-700" />
            <DropdownMenuItem className="hover:bg-gray-800 focus:bg-gray-800">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium text-white">New interview completed</p>
                <p className="text-xs text-gray-400">Sarah Johnson finished the Frontend Developer assessment</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-800 focus:bg-gray-800">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium text-white">Template updated</p>
                <p className="text-xs text-gray-400">React Developer template has been modified</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-800 focus:bg-gray-800">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium text-white">System maintenance</p>
                <p className="text-xs text-gray-400">Scheduled maintenance tonight at 2 AM</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="bg-black/90 backdrop-blur-xl border border-gray-700 hover:bg-gray-800 rounded-full w-12 h-12 shadow-2xl"
            >
              <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                <User className="w-3 h-3 text-white" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-black/95 backdrop-blur-xl border-gray-700 text-white shadow-2xl">
            <DropdownMenuLabel className="text-gray-300">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-700" />
            <DropdownMenuItem className="text-white hover:bg-gray-800 focus:bg-gray-800">
              <User className="w-4 h-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="text-white hover:bg-gray-800 focus:bg-gray-800">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="text-white hover:bg-gray-800 focus:bg-gray-800">
              <HelpCircle className="w-4 h-4 mr-2" />
              Help
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-700" />
            <DropdownMenuItem className="text-red-400 hover:bg-gray-800 focus:bg-gray-800">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
