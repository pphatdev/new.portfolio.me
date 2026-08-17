import type { MetadataRoute } from 'next/types';
import { getOrigin } from '@/shared/seo/origin';

export default async function robots(): Promise<MetadataRoute.Robots> {
    const origin = await getOrigin();
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/admin/', '/login'],
            },
        ],
        sitemap: `${origin}/sitemap.xml`,
        host: origin,
    };
}
