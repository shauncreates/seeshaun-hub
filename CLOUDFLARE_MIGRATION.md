# Cloudflare Workers migration

This branch adapts the existing TanStack Start/Vite app for Cloudflare Workers. It does not change portfolio content or the existing custom domain.

## Build configuration

- Cloudflare product: Workers (not Pages), because this project uses TanStack Start SSR.
- Build: `npm run build`
- Deploy: `npm run deploy` after authenticating with Wrangler.
- Existing SSR error wrapper: `src/server.ts`; the TanStack Start Vite plugin remains configured to use it.
- Existing routes and Supabase client code are left unchanged.

## Before deploying from your PC

1. Check out the `cloudflare-migration` branch.
2. Run `npm install` to regenerate `package-lock.json` after adding the Cloudflare Vite plugin and Wrangler.
3. If you use Bun, run `bun install` as well to refresh `bun.lock`; commit the updated lockfile(s).
4. Run `npm run build` and resolve any build errors before deploying.
5. Run `npx wrangler login`, then `npx wrangler deploy` (or `npm run deploy`) to create a preview Worker.
6. Configure environment variables/secrets on the Worker before expecting the Supabase-backed content to load.

## Worker variables and secrets

Set these in the Cloudflare dashboard for the Worker:

- `VITE_SUPABASE_URL` — existing Supabase project URL.
- `VITE_SUPABASE_ANON_KEY` — the public/publishable Supabase key only. It is intentionally client-visible.
- `YOUTUBE_API_KEY` — only if the server-side YouTube stats feature is enabled; store as a secret.
- `YOUTUBE_CHANNEL` — optional channel override.

Never put a Supabase service-role key into a `VITE_*` variable or client code.

## Custom domain

Do not change DNS while testing. First deploy to the generated `workers.dev` address and confirm the deployment is healthy. Then attach the existing custom domain in Workers → Settings → Domains & Routes and follow the exact DNS instructions Cloudflare displays. Keep the Vercel deployment available until you intentionally switch traffic.

## Not covered by this migration

Per the project request, this migration does not include domain-specific verification of the portfolio routes. It also does not change the portfolio's design/content or integrate any unfinished backend features.
