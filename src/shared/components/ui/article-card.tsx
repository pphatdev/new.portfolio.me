"use client";

import { Badge } from "@/shared/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import * as React from "react";
import { cn } from "@/shared/libs/utils";
import { Article } from "@/shared/interfaces/articles";
import { Button } from "./button";

function ShareIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props} >
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <path d="M8.59 13.51 15.42 17.49" />
            <path d="M15.41 6.51 8.59 10.49" />
        </svg>
    );
}

export const ArticleCard = React.memo(({ article, actionChildren, className, isAdmin = false }: { article: Article, actionChildren?: React.ReactNode, className?: string, isAdmin?: boolean }) => {
    const shareArticle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (navigator.share) {
            navigator.share({
                url: `/posts/${article.slug}`,
                title: article.title
            }).catch(err => console.error('Error sharing:', err));
        }
    };

    // Thumbnail URL: replace origin-relative URLs with absolute ones for Next.js Image optimization
    const thumbnailSrc = article.thumbnail?.replace(/^https?:\/\/[^\/]+/, '') || "/assets/placeholder/placeholder.svg";

    return (
        <div className={cn("relative duration-300 group flex flex-col gap-0 hover:translate-y-1 overflow-hidden h-fit bg-foreground/5 group font-sans rounded-3xl mb-4 ring-1 ring-foreground/10 hover:ring-primary min-h-[350px] hover:ring-2 transition-all ease-in-out", className)} role="article" tabIndex={-1}>
            <Image
                src={thumbnailSrc}
                width={512}
                height={512}
                alt={article.title}
                className="w-full h-40 aspect-video object-cover rounded-b-xl bg-background/50"
                loading="lazy"
                sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
                unoptimized={article.thumbnail?.startsWith('http') || thumbnailSrc.startsWith('http')}
            />

            <div className="absolute transition-opacity lg:opacity-0 bg-background/50 group-hover:opacity-100 pointer-events-auto rounded-full right-3 top-3 flex z-50">
                <div className='bg-foreground/5 z-50 ring-1 w-fit ml-auto ring-foreground/10 justify-end flex rounded-full p-1'>
                    {actionChildren
                        ? actionChildren
                        : <>
                            <Button
                                aria-label={`Share ${article.title}`}
                                type="button"
                                onClick={shareArticle}
                                variant={"outline"}
                                size={"icon"}
                            >
                                <ShareIcon className="size-4" aria-hidden="true" />
                                <span className="sr-only">Share this article</span>
                            </Button>
                        </>
                    }
                </div>
            </div>

            <Link href={`/posts/${article.slug ?? '#'}`} className="inset-0 z-0 absolute" aria-label={article.title} />

            <div className="px-4 pb-4 pt-2 w-full flex flex-col relative pointer-events-none">

                <div className="flex z-50 justify-start items-center flex-wrap gap-2 pointer-events-auto mt-2">
                    {article.tags?.slice(0, 3).map((tag, index) => (
                        <Link key={index} href={`/posts?tag=${encodeURIComponent(tag.tag)}`} className="text-xs font-sans">
                            <Badge variant="outline" className="bg-foreground/5 text-foreground/80 hover:bg-foreground/10 hover:text-primary transition-all duration-200 ease-in-out">{tag.tag}</Badge>
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-2 my-2">
                    <time dateTime={new Date(article.createdAt).toISOString()} className="text-xs text-foreground/50 font-sans">{new Date(article.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
                    {article.stats?.readingMins && (
                        <>
                            <span className="text-xs text-foreground/50">•</span>
                            <span className="text-xs text-foreground/50">{article.stats.readingMins} min read</span>
                        </>
                    )}
                </div>

                {isAdmin && article.published && (
                    <div className="size-2.5 absolute top-5 right-3 bg-primary rounded-full"></div>
                )}

                <h2 className="z-10 font-semibold font-sans tracking-wide line-clamp-1 pb-2">{article.title}</h2>
                <p className='font-normal text-sm z-10 line-clamp-3 mb-4 text-foreground/80'>{article.description || ""}</p>
            </div>
        </div>
    );
});

ArticleCard.displayName = 'ArticleCard';

export default ArticleCard;
