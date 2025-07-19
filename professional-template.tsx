import { Separator } from "@/components/ui/separator"
import Image from "next/image"

interface ProfessionalTemplateProps {
  formData: any
}

export function ProfessionalTemplate({ formData }: ProfessionalTemplateProps) {
  return (
    <div className="p-8 font-sans text-sm leading-normal text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900">
      <header className="mb-8 flex items-center justify-center flex-col">
        {formData.profilePicture && (
          <Image
            src={formData.profilePicture || "/placeholder.svg"}
            alt="Profile"
            width={100}
            height={100}
            className="rounded-full object-cover mb-4"
          />
        )}
        <h1 className="text-4xl font-bold text-center mb-2">{formData.name}</h1>
        <div className="flex justify-center gap-4 text-gray-600 dark:text-gray-400 text-xs">
          <span>{formData.email}</span>
          <Separator orientation="vertical" className="h-4" />
          <span>{formData.phone}</span>
          <Separator orientation="vertical" className="h-4" />
          <a
            href={`https://${formData.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            LinkedIn
          </a>
          <Separator orientation="vertical" className="h-4" />
          <a href={`https://${formData.github}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
            GitHub
          </a>
        </div>
      </header>

      <section className="mb-6">
        <h2 className="text-xl font-bold text-primary dark:text-primary mb-2">Summary</h2>
        <p className="text-base">{formData.summary}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold text-primary dark:text-primary mb-2">Experience</h2>
        {formData.experience.map((exp: any, index: number) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-baseline">
              <h3 className="font-semibold text-base">{exp.title}</h3>
              <span className="text-gray-600 dark:text-gray-400 text-xs">{exp.years}</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-1">{exp.company}</p>
            <ul className="list-disc list-inside ml-4 text-sm">
              {exp.description
                .split("\n")
                .map((item: string, i: number) => item.trim() && <li key={i}>{item.replace(/^- /, "")}</li>)}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold text-primary dark:text-primary mb-2">Education</h2>
        {formData.education.map((edu: any, index: number) => (
          <div key={index} className="mb-2">
            <div className="flex justify-between items-baseline">
              <h3 className="font-semibold text-base">{edu.degree}</h3>
              <span className="text-gray-600 dark:text-gray-400 text-xs">{edu.year}</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">{edu.institution}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-xl font-bold text-primary dark:text-primary mb-2">Skills</h2>
        <p className="text-sm">{formData.skills}</p>
      </section>
    </div>
  )
}
