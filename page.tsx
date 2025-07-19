"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ResumeForm } from "@/components/resume-form"
import { ResumePreview } from "@/components/resume-preview"
import { useTheme } from "next-themes"
import { MoonIcon, SunIcon, SparklesIcon, StarIcon } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { TemplateGallery } from "@/components/template-gallery"

export default function ResumeBuilderPage() {
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    linkedin: "linkedin.com/in/johndoe",
    github: "github.com/johndoe",
    summary:
      "Highly motivated software engineer with 5 years of experience in developing scalable web applications. Proficient in React, Node.js, and cloud platforms. Seeking to leverage technical expertise to contribute to innovative projects.",
    education: [
      { institution: "University of Example", degree: "M.S. Computer Science", year: "2020" },
      { institution: "Another University", degree: "B.S. Software Engineering", year: "2018" },
    ],
    experience: [
      {
        title: "Senior Software Engineer",
        company: "Tech Solutions Inc.",
        years: "2022 - Present",
        description:
          "- Led development of a new microservice architecture, improving system performance by 30%.\n- Mentored junior engineers and conducted code reviews.",
      },
      {
        title: "Software Engineer",
        company: "Innovate Corp.",
        years: "2020 - 2022",
        description:
          "- Developed and maintained RESTful APIs using Node.js and Express.\n- Collaborated with product teams to define and implement new features.",
      },
    ],
    skills:
      "JavaScript, TypeScript, React, Node.js, Express, PostgreSQL, MongoDB, AWS, Docker, Git, Agile, RESTful APIs",
    jobRole: "Software Engineer",
    profilePicture: null, // New field for profile picture Data URL
  })
  const [selectedTemplate, setSelectedTemplate] = useState("modern")
  const [aiSuggestedContent, setAiSuggestedContent] = useState("")
  const [aiRatingAndTips, setAiRatingAndTips] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isRating, setIsRating] = useState(false)

  const { theme, setTheme } = useTheme()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleProfilePictureChange = (dataUrl: string | null) => {
    setFormData((prev) => ({ ...prev, profilePicture: dataUrl }))
  }

  const handleEducationChange = (index: number, field: string, value: string) => {
    const newEducation = [...formData.education]
    newEducation[index] = { ...newEducation[index], [field]: value }
    setFormData((prev) => ({ ...prev, education: newEducation }))
  }

  const handleAddEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, { institution: "", degree: "", year: "" }],
    }))
  }

  const handleRemoveEducation = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }))
  }

  const handleExperienceChange = (index: number, field: string, value: string) => {
    const newExperience = [...formData.experience]
    newExperience[index] = { ...newExperience[index], [field]: value }
    setFormData((prev) => ({ ...prev, experience: newExperience }))
  }

  const handleAddExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [...prev.experience, { title: "", company: "", years: "", description: "" }],
    }))
  }

  const handleRemoveExperience = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }))
  }

  const handleGenerateAISuggestions = async () => {
    setIsGenerating(true)
    setAiSuggestedContent("")
    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "suggestResume", data: formData }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      if (result.suggestedContent) {
        setAiSuggestedContent(result.suggestedContent)
        toast({
          title: "AI Suggestions Generated!",
          description: "Review the suggestions and apply them to your resume.",
        })
      } else {
        toast({
          title: "Failed to get AI suggestions.",
          description: result.error || "An unknown error occurred.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error generating AI suggestions:", error)
      toast({
        title: "Error generating AI suggestions.",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleApplyAISuggestions = () => {
    if (aiSuggestedContent) {
      // Simple parsing: assume first 2-3 sentences are summary, rest are bullet points for experience/skills
      const lines = aiSuggestedContent.split("\n").filter((line) => line.trim() !== "")
      let newSummary = ""
      let newExperienceSkills = ""

      // Attempt to parse summary (first few lines) and then skills/experience
      let summaryLinesCount = 0
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith("-") || lines[i].startsWith("*")) {
          // Found bullet points, so summary must be before this
          newSummary = lines.slice(0, i).join("\n").trim()
          newExperienceSkills = lines.slice(i).join("\n").trim()
          break
        }
        summaryLinesCount++
        if (summaryLinesCount >= 3) {
          // Heuristic: if no bullets after 3 lines, assume it's all summary or mixed
          newSummary = lines.slice(0, 3).join("\n").trim()
          newExperienceSkills = lines.slice(3).join("\n").trim()
          break
        }
      }
      if (!newSummary && lines.length > 0) {
        // Fallback if no bullets found
        newSummary = lines[0].trim()
        newExperienceSkills = lines.slice(1).join("\n").trim()
      }

      setFormData((prev) => ({
        ...prev,
        summary: newSummary || prev.summary,
        // This is a simplification. A more robust solution would parse experience and skills separately.
        // For now, we'll put the rest into a combined field or prompt the user to manually apply.
        // For demonstration, let's just update the summary and suggest manual application for bullets.
      }))
      toast({
        title: "AI Summary Applied!",
        description: "Please manually review and apply the suggested experience and skills bullet points.",
      })
    }
  }

  const handleRateResume = async () => {
    setIsRating(true)
    setAiRatingAndTips("")
    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "rateResume",
          data: {
            resumeContent: JSON.stringify(formData, null, 2), // Send the raw data for AI to interpret
            jobRole: formData.jobRole,
          },
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      if (result.ratingAndTips) {
        setAiRatingAndTips(result.ratingAndTips)
        toast({
          title: "Resume Rated!",
          description: "Check the AI Feedback tab for tips.",
        })
      } else {
        toast({
          title: "Failed to rate resume.",
          description: result.error || "An unknown error occurred.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error rating resume:", error)
      toast({
        title: "Error rating resume.",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsRating(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-8 bg-background text-foreground">
      <div className="w-full max-w-6xl flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Resume Builder</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-6xl">
        {/* Left Panel: Form and AI Tools */}
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Resume Details</CardTitle>
            </CardHeader>
            <CardContent>
              <ResumeForm
                formData={formData}
                onInputChange={handleInputChange}
                onProfilePictureChange={handleProfilePictureChange} // Pass new handler
                onEducationChange={handleEducationChange}
                onAddEducation={handleAddEducation}
                onRemoveEducation={handleRemoveEducation}
                onExperienceChange={handleExperienceChange}
                onAddExperience={handleAddExperience}
                onRemoveExperience={handleRemoveExperience}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="suggestions" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="suggestions">AI Suggestions</TabsTrigger>
                  <TabsTrigger value="feedback">AI Feedback</TabsTrigger>
                </TabsList>
                <TabsContent value="suggestions" className="mt-4">
                  <div className="flex flex-col gap-4">
                    <Button onClick={handleGenerateAISuggestions} disabled={isGenerating}>
                      {isGenerating ? (
                        "Generating..."
                      ) : (
                        <>
                          <SparklesIcon className="mr-2 h-4 w-4" /> Generate AI Suggestions
                        </>
                      )}
                    </Button>
                    {aiSuggestedContent && (
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="ai-suggestions">Suggested Content</Label>
                        <Textarea
                          id="ai-suggestions"
                          value={aiSuggestedContent}
                          readOnly
                          rows={10}
                          className="font-mono text-sm"
                        />
                        <Button onClick={handleApplyAISuggestions} variant="outline">
                          Apply AI Summary
                        </Button>
                        <p className="text-sm text-muted-foreground">
                          Note: For experience and skills, please manually copy relevant bullet points.
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="feedback" className="mt-4">
                  <div className="flex flex-col gap-4">
                    <Button onClick={handleRateResume} disabled={isRating}>
                      {isRating ? (
                        "Rating..."
                      ) : (
                        <>
                          <StarIcon className="mr-2 h-4 w-4" /> Rate My Resume
                        </>
                      )}
                    </Button>
                    {aiRatingAndTips && (
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="ai-feedback">Resume Rating & Tips</Label>
                        <Textarea
                          id="ai-feedback"
                          value={aiRatingAndTips}
                          readOnly
                          rows={10}
                          className="font-mono text-sm"
                        />
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel: Template Selector and Preview */}
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Template Selection</CardTitle>
            </CardHeader>
            <CardContent>
              <TemplateGallery selectedTemplate={selectedTemplate} onSelectTemplate={setSelectedTemplate} />
            </CardContent>
          </Card>

          <Card className="flex-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Resume Preview</CardTitle>
            </CardHeader>
            <CardContent className="h-[600px] overflow-hidden">
              <ScrollArea className="h-full w-full rounded-md border p-4">
                <ResumePreview formData={formData} template={selectedTemplate} />
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
