import React from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Routes, Route, Navigate } from 'react-router-dom';
import JobsList from './analysis/JobsList';
import JobAnalysis from './analysis/JobAnalysis';

const AnalysisWithTabs = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard/analysis" replace />} />
        <Route index element={<JobsList />} />
        <Route path="/job/:jobId/*" element={<JobAnalysis />} />
      </Routes>
    </DashboardLayout>
  );
};

export default AnalysisWithTabs;