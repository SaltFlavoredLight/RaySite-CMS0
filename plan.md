# RaySite CMS full-stack plan (draft)

This file is the working project plan and instruction sheet. It is
intentionally a draft for editing. Commands use **npm only**; Wrangler is
installed globally and is not a project dependency.

## Architecture confirmation

The target stack is:

- **Hono** as the Cloudflare Worker framework and API/router layer.
- **Cloudflare Workers** as the runtime and deployment platform.
- **Better Auth** for authentication and sessions.
- **ProseMirror** packages for the editor UI and document editing behavior.
- **Vite** plus the Cloudflare and Hono Vite plugins for local development,
  HMR, builds, and previews.
- **TypeScript** for application code and type checking.
- **Astro** for theme experiments and generated documentation, kept separate
  from the Worker entrypoint.
- **D1** for relational CMS data and **R2** for uploaded assets.

The current Worker is intentionally blank: `src/index.ts` returns an empty text
response. It contains no JSX and no React runtime.

## Repository structure

```text
src/index.ts          Hono Worker entrypoint
vite.config.ts        Vite, Cloudflare, and Hono dev-server configuration
wrangler.jsonc        Worker, D1, and R2 bindings
migrations/           Hand-written SQL migrations; no Drizzle
public/               Static assets
plan.md               This editable plan
```

Astro work should live in a dedicated directory such as `docs/` or
`theme-lab/` once its exact output target is selected. Do not mix Astro pages
into the Worker entrypoint.

## Daily commands

Install dependencies:

```text
npm install
```

Run the full-stack local development server:

```text
npm run dev
```

Run checks:

```text
npm run typecheck
npm run build
```

Preview the Vite/Worker build:

```text
npm run preview
```

Deploy after checks:

```text
wrangler login
npm run deploy
```

## D1 and R2 workflow

The configured Cloudflare resources are:

- D1 database: `raysite-cms0-db`
- D1 binding: `raysite_cms0_db`
- R2 production bucket: `raysite-cms0-assets`
- R2 preview bucket: `raysite-cms0-assets-preview`
- R2 binding: `raysite_cms0_assets`

Apply the initial hand-written SQL migration locally:

```text
npm run db:migrate:local
```

Apply migrations to the Cloudflare D1 database only when ready:

```text
npm run db:migrate:remote
```

List configured R2 buckets:

```text
npm run r2:list
```

`wrangler dev` provides local Worker, D1, and R2 emulation. The same
`wrangler.jsonc` selects the Cloudflare resources for preview/deployment.
Cloudflare Free plan limits still apply; keep assets and request volume within
the account's current quotas.

Do not add Drizzle. D1 migrations are plain SQL committed under `migrations/`.

## Authentication

1. Add Better Auth routes and middleware after the blank Worker baseline is
   accepted.
2. Store `BETTER_AUTH_SECRET` with `wrangler secret put BETTER_AUTH_SECRET`.
3. Keep secrets out of `.env` files that could be committed.
4. Add authorization checks before document and asset mutations.

## ProseMirror editor

1. Define the document schema and supported nodes/marks.
2. Build the editor UI as a browser-side module using the approved ProseMirror
   packages.
3. Save serialized document content to D1 through Hono endpoints.
4. Store binary uploads in R2 and retain only object metadata/keys in D1.
5. Add drafts, revisions, autosave, preview, and publish states.

## Astro theme and documentation workflow

Astro is for a separate authoring/output workflow:

1. Use Astro to generate theme-test pages and documentation.
2. Review the generated result visually and use it as design input for the CMS
   and ProseMirror UI.
3. Keep generated documentation source and output separate from Worker code.
4. Decide later whether documentation deploys independently or from the same
   Cloudflare account.

Astro is not required in the Worker request path.

## Git workflow

- `main` is the production branch.
- `setup` is the isolated setup branch and must not be merged yet.
- Feature branches should start from `setup` until the baseline is approved.
- Merge into `main` only after the setup review and the two pending decisions
  are complete.

## Next decisions

- Confirm Better Auth's D1 schema and route design.
- Confirm the final ProseMirror document format and revision model.
- Decide the Astro documentation directory and deployment target.
- Confirm whether R2 objects need public URLs or signed access only.
- Confirm the Cloudflare Free plan usage budget for D1, Workers, and R2.
