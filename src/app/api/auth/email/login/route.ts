/**
 * POST /api/auth/email/login
 *
 * Proxies the request to:
 *   POST ${process.env.NEXT_PUBLIC_API}/v1/api/auth/email/login
 *   Body: { email, password }
 *
 * On success (200) the upstream returns { accessToken, refreshToken }.
 * This route handler:
 *   1. Forwards the tokens to the client as JSON.
 *   2. Sets an HttpOnly `auth_token` cookie containing the accessToken so
 *      the authProxy middleware can read it on every subsequent request.
 */

import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { upstream, parseUpstream } from '../../../lib/client';
import { AUTH_TOKEN_KEY } from '@/shared/libs/constants';

interface LoginBody {
    email?: string;
    password?: string;
}

interface LoginSuccess {
    accessToken: string;
    refreshToken: string;
}

export async function POST(request: NextRequest): Promise<Response> {
    // ── 1. Parse & validate request body ──────────────────────────────────
    let body: LoginBody;
    try {
        body = (await request.json()) as LoginBody;
    } catch {
        return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const { email, password } = body;

    if (!email || !password) {
        return Response.json(
            { error: 'email and password are required' },
            { status: 400 }
        );
    }

    // ── 2. Forward to upstream API ─────────────────────────────────────────
    const upstreamRes = await upstream('/v1/api/auth/email/login', {
        method: 'POST',
        body: { email, password },
    });

    const { ok, status, data } = await parseUpstream<LoginSuccess | { message?: string; error?: string }>(upstreamRes);

    if (!ok) {
        const errData = data as { message?: string; error?: string };
        return Response.json(
            { error: errData?.message ?? errData?.error ?? 'Authentication failed' },
            { status }
        );
    }

    const { accessToken, refreshToken } = data as LoginSuccess;

    // ── 3. Persist token in an HttpOnly cookie ─────────────────────────────
    const cookieStore = await cookies();
    cookieStore.set(AUTH_TOKEN_KEY, accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        // Access tokens are short-lived; rely on the refresh flow for longevity.
        maxAge: 60 * 60, // 1 hour
    });

    // ── 4. Return token pair to the client ────────────────────────────────
    return Response.json({ accessToken, refreshToken }, { status: 200 });
}
