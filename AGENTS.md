<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Commands

- `npm run dev` / `build` / `start` / `lint` — no test runner is configured.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind v4 (`@tailwindcss/postcss`, `@theme inline` in `src/shared/styles/globals.css`) · `next-themes` · Radix · Framer Motion.

Path alias: `@/*` → `./src/*`.

## Architecture

### Middleware (Cloudflare-pinned)

Next.js 16 renamed Middleware → Proxy (`src/proxy.ts`), but `@opennextjs/cloudflare` does **not** support Node-runtime Proxy files, and Next 16's SWC forbids setting `runtime` on `proxy.ts`. Until OpenNext ships adapters-api support (see opennextjs-cloudflare#1213), this project must stay on **`src/middleware.ts`** with `export const runtime = 'experimental-edge'` and an exported `middleware()` function. Do not rename to `proxy.ts`.

`src/middleware.ts` chains handlers via `compose(...)` from `src/middlewares/` (a user-named folder, not the framework concept). Handlers return `NextResponse` to short-circuit or `null` to fall through.

### Authentication

Cookie-based via `auth_token` (HttpOnly). Route lists and redirect targets live in `src/shared/libs/constants.ts`.

Two parallel paths to the upstream auth API — keep in sync when adding flows:

1. **Internal route handlers** `src/app/api/auth/**/route.ts` proxy upstream using `src/app/api/lib/client.ts` (`upstream`, `mirrorResponse`, `parseUpstream`).
2. **Server-Action helpers** `src/shared/libs/auth.ts` (`signIn`, `signOut`, `getSession`) call upstream directly, set/clear the cookie via `next/headers`, and `redirect()` from `next/navigation`.

Real session validation happens in `getSession()` against `/v1/api/auth/me`.

### `next.config.ts`

- Rewrite `/api/proxy/:path*` → `${NEXT_PUBLIC_APP_API}/:path*` is **guarded by an env-var check** — without it, Next throws *"destination does not start with /"*. Keep the guard.
- `images.remotePatterns` whitelists the external image hosts; add new hosts there before using `next/image`.

## Environment

See `.env.example`. `NEXT_PUBLIC_APP_API` (upstream API base) is consumed by the rewrite, `auth.ts`, and `api/lib/client.ts` (latter two default to `https://api.pphat.top`).
