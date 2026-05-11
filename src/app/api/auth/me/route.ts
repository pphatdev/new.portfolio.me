/**
 * GET /api/auth/me
 *
 * Proxies the request to:
 *   GET ${process.env.NEXT_PUBLIC_API}/v1/api/auth/me
 *   Authorization: Bearer <auth_token cookie value>
 *
 * Returns the current authenticated user object, or 401 if no valid session.
 */

import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { upstream, mirrorResponse } from '../../lib/client';
import { AUTH_TOKEN_KEY } from '@/shared/libs/constants';

export const dynamic = 'force-dynamic';

export async function GET(_request: NextRequest): Promise<Response> {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_TOKEN_KEY)?.value;

    if (!token) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const upstreamRes = await upstream('/v1/api/auth/me', {
        method: 'GET',
        token,
    });

    return mirrorResponse(upstreamRes);
}
