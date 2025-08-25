import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Users, Target, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import Overview from './Overview';
import DetailedScores from './DetailedScores';
import Conversation from './Conversation';
import Insights from './Insights';

// Mock job data - in real app this would come from API
const mockJobData = {
  1: { title: 'Frontend Developer', description: 'React and TypeScript focused role' },
  2: { title: 'Backend Engineer', description: 'Node.js and Python expertise required' },
  3: { title: 'Full Stack Developer', description: 'MERN stack with AWS experience' },
  4: { title: 'Data Scientist', description: 'Python, ML, and analytics focus' }
};

const JobAnalysis = () => {
  const location = useLocation();
  const { jobId } = useParams();
  const [currentInsight, setCurrentInsight] = useState(0);
  
  const jobData = mockJobData[Number(jobId) as keyof typeof mockJobData] || mockJobData[1];
  
  const analysisData = {
    totalInterviews: 45,
    passRate: 82,
    avgScore: 87,
    avgDuration: 24,
    insights: [
      "Pass rate improved 15% compared to last month for this role.",
      "JavaScript proficiency increased by 12% for this position.",
      "Average interview duration decreased to 24 minutes.",
      "Communication scores are above average for this role."
    ]
  };

  // Rotate insights every 3 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInsight((prev) => (prev + 1) % analysisData.insights.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { name: 'Overview', path: `/dashboard/analysis/job/${jobId}/overview`, icon: TrendingUp },
    { name: 'Detailed Scores', path: `/dashboard/analysis/job/${jobId}/scores`, icon: Target },
    { name: 'Conversation', path: `/dashboard/analysis/job/${jobId}/conversation`, icon: Users },
    { name: 'Insights', path: `/dashboard/analysis/job/${jobId}/insights`, icon: Clock },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <Link to="/dashboard/analysis">
          <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Jobs
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">{jobData.title}</h1>
          <p className="text-white/60">{jobData.description}</p>
        </div>
      </div>

      {/* KPI Cards for Selected Job */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 text-blue-400" />
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{analysisData.totalInterviews}</div>
              <div className="text-sm text-blue-300">Total Interviews</div>
            </div>
          </div>
          <div className="text-xs text-white/60">For this job</div>
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
          <div className="text-xs text-white/60">Above average</div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 backdrop-blur-xl border border-yellow-500/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Clock className="w-8 h-8 text-yellow-400" />
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{analysisData.avgDuration}m</div>
              <div className="text-sm text-yellow-300">Avg Duration</div>
            </div>
          </div>
          <div className="text-xs text-white/60">Efficient timing</div>
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
        <Route path="/" element={<Navigate to={`/dashboard/analysis/job/${jobId}/overview`} replace />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/scores" element={<DetailedScores />} />
        <Route path="/conversation" element={<Conversation />} />
        <Route path="/insights" element={<Insights />} />
      </Routes>
      </div>
    </DashboardLayout>
  );
};

export default JobAnalysis;