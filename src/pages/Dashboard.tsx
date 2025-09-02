import React from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Plus, Play, Edit, Trash2 } from 'lucide-react';

const recentInterviews = [
  {
    name: 'Sarah Johnson',
    role: 'Frontend Developer',
    score: '85%',
    timeAgo: '2 hours ago',
    avatar: 'SJ'
  },
  {
    name: 'Michael Chen',
    role: 'Backend Developer', 
    score: '92%',
    timeAgo: '4 hours ago',
    avatar: 'MC'
  },
  {
    name: 'Emily Rodriguez',
    role: 'UI/UX Designer',
    score: '78%',
    timeAgo: '1 day ago',
    avatar: 'ER'
  },
  {
    name: 'David Kim',
    role: 'Full Stack Developer',
    score: '88%',
    timeAgo: '2 days ago',
    avatar: 'DK'
  }
];

const myJobs = [
  {
    name: 'Frontend Developer',
    description: 'React, TypeScript, and modern web development',
    tags: ['React', 'TypeScript', 'JavaScript'],
    duration: '45 minutes',
    status: 'Active'
  },
  {
    name: 'Backend Developer',
    description: 'Node.js, databases, and API development',
    tags: ['Node.js', 'SQL', 'Databases'],
    duration: '60 minutes',
    status: 'Active'
  }
];

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Welcome back, Meet</h1>
              <p className="text-white/70">Step into the future of work with AI</p>
            </div>
            <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/20">
              <Plus className="w-4 h-4 mr-2" />
              New Job
            </Button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Interviews */}
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Recent Interviews</h2>
            <div className="space-y-4">
              {recentInterviews.map((interview, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                    {interview.avatar}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-white">{interview.name}</h3>
                    <p className="text-sm text-white/60">{interview.role}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-white">{interview.score}</div>
                    <div className="text-xs text-white/50">{interview.timeAgo}</div>
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t border-white/10">
                <button className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors">
                  View all interviews →
                </button>
              </div>
            </div>
          </div>

          {/* My Jobs */}
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">My Jobs</h2>
            <div className="space-y-6">
              {myJobs.map((job, index) => (
                <div key={index} className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium text-white">{job.name}</h3>
                    <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded border border-green-500/30">
                      {job.status}
                    </span>
                  </div>
                  <p className="text-sm text-white/60 mb-3">{job.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {job.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-2 py-1 bg-white/10 text-white/70 text-xs rounded border border-white/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/50">{job.duration}</span>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Play className="w-3 h-3 mr-1" />
                        Use Job
                      </Button>
                      <Button size="sm" variant="outline" className="border-white/20 text-white/70 hover:text-white hover:bg-white/10">
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="border-white/20 text-white/70 hover:text-white hover:bg-white/10">
                        Test AI Interview
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t border-white/10">
                <button className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors">
                  View all jobs →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
