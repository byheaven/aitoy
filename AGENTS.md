# Repository Guidelines

## Project Structure & Module Organization
- `src/client` — React + TypeScript SPA. Key folders: `pages/`, `components/`, `contexts/`, `hooks/`, `locales/`, `styles/`. Entry: `src/client/index.tsx`, routes in `src/client/App.tsx`.
- `public/` — static assets (`index.html`, `favicon.ico`, `404.html`, optional `.nojekyll`, `CNAME`).
- `aitoy-nextjs/` — separate Next.js app (TypeScript, Tailwind). Use its own scripts/config.
- `src/server.js` — Express server (optional). Update routes before use.
- `docs/`, `README.md`, `DEPLOYMENT_GUIDE.md` — reference material.

## Build, Test, and Development Commands
- Root (SPA):
  - `npm run dev` — runs Convex dev and Webpack dev server.
  - `npm run build` — deploys Convex and bundles client to `dist/`.
  - `npm run test` — Jest + Testing Library.
  - `npm run lint` — ESLint over `src/`.
  - `npm run typecheck` — TypeScript checks (no emit).
  - Examples: `npm run build:client`, `npm run dev:client`.
- Next.js app: `cd aitoy-nextjs` then `npm run dev | build | start | lint`.

## Coding Style & Naming Conventions
- TypeScript (strict). 2-space indentation. Prefer functional React components.
- Files: Components `PascalCase.tsx` (e.g., `Model3DViewer.tsx`), hooks `useX.ts`, tests `*.test.tsx`.
- Imports: `@/` → `src/client`, `@convex/` → `convex/`. Keep relative paths short.
- Styling: Tailwind CSS; global styles in `src/client/styles/globals.css`.

## Testing Guidelines
- Frameworks: Jest + `@testing-library/react` (jsdom). Setup in `jest.setup.js` mocks browser APIs.
- Locations: co-locate as `*.test.ts(x)` or under `__tests__/`.
- Aim for meaningful coverage of UI logic; run `npm test` locally.

## Commit & Pull Request Guidelines
- Commits: clear, imperative (e.g., "feat: add 3D viewer"). Group related changes.
- PRs: include summary, scope, linked issues, and screenshots/GIFs for UI changes. Note whether changes affect SPA, Next.js, or both.
- Before opening: `npm run lint && npm run typecheck && npm test` (and `cd aitoy-nextjs && npm run lint && npm run build` if touched).

## Security & Configuration Tips
- Use environment variables for keys: `CONVEX_URL`, `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, etc. Store as repo secrets in CI (see `DEPLOYMENT_GUIDE.md`).
- Avoid committing large binaries; place public assets in `public/` or use a CDN.

