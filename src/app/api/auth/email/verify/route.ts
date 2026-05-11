/**
 * POST /api/auth/email/verify
 *
 * Proxies the request to:
 *   POST ${process.env.NEXT_PUBLIC_API}/v1/api/auth/email/verify
 *   Body: { email, otp }
 *
 * On success (200) the upstream returns { accessToken, refreshToken }.
 * This route sets the `auth_token` cookie so the user is immediately logged in
 * after verifying their OTP.
 */

import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { upstream, parseUpstream } from '../../../lib/client';
import { AUTH_TOKEN_KEY } from '@/shared/libs/constants';

interface VerifyBody {
    email?: string;
    otp?: string;
}

interface VerifySuccess {
    accessToken: string;
    refreshToken: string;
}

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest): Promise<Response> {
    let body: VerifyBody;
    try {
        body = (await request.json()) as VerifyBody;
    } catch {
        return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const { email, otp } = body;

    if (!email || !otp) {
        return Response.json(
            { error: 'email and otp are required' },
            { status: 400 }
        );
    }

    const upstreamRes = await upstream('/v1/api/auth/email/verify', {
        method: 'POST',
        body: { email, otp },
    });

    const { ok, status, data } = await parseUpstream<VerifySuccess | { message?: string; error?: string }>(upstreamRes);

    if (!ok) {
        const errData = data as { message?: string; error?: string };
        return Response.json(
            { error: errData?.message ?? errData?.error ?? 'OTP verification failed' },
            { status }
        );
    }

    const { accessToken, refreshToken } = data as VerifySuccess;

    const cookieStore = await cookies();
    cookieStore.set(AUTH_TOKEN_KEY, accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60, // 1 hour
    });

    return Response.json({ accessToken, refreshToken }, { status: 200 });
}
