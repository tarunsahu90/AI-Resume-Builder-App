import {
  MailIcon,
  PhoneIcon,
  LinkedinIcon,
  GithubIcon,
  GraduationCapIcon,
  BriefcaseIcon,
  LightbulbIcon,
} from "lucide-react"
import Image from "next/image"

interface ModernTemplateProps {
  formData: any
}

export function ModernTemplate({ formData }: ModernTemplateProps) {
  return (
    <div className="p-8 font-sans text-sm leading-normal text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900">
      <header className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
        <div>
          <h1 className="text-4xl font-bold text-primary-foreground dark:text-primary-foreground">{formData.name}</h1>
          <p className="text-lg text-muted-foreground dark:text-muted-foreground">{formData.jobRole}</p>
        </div>
        <div className="flex flex-col items-end">
          {formData.profilePicture && (
            <Image
              src={formData.profilePicture || "/placeholder.svg"}
              alt="Profile"
              width={96}
              height={96}
              className="rounded-full object-cover mb-4"
            />
          )}
          <div className="text-right text-sm text-gray-600 dark:text-gray-400">
            <p className="flex items-center justify-end gap-1">
              <MailIcon className="h-3 w-3" /> {formData.email}
            </p>
            <p className="flex items-center justify-end gap-1">
              <PhoneIcon className="h-3 w-3" /> {formData.phone}
            </p>
            <p className="flex items-center justify-end gap-1">
              <LinkedinIcon className="h-3 w-3" />{" "}
              <a
                href={`https://${formData.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {formData.linkedin}
              </a>
            </p>
            <p className="flex items-center justify-end gap-1">
              <GithubIcon className="h-3 w-3" />{" "}
              <a
                href={`https://${formData.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {formData.github}
              </a>
            </p>
          </div>
        </div>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2 text-primary dark:text-primary">
          <LightbulbIcon className="h-5 w-5" /> Summary
        </h2>
        <p className="text-base">{formData.summary}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2 text-primary dark:text-primary">
          <BriefcaseIcon className="h-5 w-5" /> Experience
        </h2>
        {formData.experience.map((exp: any, index: number) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-baseline">
              <h3 className="font-bold text-lg">{exp.title}</h3>
              <span className="text-gray-600 dark:text-gray-400 text-sm">{exp.years}</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-1">{exp.company}</p>
            <ul className="list-disc list-inside ml-4 text-base">
              {exp.description
                .split("\n")
                .map((item: string, i: number) => item.trim() && <li key={i}>{item.replace(/^- /, "")}</li>)}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2 text-primary dark:text-primary">
          <GraduationCapIcon className="h-5 w-5" /> Education
        </h2>
        {formData.education.map((edu: any, index: number) => (
          <div key={index} className="mb-2">
            <div className="flex justify-between items-baseline">
              <h3 className="font-bold text-lg">{edu.degree}</h3>
              <span className="text-gray-600 dark:text-gray-400 text-sm">{edu.year}</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300">{edu.institution}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2 text-primary dark:text-primary">
          <LightbulbIcon className="h-5 w-5" /> Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {formData.skills.split(",").map(
            (skill: string, index: number) =>
              skill.trim() && (
                <span key={index} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                  {skill.trim()}
                </span>
              ),
          )}
        </div>
      </section>
    </div>
  )
}
