import React from 'react';
import { Users, Edit, Play, Trash2, Clock } from 'lucide-react';

const popularJobs = [
  {
    name: 'Frontend Developer',
    description: 'React, TypeScript, and modern web development',
    interviewsCompleted: 23,
    duration: 45,
    tags: ['React', 'TypeScript', 'JavaScript'],
    status: 'active'
  },
  {
    name: 'Backend Developer',
    description: 'Node.js, databases, and API development',
    interviewsCompleted: 15,
    duration: 60,
    tags: ['Node.js', 'SQL', 'Databases'],
    status: 'active'
  },
  {
    name: 'UI/UX Designer',
    description: 'Design thinking, prototyping, and user research',
    interviewsCompleted: 0,
    duration: 30,
    tags: ['UI', 'UX', 'Figma'],
    status: 'draft'
  }
];

export const PopularJobs = () => {
  return (
    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl">
      <div className="p-8 border-b border-white/10">
        <h3 className="text-xl font-semibold text-white">Popular Jobs</h3>
      </div>
      
      <div className="p-8">
        <div className="space-y-6">
          {popularJobs.map((job, index) => (
            <div key={index} className="border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:bg-white/5 transition-all duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium text-white text-lg">{job.name}</h4>
                    <span className={`px-3 py-1 text-xs rounded-full ${
                      job.status === 'active' 
                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30' 
                        : 'bg-white/10 text-white/60 border border-white/20'
                    }`}>
                      {job.status}
                    </span>
                  </div>
                  <p className="text-sm text-white/60 mb-4">{job.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-3 py-1 bg-white/10 text-white/70 text-xs rounded-full border border-white/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm text-white/50">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {job.interviewsCompleted} interviews completed
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {job.duration} minutes
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl">
                  <Play className="w-3 h-3" />
                  Use Job
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-white/20 text-white/70 hover:text-white hover:bg-white/10 text-sm rounded-xl transition-colors">
                  <Edit className="w-3 h-3" />
                  Edit
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-white/40 hover:text-red-400 hover:bg-red-500/10 text-sm rounded-xl transition-colors">
                  <Trash2 className="w-3 h-3" />
                  Test AI Interview
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 pt-6 border-t border-white/10">
          <button className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors">
            View all jobs →
          </button>
        </div>
      </div>
    </div>
  );
};
