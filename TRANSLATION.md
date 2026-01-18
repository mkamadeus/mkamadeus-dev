# Blog Translation Workflow

## Overview
This document describes the process for translating blog posts to Bahasa Indonesia and other supported languages.

## Supported Languages
- English (en) - **Required, default language**
- Bahasa Indonesia (id)
- Japanese (ja)
- Korean (ko)

## Translation Process

### 1. Create English Version First
All blog posts **must** have an English version in `/content/blogs/en/` before creating translations.

Example structure:
```
content/blogs/en/my-blog-post.md
```

### 2. Translate to Bahasa Indonesia

#### Step 1: Copy the English file
```bash
cp content/blogs/en/my-blog-post.md content/blogs/id/my-blog-post.md
```

#### Step 2: Translate frontmatter
Update the YAML frontmatter at the top of the file:

```yaml
---
blog: true
title: [Translate title to Bahasa Indonesia]
description: [Translate description to Bahasa Indonesia]
author: mkamadeus
date: 2021-01-01  # Keep the same date
duration: 5  # Keep the same duration
---
```

#### Step 3: Translate content
Translate the markdown content below the frontmatter to Bahasa Indonesia.

### 3. Verify UI Translations
Ensure UI text translations exist in `/i18n/locales/id_ID.yaml`:

```yaml
blogs:
  title: Blog
  subtitle: Beberapa pemikiran tentang teknologi dan lainnya dituangkan dalam tulisan.
```

### 4. Test the Translation

#### Start dev server:
```bash
bun dev
```

#### Verify:
1. Navigate to `/id/blogs` - the translated post should appear in the listing
2. Click the language badge (ID) on the blog card - should navigate to `/id/blogs/my-blog-post`
3. The translated content should display correctly
4. If translation doesn't exist, clicking the card should redirect to `/en/blogs/my-blog-post`

## File Naming Convention
- Use kebab-case for filenames: `my-blog-post.md`
- Keep the same filename across all language versions
- The filename becomes the slug in the URL

## Language Indicators
Blog cards automatically display language badges (EN, ID, JA, KO) for available translations. Users can click these badges to view the post in that language.

## Fallback Behavior
- Default click on blog card → navigates to English version (`/en/blogs/[slug]`)
- If user navigates to a non-English locale without translation → automatically redirects to English
- Blog listing shows all posts, falling back to English posts if current locale has none

## Example: Complete Translation

### English (`content/blogs/en/hello-world.md`)
```markdown
---
blog: true
title: Hello World!
description: Hello from mkamadeus' blog!
author: mkamadeus
date: 2021-01-01
duration: 1
---

This is a short blog test on making a Markdown-based blog.
```

### Bahasa Indonesia (`content/blogs/id/hello-world.md`)
```markdown
---
blog: true
title: Hello World!
description: Halo dari blog mkamadeus!
author: mkamadeus
date: 2021-01-01
duration: 1
---

Ini adalah tes blog singkat untuk membuat blog berbasis Markdown.
```

## Notes
- Always run `bun lint` before committing translations
- Keep the same `author` and `date` across all translations
- Maintain the same markdown structure (headings, lists, code blocks) across translations
- Images and code snippets typically don't need translation
