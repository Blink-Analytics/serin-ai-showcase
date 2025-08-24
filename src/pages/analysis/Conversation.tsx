import React, { useState } from 'react';
import { MessageCircle, Play, Pause, Volume2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const conversationData = {
  transcript: [
    {
      timestamp: '00:01',
      speaker: 'Interviewer',
      message: 'Hello! Thanks for joining us today. Can you please introduce yourself and tell us about your background in frontend development?'
    },
    {
      timestamp: '00:15',
      speaker: 'Candidate',
      message: 'Hi, thank you for having me. I\'m Sarah, and I\'ve been working as a frontend developer for about 4 years now. I specialize in React and have experience with TypeScript, Next.js, and modern CSS frameworks.'
    },
    {
      timestamp: '00:45',
      speaker: 'Interviewer',
      message: 'Great! Can you walk me through how you would optimize a React application for better performance?'
    },
    {
      timestamp: '01:02',
      speaker: 'Candidate',
      message: 'Sure! There are several approaches I typically use. First, I implement code splitting using React.lazy() and Suspense to reduce initial bundle size. I also use useMemo and useCallback hooks to prevent unnecessary re-renders...'
    },
    {
      timestamp: '02:30',
      speaker: 'Interviewer',
      message: 'Excellent points! Now, let\'s dive into a coding challenge. I\'d like you to implement a debounced search input component.'
    },
    {
      timestamp: '02:45',
      speaker: 'Candidate',
      message: 'I\'d be happy to! Let me think through this step by step. For a debounced search, I\'ll need to delay the API call until the user stops typing for a certain period...'
    }
  ],
  audioUrl: '/audio/interview-sample.mp3',
  duration: '24:32',
  keyMoments: [
    { time: '02:30', description: 'Technical challenge begins', type: 'highlight' },
    { time: '08:15', description: 'Code implementation phase', type: 'code' },
    { time: '15:20', description: 'Architecture discussion', type: 'discussion' },
    { time: '20:10', description: 'Q&A session', type: 'question' }
  ]
};

const Conversation = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedMoment, setSelectedMoment] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {/* Audio Player */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-3">
            <Volume2 className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Interview Recording</h3>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm text-white/60">Duration: {conversationData.duration}</span>
            <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-white/10 hover:bg-white/20 text-white"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          
          <div className="flex-1 bg-white/10 rounded-full h-2 relative">
            <div className="bg-blue-400 h-2 rounded-full w-1/3" />
            <div className="absolute top-1/2 transform -translate-y-1/2 left-1/3 w-4 h-4 bg-blue-400 rounded-full border-2 border-white" />
          </div>
          
          <span className="text-sm text-white/60">08:15 / 24:32</span>
        </div>
      </div>

      {/* Key Moments */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Key Moments</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {conversationData.keyMoments.map((moment, index) => (
            <button
              key={index}
              onClick={() => setSelectedMoment(moment.time)}
              className={`p-3 rounded-xl border transition-all duration-200 text-left ${
                selectedMoment === moment.time
                  ? 'bg-blue-500/20 border-blue-500/40'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="font-medium text-white mb-1">{moment.time}</div>
              <div className="text-sm text-white/70">{moment.description}</div>
              <div className={`text-xs mt-1 px-2 py-1 rounded-full inline-block ${
                moment.type === 'highlight' ? 'bg-yellow-500/20 text-yellow-400' :
                moment.type === 'code' ? 'bg-green-500/20 text-green-400' :
                moment.type === 'discussion' ? 'bg-blue-500/20 text-blue-400' :
                'bg-purple-500/20 text-purple-400'
              }`}>
                {moment.type}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Conversation Transcript */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <MessageCircle className="w-5 h-5 text-green-400" />
          <h3 className="text-lg font-semibold text-white">Transcript</h3>
        </div>
        
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {conversationData.transcript.map((item, index) => (
            <div key={index} className="flex gap-4 p-4 bg-white/5 rounded-xl">
              <div className="flex-shrink-0">
                <div className="text-xs text-white/40 mb-1">{item.timestamp}</div>
                <div className={`text-sm font-medium ${
                  item.speaker === 'Interviewer' ? 'text-blue-400' : 'text-green-400'
                }`}>
                  {item.speaker}
                </div>
              </div>
              <div className="flex-1">
                <p className="text-white/80 text-sm leading-relaxed">
                  {item.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Conversation Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h4 className="text-white font-medium mb-4">Speaking Time</h4>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-blue-400">Interviewer</span>
                <span className="text-white/60">35%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-blue-400 h-2 rounded-full w-[35%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-green-400">Candidate</span>
                <span className="text-white/60">65%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-green-400 h-2 rounded-full w-[65%]" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h4 className="text-white font-medium mb-4">Communication Quality</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-white/70">Clarity</span>
              <span className="text-white font-medium">8.5/10</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Pace</span>
              <span className="text-white font-medium">7.8/10</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Engagement</span>
              <span className="text-white font-medium">9.2/10</span>
            </div>
          </div>
        </div>

        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h4 className="text-white font-medium mb-4">Keywords Mentioned</h4>
          <div className="flex flex-wrap gap-2">
            {['React', 'TypeScript', 'Performance', 'Optimization', 'Hooks', 'API'].map((keyword, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversation;