import Link from "next/link";
import { PlusIcon, Search } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { getAllPosts } from "@/shared/libs/content";
import { PostGrid } from "./_components/post-grid";

export default async function AdminPostsPage(props: { searchParams?: Promise<{ q?: string }> }) {
    const searchParams = await props.searchParams;
    const q = searchParams?.q?.toLowerCase() || "";

    let posts = await getAllPosts();

    if (q) {
        posts = posts.filter((post: any) => 
            post.title.toLowerCase().includes(q) || 
            post.slug.toLowerCase().includes(q)
        );
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_API?.replace(/\/$/, '') ?? 'https://api.pphat.top';

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/50">
                        Blogs
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Manage your blog posts, edit content, and track performance.
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <form action="/admin/posts" method="GET" className="relative">
                        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input 
                            name="q" 
                            defaultValue={q}
                            placeholder="Search posts..." 
                            className="pl-9 w-[200px] lg:w-[300px] bg-background/50 backdrop-blur-md"
                        />
                    </form>
                    <Button asChild className="rounded-full shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 transition-all">
                        <Link href="/admin/posts/new">
                            <PlusIcon className="mr-2 size-4" />
                            New Blog
                        </Link>
                    </Button>
                </div>
            </div>

            <PostGrid posts={posts} baseUrl={baseUrl} />
        </div>
    );
}
