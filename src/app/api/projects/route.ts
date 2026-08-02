/**
 * GET /api/projects
 * POST /api/projects
 *
 * Proxies the requests to the upstream pphat API.
 */

import { NextRequest } from 'next/server';
import { upstream, mirrorResponse } from '../lib/client';

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
    const body = (await request.json()) as Record<string, unknown>;

    const upstreamRes = await upstream('/v1/api/projects', {
        method: 'POST',
        body,
    });

    return mirrorResponse(upstreamRes);
}
