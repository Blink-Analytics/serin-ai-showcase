import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building, Plus, Check, ArrowLeft, Users, Key } from "lucide-react";
import { ChoiceButton } from "@/components/ui/choice-button";

interface OrganizationChoiceProps {
  onChoice: (choice: "create" | "join") => void;
  onBack?: () => void;
}

// Data variables for easy backend integration
const ORGANIZATION_CHOICE_DATA = {
  header: {
    title: "Organization Setup",
    subtitle: "Choose how to set up your organization",
    icon: Building
  },
  choices: [
    {
      id: "create",
      icon: Plus,
      title: "Create New Organization",
      description: "Start fresh with a new organization"
    },
    {
      id: "join", 
      icon: Key,
      title: "Join Existing Organization",
      description: "Use an invitation code to join"
    }
  ],
  footer: {
    text: "You can manage organization settings later from your dashboard"
  }
};

export function OrganizationChoice({ onChoice, onBack }: OrganizationChoiceProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 shadow-2xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl">
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
        <div className="text-center mb-8 mt-8">
          <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center border border-blue-400/30 mx-auto mb-4">
            <ORGANIZATION_CHOICE_DATA.header.icon className="w-8 h-8 text-blue-300" />
          </div>
          <h1 className="text-3xl font-normal text-white mb-2">{ORGANIZATION_CHOICE_DATA.header.title}</h1>
          <p className="text-white/60 text-base">{ORGANIZATION_CHOICE_DATA.header.subtitle}</p>
        </div>

        {/* Choice Buttons */}
        <div className="space-y-4">
          {ORGANIZATION_CHOICE_DATA.choices.map((choice) => (
            <ChoiceButton
              key={choice.id}
              onClick={() => onChoice(choice.id as "create" | "join")}
              icon={choice.icon}
              title={choice.title}
              description={choice.description}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-white/40 text-sm">
            {ORGANIZATION_CHOICE_DATA.footer.text}
          </p>
        </div>
      </div>
    </div>
  );
}

interface CreateOrganizationFormProps {
  onSubmit: (data: { name: string; description: string }) => void;
  onBack?: () => void;
  isLoading?: boolean;
}

export function CreateOrganizationForm({ onSubmit, onBack, isLoading = false }: CreateOrganizationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="w-full mx-auto">
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl lg:rounded-[32px] p-4 sm:p-6 md:p-8 shadow-2xl">
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

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-blue-500/20 flex items-center justify-center border border-blue-400/30 mx-auto mb-3 sm:mb-4">
            <Plus className="w-6 h-6 sm:w-8 sm:h-8 text-blue-300" />
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-normal text-white mb-2 leading-tight">Create Organization</h1>
          <p className="text-white/60 text-sm sm:text-base">Set up your new organization</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <Label htmlFor="org-name" className="text-white/90 text-sm font-medium">
              Organization Name *
            </Label>
            <Input
              id="org-name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter organization name"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 backdrop-blur-sm rounded-xl h-10 sm:h-12 text-sm sm:text-base"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="org-description" className="text-white/90 text-sm font-medium">
              Description (Optional)
            </Label>
            <Input
              id="org-description"
              type="text"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Brief description of your organization"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 backdrop-blur-sm rounded-xl h-10 sm:h-12 text-sm sm:text-base"
            />
          </div>

          <Button
            type="submit"
            disabled={!formData.name.trim() || isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl h-10 sm:h-12 text-sm sm:text-base transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating Organization...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                Create Organization
              </div>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

interface JoinOrganizationFormProps {
  onSubmit: (code: string) => void;
  onBack?: () => void;
  isLoading?: boolean;
}

export function JoinOrganizationForm({ onSubmit, onBack, isLoading = false }: JoinOrganizationFormProps) {
  const [inviteCode, setInviteCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inviteCode.trim()) {
      onSubmit(inviteCode.trim());
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 shadow-2xl">
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
          <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center border border-blue-400/30 mx-auto mb-4">
            <Key className="w-8 h-8 text-blue-300" />
          </div>
          <h1 className="text-3xl font-normal text-white mb-2">Join Organization</h1>
          <p className="text-white/60 text-base">Enter your invitation code to join an organization</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="invite-code" className="text-white/90 text-sm font-medium">
              Invitation Code *
            </Label>
            <Input
              id="invite-code"
              type="text"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              placeholder="Enter invitation code"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 backdrop-blur-sm rounded-xl h-12"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={!inviteCode.trim() || isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl h-12 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Joining Organization...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Join Organization
              </div>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
