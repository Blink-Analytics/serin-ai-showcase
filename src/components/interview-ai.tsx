import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  BrainCircuit,
  Building2,
  Users,
  FileText,
  TrendingUp,
  Plus,
  Bell,
  Clock,
  ArrowLeft,
  Send,
  Sparkles,
  CheckCircle,
  Camera,
  Mic,
  Wifi,
  Play,
  Video,
  AlertTriangle,
  Square,
  Edit,
  TestTube,
  X,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Sample data for organizations
const organizations = [
  { id: "tech-corp", name: "TechCorp Inc.", logo: "TC" },
  { id: "startup-hub", name: "StartupHub", logo: "SH" },
  { id: "design-co", name: "Design Co.", logo: "DC" },
]

// Sample data for job templates
const jobTemplates = [
  {
    id: "frontend-dev",
    title: "Frontend Developer",
    description: "React, TypeScript, and modern web development",
    questions: 15,
    duration: "45 min",
    difficulty: "Intermediate",
    created: "2 days ago",
    status: "active",
    interviews: 23,
    skills: ["React", "TypeScript", "JavaScript"],
  },
  {
    id: "backend-dev",
    title: "Backend Developer",
    description: "Node.js, databases, and API development",
    questions: 18,
    duration: "60 min",
    difficulty: "Advanced",
    created: "1 week ago",
    status: "active",
    interviews: 15,
    skills: ["Node.js", "SQL", "Databases"],
  },
  {
    id: "ui-designer",
    title: "UI/UX Designer",
    description: "Design thinking, prototyping, and user research",
    questions: 12,
    duration: "30 min",
    difficulty: "Beginner",
    created: "3 days ago",
    status: "draft",
    interviews: 0,
    skills: ["UI", "UX", "Figma"],
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    description: "Machine learning, statistics, and data analysis",
    questions: 20,
    duration: "75 min",
    difficulty: "Advanced",
    created: "5 days ago",
    status: "active",
    interviews: 8,
    skills: ["Python", "Machine Learning", "Statistics"],
  },
]

// Sample data for interview analytics
const interviewAnalytics = [
  {
    id: "int-001",
    candidateName: "Sarah Johnson",
    template: "Frontend Developer",
    templateId: "frontend-dev",
    score: 85,
    duration: "42 min",
    completed: "2 hours ago",
    status: "completed",
    strengths: ["React", "Problem Solving"],
    weaknesses: ["Testing", "Performance"],
    technicalScore: 88,
    communicationScore: 82,
    problemSolvingScore: 85,
    role: "Frontend Developer",
    skills: ["React", "TypeScript", "CSS"],
    date: "2 hours ago",
  },
  {
    id: "int-002",
    candidateName: "Michael Chen",
    template: "Backend Developer",
    templateId: "backend-dev",
    score: 92,
    duration: "58 min",
    completed: "1 day ago",
    status: "completed",
    strengths: ["Architecture", "Databases"],
    weaknesses: ["Documentation"],
    technicalScore: 95,
    communicationScore: 89,
    problemSolvingScore: 92,
    role: "Backend Developer",
    skills: ["Node.js", "MongoDB", "API Design"],
    date: "5 hours ago",
  },
  {
    id: "int-003",
    candidateName: "Emma Wilson",
    template: "Frontend Developer",
    templateId: "frontend-dev",
    score: 78,
    duration: "45 min",
    completed: "2 days ago",
    status: "completed",
    strengths: ["CSS", "Responsive Design"],
    weaknesses: ["JavaScript", "State Management"],
    technicalScore: 75,
    communicationScore: 81,
    problemSolvingScore: 78,
    role: "Frontend Developer",
    skills: ["Vue.js", "Python", "PostgreSQL"],
    date: "1 day ago",
  },
  {
    id: "int-004",
    candidateName: "David Park",
    template: "Frontend Developer",
    templateId: "frontend-dev",
    score: 91,
    duration: "43 min",
    completed: "3 days ago",
    status: "completed",
    strengths: ["React", "TypeScript", "Testing"],
    weaknesses: ["Performance Optimization"],
    technicalScore: 93,
    communicationScore: 88,
    problemSolvingScore: 92,
    role: "DevOps Engineer",
    skills: ["Docker", "AWS", "CI/CD"],
    date: "1 day ago",
  },
  {
    id: "int-005",
    candidateName: "Lisa Rodriguez",
    template: "Backend Developer",
    templateId: "backend-dev",
    score: 87,
    duration: "62 min",
    completed: "4 days ago",
    status: "completed",
    strengths: ["API Design", "Security"],
    weaknesses: ["Scalability", "Caching"],
    technicalScore: 89,
    communicationScore: 85,
    problemSolvingScore: 87,
    role: "Mobile Developer",
    skills: ["React Native", "iOS", "Android"],
    date: "2 days ago",
  },
]

