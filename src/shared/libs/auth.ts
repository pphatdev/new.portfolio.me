/**
 * Auth helpers for the pphat.me frontend.
 *
 * `signIn`   — POST /api/auth/email/login  (sets auth_token cookie server-side)
 * `signOut`  — POST /api/auth/logout        (clears auth_token cookie server-side)
 * `getSession` — GET /api/auth/me           (returns current user from token cookie)
 *
 * All functions target the internal Next.js API routes in src/app/api/auth/
 * which in turn proxy to https://api.pphat.top/v1/api/auth/...
 */

import { AUTH_TOKEN_KEY } from './constants';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthTokenPair {
    accessToken: string;
    refreshToken: string;
}

export interface SessionUser {
    id: string;
    role: string;
    provider: string;
    provider_id: string;
    email: string;
    name: string;
    email_verified: number;
    avatar: string | null;
    created_at: string;
    updated_at: string;
}

export class AuthError extends Error {
    constructor(
        message: string,
        public readonly type: string = 'AuthError'
    ) {
        super(message);
        this.name = 'AuthError';
    }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const BASE_URL = process.env.NEXT_PUBLIC_API?.replace(/\/$/, '') ?? 'https://api.pphat.top';

/**
 * Sign in with email + password.
 *
 * Calls the upstream API directly and sets the `auth_token` as an HttpOnly
 * cookie. This is meant to be called from a Next.js Server Action.
 */
export async function signIn(
    _provider: 'credentials',
    options: LoginCredentials & { redirectTo?: string }
): Promise<void> {
    const { email, password, redirectTo } = options;

    const res = await fetch(`${BASE_URL}/v1/api/auth/email/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        const message: string = body?.message ?? body?.error ?? 'Invalid credentials';

        if (res.status === 401 || res.status === 403) {
            throw new AuthError(message, 'CredentialsSignin');
        }
        throw new AuthError(message);
    }

    const data = await res.json() as AuthTokenPair;

    const cookieStore = await cookies();
    cookieStore.set(AUTH_TOKEN_KEY, data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60, // 1 hour
    });

    if (redirectTo) {
        redirect(redirectTo);
    }
}

/**
 * Sign out the current user.
 * Clears the `auth_token` cookie and redirects to login.
 */
export async function signOut(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(AUTH_TOKEN_KEY);

    redirect('/login');
}

/**
 * Fetch the currently authenticated user.
 * Can be called from Server Components or Server Actions.
 */
export async function getSession(): Promise<SessionUser | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_TOKEN_KEY)?.value;

    if (!token) return null;

    const res = await fetch(`${BASE_URL}/v1/api/auth/me`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        cache: 'no-store'
    });
    if (!res.ok) return null;
    return res.json() as Promise<SessionUser>;
}

/**
 * Convenience re-export so callers can still do:
 *   import { AUTH_TOKEN_KEY } from '@shared/libs/auth'
 */
export { AUTH_TOKEN_KEY };
