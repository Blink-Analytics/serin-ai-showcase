import { Button } from "@/components/ui/button"
import { Users, UserCheck } from "lucide-react"

interface RoleSelectionProps {
  onRoleSelect: (role: "interviewer" | "interviewee") => void
}

export function RoleSelection({ onRoleSelect }: RoleSelectionProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 shadow-2xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl">
        <h1 className="text-3xl font-normal text-white mb-4 text-center">Welcome to AI Interview Platform</h1>
        <p className="text-white/60 text-center mb-8">Choose your role to get started</p>

        <div className="space-y-4">
          <Button
            onClick={() => onRoleSelect("interviewer")}
            className="w-full bg-white/20 backdrop-blur-sm border border-white/20 hover:bg-white/30 text-white font-medium rounded-2xl h-16 text-base transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-3"
          >
            <Users className="w-6 h-6" />
            <div className="text-left">
              <div className="font-medium">Create Interview</div>
              <div className="text-sm text-white/60">Set up interviews for candidates</div>
            </div>
          </Button>

          <Button
            onClick={() => onRoleSelect("interviewee")}
            className="w-full bg-white/20 backdrop-blur-sm border border-white/20 hover:bg-white/30 text-white font-medium rounded-2xl h-16 text-base transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-3"
          >
            <UserCheck className="w-6 h-6" />
            <div className="text-left">
              <div className="font-medium">Give Interview</div>
              <div className="text-sm text-white/60">Join an interview session</div>
            </div>
          </Button>
        </div>

        <p className="text-center text-white/40 text-sm mt-8">
          You can change your role anytime from your profile settings
        </p>
      </div>
    </div>
  )
}
