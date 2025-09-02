import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Users, Target, TrendingUp, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock KPI data
const kpiData = {
  totalInterviews: 156,
  passRate: 82,
  avgScore: 87,
  avgDuration: 24
};

// Mock jobs data for analysis
const jobsData = [
  {
    id: 1,
    title: 'Frontend Developer',
    description: 'React and TypeScript focused role',
    interviews: 45,
    passRate: 82,
    avgScore: 87,
    avgDuration: 24,
    status: 'Active',
    updatedDate: '1/15/2024'
  },
  {
    id: 2,
    title: 'Backend Engineer',
    description: 'Node.js and Python expertise required',
    interviews: 32,
    passRate: 76,
    avgScore: 81,
    avgDuration: 28,
    status: 'Active',
    updatedDate: '1/18/2024'
  },
  {
    id: 3,
    title: 'Full Stack Developer',
    description: 'MERN stack with AWS experience',
    interviews: 28,
    passRate: 89,
    avgScore: 92,
    avgDuration: 32,
    status: 'Complete',
    updatedDate: '1/6/2024'
  },
  {
    id: 4,
    title: 'Data Scientist',
    description: 'Python, ML, and analytics focus',
    interviews: 15,
    passRate: 93,
    avgScore: 88,
    avgDuration: 35,
    status: 'Active',
    updatedDate: '1/5/2024'
  }
];

const JobsList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = jobsData.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <Users className="w-8 h-8 text-blue-400" />
            <div className="text-right">
              <div className="text-3xl font-bold text-white">{kpiData.totalInterviews}</div>
              <div className="text-sm text-blue-300">Total Interviews</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 backdrop-blur-xl border border-green-500/20 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <Target className="w-8 h-8 text-green-400" />
            <div className="text-right">
              <div className="text-3xl font-bold text-white">{kpiData.passRate}%</div>
              <div className="text-sm text-green-300">Pass Rate</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <TrendingUp className="w-8 h-8 text-purple-400" />
            <div className="text-right">
              <div className="text-3xl font-bold text-white">{kpiData.avgScore}%</div>
              <div className="text-sm text-purple-300">Avg Score</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 backdrop-blur-xl border border-yellow-500/20 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <Clock className="w-8 h-8 text-yellow-400" />
            <div className="text-right">
              <div className="text-3xl font-bold text-white">{kpiData.avgDuration}m</div>
              <div className="text-sm text-yellow-300">Avg Duration</div>
            </div>
          </div>
        </div>
      </div>

      {/* Jobs Analysis Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Jobs Analysis</h2>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredJobs.map((job) => (
            <Link key={job.id} to={`/dashboard/analysis/job/${job.id}`}>
              <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-black/50 hover:border-white/20 transition-all duration-300 hover:shadow-xl cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white text-lg mb-2">{job.title}</h3>
                    <p className="text-sm text-white/60 mb-4">{job.description}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded ${
                    job.status === 'Active' 
                      ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                      : 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
                  }`}>
                    {job.status}
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-white">{job.interviews}</div>
                    <div className="text-xs text-white/50">Interviews</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-white">{job.passRate}%</div>
                    <div className="text-xs text-white/50">Pass Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-white">{job.avgScore}%</div>
                    <div className="text-xs text-white/50">Avg Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-white">{job.avgDuration}m</div>
                    <div className="text-xs text-white/50">Duration</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-white/40">
                  <span>📅 Updated {job.updatedDate}</span>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                    View Details →
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobsList;