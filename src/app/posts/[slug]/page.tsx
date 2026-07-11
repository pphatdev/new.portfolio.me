import "../../../shared/styles/code-block-node.css"
import Link from 'next/link';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { cacheLife } from 'next/cache';
import { upstream } from '@/app/api/lib/client';

import { NavigationBar } from '@/shared/components/layouts/navbar';
import { GridPattern } from '@/shared/components/background/grid-pattern';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { ArrowLeftIcon, ArrowRightIcon, Calendar, Clock, Eye, User } from 'lucide-react';
import { MarkdownRenderer } from '@/shared/extension/markdown/renderer';
import { PostCoverImage } from './cover';
import { ScrollToTopButton } from '@/shared/components/ui/scroll-to-top';
import Footer from '@/shared/components/layouts/footer';
import { IArticleDetailResponse } from '@/shared/interfaces/articles';
import { appName } from '@/shared/data';
import { Spinner } from '@/shared/components/ui/loading';

interface Params {
    params: Promise<{
        slug: string;
    }>;
}

export const unstable_instant = { prefetch: 'static' };


export async function generateMetadata(props: Params): Promise<Metadata> {
    const params = await props.params;
    const article = await getArticleDetail(params.slug);
    const data = article?.data;

    if (!article || !data) {
        return {
            title: `Article Not Found`,
            description: 'The requested article could not be found',
        };
    }

    return {
        title: `${data.title}`,
        description: data.description,
        authors: data.authors?.map((author) => ({
            name: author.name,
            url: author.url,
        })) || [{
            name: appName,
            url: process.env.NEXT_PUBLIC_APP_URL,
        }],
        openGraph: {
            title: `${data.title}`,
            description: data.description,
            type: 'article',
            url: `${process.env.NEXT_PUBLIC_APP_URL}/posts/${data.slug}`,
            images: data.thumbnail ? [{ url: data.thumbnail.toString() }] : undefined,
        },
        twitter: {
            card: 'summary_large_image',
            title: `${data.title}`,
            description: data.description,
            images: data.thumbnail ? [{ url: data.thumbnail.toString() }] : undefined,
        },
    };
}

const getArticleDetail = async (slug: string): Promise<IArticleDetailResponse> => {
    'use cache';
    cacheLife('hours');
    try {
        const response = await upstream(`/v1/api/articles/${slug}`, {
            method: 'GET',
        });

        if (!response.ok) {
            console.error(`Failed to fetch article upstream with slug ${slug}:`, response.statusText);
            throw new Error(`Failed to fetch article upstream with slug ${slug}`);
        }

        const data = await response.json();
        return data as IArticleDetailResponse;
    }
    catch (error) {
        console.error(`Error fetching article upstream with slug ${slug}:`, error);
        throw error;
    }
};

export default async function ArticleDetail(props: Params) {
    return (
        <>
            <NavigationBar className='fixed' />

            <div className="max-sm:px-3">
                <div className='absolute inset-y-0 left-0 right-0 pointer-events-none opacity-60' aria-hidden='true'>
                    <GridPattern
                        width={30}
                        height={30}
                        x={-1}
                        y={-1}
                        className={'mask-[linear-gradient(to_bottom_right,white,transparent,transparent)] '}
                    />
                </div>

                <Suspense fallback={
                    <div className="container flex min-h-svh flex-col justify-center items-center mx-auto py-16 text-center">
                        <Spinner variant="bars" />
                    </div>
                }>
                    {props.params.then(({ slug }) => (
                        <ArticleContent slug={slug} />
                    ))}
                </Suspense>
            </div>

            <Footer />
            <ScrollToTopButton />
        </>
    );
}

async function ArticleContent({ slug }: { slug: string }) {
    const article = await getArticleDetail(slug);
    if (!article || !article.data) {
        return (
            <div className='container flex min-h-svh flex-col justify-center items-center mx-auto py-16 text-center pt-32'>
                <h1 className='text-4xl font-bold mb-4'>Article Not Found</h1>
                <p className='text-foreground/50 mb-8'> The article you are looking for does not exist. </p>

                <Button asChild className='ring'>
                    <Link href='/posts'>
                        <ArrowLeftIcon className='w-4 h-4 mr-2' /> Back to Articles
                    </Link>
                </Button>
            </div>
        );
    }

    const data = article.data;

    return (
        <article className='max-w-5xl sm:px-4 relative mx-auto max-xs:pt-0 sm:mt-16 max-sm:pb-0 py-8'>
            {data.thumbnail && (
                <div className='relative w-full sm:p-2 ring-1 rounded-3xl ring-foreground/10 h-full max-xs:max-h-96 md:h-116 max-xs:rounded-none max-xs:rounded-b-4xl overflow-hidden'>
                    <PostCoverImage src={data.thumbnail} alt={data.title} />
                </div>
            )}

            <div className='flex items-center justify-between gap-2 mt-7 py-4 order-2'>
                <Button asChild variant="outline" className='h-9'>
                    <Link href='/posts'>
                        <ArrowLeftIcon className='w-4 h-4' /> Back to Articles
                    </Link>
                </Button>
            </div>

            <div className='flex max-sm:my-2 my-8 flex-col relative order-1'>
                <h1 className='text-4xl md:text-5xl font-bold leading-tight'> <span className="text-left bg-background bg-clip-text bg-no-repeat text-transparent bg-linear-to-r from-purple-500 via-pink-500 to-orange-500 [text-shadow:0_0_rgba(0,0,0,0.1)]"> {data.title} </span> </h1>
                
                <div className='flex gap-2 flex-wrap items-center mt-2 justify-between'>
                    {(data.tags?.length || 0) > 0 && (
                        <div className='flex flex-wrap w-fit justify-start gap-1 bg-background'>
                            {(data.tags ?? []).map((tag) => (
                                <Badge key={tag.id} variant='outline' className='py-1 rounded-md tracking-widest leading-tight font-open-sans'> @{tag.tag} </Badge>
                            ))}
                        </div>
                    )}
                </div>
                <p className='text-base text-foreground/60 mt-5 tracking-wide leading-relaxed font-sans'>{data.description}</p>
            </div>

            <div className='flex flex-wrap items-center gap-4 mb-6 justify-start border-b border-foreground/10 pb-6'>
                {data.createdAt && (
                    <div className='flex items-center space-x-1 max-sm:text-xs text-sm text-foreground/60'>
                        <Calendar className='size-4' />
                        <time dateTime={data.createdAt} className='whitespace-nowrap'>
                            {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(data.createdAt))}
                        </time>
                    </div>
                )}
                
                {data.stats && (
                    <>
                        <div className='flex items-center space-x-1 max-sm:text-xs text-sm text-foreground/60'>
                            <Clock className='w-4 h-4' />
                            <span>{data.stats.readingMins} min read</span>
                        </div>
                        <div className='flex items-center space-x-1 max-sm:text-xs text-sm text-foreground/60'>
                            <Eye className='w-4 h-4' />
                            <span>{data.stats.views} views</span>
                        </div>
                    </>
                )}
            </div>

            <ul className="py-2 gap-1 sm:gap-4 items-center flex mb-8">
                {(data.authors ?? []).map((author, index) => (
                    <li key={index} className='flex items-center'>
                        <Link
                            rel='noopener noreferrer'
                            target='_blank'
                            href={author.url || '#'}
                            className='flex items-center space-x-2'
                        >
                            <Avatar className='w-10 h-10 border border-foreground/10'>
                                <AvatarImage src={`https://avatar.vercel.sh/${author.name}.png`} alt={author.name} />
                                <AvatarFallback>
                                    <User className='w-4 h-4' />
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <p className='font-semibold text-sm'>{author.name}</p>
                                <p className='text-xs text-muted-foreground'>{author.profile}</p>
                            </div>
                        </Link>

                        {index < (data.authors?.length ?? 0) - 1 && (
                            <div className='mx-2 sm:mx-4 h-4 w-px bg-foreground/30' />
                        )}
                    </li>
                ))}
            </ul>

            <div className='py-5'>
                <div className='mx-auto pb-10 border-b border-foreground/10'>
                    <MarkdownRenderer content={data.content} />
                </div>

                <div className='flex flex-col gap-3 mt-10'>
                    <div className='flex items-center mx-auto justify-between w-full gap-3'>
                        {article.navigation?.prev ? (
                            <Button asChild variant={'outline'} className="max-sm:px-2">
                                <Link href={`${article.navigation.prev}`}>
                                    <ArrowLeftIcon className='w-4 h-4 shrink-0' />
                                    <span className='sm:hidden'>Prev</span>
                                    <span className='max-sm:hidden'>Previous Article</span>
                                </Link>
                            </Button>
                        ) : (<div />)}

                        {article.navigation?.next ? (
                            <Button asChild variant={'outline'} className="max-sm:px-2">
                                <Link href={`${article.navigation.next}`}>
                                    <ArrowRightIcon className='w-4 h-4 shrink-0' />
                                    <span className='sm:hidden'>Next</span>
                                    <span className='max-sm:hidden'>Next Article</span>
                                </Link>
                            </Button>
                        ) : (<div />)}
                    </div>
                </div>
            </div>

        </article>
    );
}
