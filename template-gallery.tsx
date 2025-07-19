"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { BasicTemplate } from "@/components/templates/basic-template"
import { ModernTemplate } from "@/components/templates/modern-template"
import { CreativeTemplate } from "@/components/templates/creative-template"
import { MinimalistTemplate } from "@/components/templates/minimalist-template"
import { ProfessionalTemplate } from "@/components/templates/professional-template"

interface TemplateGalleryProps {
  selectedTemplate: string
  onSelectTemplate: (template: string) => void
}

// Define a list of all available templates for the gallery
const templates = [
  { id: "basic", name: "Basic", component: BasicTemplate },
  { id: "modern", name: "Modern", component: ModernTemplate },
  { id: "creative", name: "Creative", component: CreativeTemplate },
  { id: "minimalist", name: "Minimalist", component: MinimalistTemplate },
  { id: "professional", name: "Professional", component: ProfessionalTemplate },
  // Add placeholders for more templates (you would replace these with actual components)
  { id: "template6", name: "Template 6", component: BasicTemplate }, // Placeholder
  { id: "template7", name: "Template 7", component: ModernTemplate }, // Placeholder
  { id: "template8", name: "Template 8", component: CreativeTemplate }, // Placeholder
  { id: "template9", name: "Template 9", component: MinimalistTemplate }, // Placeholder
  { id: "template10", name: "Template 10", component: ProfessionalTemplate }, // Placeholder
  { id: "template11", name: "Template 11", component: BasicTemplate }, // Placeholder
  { id: "template12", name: "Template 12", component: ModernTemplate }, // Placeholder
  { id: "template13", name: "Template 13", component: CreativeTemplate }, // Placeholder
  { id: "template14", name: "Template 14", component: MinimalistTemplate }, // Placeholder
  { id: "template15", name: "Template 15", component: ProfessionalTemplate }, // Placeholder
  { id: "template16", name: "Template 16", component: BasicTemplate }, // Placeholder
  { id: "template17", name: "Template 17", component: ModernTemplate }, // Placeholder
  { id: "template18", name: "Template 18", component: CreativeTemplate }, // Placeholder
  { id: "template19", name: "Template 19", component: MinimalistTemplate }, // Placeholder
  { id: "template20", name: "Template 20", component: ProfessionalTemplate }, // Placeholder
]

export function TemplateGallery({ selectedTemplate, onSelectTemplate }: TemplateGalleryProps) {
  // Dummy data for static previews (can be simplified or use actual formData)
  const dummyFormData = {
    name: "Jane Doe",
    jobRole: "Designer",
    summary: "Creative designer with a passion for user-centric design.",
    experience: [
      {
        title: "Lead Designer",
        company: "Design Co.",
        years: "2020-Present",
        description: "- Designed UI/UX for web applications.",
      },
    ],
    education: [{ degree: "B.A. Graphic Design", institution: "Art Institute", year: "2019" }],
    skills: "Figma, Photoshop, Illustrator, UX/UI, Branding",
    email: "jane.doe@example.com",
    phone: "987-654-3210",
    linkedin: "linkedin.com/in/janedoe",
    github: "github.com/janedoe",
  }

  return (
    <ScrollArea className="h-[300px] w-full pr-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={cn(
              "cursor-pointer hover:border-primary transition-colors",
              selectedTemplate === template.id && "border-2 border-primary ring-2 ring-primary",
            )}
            onClick={() => onSelectTemplate(template.id)}
          >
            <CardContent className="p-2 flex flex-col items-center justify-center text-center">
              <div className="w-full h-24 overflow-hidden border rounded-md mb-2 relative bg-gray-50 dark:bg-gray-800">
                {/* Render a scaled-down, static preview of the template */}
                <div className="scale-[0.2] origin-top-left w-[500%] h-[500%] pointer-events-none">
                  {/* Render the actual template component with dummy data */}
                  <template.component formData={dummyFormData} />
                </div>
              </div>
              <span className="text-sm font-medium">{template.name}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  )
}
