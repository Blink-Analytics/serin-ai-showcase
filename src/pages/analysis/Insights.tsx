import React, { useState, useEffect } from 'react';
import { Lightbulb, TrendingUp, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';

const insightsData = {
  dynamicInsights: [
    "Pass rate improved 15% compared to last month.",
    "Top performing role: Data Scientist (Avg Score: 91%).",
    "Interview completion dropped by 8% this week.",
    "JavaScript proficiency increased by 12% across all roles.",
    "Average interview duration decreased to 24 minutes.",
    "Mobile development candidates show 95% completion rate."
  ],
  recommendations: [
    {
      type: 'improvement',
      priority: 'high',
      title: 'Optimize Interview Duration',
      description: 'Consider reducing interview time for screening rounds to improve candidate experience.',
      impact: 'Could increase completion rate by 12%',
      action: 'Review current screening process'
    },
    {
      type: 'success',
      priority: 'medium',
      title: 'Strong Technical Performance',
      description: 'Candidates are showing excellent problem-solving skills in technical assessments.',
      impact: 'Technical pass rate: 89%',
      action: 'Maintain current technical standards'
    },
    {
      type: 'warning',
      priority: 'high',
      title: 'Communication Skills Gap',
      description: 'Several candidates struggle with explaining their thought process clearly.',
      impact: 'Affects 23% of candidates',
      action: 'Add communication-focused questions'
    }
  ],
  trendAnalysis: [
    {
      metric: 'Candidate Quality',
      trend: 'up',
      change: '+18%',
      description: 'Overall candidate quality has improved significantly',
      timeframe: 'Last 3 months'
    },
    {
      metric: 'Interview Efficiency',
      trend: 'up',
      change: '+8%',
      description: 'Time to complete interviews has decreased',
      timeframe: 'Last month'
    },
    {
      metric: 'Drop-off Rate',
      trend: 'down',
      change: '-12%',
      description: 'Fewer candidates abandoning interviews mid-way',
      timeframe: 'Last 6 weeks'
    }
  ],
  roleInsights: [
    {
      role: 'Frontend Developer',
      strength: 'React proficiency',
      weakness: 'CSS architecture',
      recommendation: 'Add more CSS-focused questions'
    },
    {
      role: 'Backend Developer',
      strength: 'System design',
      weakness: 'Database optimization',
      recommendation: 'Include database performance scenarios'
    },
    {
      role: 'Data Scientist',
      strength: 'Mathematical reasoning',
      weakness: 'Code implementation',
      recommendation: 'Balance theory with practical coding'
    }
  ]
};

const Insights = () => {
  const [currentInsight, setCurrentInsight] = useState(0);

  // Rotate insights every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInsight((prev) => (prev + 1) % insightsData.dynamicInsights.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      {/* Dynamic Insights Banner */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Lightbulb className="w-6 h-6 text-yellow-400" />
          <h3 className="text-lg font-semibold text-white">Latest Insights</h3>
        </div>
        <div className="text-white/90 text-lg font-medium min-h-[1.5rem] transition-opacity duration-300">
          {insightsData.dynamicInsights[currentInsight]}
        </div>
        <div className="flex gap-2 mt-4">
          {insightsData.dynamicInsights.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentInsight ? 'bg-blue-400' : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-6">AI-Powered Recommendations</h3>
        <div className="space-y-4">
          {insightsData.recommendations.map((rec, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border-l-4 ${
                rec.type === 'improvement' ? 'bg-blue-500/10 border-l-blue-500' :
                rec.type === 'success' ? 'bg-green-500/10 border-l-green-500' :
                'bg-yellow-500/10 border-l-yellow-500'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {rec.type === 'improvement' ? (
                      <TrendingUp className="w-4 h-4 text-blue-400" />
                    ) : rec.type === 'success' ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-yellow-400" />
                    )}
                    <h4 className="font-medium text-white">{rec.title}</h4>
                    <div className={`px-2 py-1 rounded-full text-xs ${
                      rec.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {rec.priority} priority
                    </div>
                  </div>
                  <p className="text-white/70 text-sm mb-2">{rec.description}</p>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-white/50">Impact: {rec.impact}</span>
                    <div className="flex items-center gap-1 text-blue-400">
                      <span>{rec.action}</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trend Analysis */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Trend Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {insightsData.trendAnalysis.map((trend, index) => (
            <div key={index} className="p-4 bg-white/5 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-white">{trend.metric}</h4>
                <div className={`flex items-center gap-1 ${
                  trend.trend === 'up' ? 'text-green-400' : 'text-red-400'
                }`}>
                  <TrendingUp className={`w-4 h-4 ${
                    trend.trend === 'down' ? 'rotate-180' : ''
                  }`} />
                  <span className="font-bold">{trend.change}</span>
                </div>
              </div>
              <p className="text-white/70 text-sm mb-2">{trend.description}</p>
              <div className="text-xs text-white/50">{trend.timeframe}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Role-Specific Insights */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Role-Specific Insights</h3>
        <div className="space-y-4">
          {insightsData.roleInsights.map((insight, index) => (
            <div key={index} className="p-4 bg-white/5 rounded-xl border border-white/10">
              <h4 className="font-medium text-white mb-3">{insight.role}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-green-400 font-medium mb-1">Strength</div>
                  <div className="text-white/70">{insight.strength}</div>
                </div>
                <div>
                  <div className="text-yellow-400 font-medium mb-1">Area to Improve</div>
                  <div className="text-white/70">{insight.weakness}</div>
                </div>
                <div>
                  <div className="text-blue-400 font-medium mb-1">Recommendation</div>
                  <div className="text-white/70">{insight.recommendation}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Items */}
      <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Suggested Actions</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-white/80">Review and update frontend developer assessment criteria</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-white/80">Schedule feedback session with recent high-performing candidates</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-white/80">Implement communication skills assessment in initial screening</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;