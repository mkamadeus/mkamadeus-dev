export const useBlogs = async () => {
  const { locale } = useI18n()
  const currentLocale = locale.value as string

  const blogs = await queryContent(`blogs/${currentLocale}`).find().catch(() => [])
  const fallbackBlogs = currentLocale !== 'en' ? await queryContent('blogs/en').find() : []

  return { blogs, fallbackBlogs, currentLocale }
}

export const useBlogAvailableLanguages = async (slug: string) => {
  const locales = ['en', 'id', 'ja', 'ko']
  const available: string[] = []

  for (const locale of locales) {
    const content = await queryContent(`blogs/${locale}/${slug}`).findOne().catch(() => null)
    if (content) {
      available.push(locale)
    }
  }

  return available
}

export const useBlogBySlug = async (slug: string) => {
  const { locale } = useI18n()
  const currentLocale = locale.value as string

  const localizedPath = `blogs/${currentLocale}/${slug}`
  const fallbackPath = `blogs/en/${slug}`

  let content = await queryContent(localizedPath).findOne().catch(() => null)
  if (!content) {
    content = await queryContent(fallbackPath).findOne().catch(() => null)
  }

  return content
}
