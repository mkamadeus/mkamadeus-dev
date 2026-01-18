import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  author: z.string().optional(),
  date: z.string(),
  duration: z.number().optional(),
  blog: z.boolean().optional(),
})

const projectSchema = z.object({
  order: z.number(),
  icon: z.string(),
  stacks: z.array(z.string()),
  url: z.union([z.string(), z.array(z.string())]),
  isPrivate: z.boolean().optional(),
  en_US: z.object({
    title: z.string(),
    description: z.string(),
  }),
  id_ID: z.object({
    title: z.string(),
    description: z.string(),
  }),
  ja_JP: z.object({
    title: z.string(),
    description: z.string(),
  }),
  ko_KR: z.object({
    title: z.string(),
    description: z.string(),
  }),
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
    projects: defineCollection({
      type: 'data',
      source: 'projects/**',
      schema: projectSchema,
    }),
  },
})
