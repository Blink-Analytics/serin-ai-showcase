import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedGradientBackground from '@/components/ui/animated-gradient-background';
import { FloatingNavDemo } from '@/components/FloatingNavDemo';
import { InterviewChoice } from '@/components/InterviewChoice';
import { OrganizationChoice, CreateOrganizationForm, JoinOrganizationForm } from '@/components/OrganizationSetup';
import { JoinInterviewForm } from '@/components/JoinInterviewForm';
import { SetupComplete } from '@/components/SetupComplete';
import { StepProgress } from '@/components/StepProgress';

type FlowStep = 
  | "interview_choice"
  | "organization_choice"
  | "create_organization"
  | "join_organization"
  | "join_interview"
  | "organization_created"
  | "organization_joined"
  | "interview_joined";

interface PostSignupData {
  organizationName?: string;
  organizationDescription?: string;
  inviteCode?: string;
  interviewCode?: string;
  candidateName?: string;
}

const PostSignupDashboard = () => {
  const [currentStep, setCurrentStep] = useState<FlowStep>("interview_choice");
  const [isLoading, setIsLoading] = useState(false);
  const [postSignupData, setPostSignupData] = useState<PostSignupData>({});

  // Simulate API calls with loading states
  const simulateAPICall = (duration = 2000) => {
    setIsLoading(true);
    return new Promise(resolve => {
      setTimeout(() => {
        setIsLoading(false);
        resolve(true);
      }, duration);
    });
  };

  const handleInterviewChoice = (choice: "create" | "join") => {
    if (choice === "create") {
      setCurrentStep("organization_choice");
    } else {
      setCurrentStep("join_interview");
    }
  };

  const handleOrganizationChoice = (choice: "create" | "join") => {
    if (choice === "create") {
      setCurrentStep("create_organization");
    } else {
      setCurrentStep("join_organization");
    }
  };

  const handleCreateOrganization = async (data: { name: string; description: string }) => {
    await simulateAPICall(2500);
    setPostSignupData(prev => ({
      ...prev,
      organizationName: data.name,
      organizationDescription: data.description
    }));
    setCurrentStep("organization_created");
  };

  const handleJoinOrganization = async (inviteCode: string) => {
    await simulateAPICall(2000);
    setPostSignupData(prev => ({
      ...prev,
      inviteCode
    }));
    setCurrentStep("organization_joined");
  };

  const handleJoinInterview = async (data: { interviewCode: string; name: string }) => {
    await simulateAPICall(1500);
    setPostSignupData(prev => ({
      ...prev,
      interviewCode: data.interviewCode,
      candidateName: data.name
    }));
    setCurrentStep("interview_joined");
  };

  const handleComplete = () => {
    // Navigate to the appropriate dashboard/page
    console.log("Setup complete!", postSignupData);
    // Redirect to main dashboard
    window.location.href = "/dashboard";
  };

  const handleBack = () => {
    switch (currentStep) {
      case "organization_choice":
        setCurrentStep("interview_choice");
        break;
      case "create_organization":
      case "join_organization":
        setCurrentStep("organization_choice");
        break;
      case "join_interview":
        setCurrentStep("interview_choice");
        break;
      default:
        setCurrentStep("interview_choice");
    }
  };

  const renderCurrentStep = () => {
    const stepContent = (() => {
      switch (currentStep) {
        case "interview_choice":
          return (
            <InterviewChoice 
              onChoice={handleInterviewChoice}
            />
          );

        case "organization_choice":
          return (
            <OrganizationChoice 
              onChoice={handleOrganizationChoice}
              onBack={handleBack}
            />
          );

        case "create_organization":
          return (
            <CreateOrganizationForm 
              onSubmit={handleCreateOrganization}
              onBack={handleBack}
              isLoading={isLoading}
            />
          );

        case "join_organization":
          return (
            <JoinOrganizationForm 
              onSubmit={handleJoinOrganization}
              onBack={handleBack}
              isLoading={isLoading}
            />
          );

        case "join_interview":
          return (
            <JoinInterviewForm 
              onSubmit={handleJoinInterview}
              onBack={handleBack}
              isLoading={isLoading}
            />
          );

        case "organization_created":
          return (
            <SetupComplete 
              type="organization_created"
              data={postSignupData}
              onContinue={handleComplete}
            />
          );

        case "organization_joined":
          return (
            <SetupComplete 
              type="organization_joined"
              data={postSignupData}
              onContinue={handleComplete}
            />
          );

        case "interview_joined":
          return (
            <SetupComplete 
              type="interview_joined"
              data={postSignupData}
              onContinue={handleComplete}
            />
          );

        default:
          return (
            <InterviewChoice 
              onChoice={handleInterviewChoice}
            />
          );
      }
    })();

    return (
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ 
          duration: 0.4, 
          ease: [0.25, 0.1, 0.25, 1],
          layout: { duration: 0.3 }
        }}
        layout
      >
        {stepContent}
      </motion.div>
    );
  };

  // Calculate current step number for progress
  const getCurrentStepNumber = () => {
    if (currentStep === "interview_choice") return 1;
    if (["organization_choice", "create_organization", "join_organization"].includes(currentStep)) return 2;
    if (["join_interview", "organization_created", "organization_joined", "interview_joined"].includes(currentStep)) return 3;
    return 1;
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background - consistent with theme */}
      <AnimatedGradientBackground />
      
      {/* Navigation - always visible */}
      <FloatingNavDemo alwaysVisible={true} />
      
      {/* Content with proper spacing and responsive design */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-start px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-12">
        {/* Container for both progress and card with consistent width */}
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
          {/* Step Progress - same width as card */}
          <div className="mt-4 sm:mt-6 md:mt-8 transition-all duration-500">
            <StepProgress step={getCurrentStepNumber()} total={3} />
          </div>

          {/* Main Content - with smooth transitions */}
          <AnimatePresence mode="wait">
            {renderCurrentStep()}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default PostSignupDashboard;
