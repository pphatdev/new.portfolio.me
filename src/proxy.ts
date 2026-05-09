import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { authProxy } from './middlewares/authMiddleware';

/**
 * Compose multiple proxy handlers into a single chain.
 * Each handler receives the request and returns either a NextResponse
 * (short-circuit) or null (continue to the next handler).
 */
type ProxyFn = (req: NextRequest) => NextResponse | null;

const compose =
    (...handlers: ProxyFn[]) =>
        (request: NextRequest): NextResponse => {
            for (const handler of handlers) {
                const result = handler(request);
                if (result !== null) return result;
            }
            return NextResponse.next();
        };

/** Assembled proxy pipeline */
const handle = compose(authProxy);

export function proxy(request: NextRequest): NextResponse {
    return handle(request);
}

/**
 * Limit the proxy to paths that need it.
 * Excludes Next.js internals, static assets, metadata files, and public files.
 */
export const config = {
    matcher: [
        /*
         * Match all request paths EXCEPT:
         * - api/*                → Next.js API routes & proxy rewrites
         * - _next/static/*       → static chunk files
         * - _next/image/*        → image optimisation endpoint
         * - favicon.ico          → browser favicon
         * - sitemap.xml          → SEO sitemap
         * - robots.txt           → SEO robots
         * - public static files  → any file with a common extension
         */
        '/((?!api|_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
    ],
};
