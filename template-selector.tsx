"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface TemplateSelectorProps {
  selectedTemplate: string
  onSelectTemplate: (template: string) => void
}

export function TemplateSelector({ selectedTemplate, onSelectTemplate }: TemplateSelectorProps) {
  return (
    <div className="grid gap-2">
      <Label htmlFor="template-select">Choose Template</Label>
      <Select value={selectedTemplate} onValueChange={onSelectTemplate}>
        <SelectTrigger id="template-select">
          <SelectValue placeholder="Select a template" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="basic">Basic (Offline)</SelectItem>
          <SelectItem value="modern">Modern (Online)</SelectItem>
          <SelectItem value="creative">Creative (Online)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
