import { getOrigin } from './origin';

const GoogleIndexingVerification = () => {
    const verify = {
        google: "googleff785c31669eafd5",
    }

    return (
        <>
            <meta name="google-site-verification" content={verify.google} />
            <meta name="googlebot" content="index,follow" />
            <meta name="googlebot-news" content="index,follow" />
            <meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        </>
    );
}

export default async function DefaultHead() {
    const origin = await getOrigin();
    const imageUrl = `${origin}/assets/avatars/hero.webp`;

    const metaLinkRels = [
        { rel: "dns-prefetch", href: origin },
        { rel: "image_src", href: imageUrl },
        { rel: "me", href: "https://github.com/pphatdev" },
        { rel: "me", href: "https://www.linkedin.com/in/pphatdev" },
        { rel: "me", href: "https://x.com/pphatdev" },
    ];

    const alternateLinks = [
        { type: "application/rss+xml", title: "PPhat Dev RSS", href: `${origin}/blogs/rss.xml` },
        { type: "application/atom+xml", title: "PPhat Dev Atom", href: `${origin}/blogs/atom.xml` },
        { type: "application/feed+json", title: "PPhat Dev JSON Feed", href: `${origin}/blogs/feed.json` },
    ];

    return (
        <>
            <link rel="icon" type="image/x-icon" href="/assets/icons/favicon.ico" />
            <link rel="icon" type="image/png" sizes="32x32" href="/assets/icons/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/assets/icons/favicon-16x16.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/assets/icons/apple-touch-icon.png" />
            <link rel="manifest" href="/manifest.webmanifest" />
            <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Source+Code+Pro:wght@400;500;600;700&display=swap" />
            <GoogleIndexingVerification />

            {metaLinkRels.map((link) => (
                <link key={`${link.rel}-${link.href}`} rel={link.rel} href={link.href} />
            ))}

            {alternateLinks.map((link) => (
                <link key={`${link.type}-${link.title}-${link.href}`} rel="alternate" type={link.type} title={link.title} href={link.href} />
            ))}
            <meta name="priority" content="1.0" />
            <meta name="revisit-after" content="1 day" />
        </>
    )
}
