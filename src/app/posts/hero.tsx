import React from "react"
import { GridPattern } from "@/shared/components/background/grid-pattern"
import { BlurFade } from "@/shared/components/background/blur-fade"
import RainbowEffects from "@/shared/components/background/rainbow-effects"
import { Input } from "@/shared/components/ui/input"
import { Search, X } from "lucide-react"
import { Button } from "@/shared/components/ui/button"

interface ArticleHeroProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    onClearSearch: () => void;
}

export const ArticleHero = React.memo(({ searchQuery, onSearchChange, onClearSearch }: ArticleHeroProps) => {
    const handleInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        onSearchChange(e.target.value);
    }, [onSearchChange]);

    const pageDescription = "Explore my thoughts, tutorials, and insights on software development.";

    return (
        <div className="min-h-36 mb-10 sm:min-h-60 flex bg-linear-to-b from-primary/10 pt-14 sm:pt-24 to-background flex-col overflow-clip relative items-start justify-center">
            <RainbowEffects className="opacity-10" />
            <div className="absolute inset-y-0 left-1/3 right-0 pointer-events-none" aria-hidden="true">
                <GridPattern
                    width={30}
                    height={30}
                    x={-1}
                    y={-1}
                    strokeDasharray={"4 2"}
                    className={"mask-[radial-gradient(300px_circle_at_center,white,transparent)] absolute w-full "}
                />
            </div>
            <div className="w-full p-4 pb-0 sm:px-5 flex flex-col max-w-5xl mx-auto">
                <BlurFade delay={0.6} inView className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full">
                    <div className="space-y-2 max-w-2xl">
                        <h1 className="text-3xl font-bold sm:text-5xl xl:text-6xl/none"> Art<span className="text-left bg-background bg-clip-text bg-no-repeat text-transparent bg-linear-to-r from-purple-500 via-pink-500 to-orange-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">icles</span> </h1>
                        <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">
                            {pageDescription}
                        </p>
                    </div>
                    <div className="relative w-full sm:max-w-[18rem]">
                        <Input
                            type="text"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={handleInputChange}
                            className="pl-4 pr-20 h-10 rounded-full border border-foreground/5 bg-background hover:bg-background transition-all"
                        />
                        <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex items-center rounded-full bg-secondary/5 ring-foreground/5 gap-1">
                            {searchQuery && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={onClearSearch}
                                    className="h-8 w-8 rounded-full"
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            )}
                            <div className="h-8 w-8 rounded-full flex items-center justify-center">
                                <Search className="text-muted-foreground w-4 h-4" />
                            </div>
                        </div>
                    </div>
                </BlurFade>
            </div>
        </div>
    )
});

ArticleHero.displayName = 'ArticleHero';
