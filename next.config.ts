import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const API_URL = process.env.NEXT_PUBLIC_APP_API;

const nextConfig: NextConfig = {
    allowedDevOrigins: ['127.0.0.1', '172.26.17.136'],
    async rewrites() {
        // Only register the proxy rewrite when the API URL is configured.
        // Without this guard Next.js throws "destination does not start with /"
        // when the env var is empty or undefined.
        if (!API_URL) return [];

        return [
            {
                source: '/api/proxy/:path*',
                destination: `${API_URL}/:path*`,
            },
        ];
    },
    async redirects() {
        return [
            {
                source: '/login',
                destination: 'https://admin.pphat.me',
                permanent: true,
            },
            {
                source: '/admin',
                destination: 'https://admin.pphat.me',
                permanent: true,
            },
        ];
    },
    images: {
        localPatterns: [
            {
                pathname: '/**',
                search: '',
            },
        ],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'github.com',
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'pphat.me',
            },
            {
                protocol: 'https',
                hostname: 'blog-api.pphatdev.workers.dev',
            },
            {
                protocol: 'https',
                hostname: 'pphat.top',
            },
            {
                protocol: 'https',
                hostname: 'api.pphat.top',
            },
            {
                protocol: 'https',
                hostname: 'avatar.vercel.sh',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            }
        ],
    },
};


export default nextConfig;

initOpenNextCloudflareForDev();
