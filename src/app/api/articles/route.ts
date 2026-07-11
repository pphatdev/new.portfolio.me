import { NextRequest } from 'next/server';
import { upstream, mirrorResponse } from '../lib/client';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest): Promise<Response> {
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    const path = `/v1/api/articles${queryString ? `?${queryString}` : ''}`;

    const upstreamRes = await upstream(path, {
        method: 'GET',
    });

    return mirrorResponse(upstreamRes);
}
