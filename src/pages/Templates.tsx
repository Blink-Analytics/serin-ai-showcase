import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
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
    status: 'Active',
    lastModified: '2 days ago'
  },
  {
    id: 2,
    name: 'Backend Developer', 
    description: 'Node.js, databases, and API development',
    duration: 60,
    interviewsCompleted: 15,
    tags: ['Node.js', 'SQL', 'Databases'],
    status: 'Active',
    lastModified: '1 week ago'
  },
  {
    id: 3,
    name: 'UI/UX Designer',
    description: 'Design thinking, prototyping, and user research',
    duration: 30,
    interviewsCompleted: 0,
    tags: ['UI', 'UX', 'Figma'],
    status: 'Draft',
    lastModified: '3 days ago'
  }
];

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Jobs</h1>
          <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/20">
            <Plus className="w-4 h-4 mr-2" />
            New Job
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4">
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
          <Button variant="outline" className="border-white/20 text-white/70 hover:text-white hover:bg-white/10 px-6">
            <Filter className="w-4 h-4 mr-2" />
            All
          </Button>
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
                    <span className={`px-2 py-1 text-xs rounded ${
                      job.status === 'Active' 
                        ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                        : 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
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

              {/* Duration */}
              <div className="text-sm text-white/50 mb-4">
                ⏱️ {job.duration} min
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 mb-3">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Use Job
                </Button>
                <Button size="sm" variant="outline" className="border-white/20 text-white/70 hover:text-white hover:bg-white/10">
                  <Edit className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="outline" className="border-white/20 text-white/70 hover:text-white hover:bg-white/10">
                  <Copy className="w-3 h-3" />
                </Button>
              </div>

              {/* Test AI Interview Button */}
              <Button variant="ghost" size="sm" className="w-full text-white/50 hover:text-white/70 hover:bg-white/5">
                Test AI Interview
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
