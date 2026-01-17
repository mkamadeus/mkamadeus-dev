import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  author: z.string().optional(),
  date: z.string(),
  duration: z.number().optional(),
  blog: z.boolean().optional(),
})

export default defineContentConfig({
  collections: {
    blogs_en: defineCollection({
      type: 'page',
      source: 'blogs/en/**',
      schema: blogSchema,
    }),
    blogs_id: defineCollection({
      type: 'page',
      source: 'blogs/id/**',
      schema: blogSchema,
    }),
    blogs_ja: defineCollection({
      type: 'page',
      source: 'blogs/ja/**',
      schema: blogSchema,
    }),
    blogs_ko: defineCollection({
      type: 'page',
      source: 'blogs/ko/**',
      schema: blogSchema,
    }),
  },
})
