'use client';

import { useState, useEffect, Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { BlogHero } from "./hero";
import ArticleCard from "@/shared/components/ui/article-card";
import { useArticles } from "@/shared/hooks/articles";
import { Spinner } from "@/shared/components/ui/loading";
import { BlurFade } from "@/shared/components/background/blur-fade";
import Footer from "@/shared/components/layouts/footer";

import { Button } from "@/shared/components/ui/button";
import { ChevronLeft, ChevronRight, SearchX } from "lucide-react";

function BlogsContent() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const initialSearch = searchParams.get('q') || "";
    const initialPage = parseInt(searchParams.get('page') || "1", 10);

    const [searchQuery, setSearchQuery] = useState(initialSearch);
    const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);
    const [currentPage, setCurrentPage] = useState(initialPage);

    // Debounce search query
    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchQuery !== debouncedSearch) {
                setDebouncedSearch(searchQuery);
                setCurrentPage(1); // Reset to page 1 when search changes
            }
        }, 300);
        return () => clearTimeout(handler);
    }, [searchQuery, debouncedSearch]);

    // Update URL when search or page changes
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        if (debouncedSearch) {
            params.set('q', debouncedSearch);
        } else {
            params.delete('q');
        }

        if (currentPage > 1) {
            params.set('page', currentPage.toString());
        } else {
            params.delete('page');
        }

        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, [debouncedSearch, currentPage, pathname, router]);

    // Fetch articles
    const { articles, loading, error } = useArticles({
        search: debouncedSearch,
        limit: 10,
        page: currentPage
    });

    const totalPages = articles?.pagination?.totalPages || 1;

    return (
        <main className="w-full flex flex-col gap-7">
            <BlogHero
                searchQuery={searchQuery}
                onSearchChange={(value) => setSearchQuery(value)}
                onClearSearch={() => setSearchQuery("")}
            />

            <BlurFade delay={0.9} className="w-full max-w-5xl mx-auto max-sm:p-0 px-4 pb-16">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 min-h-[400px]">
                    {loading && (
                        <div className="col-span-full flex justify-center items-center py-12">
                            <Spinner variant={'bars'} />
                        </div>
                    )}

                    {error && <p className="text-center text-destructive col-span-full">Error: {error}</p>}

                    {!loading && articles?.data && articles.data.length === 0 && (
                        <div className="col-span-full flex flex-col items-center justify-center py-20 text-center border border-dashed rounded-2xl border-foreground/10 bg-background/50">
                            <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mb-5 ring-1 ring-foreground/10 shadow-sm">
                                <SearchX className="w-8 h-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-bold tracking-tight text-foreground mb-2">No articles found</h3>
                            <p className="text-muted-foreground max-w-sm">
                                {debouncedSearch ? `We couldn't find any articles matching "${debouncedSearch}". Try adjusting your search query.` : "There are currently no articles to display."}
                            </p>
                        </div>
                    )}

                    {!loading && articles?.data && articles.data.map((article, index) => (
                        <ArticleCard key={article.id || index} article={article} />
                    ))}
                </div>

                {!loading && totalPages > 1 && (
                    <div className="flex items-center justify-center gap-4 mt-12">
                        <Button
                            variant="outline"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            className="rounded-full w-10 h-10 p-0"
                            aria-label="Previous page"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </Button>
                        <span className="text-sm font-medium text-foreground/80">
                            Page {currentPage} of {totalPages}
                        </span>
                        <Button
                            variant="outline"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            className="rounded-full w-10 h-10 p-0"
                            aria-label="Next page"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </Button>
                    </div>
                )}
            </BlurFade>
        </main>
    );
}

export default function Blogs() {
    return (
        <Suspense fallback={<div className="w-full min-h-screen flex justify-center items-center"><Spinner variant="bars" /></div>}>
            <BlogsContent />
            <Footer />
        </Suspense>
    );
}
