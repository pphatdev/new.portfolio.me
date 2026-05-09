/**
 * POST /api/auth/email/register
 *
 * Proxies the request to:
 *   POST https://api.pphat.top/v1/api/auth/email/register
 *   Body: { email, name, password }
 *
 * On success (201) the upstream returns:
 *   { message: "Verification code sent to your email" }
 *
 * The client must then call /api/auth/email/verify with the OTP.
 */

import type { NextRequest } from 'next/server';
import { upstream, mirrorResponse } from '../../../lib/client';

interface RegisterBody {
    email?: string;
    name?: string;
    password?: string;
}

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest): Promise<Response> {
    let body: RegisterBody;
    try {
        body = (await request.json()) as RegisterBody;
    } catch {
        return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const { email, name, password } = body;

    if (!email || !name || !password) {
        return Response.json(
            { error: 'email, name, and password are required' },
            { status: 400 }
        );
    }

    if (password.length < 8) {
        return Response.json(
            { error: 'password must be at least 8 characters' },
            { status: 400 }
        );
    }

    const upstreamRes = await upstream('/v1/api/auth/email/register', {
        method: 'POST',
        body: { email, name, password },
    });

    return mirrorResponse(upstreamRes);
}
