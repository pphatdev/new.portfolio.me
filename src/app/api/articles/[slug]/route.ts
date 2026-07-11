/**
 * GET /api/articles/[slug]
 * PATCH /api/articles/[slug]
 * DELETE /api/articles/[slug]
 *
 * Proxies the requests to the upstream pphat API.
 */

import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { upstream, mirrorResponse } from '../../lib/client';
import { AUTH_TOKEN_KEY } from '@/shared/libs/constants';

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
): Promise<Response> {
    const { slug } = await params;
    const upstreamRes = await upstream(`/v1/api/articles/${slug}`, {
        method: 'GET',
    });

    return mirrorResponse(upstreamRes);
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
): Promise<Response> {
    const { slug } = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_TOKEN_KEY)?.value;

    if (!token) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    const upstreamRes = await upstream(`/v1/api/articles/${slug}`, {
        method: 'PATCH',
        token,
        body,
    });

    return mirrorResponse(upstreamRes);
}

export async function DELETE(
    _request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
): Promise<Response> {
    const { slug } = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_TOKEN_KEY)?.value;

    if (!token) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const upstreamRes = await upstream(`/v1/api/articles/${slug}`, {
        method: 'DELETE',
        token,
    });

    return mirrorResponse(upstreamRes);
}
