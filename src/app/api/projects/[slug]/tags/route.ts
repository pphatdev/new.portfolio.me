/**
 * GET /api/projects/[slug]/tags
 *
 * Proxies the request to the upstream pphat API.
 */

import { NextRequest } from 'next/server';
import { upstream, mirrorResponse } from '../../../lib/client';

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
): Promise<Response> {
    const { slug } = await params;
    const upstreamRes = await upstream(`/v1/api/projects/${slug}/tags`, {
        method: 'GET',
    });

    return mirrorResponse(upstreamRes);
}
