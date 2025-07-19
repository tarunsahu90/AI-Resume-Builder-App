import Image from "next/image"

interface BasicTemplateProps {
  formData: any
}

export function BasicTemplate({ formData }: BasicTemplateProps) {
  return (
    <div className="p-8 font-sans text-sm leading-normal text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-bold uppercase tracking-wide">{formData.name}</h1>
        {formData.profilePicture && (
          <Image
            src={formData.profilePicture || "/placeholder.svg"}
            alt="Profile"
            width={80}
            height={80}
            className="rounded-full object-cover"
          />
        )}
      </div>
      <div className="text-center mb-6 text-gray-600 dark:text-gray-400">
        {formData.email} | {formData.phone} |{" "}
        <a href={`https://${formData.linkedin}`} target="_blank" rel="noopener noreferrer" className="underline">
          {formData.linkedin}
        </a>{" "}
        |{" "}
        <a href={`https://${formData.github}`} target="_blank" rel="noopener noreferrer" className="underline">
          {formData.github}
        </a>
      </div>

      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b-2 border-gray-300 dark:border-gray-700 pb-1 mb-3">Summary</h2>
        <p>{formData.summary}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b-2 border-gray-300 dark:border-gray-700 pb-1 mb-3">Experience</h2>
        {formData.experience.map((exp: any, index: number) => (
          <div key={index} className="mb-4">
            <h3 className="font-bold text-lg">
              {exp.title} at {exp.company}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">{exp.years}</p>
            <ul className="list-disc list-inside ml-4">
              {exp.description
                .split("\n")
                .map((item: string, i: number) => item.trim() && <li key={i}>{item.replace(/^- /, "")}</li>)}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b-2 border-gray-300 dark:border-gray-700 pb-1 mb-3">Education</h2>
        {formData.education.map((edu: any, index: number) => (
          <div key={index} className="mb-2">
            <h3 className="font-bold text-lg">{edu.degree}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {edu.institution}, {edu.year}
            </p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-xl font-semibold border-b-2 border-gray-300 dark:border-gray-700 pb-1 mb-3">Skills</h2>
        <p>{formData.skills}</p>
      </section>
    </div>
  )
}
