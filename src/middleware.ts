import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { authMiddleware } from './middlewares/authMiddleware';

/**
 * Compose multiple middleware functions into a single chain.
 * Each handler receives the request and returns either a NextResponse
 * (short-circuit) or null (continue to the next handler).
 */
type MiddlewareFn = (req: NextRequest) => NextResponse | null;

const compose =
    (...handlers: MiddlewareFn[]) =>
        (request: NextRequest): NextResponse => {
            for (const handler of handlers) {
                const result = handler(request);
                if (result !== null) return result;
            }
            return NextResponse.next();
        };

/** Assembled middleware pipeline */
const handle = compose(authMiddleware);

export function middleware(request: NextRequest): NextResponse {
    return handle(request);
}

/**
 * Limit the middleware to paths that need it.
 * Excludes Next.js internals, static assets, and the API proxy.
 */
export const config = {
    matcher: [
        /*
         * Match all request paths EXCEPT:
         * - api/*            → Next.js API routes & proxy
         * - _next/static/*   → static chunk files
         * - _next/image/*    → image optimisation endpoint
         * - favicon.ico      → browser favicon request
         * - public assets    → any file with an extension in /public
         */
        '/((?!api|_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
    ],
};
