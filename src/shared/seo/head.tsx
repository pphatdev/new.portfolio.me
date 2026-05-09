const imageUrl = `${process.env.NEXT_PUBLIC_APP_URL}/assets/avatars/hero.webp`;


export const alternateLinks = [
    { type: "application/rss+xml", title: "PPhat Dev RSS", href: "https://pphat.me/blogs/rss.xml" },
    { type: "application/atom+xml", title: "PPhat Dev Atom", href: "https://pphat.me/blogs/atom.xml" },
    { type: "application/feed+json", title: "PPhat Dev JSON Feed", href: "https://pphat.me/blogs/feed.json" },
]

export const metaLinkRels = [
    { rel: "dns-prefetch", href: "https://pphat.me" },
    { rel: "image_src", href: imageUrl },
    { rel: "me", href: "https://github.com/pphatdev" },
    { rel: "me", href: "https://www.linkedin.com/in/pphatdev" },
    { rel: "me", href: "https://x.com/pphatdev" },
]

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

export default function DefaultHead() {
    return (
        <>
            <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
            <link rel="dns-prefetch" href="https://pphat.me" />
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