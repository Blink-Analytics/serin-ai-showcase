import React from 'react';
import { MoreHorizontal, Clock } from 'lucide-react';

const recentInterviews = [
  {
    candidateName: 'Sarah Johnson',
    position: 'Frontend Developer',
    score: '85%',
    timeAgo: '2 hours ago',
    status: 'completed'
  },
  {
    candidateName: 'Michael Chen',
    position: 'Backend Developer',
    score: '92%',
    timeAgo: '4 hours ago',
    status: 'completed'
  },
  {
    candidateName: 'Emily Rodriguez',
    position: 'UI/UX Designer',
    score: '78%',
    timeAgo: '1 day ago',
    status: 'completed'
  },
  {
    candidateName: 'David Kim',
    position: 'Full Stack Developer',
    score: '88%',
    timeAgo: '2 days ago',
    status: 'completed'
  }
];

export const RecentInterviews = () => {
  return (
    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl">
      <div className="p-8 border-b border-white/10">
        <h3 className="text-xl font-semibold text-white">Recent Interviews</h3>
      </div>
      
      <div className="p-8">
        <div className="space-y-6">
          {recentInterviews.map((interview, index) => (
            <div key={index} className="flex items-center justify-between p-6 hover:bg-white/5 rounded-2xl transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-400 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-white">
                      {interview.candidateName.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-white text-lg">{interview.candidateName}</h4>
                    <p className="text-sm text-white/60 mt-1">{interview.position}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="font-medium text-white text-lg">{interview.score}</div>
                  <div className="flex items-center gap-1 text-sm text-white/50 mt-1">
                    <Clock className="w-3 h-3" />
                    {interview.timeAgo}
                  </div>
                </div>
                
                <button className="p-2 hover:bg-white/10 rounded-xl">
                  <MoreHorizontal className="w-4 h-4 text-white/40" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 pt-6 border-t border-white/10">
          <button className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors">
            View all interviews →
          </button>
        </div>
      </div>
    </div>
  );
};
