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
  en_US: ProjectLocaleData
  id_ID: ProjectLocaleData
  ja_JP: ProjectLocaleData
  ko_KR: ProjectLocaleData
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
      const localeMap: Record<string, keyof ProjectData> = {
        en: 'en_US',
        id: 'id_ID',
        ja: 'ja_JP',
        ko: 'ko_KR',
      }

      const localeKey = localeMap[locale.value] || 'en_US'
      const localeData = project[localeKey] as ProjectLocaleData

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
