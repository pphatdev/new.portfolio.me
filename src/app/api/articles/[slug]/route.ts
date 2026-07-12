import { NextRequest } from 'next/server';
import { upstream, mirrorResponse } from '../../lib/client';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
): Promise<Response> {
    const { slug } = await params;
    const path = `/v1/api/articles/${slug}`;

    const upstreamRes = await upstream(path, {
        method: 'GET',
    });

    return mirrorResponse(upstreamRes);
}
