"use client"

import type React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { PlusIcon, MinusIcon } from "lucide-react"
import Image from "next/image" // Import Image component

interface ResumeFormProps {
  formData: any
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onProfilePictureChange: (dataUrl: string | null) => void // New prop for profile picture
  onEducationChange: (index: number, field: string, value: string) => void
  onAddEducation: () => void
  onRemoveEducation: (index: number) => void
  onExperienceChange: (index: number, field: string, value: string) => void
  onAddExperience: () => void
  onRemoveExperience: (index: number) => void
}

export function ResumeForm({
  formData,
  onInputChange,
  onProfilePictureChange, // Destructure new prop
  onEducationChange,
  onAddEducation,
  onRemoveEducation,
  onExperienceChange,
  onAddExperience,
  onRemoveExperience,
}: ResumeFormProps) {
  const handleEducationChange = (index: number, field: string, value: string) => {
    onEducationChange(index, field, value)
  }

  const handleRemoveEducation = (index: number) => {
    onRemoveEducation(index)
  }

  const handleExperienceChange = (index: number, field: string, value: string) => {
    onExperienceChange(index, field, value)
  }

  const handleRemoveExperience = (index: number) => {
    onRemoveExperience(index)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        onProfilePictureChange(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      onProfilePictureChange(null)
    }
  }

  return (
    <form className="grid gap-6">
      <h3 className="text-lg font-semibold">Personal Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" value={formData.name} onChange={onInputChange} />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" value={formData.email} onChange={onInputChange} />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" value={formData.phone} onChange={onInputChange} />
        </div>
        <div>
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input id="linkedin" name="linkedin" value={formData.linkedin} onChange={onInputChange} />
        </div>
        <div>
          <Label htmlFor="github">GitHub</Label>
          <Input id="github" name="github" value={formData.github} onChange={onInputChange} />
        </div>
        <div>
          <Label htmlFor="jobRole">Job Role (for AI)</Label>
          <Input id="jobRole" name="jobRole" value={formData.jobRole} onChange={onInputChange} />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="profilePicture">Profile Picture</Label>
          <Input id="profilePicture" name="profilePicture" type="file" accept="image/*" onChange={handleFileChange} />
          {formData.profilePicture && (
            <div className="mt-2">
              <Image
                src={formData.profilePicture || "/placeholder.svg"}
                alt="Profile Preview"
                width={80}
                height={80}
                className="rounded-full object-cover"
              />
            </div>
          )}
        </div>
      </div>

      <h3 className="text-lg font-semibold mt-4">Summary</h3>
      <div>
        <Label htmlFor="summary">Summary</Label>
        <Textarea id="summary" name="summary" value={formData.summary} onChange={onInputChange} rows={5} />
      </div>

      <h3 className="text-lg font-semibold mt-4">Education</h3>
      {formData.education.map((edu: any, index: number) => (
        <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 border p-4 rounded-md relative">
          <div className="md:col-span-2">
            <Label htmlFor={`institution-${index}`}>Institution</Label>
            <Input
              id={`institution-${index}`}
              value={edu.institution}
              onChange={(e) => handleEducationChange(index, "institution", e.target.value)}
            />
          </div>
          <div className="md:col-span-1">
            <Label htmlFor={`degree-${index}`}>Degree</Label>
            <Input
              id={`degree-${index}`}
              value={edu.degree}
              onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
            />
          </div>
          <div className="md:col-span-1">
            <Label htmlFor={`year-${index}`}>Year</Label>
            <Input
              id={`year-${index}`}
              value={edu.year}
              onChange={(e) => handleEducationChange(index, "year", e.target.value)}
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={() => handleRemoveEducation(index)}
            className="absolute top-2 right-2"
            aria-label="Remove education entry"
          >
            <MinusIcon className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button type="button" onClick={onAddEducation} variant="outline" className="w-full bg-transparent">
        <PlusIcon className="mr-2 h-4 w-4" /> Add Education
      </Button>

      <h3 className="text-lg font-semibold mt-4">Experience</h3>
      {formData.experience.map((exp: any, index: number) => (
        <div key={index} className="grid grid-cols-1 gap-4 border p-4 rounded-md relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`title-${index}`}>Title</Label>
              <Input
                id={`title-${index}`}
                value={exp.title}
                onChange={(e) => handleExperienceChange(index, "title", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor={`company-${index}`}>Company</Label>
              <Input
                id={`company-${index}`}
                value={exp.company}
                onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor={`years-${index}`}>Years</Label>
              <Input
                id={`years-${index}`}
                value={exp.years}
                onChange={(e) => handleExperienceChange(index, "years", e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor={`description-${index}`}>Description (use bullet points)</Label>
            <Textarea
              id={`description-${index}`}
              value={exp.description}
              onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
              rows={5}
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={() => handleRemoveExperience(index)}
            className="absolute top-2 right-2"
            aria-label="Remove experience entry"
          >
            <MinusIcon className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button type="button" onClick={onAddExperience} variant="outline" className="w-full bg-transparent">
        <PlusIcon className="mr-2 h-4 w-4" /> Add Experience
      </Button>

      <h3 className="text-lg font-semibold mt-4">Skills</h3>
      <div>
        <Label htmlFor="skills">Skills (comma-separated)</Label>
        <Textarea id="skills" name="skills" value={formData.skills} onChange={onInputChange} rows={3} />
      </div>
    </form>
  )
}
