import React from 'react';
import { Users, UserCheck, ArrowLeft } from "lucide-react";
import { ChoiceButton } from "@/components/ui/choice-button";

interface InterviewChoiceProps {
  onChoice: (choice: "create" | "join") => void;
  onBack?: () => void;
}

export function InterviewChoice({ onChoice, onBack }: InterviewChoiceProps) {
  return (
    <div className="w-full mx-auto">
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl lg:rounded-[32px] p-4 sm:p-6 md:p-8 shadow-2xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl">
        {/* Back Button */}
        {onBack && (
          <button
            onClick={onBack}
            className="mb-3 sm:mb-4 text-white/60 hover:text-white transition-colors duration-200 flex items-center gap-2 text-sm sm:text-base"
          >
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
            Back
          </button>
        )}

        {/* Header - responsive text sizes */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-normal text-white mb-3 sm:mb-4 leading-tight">Welcome to AI Interview Platform</h1>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed">Choose how you'd like to get started</p>
        </div>

        {/* Choice Buttons - responsive spacing */}
        <div className="space-y-3 sm:space-y-4">
          <ChoiceButton
            onClick={() => onChoice("create")}
            icon={Users}
            title="Create Interview"
            description="Set up interviews for candidates"
          />

          <ChoiceButton
            onClick={() => onChoice("join")}
            icon={UserCheck}
            title="Give Interview"
            description="Join an interview session"
          />
        </div>

        {/* Footer - responsive text size */}
        <div className="text-center mt-6 sm:mt-8">
          <p className="text-white/40 text-xs sm:text-sm leading-relaxed">
            You can switch between roles anytime from your dashboard
          </p>
        </div>
      </div>
    </div>
  );
}
