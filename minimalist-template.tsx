import Image from "next/image"

interface MinimalistTemplateProps {
  formData: any
}

export function MinimalistTemplate({ formData }: MinimalistTemplateProps) {
  return (
    <div className="p-8 font-sans text-sm leading-relaxed text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900">
      <header className="mb-8 text-center">
        {formData.profilePicture && (
          <Image
            src={formData.profilePicture || "/placeholder.svg"}
            alt="Profile"
            width={100}
            height={100}
            className="rounded-full object-cover mx-auto mb-4"
          />
        )}
        <h1 className="text-4xl font-bold mb-1">{formData.name}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">{formData.jobRole}</p>
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-500">
          {formData.email} | {formData.phone} | {formData.linkedin} | {formData.github}
        </div>
      </header>

      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b pb-1 mb-3">Summary</h2>
        <p>{formData.summary}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b pb-1 mb-3">Experience</h2>
        {formData.experience.map((exp: any, index: number) => (
          <div key={index} className="mb-4">
            <h3 className="font-bold text-base">
              {exp.title}, {exp.company}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs mb-1">{exp.years}</p>
            <ul className="list-disc list-inside ml-4">
              {exp.description
                .split("\n")
                .map((item: string, i: number) => item.trim() && <li key={i}>{item.replace(/^- /, "")}</li>)}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b pb-1 mb-3">Education</h2>
        {formData.education.map((edu: any, index: number) => (
          <div key={index} className="mb-2">
            <h3 className="font-bold text-base">{edu.degree}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs">
              {edu.institution}, {edu.year}
            </p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-xl font-semibold border-b pb-1 mb-3">Skills</h2>
        <p>{formData.skills}</p>
      </section>
    </div>
  )
}
