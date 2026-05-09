import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
    AUTH_TOKEN_KEY,
    DEFAULT_LOGIN_REDIRECT,
    PROTECTED_ROUTES,
    PUBLIC_ONLY_ROUTES,
    DEFAULT_AUTH_REDIRECT,
} from '@/shared/libs/constants';

/**
 * Determines if a pathname matches any route in a given list.
 */
const matchesRoute = (pathname: string, routes: string[]): boolean =>
    routes.some((route) => pathname === route || pathname.startsWith(`${route}/`));

/**
 * Auth proxy handler:
 * - Redirects unauthenticated users away from protected routes.
 * - Redirects authenticated users away from public-only routes (e.g. /login).
 *
 * Returns `null` to signal "no redirect needed" (continue chain).
 */
export const authProxy = (request: NextRequest): NextResponse | null => {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get(AUTH_TOKEN_KEY)?.value;
    const isAuthenticated = Boolean(token);

    // Redirect unauthenticated users trying to access protected routes
    if (matchesRoute(pathname, PROTECTED_ROUTES) && !isAuthenticated) {
        const loginUrl = request.nextUrl.clone();
        loginUrl.pathname = DEFAULT_LOGIN_REDIRECT;
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Redirect authenticated users away from public-only routes
    if (matchesRoute(pathname, PUBLIC_ONLY_ROUTES) && isAuthenticated) {
        const dashboardUrl = request.nextUrl.clone();
        dashboardUrl.pathname = DEFAULT_AUTH_REDIRECT;
        dashboardUrl.searchParams.delete('redirect');
        return NextResponse.redirect(dashboardUrl);
    }

    return null;
};
