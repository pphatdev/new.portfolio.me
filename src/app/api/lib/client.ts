/**
 * Thin wrapper around `fetch` that targets the upstream pphat API.
 *
 * Base URL: process.env.NEXT_PUBLIC_API  (falls back to ${process.env.NEXT_PUBLIC_API})
 *
 * Usage:
 *   const res = await upstream('/v1/api/auth/email/login', { method: 'POST', body })
 */

const BASE_URL = process.env.NEXT_PUBLIC_APP_API?.replace(/\/$/, '') ?? 'https://blog-api.pphatdev.workers.dev';

export interface UpstreamOptions extends Omit<RequestInit, 'body'> {
    body?: object | null;
    next?: { revalidate?: number | false; tags?: string[] };
}

/**
 * Execute a request against the upstream API and return the raw `Response`.
 * The caller is responsible for reading / forwarding the response body.
 */
export async function upstream(
    path: string,
    { body, headers: extraHeaders, ...rest }: UpstreamOptions = {}
): Promise<Response> {
    const url = `${BASE_URL}${path}`;

    if (!process.env.NEXT_PPHAT_API_KEY) {
        console.warn('⚠️ NEXT_PPHAT_API_KEY is missing from environment variables! Did you forget to restart your dev server?');
    }

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'x-api-key': process.env.NEXT_PPHAT_API_KEY ?? '',
        ...(extraHeaders as Record<string, string>),
    };

    return fetch(url, {
        ...rest,
        headers,
        body: body !== undefined && body !== null ? JSON.stringify(body) : undefined,
    });
}

/**
 * Build a `Response` that mirrors an upstream response body + status.
 * Strips hop-by-hop headers that must not be forwarded.
 */
export async function mirrorResponse(upstreamRes: Response): Promise<Response> {
    const body = await upstreamRes.text();
    const contentType = upstreamRes.headers.get('content-type') ?? 'application/json';

    return new Response(body, {
        status: upstreamRes.status,
        headers: {
            'Content-Type': contentType,
        },
    });
}

/**
 * Parse a JSON body from an upstream Response and return it together with
 * the status code, so route handlers can inspect it before crafting a reply.
 */
export async function parseUpstream<T = unknown>(
    upstreamRes: Response
): Promise<{ ok: boolean; status: number; data: T }> {
    const text = await upstreamRes.text();
    let data: T;
    try {
        data = JSON.parse(text) as T;
    } catch {
        data = text as unknown as T;
    }
    return { ok: upstreamRes.ok, status: upstreamRes.status, data };
}
