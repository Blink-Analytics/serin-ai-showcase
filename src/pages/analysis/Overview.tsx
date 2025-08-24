import React, { useState, useEffect } from 'react';
import { TrendingUp, Calendar, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
  ],
  performanceTrend: [
    { period: 'Jan', interviews: 45, completed: 42, avgScore: 78, passRate: 75 },
    { period: 'Feb', interviews: 52, completed: 48, avgScore: 81, passRate: 78 },
    { period: 'Mar', interviews: 67, completed: 61, avgScore: 83, passRate: 80 },
    { period: 'Apr', interviews: 73, completed: 69, avgScore: 85, passRate: 82 },
    { period: 'May', interviews: 89, completed: 84, avgScore: 87, passRate: 84 },
    { period: 'Jun', interviews: 93, completed: 87, avgScore: 89, passRate: 87 }
  ],
  roleBreakdown: [
    { role: 'Frontend Developer', avgScore: 89, passRate: 85, candidates: 45 },
    { role: 'Backend Developer', avgScore: 91, passRate: 88, candidates: 38 },
    { role: 'Data Scientist', avgScore: 93, passRate: 91, candidates: 22 },
    { role: 'UI/UX Designer', avgScore: 86, passRate: 83, candidates: 28 },
    { role: 'DevOps Engineer', avgScore: 88, passRate: 86, candidates: 23 }
  ],
  interviewStages: [
    { stage: 'Screening', completed: 234, passed: 189, passRate: 81 },
    { stage: 'Technical', completed: 189, passed: 156, passRate: 83 },
    { stage: 'Final Round', completed: 156, passed: 128, passRate: 82 }
  ],
  topCandidates: [
    { name: 'Sarah Johnson', score: 95, role: 'Frontend Developer' },
    { name: 'Michael Chen', score: 93, role: 'Data Scientist' },
    { name: 'Emily Rodriguez', score: 91, role: 'Backend Developer' },
    { name: 'David Kim', score: 89, role: 'UI/UX Designer' }
  ],
  currentTasks: [
    { task: 'Pending interview reviews', count: 12, priority: 'high' },
    { task: 'Jobs needing updates', count: 3, priority: 'medium' },
    { task: 'Interviews awaiting feedback', count: 8, priority: 'high' },
    { task: 'Role descriptions to review', count: 5, priority: 'low' }
  ]
};

const Overview = () => {
  const [selectedRole, setSelectedRole] = useState('All Roles');
  const [dateRange, setDateRange] = useState('This Month');

  return (
    <div className="space-y-8">
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
            {analysisData.roleBreakdown.map(role => (
              <option key={role.role} value={role.role}>{role.role}</option>
            ))}
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

      {/* Performance Trend Graph */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Performance Trends</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analysisData.performanceTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis 
                dataKey="period" 
                stroke="#ffffff60"
                fontSize={12}
              />
              <YAxis stroke="#ffffff60" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: 'white'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="interviews" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Interviews Scheduled"
              />
              <Line 
                type="monotone" 
                dataKey="completed" 
                stroke="#10b981" 
                strokeWidth={2}
                name="Interviews Completed"
              />
              <Line 
                type="monotone" 
                dataKey="avgScore" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                name="Average Score"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Segmented Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* By Job Role */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Analysis by Role</h3>
          <div className="space-y-4">
            {analysisData.roleBreakdown.map((role, index) => (
              <div key={index} className="p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="font-medium text-white mb-2">{role.role}</div>
                <div className="flex justify-between text-sm text-white/70 mb-1">
                  <span>Avg Score: {role.avgScore}%</span>
                  <span>Pass Rate: {role.passRate}%</span>
                </div>
                <div className="flex justify-between text-xs text-white/50">
                  <span>{role.candidates} candidates</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* By Interview Stage */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Analysis by Stage</h3>
          <div className="space-y-4">
            {analysisData.interviewStages.map((stage, index) => (
              <div key={index} className="p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="font-medium text-white mb-2">{stage.stage}</div>
                <div className="flex justify-between text-sm text-white/70 mb-2">
                  <span>{stage.passed}/{stage.completed} passed</span>
                  <span>{stage.passRate}% pass rate</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div 
                    className="h-2 bg-green-400 rounded-full transition-all duration-500" 
                    style={{ width: `${stage.passRate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Candidates & Tasks */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Activity Panel</h3>
          
          {/* Top Candidates */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-white/80 mb-3">Top Candidates</h4>
            <div className="space-y-2">
              {analysisData.topCandidates.map((candidate, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-white">{candidate.name}</div>
                    <div className="text-xs text-white/60">{candidate.role}</div>
                  </div>
                  <div className="text-sm font-bold text-green-400">{candidate.score}%</div>
                </div>
              ))}
            </div>
          </div>

          {/* Current Tasks */}
          <div>
            <h4 className="text-sm font-medium text-white/80 mb-3">Tasks in Progress</h4>
            <div className="space-y-2">
              {analysisData.currentTasks.map((task, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertCircle 
                      className={`w-4 h-4 ${
                        task.priority === 'high' ? 'text-red-400' : 
                        task.priority === 'medium' ? 'text-yellow-400' : 'text-gray-400'
                      }`} 
                    />
                    <div className="text-sm text-white">{task.task}</div>
                  </div>
                  <div className="text-sm font-medium text-white/70">{task.count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;