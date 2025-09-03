import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { ArrowLeft, Plus, Search, Filter, Calendar, Mail, Phone, MapPin, Users, Clock, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock job data
const jobsData = [
  {
    id: 1,
    name: 'Frontend Developer',
    description: 'React, TypeScript, and modern web development',
    duration: 45,
    requirements: [
      '3+ years of React experience',
      'Strong TypeScript knowledge',
      'Experience with modern CSS frameworks',
      'Understanding of web performance optimization'
    ],
    tags: ['React', 'TypeScript', 'JavaScript'],
    status: 'Active',
    lastModified: '2 days ago'
  },
  {
    id: 2,
    name: 'Backend Developer', 
    description: 'Node.js, databases, and API development',
    duration: 60,
    requirements: [
      '4+ years of Node.js experience',
      'Strong database design skills',
      'RESTful API development',
      'Experience with microservices'
    ],
    tags: ['Node.js', 'SQL', 'Databases'],
    status: 'Active',
    lastModified: '1 week ago'
  },
  {
    id: 3,
    name: 'UI/UX Designer',
    description: 'Design thinking, prototyping, and user research',
    duration: 30,
    requirements: [
      'Proficiency in Figma/Sketch',
      'User research experience',
      'Prototyping skills',
      'Understanding of design systems'
    ],
    tags: ['UI', 'UX', 'Figma'],
    status: 'Draft',
    lastModified: '3 days ago'
  }
];

// Mock candidates data
const candidatesData = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    experience: '5 years',
    status: 'Applied',
    appliedDate: '2024-01-15',
    score: null
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1 (555) 987-6543',
    location: 'San Francisco, CA',
    experience: '3 years',
    status: 'Interviewed',
    appliedDate: '2024-01-12',
    score: 85
  },
  {
    id: 3,
    name: 'Mike Chen',
    email: 'mike.chen@email.com',
    phone: '+1 (555) 456-7890',
    location: 'Seattle, WA',
    experience: '4 years',
    status: 'Scheduled',
    appliedDate: '2024-01-18',
    score: null
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily.davis@email.com',
    phone: '+1 (555) 321-0987',
    location: 'Austin, TX',
    experience: '6 years',
    status: 'Applied',
    appliedDate: '2024-01-20',
    score: null
  }
];

const JobDetails = () => {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const job = jobsData.find(j => j.id === parseInt(id || ''));
  
  const filteredCandidates = candidatesData.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || candidate.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Applied':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'Scheduled':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'Interviewed':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  if (!job) {
    return (
      <DashboardLayout>
        <div className="text-center py-16">
          <h2 className="text-xl font-medium text-white mb-4">Job not found</h2>
          <Link to="/dashboard/templates">
            <Button>Back to Jobs</Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link to="/dashboard/templates">
            <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Jobs
            </Button>
          </Link>
        </div>

        {/* Job Info Section */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-3xl font-bold text-white">{job.name}</h1>
                <span className={`px-3 py-1 text-sm rounded border ${
                  job.status === 'Active' 
                    ? 'bg-green-500/20 text-green-300 border-green-500/30' 
                    : 'bg-orange-500/20 text-orange-300 border-orange-500/30'
                }`}>
                  {job.status}
                </span>
              </div>
              <p className="text-lg text-white/70 mb-4">{job.description}</p>
            </div>
            <div className="flex gap-3">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Candidate
              </Button>
              <Button variant="outline" className="border-white/20 text-white/70 hover:text-white hover:bg-white/10">
                Edit Job
              </Button>
            </div>
          </div>

          {/* Job Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-blue-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{candidatesData.length}</div>
                  <div className="text-sm text-white/60">Total Candidates</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-green-400" />
                <div>
                  <div className="text-2xl font-bold text-white">{job.duration}min</div>
                  <div className="text-sm text-white/60">Interview Duration</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-purple-400" />
                <div>
                  <div className="text-2xl font-bold text-white">
                    {candidatesData.filter(c => c.status === 'Interviewed').length}
                  </div>
                  <div className="text-sm text-white/60">Completed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {job.requirements.map((req, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-white/70">{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {job.tags.map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-white/10 text-white/70 text-sm rounded-lg border border-white/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Candidates Section */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Candidates</h2>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
            >
              <option value="All">All Status</option>
              <option value="Applied">Applied</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Interviewed">Interviewed</option>
            </select>
          </div>

          {/* Candidates List */}
          <div className="space-y-4">
            {filteredCandidates.map((candidate) => (
              <div key={candidate.id} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="font-semibold text-white text-lg">{candidate.name}</h3>
                      <span className={`px-2 py-1 text-xs rounded border ${getStatusColor(candidate.status)}`}>
                        {candidate.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-white/60">
                        <Mail className="w-4 h-4" />
                        {candidate.email}
                      </div>
                      <div className="flex items-center gap-2 text-white/60">
                        <Phone className="w-4 h-4" />
                        {candidate.phone}
                      </div>
                      <div className="flex items-center gap-2 text-white/60">
                        <MapPin className="w-4 h-4" />
                        {candidate.location}
                      </div>
                      <div className="flex items-center gap-2 text-white/60">
                        <Clock className="w-4 h-4" />
                        {candidate.experience} experience
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mt-3 text-sm text-white/50">
                      <span>Applied: {candidate.appliedDate}</span>
                      {candidate.score && <span>Score: {candidate.score}%</span>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {candidate.status === 'Applied' && (
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Calendar className="w-3 h-3 mr-1" />
                        Schedule
                      </Button>
                    )}
                    {candidate.status === 'Scheduled' && (
                      <Button size="sm" variant="outline" className="border-green-500/30 text-green-300 hover:bg-green-500/10">
                        <Calendar className="w-3 h-3 mr-1" />
                        Reschedule
                      </Button>
                    )}
                    {candidate.status === 'Interviewed' && (
                      <Button size="sm" variant="outline" className="border-white/20 text-white/70 hover:text-white hover:bg-white/10">
                        View Results
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredCandidates.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-white/20 mx-auto mb-4" />
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
      </div>
    </DashboardLayout>
  );
};

export default JobDetails;