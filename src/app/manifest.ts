import type { MetadataRoute } from 'next/types';
import { appName, appDescriptions } from '@/shared/data';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: appName,
        short_name: appName,
        description: appDescriptions,
        start_url: '/',
        id: '/',
        display: 'standalone',
        display_override: ['window-controls-overlay', 'fullscreen', 'minimal-ui'],
        background_color: '#ffffff',
        theme_color: '#ffffff',
        orientation: 'any',
        scope: '/',
        lang: 'en-US',
        dir: 'ltr',
        categories: ['personal', 'portfolio', 'blog', 'web development', 'programming', 'software engineering'],
        prefer_related_applications: false,
        related_applications: [],
        icons: [
            { src: '/assets/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png', purpose: 'any' },
            { src: '/assets/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png', purpose: 'any' },
            { src: '/favicon.ico', sizes: '48x48', type: 'image/x-icon', purpose: 'any' },
            { src: '/assets/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png', purpose: 'any' },
            { src: '/assets/icons/android-chrome-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
            { src: '/assets/icons/android-chrome-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
        ],
        screenshots: [
            { src: '/assets/screenshots/dark.png', sizes: '1920x1080', type: 'image/png', form_factor: 'wide', label: 'Desktop - Dark Mode' },
            { src: '/assets/screenshots/light.png', sizes: '1920x1080', type: 'image/png', form_factor: 'narrow', label: 'Desktop - Light Mode' },
        ],
    };
}
