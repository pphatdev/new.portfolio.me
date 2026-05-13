/**
 * GET /api/projects
 * POST /api/projects
 *
 * Proxies the requests to the upstream pphat API.
 */

import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { upstream, mirrorResponse } from '../lib/client';
import { AUTH_TOKEN_KEY } from '@/shared/libs/constants';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest): Promise<Response> {
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    const path = `/v1/api/projects${queryString ? `?${queryString}` : ''}`;

    const upstreamRes = await upstream(path, {
        method: 'GET',
    });

    return mirrorResponse(upstreamRes);
}

export async function POST(request: NextRequest): Promise<Response> {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_TOKEN_KEY)?.value;

    if (!token) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    const upstreamRes = await upstream('/v1/api/projects', {
        method: 'POST',
        token,
        body,
    });

    return mirrorResponse(upstreamRes);
}
