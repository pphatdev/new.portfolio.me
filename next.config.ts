import type { NextConfig } from "next";

const API_URL = process.env.NEXT_PUBLIC_APP_API;

const nextConfig: NextConfig = {
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
};


export default nextConfig;
