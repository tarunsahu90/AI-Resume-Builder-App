import { MailIcon, PhoneIcon, LinkedinIcon, GithubIcon, BookOpenIcon, BriefcaseIcon, CodeIcon } from "lucide-react"
import Image from "next/image"

interface CreativeTemplateProps {
  formData: any
}

export function CreativeTemplate({ formData }: CreativeTemplateProps) {
  return (
    <div className="grid grid-cols-3 gap-0 min-h-[800px] font-sans text-sm text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900">
      {/* Left Sidebar */}
      <div className="col-span-1 bg-gradient-to-b from-primary to-primary/80 text-primary-foreground p-8 flex flex-col gap-6">
        <div className="text-center mb-6">
          {formData.profilePicture && (
            <Image
              src={formData.profilePicture || "/placeholder.svg"}
              alt="Profile"
              width={120}
              height={120}
              className="rounded-full object-cover mx-auto mb-4 border-4 border-primary-foreground/50"
            />
          )}
          <h1 className="text-3xl font-bold uppercase tracking-wider mb-1">{formData.name}</h1>
          <p className="text-lg font-light">{formData.jobRole}</p>
        </div>

        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b border-primary-foreground/50 pb-2 mb-3 flex items-center gap-2">
            Contact
          </h2>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <MailIcon className="h-4 w-4" /> {formData.email}
            </li>
            <li className="flex items-center gap-2">
              <PhoneIcon className="h-4 w-4" /> {formData.phone}
            </li>
            <li className="flex items-center gap-2">
              <LinkedinIcon className="h-4 w-4" />{" "}
              <a
                href={`https://${formData.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {formData.linkedin}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <GithubIcon className="h-4 w-4" />{" "}
              <a
                href={`https://${formData.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {formData.github}
              </a>
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold border-b border-primary-foreground/50 pb-2 mb-3 flex items-center gap-2">
            <CodeIcon className="h-5 w-5" /> Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {formData.skills.split(",").map(
              (skill: string, index: number) =>
                skill.trim() && (
                  <span key={index} className="bg-primary-foreground/20 px-3 py-1 rounded-full text-sm">
                    {skill.trim()}
                  </span>
                ),
            )}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold border-b border-primary-foreground/50 pb-2 mb-3 flex items-center gap-2">
            <BookOpenIcon className="h-5 w-5" /> Education
          </h2>
          {formData.education.map((edu: any, index: number) => (
            <div key={index} className="mb-3">
              <h3 className="font-bold text-base">{edu.degree}</h3>
              <p className="text-sm">{edu.institution}</p>
              <p className="text-xs opacity-80">{edu.year}</p>
            </div>
          ))}
        </section>
      </div>

      {/* Right Content */}
      <div className="col-span-2 p-8 bg-background dark:bg-gray-800">
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary dark:text-primary mb-3">Summary</h2>
          <p className="text-base leading-relaxed">{formData.summary}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary dark:text-primary mb-3 flex items-center gap-2">
            <BriefcaseIcon className="h-6 w-6" /> Experience
          </h2>
          {formData.experience.map((exp: any, index: number) => (
            <div key={index} className="mb-5">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-lg">{exp.title}</h3>
                <span className="text-gray-600 dark:text-gray-400 text-sm">{exp.years}</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-2">{exp.company}</p>
              <ul className="list-disc list-inside ml-4 text-base">
                {exp.description
                  .split("\n")
                  .map((item: string, i: number) => item.trim() && <li key={i}>{item.replace(/^- /, "")}</li>)}
              </ul>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}
