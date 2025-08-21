import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { TrendingUp, Download, Filter, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const analysisData = {
  totalInterviews: 5,
  passRate: '100%',
  avgScore: 87,
  avgDuration: '24m',
  thisMonth: 156,
  scoreDistribution: [
    { range: '9-10 (Excellent)', percentage: 34, count: 34, color: '#10b981' },
    { range: '7-8 (Good)', percentage: 39, count: 39, color: '#3b82f6' },
    { range: '5-6 (Average)', percentage: 18, count: 18, color: '#f59e0b' },
    { range: 'Below 5', percentage: 9, count: 9, color: '#ef4444' }
  ],
  topSkills: [
    { skill: 'JavaScript', percentage: 85, color: '#3b82f6' },
    { skill: 'React', percentage: 75, color: '#3b82f6' },
    { skill: 'Node.js', percentage: 65, color: '#3b82f6' },
    { skill: 'Python', percentage: 55, color: '#3b82f6' }
  ],
  recentTrends: [
    { text: 'Pass rate increased', change: '+5% from last month', icon: '📈', color: 'text-green-600' },
    { text: 'Avg duration stable', change: '24m consistent', icon: '⏱️', color: 'text-blue-600' }
  ]
};

const Analysis = () => {
  const [selectedRole, setSelectedRole] = useState('All Roles');
  const [dateRange, setDateRange] = useState('This Month');

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Dynamic Header */}
        <PageHeader
          title="Interview Analytics"
          subtitle="Comprehensive performance insights and candidate analysis"
          buttonText="Export Report"
          buttonIcon={<Download className="w-4 h-4" />}
          onButtonClick={() => console.log('Export report')}
        />

        {/* Key Metrics */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">{analysisData.totalInterviews}</div>
              <div className="text-sm text-white/60">Total Interviews</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">{analysisData.passRate}</div>
              <div className="text-sm text-white/60">Pass Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">{analysisData.avgScore}</div>
              <div className="text-sm text-white/60">Avg Score</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-400 mb-2">{analysisData.thisMonth}</div>
              <div className="text-sm text-white/60">This Month</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-white">Filter by Job Role:</span>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
            >
              <option value="All Roles">All Roles</option>
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Backend Developer">Backend Developer</option>
              <option value="UI/UX Designer">UI/UX Designer</option>
            </select>
            <div className="flex items-center gap-2 ml-auto">
              <Calendar className="w-4 h-4 text-white/40" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
              >
                <option value="This Week">This Week</option>
                <option value="This Month">This Month</option>
                <option value="Last 3 Months">Last 3 Months</option>
                <option value="This Year">This Year</option>
              </select>
            </div>
          </div>
        </div>

        {/* Charts and Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Score Distribution */}
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Score Distribution</h3>
            <div className="space-y-4">
              {analysisData.scoreDistribution.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/80">{item.range}</span>
                    <span className="font-medium" style={{ color: item.color }}>
                      {item.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3">
                    <div
                      className="h-3 rounded-full transition-all duration-500"
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: item.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Skills */}
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Top Skills</h3>
            <div className="space-y-4">
              {analysisData.topSkills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/80">{skill.skill}</span>
                    <span className="font-medium" style={{ color: skill.color }}>
                      {skill.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3">
                    <div
                      className="h-3 rounded-full transition-all duration-500"
                      style={{
                        width: `${skill.percentage}%`,
                        backgroundColor: skill.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Trends */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Recent Trends</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysisData.recentTrends.map((trend, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="text-2xl">{trend.icon}</div>
                <div>
                  <div className="font-medium text-white">{trend.text}</div>
                  <div className={`text-sm ${trend.color}`}>{trend.change}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Analytics Table */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl">
          <div className="p-6 border-b border-white/10">
            <h3 className="text-lg font-semibold text-white">Interview Performance Details</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                    Candidate
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr className="hover:bg-white/5">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    Sarah Johnson
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70">
                    Frontend Developer
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-300 border border-green-500/30">
                      85%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70">
                    42 min
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70">
                    Dec 15, 2024
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-300 border border-green-500/30">
                      Passed
                    </span>
                  </td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analysis;
