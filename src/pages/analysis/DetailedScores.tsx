import React from 'react';
import { Target, Award, Clock, Users } from 'lucide-react';

const scoreData = {
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
  detailedBreakdown: {
    technical: 87,
    communication: 72,
    problemSolving: 91,
    codeQuality: 85,
    systemDesign: 78
  }
};

const DetailedScores = () => {
  return (
    <div className="space-y-8">
      {/* Detailed Score Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skills Assessment */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Skills Assessment</h3>
          </div>
          
          <div className="space-y-4">
            {Object.entries(scoreData.detailedBreakdown).map(([skill, score], index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white/80 capitalize">{skill.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="text-white font-medium">{score}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3">
                  <div
                    className="h-3 rounded-full transition-all duration-500 bg-gradient-to-r from-blue-500 to-purple-500"
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Overall Performance */}
        <div className="bg-gradient-to-br from-purple-500/10 to-blue-600/5 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6">
          <div className="text-center">
            <div className="text-6xl font-bold text-purple-400 mb-2">
              8<span className="text-3xl text-white/40">/10</span>
            </div>
            <div className="text-white/60 mb-4">Overall Performance</div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <div className="text-white/60">Strengths</div>
                <div className="text-green-400 font-medium">Problem Solving</div>
              </div>
              <div className="text-center">
                <div className="text-white/60">Areas to Improve</div>
                <div className="text-yellow-400 font-medium">Communication</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Score Distribution & Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score Distribution */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-5 h-5 text-green-400" />
            <h3 className="text-lg font-semibold text-white">Score Distribution</h3>
          </div>
          <div className="space-y-4">
            {scoreData.scoreDistribution.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/80">{item.range}</span>
                  <span className="font-medium" style={{ color: item.color }}>
                    {item.percentage}% ({item.count} candidates)
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

        {/* Top Skills Performance */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Top Skills Performance</h3>
          </div>
          <div className="space-y-4">
            {scoreData.topSkills.map((skill, index) => (
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

      {/* Detailed Performance Metrics */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Clock className="w-5 h-5 text-yellow-400" />
          <h3 className="text-lg font-semibold text-white">Performance Metrics</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">24</div>
            <div className="text-sm text-white/60">Minutes Average</div>
            <div className="text-xs text-white/40">Interview Duration</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">85%</div>
            <div className="text-sm text-white/60">Success Rate</div>
            <div className="text-xs text-white/40">Problem Completion</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400 mb-1">3.2</div>
            <div className="text-sm text-white/60">Average Rating</div>
            <div className="text-xs text-white/40">Code Quality (4.0 scale)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400 mb-1">72%</div>
            <div className="text-sm text-white/60">Communication</div>
            <div className="text-xs text-white/40">Clarity & Articulation</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedScores;