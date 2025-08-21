import React from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Clock, Video, FileText, MoreHorizontal } from 'lucide-react';

const interviews = [
  {
    id: 1,
    candidateName: 'Sarah Johnson',
    position: 'Frontend Developer',
    status: 'completed',
    scheduledAt: '2024-01-15 10:00 AM',
    duration: '45 min',
    score: '85%',
    interviewer: 'AI Agent'
  },
  {
    id: 2,
    candidateName: 'Michael Chen',
    position: 'Backend Developer', 
    status: 'scheduled',
    scheduledAt: '2024-01-16 2:00 PM',
    duration: '60 min',
    interviewer: 'AI Agent'
  },
  {
    id: 3,
    candidateName: 'Emily Rodriguez',
    position: 'UI/UX Designer',
    status: 'in-progress',
    scheduledAt: '2024-01-15 3:30 PM',
    duration: '30 min',
    interviewer: 'AI Agent'
  }
];

const Interviews = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'scheduled':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'in-progress':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      default:
        return 'bg-white/10 text-white/60 border-white/20';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Dynamic Header */}
        <PageHeader
          title="Interviews"
          subtitle="Manage and monitor interview sessions"
          buttonText="Schedule Interview"
          buttonIcon={<Calendar className="w-4 h-4" />}
          onButtonClick={() => console.log('Schedule interview')}
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60">Total Interviews</p>
                <p className="text-3xl font-bold text-white">46</p>
              </div>
              <Users className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60">Completed</p>
                <p className="text-3xl font-bold text-white">38</p>
              </div>
              <FileText className="w-8 h-8 text-green-400" />
            </div>
          </div>
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60">In Progress</p>
                <p className="text-3xl font-bold text-white">2</p>
              </div>
              <Video className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60">Scheduled</p>
                <p className="text-3xl font-bold text-white">6</p>
              </div>
              <Clock className="w-8 h-8 text-purple-400" />
            </div>
          </div>
        </div>

        {/* Interviews Table */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl">
          <div className="p-6 border-b border-white/10">
            <h3 className="text-lg font-semibold text-white">Recent Interviews</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                    Candidate
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                    Scheduled
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {interviews.map((interview) => (
                  <tr key={interview.id} className="hover:bg-white/5">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-gray-600 to-gray-400 rounded-full flex items-center justify-center mr-3">
                          <span className="text-xs font-medium text-white">
                            {interview.candidateName.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="text-sm font-medium text-white">
                          {interview.candidateName}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70">
                      {interview.position}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70">
                      {interview.scheduledAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70">
                      {interview.duration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(interview.status)}`}>
                        {interview.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {interview.score || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {interview.status === 'completed' && (
                          <Button size="sm" variant="outline" className="border-white/20 text-white/70 hover:text-white hover:bg-white/10">
                            View Report
                          </Button>
                        )}
                        {interview.status === 'scheduled' && (
                          <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                            Start
                          </Button>
                        )}
                        {interview.status === 'in-progress' && (
                          <Button size="sm" variant="outline" className="border-white/20 text-white/70 hover:text-white hover:bg-white/10">
                            Monitor
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Interviews;
