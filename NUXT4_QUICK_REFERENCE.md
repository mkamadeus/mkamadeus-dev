# Nuxt 4 Quick Reference Guide

## What Changed?

### Directory Structure
All application code now lives in `app/` directory:
- Components: `app/components/`
- Pages: `app/pages/`
- Layouts: `app/layouts/`
- Composables: `app/composables/`
- Plugins: `app/plugins/`
- Assets: `app/assets/`
- Types: `app/types/`

### Path Aliases
The `~` alias now points to `app/` directory:
```typescript
// Before (Nuxt 3)
import MyComponent from '~/components/MyComponent.vue'

// After (Nuxt 4) - Same syntax, different resolution
import MyComponent from '~/components/MyComponent.vue' // Resolves to app/components/
```

### TypeScript
- Using project references for better type-checking
- Separate contexts for app, server, and build code
- Better IDE autocomplete and error detection

## Common Tasks

### Adding a New Component
```bash
# Create in app/components/
touch app/components/MyNewComponent.vue
```

### Adding a New Page
```bash
# Create in app/pages/
touch app/pages/my-new-page.vue
```

### Adding a New Composable
```bash
# Create in app/composables/
touch app/composables/useMyComposable.ts
```

### Adding Types
```bash
# Create in app/types/
touch app/types/my-types.d.ts
```

## Development Commands

```bash
# Install dependencies
bun install

# Start dev server
bun dev

# Build for production
bun run build

# Preview production build
bun run preview

# Generate static site
bun run generate

# Lint code
bun lint

# Auto-fix lint issues
bun lint-fix
```

## Module Versions

Current versions (Nuxt 4 compatible):
- Nuxt: 4.2.2
- @nuxtjs/i18n: 9.5.6
- @nuxt/image: 1.11.0
- @nuxt/content: 2.13.4
- @nuxtjs/seo: 2.2.0
- @unocss/nuxt: 66.5.12

## Troubleshooting

### Build Fails
```bash
# Clean and reinstall
rm -rf node_modules .nuxt bun.lock
bun install
```

### Type Errors
```bash
# Regenerate types
bun run postinstall
```

### Module Not Found
- Check if file is in `app/` directory
- Verify import path uses `~/` alias
- Ensure file extension is included for non-Vue files

## Breaking Changes from Nuxt 3

### Data Fetching
- `useAsyncData` and `useFetch` now use shallow refs by default
- Multiple calls with same key share data automatically
- Add `{ deep: true }` if you need deep reactivity

### TypeScript
- No longer extends `.nuxt/tsconfig.json` directly
- Uses project references instead
- Type augmentations must be in appropriate context directories

### i18n Configuration
- `langDir` path is relative to `app/` directory
- Updated to `../locales` to point to root-level locales folder

## Need Help?

- Check [NUXT4_MIGRATION.md](./NUXT4_MIGRATION.md) for detailed migration notes
- Review [Nuxt 4 Documentation](https://nuxt.com/docs/4.x)
- Check [AGENTS.md](./AGENTS.md) for project conventions

## Safety Reminders

- ✅ Run `bun lint` before committing
- ✅ Test in dev mode before building
- ✅ Never commit `.env` file
- ✅ Keep commits small and focused
- ✅ Follow conventional commit format
