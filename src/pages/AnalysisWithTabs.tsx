import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { TrendingUp, Users, Target, Clock } from 'lucide-react';
import Overview from './analysis/Overview';
import DetailedScores from './analysis/DetailedScores';
import Conversation from './analysis/Conversation';
import Insights from './analysis/Insights';

const analysisData = {
  totalInterviews: 156,
  passRate: 82,
  avgScore: 87,
  avgDuration: 24,
  insights: [
    "Pass rate improved 15% compared to last month.",
    "Top performing role: Data Scientist (Avg Score: 91%).",
    "Interview completion dropped by 8% this week.",
    "JavaScript proficiency increased by 12% across all roles.",
    "Average interview duration decreased to 24 minutes.",
    "Mobile development candidates show 95% completion rate."
  ]
};

const AnalysisWithTabs = () => {
  const location = useLocation();
  const [currentInsight, setCurrentInsight] = useState(0);
  
  // Rotate insights every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInsight((prev) => (prev + 1) % analysisData.insights.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { name: 'Overview', path: '/dashboard/analysis/overview', icon: TrendingUp },
    { name: 'Detailed Scores', path: '/dashboard/analysis/scores', icon: Target },
    { name: 'Conversation', path: '/dashboard/analysis/conversation', icon: Users },
    { name: 'Insights', path: '/dashboard/analysis/insights', icon: Clock },
  ];

  const getActiveTab = () => {
    const currentPath = location.pathname;
    return tabs.find(tab => currentPath.includes(tab.path.split('/').pop() || ''))?.path || tabs[0].path;
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-blue-400" />
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{analysisData.totalInterviews}</div>
                <div className="text-sm text-blue-300">Total Interviews</div>
              </div>
            </div>
            <div className="text-xs text-white/60">This month: +{analysisData.totalInterviews}</div>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 backdrop-blur-xl border border-green-500/20 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Target className="w-8 h-8 text-green-400" />
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{analysisData.passRate}%</div>
                <div className="text-sm text-green-300">Pass Rate</div>
              </div>
            </div>
            <div className="text-xs text-white/60">
              {analysisData.insights[currentInsight]}
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-purple-400" />
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{analysisData.avgScore}%</div>
                <div className="text-sm text-purple-300">Avg Score</div>
              </div>
            </div>
            <div className="text-xs text-white/60">Improved from last month</div>
          </div>

          <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 backdrop-blur-xl border border-yellow-500/20 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 text-yellow-400" />
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{analysisData.avgDuration}m</div>
                <div className="text-sm text-yellow-300">Avg Duration</div>
              </div>
            </div>
            <div className="text-xs text-white/60">3 mins faster than average</div>
          </div>
        </div>

        {/* Secondary Navigation Tabs */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-2">
          <div className="flex space-x-1">
            {tabs.map((tab) => {
              const isActive = location.pathname.includes(tab.path.split('/').pop() || '');
              return (
                <Link
                  key={tab.name}
                  to={tab.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard/analysis/overview" replace />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/scores" element={<DetailedScores />} />
          <Route path="/conversation" element={<Conversation />} />
          <Route path="/insights" element={<Insights />} />
        </Routes>
      </div>
    </DashboardLayout>
  );
};

export default AnalysisWithTabs;