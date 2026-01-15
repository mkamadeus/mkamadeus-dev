export const useProjects = async () => {
  const { locale } = useI18n()

  const projects = await queryContent('projects').find()

  return projects
    .map((project) => {
      const currentLocale = locale.value as string
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
    .sort((a, b) => a.order - b.order)
}
