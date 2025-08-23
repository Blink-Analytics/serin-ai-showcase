import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { TrendingUp, Download, Filter, Calendar, Users, Target, Clock, Award, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const analysisData = {
  totalInterviews: 156,
  passRate: 82,
  avgScore: 87,
  avgDuration: 24,
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

const Analysis = () => {
  const [selectedRole, setSelectedRole] = useState('All Roles');
  const [dateRange, setDateRange] = useState('This Month');
  const [currentInsight, setCurrentInsight] = useState(0);

  // Rotate insights every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInsight((prev) => (prev + 1) % analysisData.insights.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Analysis Tabs */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-2">
          <div className="flex space-x-1">
            <button className="px-4 py-2 bg-white/10 text-white rounded-xl text-sm font-medium">
              Overview
            </button>
            <button className="px-4 py-2 text-white/60 hover:text-white hover:bg-white/5 rounded-xl text-sm font-medium">
              Detailed Scores
            </button>
            <button className="px-4 py-2 text-white/60 hover:text-white hover:bg-white/5 rounded-xl text-sm font-medium">
              Conversation
            </button>
            <button className="px-4 py-2 text-white/60 hover:text-white hover:bg-white/5 rounded-xl text-sm font-medium">
              Insights
            </button>
          </div>
        </div>

        {/* Session Overview - Smaller Header */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-semibold text-white">Session Overview</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-white/60 mb-1">Job Position</div>
              <div className="text-white font-medium">Frontend Developer</div>
            </div>
            <div>
              <div className="text-sm text-white/60 mb-1">Status</div>
              <div className="inline-flex px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                Completed
              </div>
            </div>
            <div>
              <div className="text-sm text-white/60 mb-1">Start Time</div>
              <div className="text-white font-medium">8/23/2025, 11:15:36 AM</div>
            </div>
            <div>
              <div className="text-sm text-white/60 mb-1">Duration</div>
              <div className="text-white font-medium">24 minutes</div>
            </div>
          </div>
        </div>

        {/* Score and Recommendation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Overall Score */}
          <div className="bg-gradient-to-br from-red-500/10 to-red-600/5 backdrop-blur-xl border border-red-500/20 rounded-2xl p-6">
            <div className="text-center">
              <div className="text-6xl font-bold text-red-400 mb-2">
                {Math.floor(analysisData.avgScore / 10)}<span className="text-3xl text-white/40">/10</span>
              </div>
              <div className="text-white/60 mb-4">Overall Score</div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div 
                  className="h-2 bg-red-400 rounded-full transition-all duration-500" 
                  style={{ width: `${analysisData.avgScore}%` }}
                />
              </div>
            </div>
          </div>

          {/* Recommendation */}
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-6 text-red-400">✕</div>
              <h3 className="text-lg font-semibold text-white">Recommendation</h3>
            </div>
            <div className="mb-3">
              <div className="text-red-400 font-medium mb-2">No Hire</div>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              The candidate demonstrated poor communication skills and a lack of preparedness. 
              Their responses were unclear and irrelevant, failing to address the interviewer's 
              questions directly. Their technical competency could not be assessed due to their 
              inability to articulate solutions effectively.
            </p>
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

        {/* Charts and Analysis - Updated */}
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
      </div>
    </DashboardLayout>
  );
};

export default Analysis;
