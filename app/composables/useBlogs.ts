import type { BlogsEnCollectionItem, BlogsIdCollectionItem, BlogsJaCollectionItem, BlogsKoCollectionItem } from '@nuxt/content'

type BlogCollectionItem = BlogsEnCollectionItem | BlogsIdCollectionItem | BlogsJaCollectionItem | BlogsKoCollectionItem

export const useBlogs = async () => {
  const { locale } = useI18n()
  const currentLocale = locale.value as string

  const collectionName = `blogs_${currentLocale}` as 'blogs_en' | 'blogs_id' | 'blogs_ja' | 'blogs_ko'
  const blogs = await queryCollection(collectionName).all().catch(() => [] as BlogCollectionItem[])
  const fallbackBlogs = currentLocale !== 'en' ? await queryCollection('blogs_en').all().catch(() => [] as BlogsEnCollectionItem[]) : []

  return { blogs, fallbackBlogs, currentLocale }
}

export const useBlogAvailableLanguages = async (slug: string) => {
  const locales = ['en', 'id', 'ja', 'ko'] as const
  const available: string[] = []

  for (const locale of locales) {
    const collectionName = `blogs_${locale}` as 'blogs_en' | 'blogs_id' | 'blogs_ja' | 'blogs_ko'
    const stemPath = `blogs/${locale}/${slug}`
    const content = await queryCollection(collectionName).where('stem', '=', stemPath).first().catch(() => null)
    if (content) {
      available.push(locale)
    }
  }

  return available
}

export const useBlogBySlug = async (slug: string): Promise<BlogCollectionItem | null> => {
  const { locale } = useI18n()
  const currentLocale = locale.value as string

  const collectionName = `blogs_${currentLocale}` as 'blogs_en' | 'blogs_id' | 'blogs_ja' | 'blogs_ko'
  const fallbackCollectionName = 'blogs_en'

  const stemPath = `blogs/${currentLocale}/${slug}`
  const fallbackStemPath = `blogs/en/${slug}`

  let content = await queryCollection(collectionName).where('stem', '=', stemPath).first().catch(() => null)
  if (!content) {
    content = await queryCollection(fallbackCollectionName).where('stem', '=', fallbackStemPath).first().catch(() => null)
  }

  return content as BlogCollectionItem | null
}
