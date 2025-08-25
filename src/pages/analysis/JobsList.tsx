import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Calendar, Users, Target, TrendingUp, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockJobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    description: 'React and TypeScript focused role',
    createdAt: '2024-01-15',
    totalInterviews: 45,
    passRate: 82,
    avgScore: 87,
    avgDuration: 24,
    status: 'Active'
  },
  {
    id: 2,
    title: 'Backend Engineer',
    description: 'Node.js and Python expertise required',
    createdAt: '2024-01-10',
    totalInterviews: 32,
    passRate: 75,
    avgScore: 81,
    avgDuration: 28,
    status: 'Active'
  },
  {
    id: 3,
    title: 'Full Stack Developer',
    description: 'MERN stack with AWS experience',
    createdAt: '2024-01-05',
    totalInterviews: 28,
    passRate: 89,
    avgScore: 92,
    avgDuration: 32,
    status: 'Completed'
  },
  {
    id: 4,
    title: 'Data Scientist',
    description: 'Python, ML, and analytics focus',
    createdAt: '2024-01-03',
    totalInterviews: 15,
    passRate: 93,
    avgScore: 88,
    avgDuration: 35,
    status: 'Active'
  }
];

const analysisData = {
  totalInterviews: 156,
  passRate: 82,
  avgScore: 87,
  avgDuration: 24,
  insights: [
    "Pass rate improved 15% compared to last month.",
    "Top performing role: Data Scientist (Avg Score: 91%).",
    "Interview completion dropped by 8% this week.",
    "JavaScript proficiency increased by 12% across all roles.",
    "Average interview duration decreased to 24 minutes.",
    "Mobile development candidates show 95% completion rate."
  ]
};

const JobsList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [currentInsight, setCurrentInsight] = useState(0);

  // Rotate insights every 3 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInsight((prev) => (prev + 1) % analysisData.insights.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'All' || job.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 text-blue-400" />
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{analysisData.totalInterviews}</div>
              <div className="text-sm text-blue-300">Total Interviews</div>
            </div>
          </div>
          <div className="text-xs text-white/60">This month: +{analysisData.totalInterviews}</div>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 backdrop-blur-xl border border-green-500/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Target className="w-8 h-8 text-green-400" />
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{analysisData.passRate}%</div>
              <div className="text-sm text-green-300">Pass Rate</div>
            </div>
          </div>
          <div className="text-xs text-white/60">
            {analysisData.insights[currentInsight]}
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 text-purple-400" />
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{analysisData.avgScore}%</div>
              <div className="text-sm text-purple-300">Avg Score</div>
            </div>
          </div>
          <div className="text-xs text-white/60">Improved from last month</div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 backdrop-blur-xl border border-yellow-500/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Clock className="w-8 h-8 text-yellow-400" />
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{analysisData.avgDuration}m</div>
              <div className="text-sm text-yellow-300">Avg Duration</div>
            </div>
          </div>
          <div className="text-xs text-white/60">3 mins faster than average</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Jobs Analysis</h2>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
              <Input
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 w-full sm:w-64"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10">
                  <Filter className="w-4 h-4 mr-2" />
                  {selectedFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black/95 backdrop-blur-xl border-white/10">
                <DropdownMenuItem onClick={() => setSelectedFilter('All')} className="text-white hover:bg-white/10">
                  All
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedFilter('Active')} className="text-white hover:bg-white/10">
                  Active
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedFilter('Completed')} className="text-white hover:bg-white/10">
                  Completed
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredJobs.map((job) => (
            <Link
              key={job.id}
              to={`/dashboard/analysis/job/${job.id}`}
              className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-6 transition-all duration-200 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-sm text-white/60 mt-1">{job.description}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  job.status === 'Active' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-gray-500/20 text-gray-400'
                }`}>
                  {job.status}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-white/40">Interviews</div>
                  <div className="text-white font-medium">{job.totalInterviews}</div>
                </div>
                <div>
                  <div className="text-white/40">Pass Rate</div>
                  <div className="text-green-400 font-medium">{job.passRate}%</div>
                </div>
                <div>
                  <div className="text-white/40">Avg Score</div>
                  <div className="text-blue-400 font-medium">{job.avgScore}%</div>
                </div>
                <div>
                  <div className="text-white/40">Duration</div>
                  <div className="text-yellow-400 font-medium">{job.avgDuration}m</div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center text-white/40 text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  Created {new Date(job.createdAt).toLocaleDateString()}
                </div>
                <div className="text-blue-400 text-sm group-hover:text-blue-300 transition-colors">
                  View Details →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-white/60 text-lg mb-2">No jobs found</div>
            <div className="text-white/40 text-sm">Try adjusting your search or filter criteria</div>
          </div>
        )}
      </div>
      </div>
    </DashboardLayout>
  );
};

export default JobsList;