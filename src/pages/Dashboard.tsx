import React from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { DashboardMetrics } from '@/components/dashboard/DashboardMetrics';
import { RecentInterviews } from '@/components/dashboard/RecentInterviews';
import { PopularJobs } from '@/components/dashboard/PopularJobs';
import { Plus } from 'lucide-react';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-16">
        {/* Dynamic Header */}
        <PageHeader
          title="AI Interview Dashboard"
          subtitle="Here's an overview of your hiring performance this week"
          buttonText="New Job"
          buttonIcon={<Plus className="w-4 h-4" />}
          onButtonClick={() => console.log('Create new job')}
          organizationName="TechCorp"
          userName="Meet"
          keyInsight="Candidate success rate is up 8% from last month"
        />

        {/* Metrics */}
        <DashboardMetrics />

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <RecentInterviews />
          <PopularJobs />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
