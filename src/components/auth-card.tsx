import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, ChevronDown, Eye, EyeOff } from "lucide-react"

interface AuthCardProps {
  onForgotPassword?: () => void
}

export function AuthCard({ onForgotPassword }: AuthCardProps) {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<"signup" | "signin">("signup")
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [firstName, setFirstName] = useState("John")
  const [lastName, setLastName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("(775) 351-6501")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Password validation functions
  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, label: "" };
    if (password.length < 6) return { strength: 1, label: "Weak" };
    if (password.length < 8) return { strength: 2, label: "Fair" };
    if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
      return { strength: 4, label: "Strong" };
    }
    return { strength: 3, label: "Good" };
  };

  const passwordsMatch = password === confirmPassword && confirmPassword !== "";
  const passwordStrength = getPasswordStrength(password);
  const isFormValid = firstName.trim() && lastName.trim() && email.trim() && 
                     password.length >= 6 && passwordsMatch;

  const handleRedirect = () => {
    window.open("https://www.youtube.com/@diecastbydollarall", "_blank")
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate password match
    if (password !== confirmPassword) {
      alert("Passwords do not match!")
      return
    }
    
    // Validate password strength
    if (password.length < 6) {
      alert("Password must be at least 6 characters long!")
      return
    }
    
    setIsLoading(true)
    
    // Simulate signup API call
    setTimeout(() => {
      setIsLoading(false)
      // Navigate to post-signup dashboard
      navigate("/post-signup")
    }, 2000)
  }

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate signin API call
    setTimeout(() => {
      setIsLoading(false)
      // For existing users, go to main dashboard
      navigate("/")
    }, 1500)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-black/40 border border-white/10 rounded-3xl p-8 shadow-2xl transform transition-all duration-300 hover:scale-[1.01] hover:shadow-3xl">
        {/* Header with tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-black/30 rounded-full p-1 border border-white/10">
            <button
              onClick={() => setActiveTab("signup")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === "signup"
                  ? "bg-white/20 text-white border border-white/20 shadow-lg"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              Sign up
            </button>
            <button
              onClick={() => setActiveTab("signin")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === "signin"
                  ? "bg-white/20 text-white border border-white/20 shadow-lg"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              Sign in
            </button>
          </div>
        </div>

        <h1 className="text-3xl font-normal text-white mb-8 transition-all duration-300">
          {activeTab === "signup" ? "Create an account" : "Welcome back"}
        </h1>

        <div className="relative">
          <div
            className={`transition-all duration-500 ease-in-out transform ${
              activeTab === "signup" ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0 absolute inset-0"
            }`}
          >
            {/* Sign Up Form */}
            <form
              onSubmit={handleSignup}
              className="space-y-4"
            >
              {/* Name fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <Input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="bg-black/20 border border-white/10 rounded-2xl h-14 text-white placeholder:text-white/40 focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 text-base transition-all duration-200 hover:bg-black/30 focus:bg-black/30"
                    placeholder="First name"
                    required
                  />
                </div>
                <div className="relative">
                  <Input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="bg-black/20 border border-white/10 rounded-2xl h-14 text-white placeholder:text-white/40 focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 text-base transition-all duration-200 hover:bg-black/30 focus:bg-black/30"
                    placeholder="Last name"
                    required
                  />
                </div>
              </div>

              {/* Email field */}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40 transition-colors duration-200" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-black/20 border border-white/10 rounded-2xl h-14 text-white placeholder:text-white/40 focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 pl-12 text-base transition-all duration-200 hover:bg-black/30 focus:bg-black/30"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Phone field */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                  <div className="w-6 h-4 bg-red-500 relative overflow-hidden rounded-sm">
                    <div className="absolute inset-0 bg-red-500"></div>
                    <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
                    <div className="absolute top-1 left-1 w-1 h-0.5 bg-white"></div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-white/40" />
                </div>
                <Input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="bg-black/20 border border-white/10 rounded-2xl h-14 text-white placeholder:text-white/40 focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 pl-20 text-base transition-all duration-200 hover:bg-black/30 focus:bg-black/30"
                  placeholder="Phone number"
                />
              </div>

              {/* Password field */}
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-black/20 border border-white/10 rounded-2xl h-14 text-white placeholder:text-white/40 focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 pr-12 text-base transition-all duration-200 hover:bg-black/30 focus:bg-black/30"
                  placeholder="Create password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Password strength indicator */}
              {password && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/60">Password strength</span>
                    <span className={`text-sm font-medium ${
                      passwordStrength.strength === 1 ? 'text-red-400' :
                      passwordStrength.strength === 2 ? 'text-yellow-400' :
                      passwordStrength.strength === 3 ? 'text-blue-400' :
                      passwordStrength.strength === 4 ? 'text-green-400' : 'text-white/40'
                    }`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-colors duration-200 ${
                          level <= passwordStrength.strength
                            ? passwordStrength.strength === 1 ? 'bg-red-400' :
                              passwordStrength.strength === 2 ? 'bg-yellow-400' :
                              passwordStrength.strength === 3 ? 'bg-blue-400' :
                              'bg-green-400'
                            : 'bg-white/20'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Confirm Password field */}
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`bg-black/20 border rounded-2xl h-14 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 pr-12 text-base transition-all duration-200 hover:bg-black/30 focus:bg-black/30 ${
                    confirmPassword && !passwordsMatch 
                      ? 'border-red-400/50 focus:border-red-400/70 focus:ring-red-400/20' 
                      : confirmPassword && passwordsMatch
                      ? 'border-green-400/50 focus:border-green-400/70 focus:ring-green-400/20'
                      : 'border-white/10 focus:border-white/50'
                  }`}
                  placeholder="Confirm password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors duration-200"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Password match indicator */}
              {confirmPassword && (
                <div className={`text-sm flex items-center gap-2 ${
                  passwordsMatch ? 'text-green-400' : 'text-red-400'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    passwordsMatch ? 'bg-green-400' : 'bg-red-400'
                  }`} />
                  {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
                </div>
              )}

              {/* Create account button */}
              <Button
                type="submit"
                className="w-full bg-white/20 border border-white/20 hover:bg-white/30 text-white font-medium rounded-2xl h-14 mt-8 text-base transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={isLoading || !isFormValid}
              >
                {isLoading ? "Creating account..." : "Create an account"}
              </Button>
            </form>
          </div>

          <div
            className={`transition-all duration-500 ease-in-out transform ${
              activeTab === "signin" ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 absolute inset-0"
            }`}
          >
            <form
              onSubmit={handleSignin}
              className="space-y-4"
            >
              {/* Email field */}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40 transition-colors duration-200" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-black/20 border border-white/10 rounded-2xl h-14 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/50 pl-12 text-base transition-all duration-200 hover:bg-black/30 focus:bg-black/30"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password field */}
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-black/20 border border-white/10 rounded-2xl h-14 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/50 pr-12 text-base transition-all duration-200 hover:bg-black/30 focus:bg-black/30"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Remember me and forgot password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border border-white/20 bg-black/20 text-white focus:ring-white/20 focus:ring-2"
                  />
                  <span className="text-white/60 text-sm">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={onForgotPassword}
                  className="text-white/60 hover:text-white text-sm transition-colors duration-200"
                >
                  Forgot password?
                </button>
              </div>

              {/* Sign in button */}
              <Button
                type="submit"
                className="w-full bg-white/20 border border-white/20 hover:bg-white/30 text-white font-medium rounded-2xl h-14 mt-8 text-base transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center my-8">
          <div className="flex-1 h-px bg-white/10"></div>
          <span className="px-4 text-white/40 text-sm font-medium">
            {activeTab === "signup" ? "OR SIGN UP WITH" : "OR CONTINUE WITH"}
          </span>
          <div className="flex-1 h-px bg-white/10"></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handleRedirect}
            className="bg-black/20 border border-white/10 rounded-2xl h-14 flex items-center justify-center hover:bg-black/30 transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
          >
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
              <div className="w-4 h-4 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 rounded-full"></div>
            </div>
          </button>
          <button
            onClick={handleRedirect}
            className="bg-black/20 border border-white/10 rounded-2xl h-14 flex items-center justify-center hover:bg-black/30 transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
          >
            <div className="w-6 h-6 text-white">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
            </div>
          </button>
        </div>

        <p className="text-center text-white/40 text-sm mt-8">
          {activeTab === "signup"
            ? "By creating an account, you agree to our Terms & Service"
            : "By signing in, you agree to our Terms & Service"}
        </p>
      </div>
    </div>
  )
}
