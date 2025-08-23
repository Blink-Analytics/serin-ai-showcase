import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Plus, Search, Filter, Edit, Play, Trash2, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

const jobs = [
  {
    id: 1,
    name: 'Frontend Developer',
    description: 'React, TypeScript, and modern web development',
    duration: 45,
    interviewsCompleted: 23,
    tags: ['React', 'TypeScript', 'JavaScript'],
    status: 'active',
    lastModified: '2 days ago'
  },
  {
    id: 2,
    name: 'Backend Developer', 
    description: 'Node.js, databases, and API development',
    duration: 60,
    interviewsCompleted: 15,
    tags: ['Node.js', 'SQL', 'Databases'],
    status: 'active',
    lastModified: '1 week ago'
  },
  {
    id: 3,
    name: 'UI/UX Designer',
    description: 'Design thinking, prototyping, and user research',
    duration: 30,
    interviewsCompleted: 0,
    tags: ['UI', 'UX', 'Figma'],
    status: 'draft',
    lastModified: '3 days ago'
  }
];

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || job.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Dynamic Header */}
        <PageHeader
          title="Job Roles"
          subtitle="Create and manage AI interview jobs"
          buttonText="Create Job"
          buttonIcon={<Plus className="w-4 h-4" />}
          onButtonClick={() => console.log('Create new job')}
        />

        {/* Filters */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-white/40" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-black/50 hover:border-white/20 transition-all duration-300 hover:shadow-xl">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-white text-lg">{job.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      job.status === 'active' 
                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30' 
                        : 'bg-white/10 text-white/60 border border-white/20'
                    }`}>
                      {job.status}
                    </span>
                  </div>
                  <p className="text-sm text-white/60 mb-3">{job.description}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {job.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-white/10 text-white/70 text-xs rounded border border-white/20">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-white/50 mb-4">
                <div className="flex items-center gap-4">
                  <span>👥 {job.interviewsCompleted} interviews</span>
                  <span>⏱️ {job.duration} min</span>
                </div>
              </div>

              <div className="text-xs text-white/40 mb-4">
                Last modified: {job.lastModified}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white flex-1 shadow-lg hover:shadow-xl transition-all duration-200">
                  <Play className="w-3 h-3 mr-1" />
                  Use Job
                </Button>
                <Button size="sm" variant="outline" className="p-2 border-white/20 text-white/70 hover:text-white hover:bg-white/10">
                  <Edit className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="outline" className="p-2 border-white/20 text-white/70 hover:text-white hover:bg-white/10">
                  <Copy className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="outline" className="p-2 border-white/20 text-red-400 hover:text-red-300 hover:bg-red-500/10">
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>

              {/* Test AI Interview Button */}
              <Button variant="ghost" size="sm" className="w-full mt-2 text-white/50 hover:text-white/70 hover:bg-white/5">
                🧪 Test AI Interview
              </Button>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-16">
            <div className="text-white/20 text-6xl mb-6">📄</div>
            <h3 className="text-xl font-medium text-white mb-3">No jobs found</h3>
            <p className="text-white/60 mb-6 text-lg">
              {searchTerm ? 'Try adjusting your search criteria' : 'Create your first interview job to get started'}
            </p>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
              <Plus className="w-4 h-4 mr-2" />
              Create Job
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Jobs;
