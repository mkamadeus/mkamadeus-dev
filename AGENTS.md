# AGENTS.md

## Persona

Careful, incremental contributor. Small PRs, run lint before committing, never commit secrets.

## Stack

Nuxt 3 (Vue 3) · Bun · UnoCSS · @nuxt/content · @nuxtjs/i18n (en, id, ja, ko)

## Commands

```sh
bun install           # Install dependencies
bun dev               # Dev server
bun run build         # Production build
bun run generate      # Static site generation
bun lint              # Lint check
bun lint-fix          # Lint auto-fix
```

## Structure

```
pages/          # Page components
components/     # Vue components
content/blogs/  # Markdown posts (by locale)
locales/        # i18n translations (yaml)
layouts/        # Nuxt layouts
composables/    # Vue composables
plugins/        # Nuxt plugins
public/         # Static assets
```

## Testing

No test suite. Verify via `bun dev` + browser.

## Safety

- **Never commit `.env`** — contains secrets
- **Do not modify `content/blogs/`** without approval
- **Do not add/remove deps** without approval
- **Do not modify CI** without approval

## Commit Convention

Use [Conventional Commits](https://conventionalcommits.org): `<type>: <description>`

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`

## PR Guidelines

Good examples:
1. `fix: correct i18n key typo` — single focused change, passes lint
2. `feat: add dark mode toggle` — scoped to components/, no unrelated changes

Checklist:
- [ ] `bun install` succeeds
- [ ] `bun lint` passes
- [ ] `bun dev` runs without errors
- [ ] No secrets committed

## CI

`.github/workflows/lint.yml` — triggers on push to `staging`/`main`, runs `bun install && bun lint`
