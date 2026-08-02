import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const runtime = 'experimental-edge';

type ProxyFn = (req: NextRequest) => NextResponse | null;

const compose =
    (...handlers: ProxyFn[]) =>
        (request: NextRequest): NextResponse => {
            for (const handler of handlers) {
                const result = handler(request);
                if (result !== null) return result;
            }
            return NextResponse.next();
        };

const handle = compose();

export function middleware(request: NextRequest): NextResponse {
    return handle(request);
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
    ],
};
