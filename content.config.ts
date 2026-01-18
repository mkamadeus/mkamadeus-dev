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
  en: z.object({
    title: z.string(),
    description: z.string(),
  }),
  id: z.object({
    title: z.string(),
    description: z.string(),
  }),
  ja: z.object({
    title: z.string(),
    description: z.string(),
  }),
  ko: z.object({
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
