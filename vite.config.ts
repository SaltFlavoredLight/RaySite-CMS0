import { cloudflare } from '@cloudflare/vite-plugin'
import devServer from '@hono/vite-dev-server'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    cloudflare(),
    devServer({
      entry: 'src/index.ts',
    }),
  ],
})
