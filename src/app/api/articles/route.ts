import { NextRequest } from 'next/server';
import { upstream, mirrorResponse } from '../lib/client';

export async function GET(request: NextRequest): Promise<Response> {
    const searchParams = new URLSearchParams(request.nextUrl.searchParams.toString());
    if (!searchParams.has('status')) {
        searchParams.set('status', 'public');
    }
    const queryString = searchParams.toString();
    const path = `/v1/api/articles${queryString ? `?${queryString}` : ''}`;

    const upstreamRes = await upstream(path, {
        method: 'GET',
    });

    return mirrorResponse(upstreamRes);
}
