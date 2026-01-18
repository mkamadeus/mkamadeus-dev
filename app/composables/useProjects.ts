interface ProjectLocaleData {
  title: string
  description: string
}

interface ProjectData {
  icon: string
  stacks: string[]
  url: string | string[]
  isPrivate?: boolean
  order: number
  en: ProjectLocaleData
  id: ProjectLocaleData
  ja: ProjectLocaleData
  ko: ProjectLocaleData
}

interface ProjectOutput {
  icon: string
  title: string
  description: string
  stacks: string[]
  url: string | string[]
  isPrivate?: boolean
  order: number
}

export const useProjects = async () => {
  const { locale } = useI18n()

  const projects = await queryCollection('projects').all()

  return projects
    .map((project: ProjectData): ProjectOutput => {
      const currentLocale = locale.value as 'en' | 'id' | 'ja' | 'ko'
      const localeData = project[currentLocale] || project.en

      return {
        icon: project.icon,
        title: localeData.title,
        description: localeData.description,
        stacks: project.stacks,
        url: project.url,
        isPrivate: project.isPrivate,
        order: project.order,
      }
    })
    .sort((a: ProjectOutput, b: ProjectOutput) => a.order - b.order)
}
