```txt
npm install
npm run dev
```

The Worker is configured in [`wrangler.jsonc`](./wrangler.jsonc) and uses the
`raysite_cms0_db` D1 binding. Authenticate with Wrangler before deploying:

```txt
npx wrangler login
```

```txt
npm run deploy
```

[For generating/synchronizing types based on your Worker configuration run](https://developers.cloudflare.com/workers/wrangler/commands/#types):

```txt
npm run cf-typegen
```

Pass the `CloudflareBindings` as generics when instantiation `Hono`:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>()
```
