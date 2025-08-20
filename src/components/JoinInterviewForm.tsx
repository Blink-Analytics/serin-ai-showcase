import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserCheck, ArrowLeft, Clock, Users } from "lucide-react";

interface JoinInterviewFormProps {
  onSubmit: (data: { interviewCode: string; name: string }) => void;
  onBack?: () => void;
  isLoading?: boolean;
}

export function JoinInterviewForm({ onSubmit, onBack, isLoading = false }: JoinInterviewFormProps) {
  const [formData, setFormData] = useState({
    interviewCode: "",
    name: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.interviewCode.trim() && formData.name.trim()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 shadow-2xl"
      >
        {/* Back Button */}
        {onBack && (
          <button
            onClick={onBack}
            className="mb-4 text-white/60 hover:text-white transition-colors duration-200 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        )}

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center border border-purple-400/30 mx-auto mb-4">
            <UserCheck className="w-8 h-8 text-purple-300" />
          </div>
          <h1 className="text-3xl font-normal text-white mb-2">Join Interview</h1>
          <p className="text-white/60 text-base">Enter your interview details</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="interview-code" className="text-white/90 text-sm font-medium">
              Interview Code *
            </Label>
            <Input
              id="interview-code"
              type="text"
              value={formData.interviewCode}
              onChange={(e) => setFormData(prev => ({ ...prev, interviewCode: e.target.value.toUpperCase() }))}
              placeholder="Enter interview code"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 backdrop-blur-sm rounded-xl h-12 text-center text-lg font-mono tracking-wider"
              required
            />
            <p className="text-white/40 text-xs text-center">
              The interviewer will provide you with this code
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="candidate-name" className="text-white/90 text-sm font-medium">
              Your Full Name *
            </Label>
            <Input
              id="candidate-name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter your full name"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 backdrop-blur-sm rounded-xl h-12"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={!formData.interviewCode.trim() || !formData.name.trim() || isLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-xl h-12 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Joining Interview...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Join Interview Session
              </div>
            )}
          </Button>
        </form>

        {/* Info Section */}
        <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
          <h3 className="text-white font-medium mb-2 flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-300" />
            What to expect:
          </h3>
          <ul className="text-white/60 text-sm space-y-1">
            <li>• Audio and video permissions may be requested</li>
            <li>• The interview will be recorded for evaluation</li>
            <li>• AI assistance will guide the conversation</li>
            <li>• You can ask for clarification anytime</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
