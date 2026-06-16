# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev` / `build` / `start` / `lint` — no test runner is configured.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind v4 (`@tailwindcss/postcss`, `@theme inline` in `src/shared/styles/globals.css`) · `next-themes` · Radix · Framer Motion.

Path alias: `@/*` → `./src/*`.

## Architecture

### Proxy (renamed from Middleware in Next.js 16)

The framework convention file is `src/proxy.ts`, exporting `proxy()` and `config.matcher`. **Do not create `middleware.ts`.** See `node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md` before changing this layer.

`src/proxy.ts` chains handlers via `compose(...)` from `src/middlewares/` (a user-named folder, not the framework concept). Handlers return `NextResponse` to short-circuit or `null` to fall through. Currently only `authProxy` is wired in, and it inspects cookie presence only — no token validation.

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
