"use client";

import { cn } from "@/shared/libs/utils";

interface RainbowEffectsProps {
    className?: string;
}

export default function RainbowEffects({ className }: RainbowEffectsProps) {
    return (
        <canvas
            className={cn(
                "absolute z-[-1] w-full h-full blur-3xl left-1/2 translate-y-1/2 bottom-1/3 -translate-x-1/2 opacity-20 animate-rainbow",
                "bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))]",
                "bg-size-[200%]",
                className
            )}>
        </canvas>
    );
}