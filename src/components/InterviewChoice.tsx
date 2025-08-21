import React from 'react';
import { Users, UserCheck, ArrowLeft } from "lucide-react";
import { ChoiceButton } from "@/components/ui/choice-button";

interface InterviewChoiceProps {
  onChoice: (choice: "create" | "join") => void;
  onBack?: () => void;
}

// Data variables for easy backend integration
const INTERVIEW_CHOICE_DATA = {
  header: {
    title: "Welcome to AI Interview Platform",
    subtitle: "Choose how you'd like to get started"
  },
  choices: [
    {
      id: "create",
      icon: Users,
      title: "Create Interview",
      description: "Set up interviews for candidates"
    },
    {
      id: "join",
      icon: UserCheck,
      title: "Give Interview", 
      description: "Join an interview session"
    }
  ],
  footer: {
    text: "You can switch between roles anytime from your dashboard"
  }
};

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
        <div className="text-center mb-6 sm:mb-8 mt-8 sm:mt-12">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-normal text-white mb-3 sm:mb-4 leading-tight">{INTERVIEW_CHOICE_DATA.header.title}</h1>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed">{INTERVIEW_CHOICE_DATA.header.subtitle}</p>
        </div>

        {/* Choice Buttons - responsive spacing */}
        <div className="space-y-3 sm:space-y-4">
          {INTERVIEW_CHOICE_DATA.choices.map((choice) => (
            <ChoiceButton
              key={choice.id}
              onClick={() => onChoice(choice.id as "create" | "join")}
              icon={choice.icon}
              title={choice.title}
              description={choice.description}
            />
          ))}
        </div>

        {/* Footer - responsive text size */}
        <div className="text-center mt-6 sm:mt-8">
          <p className="text-white/40 text-xs sm:text-sm leading-relaxed">
            {INTERVIEW_CHOICE_DATA.footer.text}
          </p>
        </div>
      </div>
    </div>
  );
}
