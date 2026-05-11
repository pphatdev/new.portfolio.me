/**
 * POST /api/auth/refresh
 *
 * Proxies the request to:
 *   POST ${process.env.NEXT_PUBLIC_API}/v1/api/auth/refresh
 *   Body: { refreshToken }
 *
 * On success (200) the upstream returns a new { accessToken, refreshToken }
 * pair (token rotation). This handler refreshes the `auth_token` cookie with
 * the new access token.
 */

import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { upstream, parseUpstream } from '../../lib/client';
import { AUTH_TOKEN_KEY } from '@/shared/libs/constants';

interface RefreshBody {
    refreshToken?: string;
}

interface RefreshSuccess {
    accessToken: string;
    refreshToken: string;
}

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest): Promise<Response> {
    let body: RefreshBody;
    try {
        body = (await request.json()) as RefreshBody;
    } catch {
        return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const { refreshToken } = body;

    if (!refreshToken) {
        return Response.json({ error: 'refreshToken is required' }, { status: 400 });
    }

    const upstreamRes = await upstream('/v1/api/auth/refresh', {
        method: 'POST',
        body: { refreshToken },
    });

    const { ok, status, data } = await parseUpstream<RefreshSuccess | { message?: string; error?: string }>(upstreamRes);

    if (!ok) {
        const errData = data as { message?: string; error?: string };
        // Clear the stale cookie so the middleware redirects to login
        const cookieStore = await cookies();
        cookieStore.delete(AUTH_TOKEN_KEY);
        return Response.json(
            { error: errData?.message ?? errData?.error ?? 'Token refresh failed' },
            { status }
        );
    }

    const tokens = data as RefreshSuccess;

    // Rotate the HttpOnly cookie
    const cookieStore = await cookies();
    cookieStore.set(AUTH_TOKEN_KEY, tokens.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60, // 1 hour
    });

    return Response.json(tokens, { status: 200 });
}
