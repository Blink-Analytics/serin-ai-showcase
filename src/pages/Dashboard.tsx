import React from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { DashboardMetrics } from '@/components/dashboard/DashboardMetrics';
import { RecentInterviews } from '@/components/dashboard/RecentInterviews';
import { PopularTemplates } from '@/components/dashboard/PopularTemplates';
import { Plus } from 'lucide-react';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-16">
        {/* Dynamic Header */}
        <PageHeader
          title="AI Interview Dashboard"
          subtitle="Manage job templates and analyze candidate performance"
          buttonText="New Template"
          buttonIcon={<Plus className="w-4 h-4" />}
          onButtonClick={() => console.log('Create new template')}
        />

        {/* Metrics */}
        <DashboardMetrics />

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <RecentInterviews />
          <PopularTemplates />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
