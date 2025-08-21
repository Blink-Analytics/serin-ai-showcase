"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Building, Plus, Check } from "lucide-react"

interface OrganizationSetupProps {
  onComplete: (organizationData: any) => void
}

export function OrganizationSetup({ onComplete }: OrganizationSetupProps) {
  const [selectedOption, setSelectedOption] = useState<"existing" | "new" | null>(null)
  const [organizationName, setOrganizationName] = useState("")
  const [organizationCode, setOrganizationCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onComplete({
        type: selectedOption,
        name: organizationName,
        code: organizationCode,
      })
    }, 1500)
  }

  if (!selectedOption) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 shadow-2xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl">
          <h1 className="text-3xl font-normal text-white mb-4 text-center">Organization Setup</h1>
          <p className="text-white/60 text-center mb-8">Choose how you want to set up your organization</p>

          <div className="space-y-4">
            <Button
              onClick={() => setSelectedOption("existing")}
              className="w-full bg-white/20 backdrop-blur-sm border border-white/20 hover:bg-white/30 text-white font-medium rounded-2xl h-16 text-base transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-3"
            >
              <Building className="w-6 h-6" />
              <div className="text-left">
                <div className="font-medium">Join Existing Organization</div>
                <div className="text-sm text-white/60">Enter organization code to join</div>
              </div>
            </Button>

            <Button
              onClick={() => setSelectedOption("new")}
              className="w-full bg-white/20 backdrop-blur-sm border border-white/20 hover:bg-white/30 text-white font-medium rounded-2xl h-16 text-base transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-3"
            >
              <Plus className="w-6 h-6" />
              <div className="text-left">
                <div className="font-medium">Create New Organization</div>
                <div className="text-sm text-white/60">Set up a new organization</div>
              </div>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 shadow-2xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl">
        <button
          onClick={() => setSelectedOption(null)}
          className="text-white/60 hover:text-white mb-4 text-sm transition-colors duration-200"
        >
          ← Back to options
        </button>

        <h1 className="text-3xl font-normal text-white mb-4">
          {selectedOption === "existing" ? "Join Organization" : "Create Organization"}
        </h1>
        <p className="text-white/60 mb-8">
          {selectedOption === "existing"
            ? "Enter the organization code provided by your admin"
            : "Set up your new organization for conducting interviews"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {selectedOption === "existing" ? (
            <div className="relative">
              <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
              <Input
                type="text"
                value={organizationCode}
                onChange={(e) => setOrganizationCode(e.target.value)}
                className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl h-14 text-white placeholder:text-white/40 focus:border-white/30 focus:ring-0 pl-12 text-base transition-all duration-200 hover:bg-black/30 focus:bg-black/30"
                placeholder="Enter organization code"
                required
              />
            </div>
          ) : (
            <div className="relative">
              <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
              <Input
                type="text"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl h-14 text-white placeholder:text-white/40 focus:border-white/30 focus:ring-0 pl-12 text-base transition-all duration-200 hover:bg-black/30 focus:bg-black/30"
                placeholder="Enter organization name"
                required
              />
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-white/20 backdrop-blur-sm border border-white/20 hover:bg-white/30 text-white font-medium rounded-2xl h-14 mt-8 text-base transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              "Processing..."
            ) : (
              <>
                <Check className="w-5 h-5" />
                {selectedOption === "existing" ? "Join Organization" : "Create Organization"}
              </>
            )}
          </Button>
        </form>

        <p className="text-center text-white/40 text-sm mt-8">
          {selectedOption === "existing"
            ? "Don't have an organization code? Contact your admin"
            : "You'll be able to invite team members after creation"}
        </p>
      </div>
    </div>
  )
}
