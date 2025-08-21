import React, { ReactNode } from 'react';
import { HorizontalNavbar } from '@/components/dashboard/HorizontalNavbar';

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-black">
      {/* Horizontal Navigation */}
      <HorizontalNavbar />
      
      {/* Main Content */}
      <main className="relative z-10 pt-32">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 py-12">
          {children}
        </div>
      </main>
    </div>
  );
};