function InterviewAI() {
  const [selectedOrg, setSelectedOrg] = useState(organizations[0])
  const [activeTab, setActiveTab] = useState("dashboard")
  const [selectedTemplate, setSelectedTemplate] = useState("all")
  const [selectedJobRole, setSelectedJobRole] = useState("all")
  const [selectedInterview, setSelectedInterview] = useState<string | null>(null)
  const [detailedAnalysisId, setDetailedAnalysisId] = useState<string | null>(null)
  const [showCreateTemplate, setShowCreateTemplate] = useState(false)
  const [jobDescription, setJobDescription] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [jobTitle, setJobTitle] = useState("")
  const [extractedContent, setExtractedContent] = useState<any>(null)
  const [showSystemCheck, setShowSystemCheck] = useState(false)
  const [showInterviewInterface, setShowInterviewInterface] = useState(false)
  const [systemChecks, setSystemChecks] = useState({
    camera: false,
    microphone: false,
    network: false,
  })
  const [isCheckingSystem, setIsCheckingSystem] = useState(false)
  const [selectedTemplateForEdit, setSelectedTemplateForEdit] = useState<string | null>(null)
  const [currentView, setCurrentView] = useState("dashboard")
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null)
  const [selectedOrganization, setSelectedOrganization] = useState("TechCorp Inc.")

  const filteredInterviews =
    selectedTemplate === "all"
      ? interviewAnalytics
      : interviewAnalytics.filter((interview) => interview.templateId === selectedTemplate)

  const filteredByJobRole =
    selectedJobRole === "all"
      ? filteredInterviews
      : filteredInterviews.filter((interview) => {
          const roleMap: { [key: string]: string } = {
            frontend: "Frontend Developer",
            backend: "Backend Developer",
            fullstack: "Full Stack Developer",
            devops: "DevOps Engineer",
            mobile: "Mobile Developer",
          }
          return interview.role === roleMap[selectedJobRole]
        })

  const calculateOverallMetrics = () => {
    const interviews = filteredByJobRole
    if (interviews.length === 0)
      return { avgScore: 0, avgTechnical: 0, avgCommunication: 0, avgProblemSolving: 0, totalInterviews: 0 }

    const avgScore = Math.round(interviews.reduce((sum, interview) => sum + interview.score, 0) / interviews.length)
    const avgTechnical = Math.round(
      interviews.reduce((sum, interview) => sum + interview.technicalScore, 0) / interviews.length,
    )
    const avgCommunication = Math.round(
      interviews.reduce((sum, interview) => sum + interview.communicationScore, 0) / interviews.length,
    )
    const avgProblemSolving = Math.round(
      interviews.reduce((sum, interview) => sum + interview.problemSolvingScore, 0) / interviews.length,
    )

    return { avgScore, avgTechnical, avgCommunication, avgProblemSolving, totalInterviews: interviews.length }
  }

  const overallMetrics = calculateOverallMetrics()

  const detailedInterview = detailedAnalysisId
    ? interviewAnalytics.find((interview) => interview.id === detailedAnalysisId)
    : null

  const handleCreateTemplate = () => {
    setShowCreateTemplate(true)
  }

  const extractJobDetails = () => {
    // Simulate AI extraction
    const extracted = {
      title: jobTitle || "Software Engineer",
      company: companyName || selectedOrg.name,
      requirements: [
        "3+ years of React experience",
        "Strong JavaScript/TypeScript skills",
        "Experience with Node.js",
        "Knowledge of database systems",
      ],
      responsibilities: [
        "Develop and maintain web applications",
        "Collaborate with cross-functional teams",
        "Write clean, maintainable code",
        "Participate in code reviews",
      ],
      skills: ["React", "TypeScript", "Node.js", "SQL", "Git"],
      experience: "3-5 years",
      questions: [
        "Explain the difference between React hooks and class components",
        "How would you optimize a slow-performing React application?",
        "Describe your experience with database design",
        "Walk me through your debugging process",
      ],
    }
    setExtractedContent(extracted)
  }

  const handleEditTemplate = (templateId: string) => {
    setSelectedTemplateForEdit(templateId)
    const template = jobTemplates.find((t) => t.id === templateId)
    if (template) {
      setJobTitle(template.title)
      setJobDescription(template.description)
      setShowCreateTemplate(true)
    }
  }

  const handleUseTemplate = (templateId: string) => {
    // Simulate using template for interview
    console.log(`Using template: ${templateId}`)
  }

  const handleTestInterview = (templateId?: string) => {
    console.log(`Testing interview${templateId ? ` with template: ${templateId}` : ''}`)
    setShowSystemCheck(true)
  }

  const runSystemChecks = async () => {
    setIsCheckingSystem(true)

    // Simulate system checks
    setTimeout(() => setSystemChecks((prev) => ({ ...prev, camera: true })), 1000)
    setTimeout(() => setSystemChecks((prev) => ({ ...prev, microphone: true })), 2000)
    setTimeout(() => setSystemChecks((prev) => ({ ...prev, network: true })), 3000)
    setTimeout(() => setIsCheckingSystem(false), 3500)
  }

  const startInterview = () => {
    setShowSystemCheck(false)
    setShowInterviewInterface(true)
  }

  const endInterview = () => {
    setShowInterviewInterface(false)
    setSystemChecks({ camera: false, microphone: false, network: false })
    setCurrentView("feedback")
  }

  const renderSystemCheck = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 bg-background z-50 flex items-center justify-center p-6"
    >
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">System Check</CardTitle>
          <CardDescription>
            We need to verify your camera, microphone, and network connection before starting the interview
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Camera className="h-5 w-5" />
                <span>Camera Access</span>
              </div>
              <div className="flex items-center gap-2">
                {systemChecks.camera ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <div className="h-5 w-5 border-2 border-muted-foreground rounded-full animate-spin border-t-primary" />
                )}
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Mic className="h-5 w-5" />
                <span>Microphone Access</span>
              </div>
              <div className="flex items-center gap-2">
                {systemChecks.microphone ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <div className="h-5 w-5 border-2 border-muted-foreground rounded-full animate-spin border-t-primary" />
                )}
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Wifi className="h-5 w-5" />
                <span>Network Connection</span>
              </div>
              <div className="flex items-center gap-2">
                {systemChecks.network ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <div className="h-5 w-5 border-2 border-muted-foreground rounded-full animate-spin border-t-primary" />
                )}
              </div>
            </div>
          </div>

          {!isCheckingSystem && Object.values(systemChecks).every(Boolean) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-4"
            >
              <div className="flex items-center justify-center gap-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">All systems ready!</span>
              </div>
            </motion.div>
          )}

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setShowSystemCheck(false)} className="flex-1">
              Cancel
            </Button>
            {!isCheckingSystem && !Object.values(systemChecks).some(Boolean) && (
              <Button onClick={runSystemChecks} className="flex-1">
                <Play className="h-4 w-4 mr-2" />
                Start System Check
              </Button>
            )}
            {Object.values(systemChecks).every(Boolean) && (
              <Button onClick={startInterview} className="flex-1">
                <Video className="h-4 w-4 mr-2" />
                Begin Interview
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  const renderInterviewInterface = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Video Feed - Full Screen */}
      <div className="relative flex-1 w-full h-full">
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
          <div className="text-center space-y-2">
            <Camera className="h-16 w-16 mx-auto text-white/60" />
            <p className="text-white/60 text-lg">Candidate Video Feed</p>
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-5xl px-6">
          <Card className="bg-background/95 backdrop-blur-sm border shadow-2xl">
            <CardContent className="p-3">
              {/* Compact Status and Question Row */}
              <div className="flex items-center justify-between gap-4">
                {/* Left: Question and Progress */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-sm font-medium">Q3/15</span>
                    </div>
                    <div className="flex-1 bg-muted rounded-full h-1.5">
                      <div
                        className="bg-primary h-1.5 rounded-full transition-all duration-300"
                        style={{ width: "20%" }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground font-mono">12:34</span>
                  </div>
                  <p className="text-sm leading-relaxed truncate">
                    "Can you explain the difference between React's useState and useEffect hooks..."
                  </p>
                </div>

                {/* Right: Control Buttons */}
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="hover-lift bg-transparent p-2">
                    <AlertTriangle className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="sm" className="hover-lift p-2">
                    <Square className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  )

  const renderFeedbackPage = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-background p-6"
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold">Interview Completed!</h1>
          <p className="text-muted-foreground text-lg">
            Thank you for completing the Frontend Developer interview. Your responses have been recorded and will be
            reviewed by our team.
          </p>
        </div>

        {/* Interview Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Interview Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">15</div>
                <div className="text-sm text-muted-foreground">Questions Answered</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">45:23</div>
                <div className="text-sm text-muted-foreground">Total Duration</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">2</div>
                <div className="text-sm text-muted-foreground">Hints Used</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">Completion Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle>What Happens Next?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                </div>
                <div>
                  <h4 className="font-medium">AI Analysis</h4>
                  <p className="text-sm text-muted-foreground">
                    Your responses will be analyzed by our AI system within the next 24 hours.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                </div>
                <div>
                  <h4 className="font-medium">Human Review</h4>
                  <p className="text-sm text-muted-foreground">
                    Our hiring team will review your performance and provide feedback.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                </div>
                <div>
                  <h4 className="font-medium">Results Notification</h4>
                  <p className="text-sm text-muted-foreground">
                    You'll receive an email with your results and next steps within 3-5 business days.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={() => setCurrentView("dashboard")}>
            Return to Dashboard
          </Button>
          <Button onClick={() => setCurrentView("dashboard")}>Take Another Interview</Button>
        </div>
      </div>
    </motion.div>
  )

  const renderCreateTemplate = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">{selectedTemplateForEdit ? "Edit Template" : "Create Job Template"}</h2>
        <p className="text-muted-foreground">
          {selectedTemplateForEdit
            ? "Modify the job template details."
            : "Define the job requirements and skills for the AI interview."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
            <CardDescription>Enter the job title, company, and a brief description.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="job-title">Job Title</Label>
              <Input
                type="text"
                id="job-title"
                placeholder="e.g., Software Engineer"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="company-name">Company Name</Label>
              <Input
                type="text"
                id="company-name"
                placeholder="e.g., TechCorp Inc."
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="job-description">Job Description</Label>
              <Textarea
                id="job-description"
                placeholder="Describe the job role and responsibilities."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>
            <Button onClick={extractJobDetails}>
              <Sparkles className="h-4 w-4 mr-2" />
              Extract Details
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Extracted Content</CardTitle>
            <CardDescription>Review and adjust the extracted job details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {extractedContent ? (
              <div className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <Input type="text" value={extractedContent.title} readOnly />
                </div>
                <div>
                  <Label>Company</Label>
                  <Input type="text" value={extractedContent.company} readOnly />
                </div>
                <div>
                  <Label>Requirements</Label>
                  <ul className="list-disc pl-5">
                    {extractedContent.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <Label>Responsibilities</Label>
                  <ul className="list-disc pl-5">
                    {extractedContent.responsibilities.map((resp, index) => (
                      <li key={index}>{resp}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <Label>Skills</Label>
                  <div className="flex flex-wrap gap-2">
                    {extractedContent.skills.map((skill, index) => (
                      <Badge key={index}>{skill}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Interview Questions</Label>
                  <ul className="list-decimal pl-5">
                    {extractedContent.questions.map((question, index) => (
                      <li key={index}>{question}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">No content extracted yet. Please extract job details first.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => {
            setShowCreateTemplate(false)
            setSelectedTemplateForEdit(null)
          }}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button>
          <Send className="h-4 w-4 mr-2" />
          Save Template
        </Button>
      </div>
    </div>
  )

  if (currentView === "feedback") {
    return renderFeedbackPage()
  }

  if (showInterviewInterface) {
    return renderInterviewInterface()
  }

  if (showSystemCheck) {
    return renderSystemCheck()
  }

  return (
    <div className="relative min-h-screen bg-background">
      <div className="min-h-screen">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/95 px-6 backdrop-blur">
          {/* ... existing header code ... */}
          <div className="flex flex-1 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <BrainCircuit className="size-5" />
                </div>
                <div>
                  <h2 className="font-semibold">InterviewAI</h2>
                  <p className="text-xs text-muted-foreground">Smart Interviews</p>
                </div>
              </div>
              <Select
                value={selectedOrg.id}
                onValueChange={(value) =>
                  setSelectedOrg(organizations.find((org) => org.id === value) || organizations[0])
                }
              >
                <SelectTrigger className="w-48 hover-lift">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded bg-primary/10 text-xs font-medium">
                      {selectedOrg.logo}
                    </div>
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {organizations.map((org) => (
                    <SelectItem key={org.id} value={org.id}>
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded bg-primary/10 text-xs font-medium">
                          {org.logo}
                        </div>
                        {org.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="hover-lift">
                      <Bell className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Notifications</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <main className="p-8">
          {showCreateTemplate ? (
            renderCreateTemplate()
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
                <TabsTrigger value="dashboard" className="hover-lift">
                  Dashboard
                </TabsTrigger>
                <TabsTrigger value="job-templates" className="hover-lift">
                  Templates
                </TabsTrigger>
                <TabsTrigger value="interview-analysis" className="hover-lift">
                  Analysis
                </TabsTrigger>
              </TabsList>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <TabsContent value="dashboard" className="space-y-8 mt-0">
                    {/* ... existing dashboard content ... */}
                    <Card className="border-0 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover-lift">
                      <CardHeader className="pb-8">
                        <div className="flex items-center justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Building2 className="h-5 w-5" />
                              <span className="text-sm opacity-90">{selectedOrg.name}</span>
                            </div>
                            <CardTitle className="text-2xl">AI Interview Dashboard</CardTitle>
                            <CardDescription className="text-primary-foreground/80">
                              Manage job templates and analyze candidate performance
                            </CardDescription>
                          </div>
                          <Button
                            variant="secondary"
                            className="bg-white/20 hover:bg-white/30 text-white border-0 hover-lift"
                            onClick={handleCreateTemplate}
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            New Template
                          </Button>
                        </div>
                      </CardHeader>
                    </Card>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <Card>
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                              Active Templates
                            </CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">4</div>
                          <p className="text-xs text-muted-foreground">+2 from last month</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                              Total Interviews
                            </CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">46</div>
                          <p className="text-xs text-muted-foreground">+12 this week</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Score</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">85%</div>
                          <p className="text-xs text-muted-foreground">+3% improvement</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Success Rate</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">72%</div>
                          <p className="text-xs text-muted-foreground">Above industry avg</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Recent Activity */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <Card>
                        <CardHeader>
                          <CardTitle>Recent Interviews</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {interviewAnalytics.slice(0, 3).map((interview) => (
                            <div
                              key={interview.id}
                              className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                            >
                              <div className="space-y-1">
                                <p className="font-medium">{interview.candidateName}</p>
                                <p className="text-sm text-muted-foreground">{interview.template}</p>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold">{interview.score}%</div>
                                <p className="text-xs text-muted-foreground">{interview.completed}</p>
                              </div>
                            </div>
                          ))}
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Popular Templates</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {jobTemplates.slice(0, 3).map((template) => (
                            <div
                              key={template.id}
                              className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                            >
                              <div className="space-y-1">
                                <p className="font-medium">{template.title}</p>
                                <p className="text-sm text-muted-foreground">{template.interviews} interviews</p>
                              </div>
                              <Badge variant={template.status === "active" ? "default" : "secondary"}>
                                {template.status}
                              </Badge>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="job-templates" className="space-y-8 mt-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-semibold">Job Templates</h2>
                        <p className="text-muted-foreground">Create and manage AI interview templates</p>
                      </div>
                      <Button onClick={handleCreateTemplate} className="hover-lift">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Template
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {jobTemplates.map((template) => (
                        <Card key={template.id} className="hover-lift">
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <Badge variant={template.status === "active" ? "default" : "secondary"}>
                                {template.status}
                              </Badge>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEditTemplate(template.id)}
                                  className="hover-lift"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleTestInterview(template.id)}
                                  className="hover-lift"
                                >
                                  <Play className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <CardTitle className="text-lg">{template.title}</CardTitle>
                            <CardDescription>{template.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                {template.duration} minutes
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Users className="h-4 w-4" />
                                {template.interviews} interviews completed
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {template.skills.slice(0, 3).map((skill, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                              {template.skills.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{template.skills.length - 3} more
                                </Badge>
                              )}
                            </div>
                            <div className="flex gap-2 pt-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditTemplate(template.id)}
                                className="flex-1 hover-lift"
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => handleUseTemplate(template.id)}
                                className="flex-1 hover-lift"
                              >
                                <Play className="mr-2 h-4 w-4" />
                                Use Template
                              </Button>
                            </div>
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => handleTestInterview(template.id)}
                              className="w-full hover-lift"
                            >
                              <TestTube className="mr-2 h-4 w-4" />
                              Test AI Interview
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="interview-analysis" className="space-y-8 mt-0">
                    {/* Organization Stats Hero Card */}
                    <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-8">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                            {selectedOrganization} Interview Analytics
                          </h2>
                          <p className="text-gray-600">Comprehensive performance insights and candidate analysis</p>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-cyan-600">{overallMetrics.totalInterviews}</div>
                          <div className="text-sm text-gray-500">
                            {selectedJobRole === "all" ? "Total Interviews" : "Filtered Interviews"}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">
                            {overallMetrics.totalInterviews > 0
                              ? Math.round(
                                  (filteredByJobRole.filter((i) => i.score >= 7).length /
                                    overallMetrics.totalInterviews) *
                                    100,
                                )
                              : 0}
                            %
                          </div>
                          <div className="text-sm text-gray-600">Pass Rate</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{overallMetrics.avgScore}</div>
                          <div className="text-sm text-gray-600">Avg Score</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">24m</div>
                          <div className="text-sm text-gray-600">Avg Duration</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-orange-600">156</div>
                          <div className="text-sm text-gray-600">This Month</div>
                        </div>
                      </div>
                    </div>

                    {/* Job Role Filter */}
                    <div className="flex items-center gap-4">
                      <label className="text-sm font-medium text-gray-700">Filter by Job Role:</label>
                      <select
                        value={selectedJobRole}
                        onChange={(e) => setSelectedJobRole(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      >
                        <option value="all">All Roles</option>
                        <option value="frontend">Frontend Developer</option>
                        <option value="backend">Backend Developer</option>
                        <option value="fullstack">Full Stack Developer</option>
                        <option value="devops">DevOps Engineer</option>
                        <option value="mobile">Mobile Developer</option>
                      </select>
                    </div>

                    {/* Performance Overview */}
                    <div className="grid grid-cols-3 gap-6">
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Score Distribution</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">9-10 (Excellent)</span>
                            <div className="flex items-center gap-2">
                              <div className="w-20 h-2 bg-gray-200 rounded-full">
                                <div className="w-3/4 h-2 bg-green-500 rounded-full"></div>
                              </div>
                              <span className="text-sm font-medium">34%</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">7-8 (Good)</span>
                            <div className="flex items-center gap-2">
                              <div className="w-20 h-2 bg-gray-200 rounded-full">
                                <div className="w-2/3 h-2 bg-blue-500 rounded-full"></div>
                              </div>
                              <span className="text-sm font-medium">39%</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">5-6 (Average)</span>
                            <div className="flex items-center gap-2">
                              <div className="w-20 h-2 bg-gray-200 rounded-full">
                                <div className="w-1/4 h-2 bg-yellow-500 rounded-full"></div>
                              </div>
                              <span className="text-sm font-medium">18%</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Below 5</span>
                            <div className="flex items-center gap-2">
                              <div className="w-20 h-2 bg-gray-200 rounded-full">
                                <div className="w-1/6 h-2 bg-red-500 rounded-full"></div>
                              </div>
                              <span className="text-sm font-medium">9%</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Top Skills</h3>
                        <div className="space-y-3">
                          {["JavaScript", "React", "Node.js", "Python", "System Design"].map((skill, index) => (
                            <div key={skill} className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">{skill}</span>
                              <div className="flex items-center gap-2">
                                <div className="w-16 h-2 bg-gray-200 rounded-full">
                                  <div
                                    className="h-2 bg-cyan-500 rounded-full"
                                    style={{ width: `${85 - index * 10}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium">{85 - index * 10}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Recent Trends</h3>
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">Pass rate increased</div>
                              <div className="text-xs text-gray-500">+5% from last month</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">Avg duration stable</div>
                              <div className="text-xs text-gray-500">24m consistent</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">More candidates</div>
                              <div className="text-xs text-gray-500">+23% applications</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Individual Interview Results */}
                    <div className="bg-white border border-gray-200 rounded-lg">
                      <div className="p-6 border-b border-gray-200">
                        <h3 className="font-semibold text-gray-900">Recent Interview Results</h3>
                        <p className="text-sm text-gray-600 mt-1">Click on a candidate to view detailed analysis</p>
                      </div>

                      <div className="divide-y divide-gray-200">
                        {filteredByJobRole.map((interview, index) => (
                          <div
                            key={index}
                            className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
                            onClick={() => setSelectedCandidate(interview)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                                  {interview.candidateName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900">{interview.candidateName}</div>
                                  <div className="text-sm text-gray-600">{interview.role}</div>
                                </div>
                              </div>

                              <div className="flex items-center gap-6">
                                <div className="text-center">
                                  <div className="text-lg font-semibold text-gray-900">{interview.score}</div>
                                  <div className="text-xs text-gray-500">Score</div>
                                </div>

                                <div className="flex gap-1">
                                  {interview.skills.map((skill, i) => (
                                    <span key={i} className="px-2 py-1 bg-cyan-100 text-cyan-700 text-xs rounded-full">
                                      {skill}
                                    </span>
                                  ))}
                                </div>

                                <div className="text-center">
                                  <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                                      interview.score >= 8
                                        ? "bg-green-100 text-green-700"
                                        : interview.score >= 6
                                          ? "bg-yellow-100 text-yellow-700"
                                          : "bg-red-100 text-red-700"
                                    }`}
                                  >
                                    {interview.score >= 8 ? "Passed" : interview.score >= 6 ? "Review" : "Failed"}
                                  </span>
                                  <div className="text-xs text-gray-500 mt-1">{interview.date}</div>
                                </div>

                                <button
                                  className="px-4 py-2 bg-cyan-600 text-white text-sm rounded-lg hover:bg-cyan-700 transition-colors"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setDetailedAnalysisId(interview.id)
                                  }}
                                >
                                  View Details
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </motion.div>
              </AnimatePresence>
            </Tabs>
          )}
        </main>
      </div>

      {detailedAnalysisId && detailedInterview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{detailedInterview.candidateName}</h2>
                <p className="text-gray-600">{detailedInterview.role} • Interview Analysis</p>
              </div>
              <button
                onClick={() => setDetailedAnalysisId(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Performance Summary */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">{detailedInterview.score}</div>
                  <div className="text-sm text-gray-600">Overall Score</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">{detailedInterview.technicalScore}</div>
                  <div className="text-sm text-gray-600">Technical</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600">{detailedInterview.communicationScore}</div>
                  <div className="text-sm text-gray-600">Communication</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-orange-600">{detailedInterview.problemSolvingScore}</div>
                  <div className="text-sm text-gray-600">Problem Solving</div>
                </div>
              </div>

              {/* Interview Transcript */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Interview Transcript</h3>
                <div className="space-y-4 max-h-60 overflow-y-auto">
                  <div className="bg-white p-4 rounded-lg">
                    <div className="text-sm font-medium text-gray-700 mb-2">Interviewer:</div>
                    <p className="text-gray-600">
                      "Can you explain the difference between React's useState and useEffect hooks?"
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-sm font-medium text-blue-700 mb-2">Candidate:</div>
                    <p className="text-gray-700">
                      "useState is used for managing component state, while useEffect handles side effects like API
                      calls and cleanup. useState returns a state value and setter function, useEffect runs after
                      renders and can have dependencies..."
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="text-sm font-medium text-gray-700 mb-2">Interviewer:</div>
                    <p className="text-gray-600">"Great! Can you provide an example of when you'd use each one?"</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-sm font-medium text-blue-700 mb-2">Candidate:</div>
                    <p className="text-gray-700">
                      "I'd use useState for form inputs or toggle states. For useEffect, I'd use it to fetch data when a
                      component mounts or to set up event listeners..."
                    </p>
                  </div>
                </div>
              </div>

              {/* Assessment */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="font-semibold text-green-800 mb-4">Strengths</h3>
                  <ul className="space-y-2 text-sm text-green-700">
                    <li>• Strong understanding of React fundamentals</li>
                    <li>• Clear and articulate communication</li>
                    <li>• Good problem-solving approach</li>
                    <li>• Practical examples and real-world experience</li>
                    <li>• Confident in technical explanations</li>
                  </ul>
                </div>
                <div className="bg-orange-50 rounded-lg p-6">
                  <h3 className="font-semibold text-orange-800 mb-4">Areas for Improvement</h3>
                  <ul className="space-y-2 text-sm text-orange-700">
                    <li>• Could elaborate more on advanced React patterns</li>
                    <li>• Performance optimization knowledge could be deeper</li>
                    <li>• Testing strategies need more detail</li>
                    <li>• State management solutions understanding</li>
                  </ul>
                </div>
              </div>

              {/* Suggestions */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="font-semibold text-blue-800 mb-4">Recommendations</h3>
                <div className="space-y-3 text-sm text-blue-700">
                  <p>
                    <strong>Hiring Decision:</strong> Recommend for hire - Strong technical foundation with good
                    communication skills.
                  </p>
                  <p>
                    <strong>Next Steps:</strong> Consider for mid-level position with mentorship on advanced React
                    patterns.
                  </p>
                  <p>
                    <strong>Development Areas:</strong> Provide resources on React performance optimization and testing
                    best practices.
                  </p>
                  <p>
                    <strong>Team Fit:</strong> Would work well in collaborative environment, good mentoring potential.
                  </p>
                </div>
              </div>

              {/* Skills Assessment */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Skills Assessment</h3>
                <div className="grid grid-cols-2 gap-4">
                  {detailedInterview.skills.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{skill}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-cyan-600 h-2 rounded-full"
                            style={{ width: `${Math.random() * 40 + 60}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500">{Math.floor(Math.random() * 3 + 7)}/10</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default InterviewAI
export { InterviewAI }
