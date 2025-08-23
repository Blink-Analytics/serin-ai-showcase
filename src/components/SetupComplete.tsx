import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, Calendar, Settings } from "lucide-react";

interface SetupCompleteProps {
  type: "organization_created" | "organization_joined" | "interview_joined";
  data?: {
    organizationName?: string;
    interviewCode?: string;
    name?: string;
  };
  onContinue: () => void;
}

export function SetupComplete({ type, data, onContinue }: SetupCompleteProps) {
  const getContent = () => {
    switch (type) {
      case "organization_created":
        return {
          icon: <Users className="w-8 h-8 text-green-300" />,
          title: "Organization Created!",
          message: `Successfully created "${data?.organizationName}". You can now start creating interviews and inviting team members.`,
          buttonText: "Go to Dashboard",
          bgColor: "bg-green-500/20",
          borderColor: "border-green-400/30"
        };
      case "organization_joined":
        return {
          icon: <CheckCircle className="w-8 h-8 text-blue-300" />,
          title: "Welcome to the Team!",
          message: "You've successfully joined the organization. You can now access interviews and collaborate with your team.",
          buttonText: "Go to Dashboard",
          bgColor: "bg-blue-500/20",
          borderColor: "border-blue-400/30"
        };
      case "interview_joined":
        return {
          icon: <Calendar className="w-8 h-8 text-purple-300" />,
          title: "Ready for Interview!",
          message: `Hello ${data?.name}! You're all set for the interview. The session will begin shortly.`,
          buttonText: "Enter Interview Room",
          bgColor: "bg-purple-500/20",
          borderColor: "border-purple-400/30"
        };
      default:
        return {
          icon: <CheckCircle className="w-8 h-8 text-green-300" />,
          title: "Setup Complete!",
          message: "You're all set to get started.",
          buttonText: "Continue",
          bgColor: "bg-green-500/20",
          borderColor: "border-green-400/30"
        };
    }
  };

  const content = getContent();

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 shadow-2xl"
      >
        {/* Success Icon */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
            className={`w-20 h-20 rounded-3xl ${content.bgColor} flex items-center justify-center border ${content.borderColor} mx-auto mb-6`}
          >
            {content.icon}
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-3xl font-normal text-white mb-4"
          >
            {content.title}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-white/60 text-base leading-relaxed"
          >
            {content.message}
          </motion.p>
        </div>

        {/* Next Steps */}
        {type === "organization_created" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10"
          >
            <h3 className="text-white font-medium mb-3 flex items-center gap-2">
              <Settings className="w-4 h-4 text-green-300" />
              Next Steps:
            </h3>
            <ul className="text-white/60 text-sm space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-300 mt-1">•</span>
                <span>Invite team members to your organization</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-300 mt-1">•</span>
                <span>Create your first interview job</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-300 mt-1">•</span>
                <span>Configure interview settings and criteria</span>
              </li>
            </ul>
          </motion.div>
        )}

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button
            onClick={onContinue}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl h-12 transition-all duration-300 transform hover:scale-[1.02]"
          >
            {content.buttonText}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
