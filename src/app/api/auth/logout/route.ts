/**
 * POST /api/auth/logout
 *
 * Proxies the request to:
 *   POST ${process.env.NEXT_PUBLIC_API}/v1/api/auth/logout
 *   Body: { refreshToken }   (optional — send if the client has it)
 *
 * Regardless of the upstream response, this handler:
 *   - Deletes the `auth_token` cookie
 *   - Returns 200 so the client can redirect to /login
 */

import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { upstream } from '../../lib/client';
import { AUTH_TOKEN_KEY } from '@/shared/libs/constants';

export async function POST(request: NextRequest): Promise<Response> {
    let refreshToken: string | undefined;

    try {
        const body = (await request.json()) as { refreshToken?: string };
        refreshToken = body.refreshToken;
    } catch {
        // Body is optional for logout
    }

    // Best-effort: invalidate the token on the upstream server
    if (refreshToken) {
        await upstream('/v1/api/auth/logout', {
            method: 'POST',
            body: { refreshToken },
        }).catch(() => {
            // Ignore upstream errors — we still clear the local cookie
        });
    }

    // Always clear the auth cookie
    const cookieStore = await cookies();
    cookieStore.delete(AUTH_TOKEN_KEY);

    return Response.json({ message: 'Logged out successfully' }, { status: 200 });
}
