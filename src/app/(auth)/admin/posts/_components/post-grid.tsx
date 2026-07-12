"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { MoreHorizontal, Edit, Eye, Trash, FileText } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

interface Post {
    id: string;
    title: string;
    slug: string;
    thumbnail?: string;
    published: boolean;
    createdAt: string;
    updatedAt: string;
    tags: string[];
    visitorCount: number;
}

function PostThumbnail({ src, alt }: { src: string, alt: string }) {
    const [hasError, setHasError] = useState(false);

    if (hasError) {
        return (
            <div className="flex h-full w-full items-center justify-center bg-primary/5">
                <FileText className="size-10 text-primary/30" />
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            onError={() => setHasError(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
    );
}

export function PostGrid({ posts, baseUrl }: { posts: Post[], baseUrl: string }) {
    if (posts.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-primary/10 bg-background/50 backdrop-blur-sm p-8 text-center"
            >
                <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <FileText className="size-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">No posts found</h3>
                <p className="text-muted-foreground mt-2 max-w-sm">
                    We couldn't find any blog posts matching your search query. Try adjusting your filters or create a new post!
                </p>
                <Button asChild className="mt-6">
                    <Link href="/admin/posts/new">Create New Post</Link>
                </Button>
            </motion.div>
        );
    }

    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item: Variants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    return (
        <motion.div 
            variants={container} 
            initial="hidden" 
            animate="show" 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
            {posts.map((post) => (
                <motion.div 
                    key={post.id} 
                    variants={item}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-primary/10 bg-background/50 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-[0_0_30px_rgba(var(--primary),0.1)] hover:-translate-y-1"
                >
                    <div className="relative aspect-video w-full overflow-hidden bg-muted">
                        {post.thumbnail ? (
                            <PostThumbnail 
                                src={post.thumbnail.startsWith('http') ? post.thumbnail : `${baseUrl}${post.thumbnail}`}
                                alt={post.title}
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-primary/5">
                                <FileText className="size-10 text-primary/30" />
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80" />
                        
                        <div className="absolute right-3 top-3 z-10">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="secondary" size="icon" className="size-8 bg-background/50 backdrop-blur-md hover:bg-background/80">
                                        <MoreHorizontal className="size-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem asChild>
                                        <Link href={`/posts/${post.slug}`} target="_blank">
                                            <Eye className="mr-2 size-4" />
                                            View Live
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href={`/admin/posts/${post.id}/edit`}>
                                            <Edit className="mr-2 size-4" />
                                            Edit Post
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem variant="destructive">
                                        <Trash className="mr-2 size-4" />
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <div className="absolute bottom-3 left-3">
                            <Badge variant={post.published ? "default" : "secondary"} className="shadow-sm">
                                {post.published ? "Published" : "Draft"}
                            </Badge>
                        </div>
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                        <h3 className="line-clamp-2 font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
                            {post.title}
                        </h3>
                        <div className="mt-auto pt-4 flex items-center justify-between text-xs text-muted-foreground">
                            <span>{new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            {/* <span>{post.visitorCount.toLocaleString()} views</span> */}
                        </div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
}
