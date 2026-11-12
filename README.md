```txt
npm install
wrangler dev
```

The Worker is configured in [`wrangler.jsonc`](./wrangler.jsonc) and uses the
`raysite_cms0_db` D1 binding and `raysite_cms0_assets` R2 binding. The Worker
uses plain Hono TypeScript without JSX. Authenticate with Wrangler before
deploying:

```txt
wrangler login
```

```txt
npm run deploy
```

For local development and storage migrations:

```txt
npm run dev
npm run db:migrate:local
```

Apply a migration to the Cloudflare D1 database only when ready:

```txt
npm run db:migrate:remote
```
