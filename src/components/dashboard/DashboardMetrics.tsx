import React from 'react';
import { TrendingUp, TrendingDown, FileText, Users, Star, BarChart3 } from 'lucide-react';

const metrics = [
  {
    title: 'Active Templates',
    value: '4',
    change: '+2 from last month',
    trend: 'up',
    icon: FileText
  },
  {
    title: 'Total Interviews',
    value: '46',
    change: '+12 this week',
    trend: 'up',
    icon: Users
  },
  {
    title: 'Avg Score',
    value: '85%',
    change: '+3% improvement',
    trend: 'up',
    icon: Star
  },
  {
    title: 'Success Rate',
    value: '72%',
    change: 'Above industry avg',
    trend: 'up',
    icon: BarChart3
  }
];

export const DashboardMetrics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
      {metrics.map((metric, index) => {
        const IconComponent = metric.icon;
        return (
          <div key={index} className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-black/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-white/70 font-medium">{metric.title}</div>
              <div className="w-8 h-8 text-white/80">
                <IconComponent className="w-full h-full" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="text-4xl font-bold text-white">{metric.value}</div>
              <div className="flex items-center gap-2">
                {metric.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-green-400" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-400" />
                )}
                <span className={`text-sm ${
                  metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {metric.change}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
