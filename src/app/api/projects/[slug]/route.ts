/**
 * GET /api/projects/[slug]
 * PATCH /api/projects/[slug]
 * DELETE /api/projects/[slug]
 *
 * Proxies the requests to the upstream pphat API.
 */

import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { upstream, mirrorResponse } from '../../lib/client';


export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
): Promise<Response> {
    const { slug } = await params;
    const upstreamRes = await upstream(`/v1/api/projects/${slug}`, {
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
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    const upstreamRes = await upstream(`/v1/api/projects/${slug}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`
        },
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
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const upstreamRes = await upstream(`/v1/api/projects/${slug}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    return mirrorResponse(upstreamRes);
}
