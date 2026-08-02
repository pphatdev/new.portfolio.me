/// <reference types="next" />

declare module 'next' {
    export type { Metadata, Viewport, ResolvingMetadata, ResolvingViewport } from 'next/dist/lib/metadata/types/metadata-interface.js';
    export interface NextConfig {
        [key: string]: any;
    }
}

declare module 'next/image' {
    import React from 'react';
    export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
        src: any;
        alt: string;
        width?: number | `${number}`;
        height?: number | `${number}`;
        fill?: boolean;
        quality?: number | `${number}`;
        priority?: boolean;
        loading?: 'eager' | 'lazy';
        placeholder?: 'blur' | 'empty' | `data:image/${string}`;
        blurDataURL?: string;
        unoptimized?: boolean;
    }
    const Image: React.ComponentType<ImageProps>;
    export default Image;
}

declare module 'next/link' {
    import React from 'react';
    export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
        href: any;
        as?: any;
        replace?: boolean;
        scroll?: boolean;
        shallow?: boolean;
        passHref?: boolean;
        prefetch?: boolean | null;
        locale?: string | false;
    }
    const Link: React.ComponentType<LinkProps>;
    export default Link;
}

declare module 'next/font/google' {
    export const Aladin: any;
    export const Kantumruy_Pro: any;
    export const Noto_Color_Emoji: any;
    export const Open_Sans: any;
    export const Poppins: any;
    export const Srisakdi: any;
    export const Fira_Code: any;
    export const Inter: any;
    const fontFactory: any;
    export default fontFactory;
}

declare module 'next/navigation' {
    export function usePathname(): string;
    export function useRouter(): any;
    export function useSearchParams(): any;
    export function redirect(url: string): never;
    export function notFound(): never;
}

declare module 'next/headers' {
    export function cookies(): any;
    export function headers(): any;
}

declare module 'next/cache' {
    export function cacheLife(profile: string): void;
    export function revalidatePath(path: string): void;
    export function revalidateTag(tag: string): void;
}

declare module 'next/server' {
    export class NextRequest extends Request {
        constructor(input: RequestInfo | URL, init?: RequestInit);
        get cookies(): any;
        get nextUrl(): any;
        get ip(): string | undefined;
        get geo(): any;
    }
    export class NextResponse extends Response {
        static json(body: any, init?: ResponseInit): NextResponse;
        static redirect(url: string | URL, status?: number): NextResponse;
        static rewrite(url: string | URL, init?: ResponseInit): NextResponse;
        static next(init?: ResponseInit): NextResponse;
        get cookies(): any;
    }
    export class NextFetchEvent {
        constructor(opts: { request: NextRequest; page: string; context?: { waitUntil: (promise: Promise<any>) => void } });
        waitUntil(promise: Promise<any>): void;
    }
}

declare module 'next/types.js' {
    export type ResolvingMetadata = any;
    export type ResolvingViewport = any;
}

declare module 'next/server.js' {
    export type NextRequest = any;
    export type NextResponse = any;
    export type NextFetchEvent = any;
}
