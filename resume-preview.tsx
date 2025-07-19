"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { DownloadIcon } from "lucide-react"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import { BasicTemplate } from "@/components/templates/basic-template"
import { ModernTemplate } from "@/components/templates/modern-template"
import { CreativeTemplate } from "@/components/templates/creative-template"
import { toast } from "@/components/ui/use-toast"

interface ResumePreviewProps {
  formData: any
  template: string
}

export function ResumePreview({ formData, template }: ResumePreviewProps) {
  const resumeRef = useRef<HTMLDivElement>(null)

  const exportPDF = async () => {
    if (!resumeRef.current) {
      toast({
        title: "Error exporting PDF.",
        description: "Resume content not found.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Generating PDF...",
      description: "This might take a moment.",
    })

    try {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2, // Increase scale for better quality
        useCORS: true, // Important for images if any
        windowWidth: resumeRef.current.scrollWidth,
        windowHeight: resumeRef.current.scrollHeight,
      })

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height], // Use canvas dimensions for PDF
      })

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height)
      pdf.save(`${formData.name.replace(/\s/g, "_")}_resume.pdf`)
      toast({
        title: "PDF Exported!",
        description: "Your resume has been downloaded.",
      })
    } catch (error) {
      console.error("Error exporting PDF:", error)
      toast({
        title: "Error exporting PDF.",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      })
    }
  }

  const renderTemplate = () => {
    switch (template) {
      case "basic":
        return <BasicTemplate formData={formData} />
      case "modern":
        return <ModernTemplate formData={formData} />
      case "creative":
        return <CreativeTemplate formData={formData} />
      default:
        return <ModernTemplate formData={formData} />
    }
  }

  return (
    <div className="flex flex-col items-center w-full">
      <div ref={resumeRef} className="w-full max-w-a4 mx-auto bg-background shadow-lg rounded-md overflow-hidden">
        {renderTemplate()}
      </div>
      <Button onClick={exportPDF} className="mt-6">
        <DownloadIcon className="mr-2 h-4 w-4" /> Export as PDF
      </Button>
    </div>
  )
}
