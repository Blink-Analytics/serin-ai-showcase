import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { ArrowLeft, Search, Filter, Calendar, Clock, Play, Eye, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Mock job data
const jobsData = [
  {
    id: 1,
    name: 'Frontend Developer',
    description: 'React and TypeScript focused role',
  },
  {
    id: 2,
    name: 'Backend Developer', 
    description: 'Node.js, databases, and API development',
  },
];

// Mock candidates data with updated structure
const candidatesData = [
  {
    id: 1,
    name: 'Sarah Johnson',
    position: 'Frontend Developer',
    avatar: 'SJ',
    scheduled: '2024-01-16\n10:00 AM',
    duration: 'compl\neted',
    status: 'completed',
    score: 85,
    actions: 'View Report'
  },
  {
    id: 2,
    name: 'Michael Chen',
    position: 'Backend Developer',
    avatar: 'MC',
    scheduled: '2024-01-16\n2:00 PM',
    duration: '60\nmin',
    status: 'scheduled',
    score: null,
    actions: 'Start'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    position: 'UI/UX Designer',
    avatar: 'ER',
    scheduled: '2024-01-15\n3:30 PM',
    duration: '30\nmin',
    status: 'in_progress',
    score: null,
    actions: 'Monitor'
  },
  {
    id: 4,
    name: 'Sarah Johnson',
    position: 'Frontend Developer',
    avatar: 'SJ',
    scheduled: '2024-01-15\n10:00 AM',
    duration: '45\nmin',
    status: 'completed',
    score: 85,
    actions: 'View Report'
  },
  {
    id: 5,
    name: 'Michael Chen',
    position: 'Backend Developer',
    avatar: 'MC',
    scheduled: '2024-01-16\n2:00 PM',
    duration: '60\nmin',
    status: 'scheduled',
    score: null,
    actions: 'Start'
  },
  {
    id: 6,
    name: 'Emily Rodriguez',
    position: 'UI/UX Designer',
    avatar: 'ER',
    scheduled: '2024-01-15\n3:30 PM',
    duration: '30\nmin',
    status: 'in_progress',
    score: null,
    actions: 'Monitor'
  }
];

const JobDetails = () => {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const job = jobsData.find(j => j.id === parseInt(id || '')) || jobsData[0];
  
  const filteredCandidates = candidatesData.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || candidate.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="px-2 py-1 text-xs rounded-md bg-green-500/20 text-green-300 border border-green-500/30">completed</span>;
      case 'scheduled':
        return <span className="px-2 py-1 text-xs rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30">scheduled</span>;
      case 'in_progress':
        return <span className="px-2 py-1 text-xs rounded-md bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">in progress</span>;
      default:
        return <span className="px-2 py-1 text-xs rounded-md bg-gray-500/20 text-gray-300 border border-gray-500/30">{status}</span>;
    }
  };

  const getActionButton = (candidate: any) => {
    switch (candidate.actions) {
      case 'View Report':
        return (
          <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10 text-xs">
            <Eye className="w-3 h-3 mr-1" />
            View Report
          </Button>
        );
      case 'Start':
        return (
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs">
            <Play className="w-3 h-3 mr-1" />
            Start
          </Button>
        );
      case 'Monitor':
        return (
          <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white text-xs">
            <Eye className="w-3 h-3 mr-1" />
            Monitor
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard/templates">
              <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Jobs
              </Button>
            </Link>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Interview
          </Button>
        </div>

        {/* Job Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-white mb-2">{job.name}</h1>
            <p className="text-lg text-white/70">{job.description}</p>
          </div>
          
          {/* Job Info Panel */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Job Details</h3>
              <Button variant="outline" size="sm" className="border-white/20 text-white/70 hover:text-white hover:bg-white/10">
                Edit Job
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-white/60 block mb-1">Position</label>
                <p className="text-white font-medium">{job.name}</p>
              </div>
              
              <div>
                <label className="text-sm text-white/60 block mb-1">Description</label>
                <p className="text-white/80 text-sm">{job.description}</p>
              </div>
              
              <div>
                <label className="text-sm text-white/60 block mb-1">Interview Duration</label>
                <p className="text-white font-medium">45 minutes</p>
              </div>
              
              <div>
                <label className="text-sm text-white/60 block mb-1">Status</label>
                <span className="px-3 py-1 text-sm rounded-md bg-green-500/20 text-green-300 border border-green-500/30">
                  Active
                </span>
              </div>
              
              <div>
                <label className="text-sm text-white/60 block mb-1">Created</label>
                <p className="text-white/80 text-sm">January 10, 2024</p>
              </div>
              
              <div>
                <label className="text-sm text-white/60 block mb-1">Total Candidates</label>
                <p className="text-white font-medium">{candidatesData.length}</p>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/10">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule New Interview
              </Button>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search candidates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
          >
            <option value="All">All</option>
            <option value="completed">Completed</option>
            <option value="scheduled">Scheduled</option>
            <option value="in_progress">In Progress</option>
          </select>
        </div>

        {/* Candidates Table */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-white/10">
                <tr className="text-left">
                  <th className="px-6 py-4 text-xs font-medium text-white/60 uppercase tracking-wider">CANDIDATE</th>
                  <th className="px-6 py-4 text-xs font-medium text-white/60 uppercase tracking-wider">POSITION</th>
                  <th className="px-6 py-4 text-xs font-medium text-white/60 uppercase tracking-wider">SCHEDULED</th>
                  <th className="px-6 py-4 text-xs font-medium text-white/60 uppercase tracking-wider">DURATION</th>
                  <th className="px-6 py-4 text-xs font-medium text-white/60 uppercase tracking-wider">STATUS</th>
                  <th className="px-6 py-4 text-xs font-medium text-white/60 uppercase tracking-wider">SCORE</th>
                  <th className="px-6 py-4 text-xs font-medium text-white/60 uppercase tracking-wider">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredCandidates.map((candidate) => (
                  <tr key={candidate.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-blue-600 text-white text-sm">{candidate.avatar}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-white">{candidate.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-white/70 text-sm">{candidate.position}</td>
                    <td className="px-6 py-4 text-white/70 text-sm whitespace-pre-line">{candidate.scheduled}</td>
                    <td className="px-6 py-4 text-white/70 text-sm whitespace-pre-line">{candidate.duration}</td>
                    <td className="px-6 py-4">{getStatusBadge(candidate.status)}</td>
                    <td className="px-6 py-4">
                      {candidate.score ? (
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium">{candidate.score}%</span>
                          <div className="w-12 h-2 bg-white/20 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-500 rounded-full" 
                              style={{ width: `${candidate.score}%` }}
                            />
                          </div>
                        </div>
                      ) : (
                        <span className="text-white/40">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {getActionButton(candidate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {filteredCandidates.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-white mb-2">No candidates found</h3>
            <p className="text-white/60">
              {searchTerm || statusFilter !== 'All' 
                ? 'Try adjusting your search or filter criteria' 
                : 'No candidates have applied for this position yet'
              }
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default JobDetails;