"use client"

import React from "react"
import { cn } from "@/shared/libs/utils"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import MoonIcon from "../icons/moon"
import SunIcon from "../icons/sun"

interface ThemeToggleProps {
    className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
    const { resolvedTheme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // Mount component on client-side only
    useEffect(() => {
        setMounted(true)
    }, [])

    // Prevent hydration mismatch by rendering a placeholder
    if (!mounted) {
        return (
            <div className={cn("w-16 h-8 rounded-full bg-background/10 border border-foreground/10", className)} />
        )
    }

    const isDark = resolvedTheme === "dark"
    const toggleTheme = () => setTheme(isDark ? "light" : "dark")

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            toggleTheme()
        }
    }

    return (
        <div
            className={cn(
                "relative flex w-16 h-8 p-1 rounded-full cursor-pointer transition-colors duration-500",
                isDark ? "border border-foreground/10" : "border border-foreground/10",
                className
            )}
            onClick={toggleTheme}
            onKeyDown={handleKeyDown}
            role="switch"
            aria-checked={isDark}
            aria-label={`Switch to ${isDark ? 'Light' : 'Dark'} theme`}
            tabIndex={0}
        >
            <div className="flex justify-between items-center w-full px-1 z-10 text-foreground">
                <div className="flex items-center justify-center">
                    <SunIcon className={cn(
                        "size-4 transition-colors duration-75 pointer-events-none",
                        isDark ? "text-foreground/80" : "text-primary"
                    )} outline={isDark ? true : false} />
                </div>
                <div className="flex items-center justify-center">
                    <MoonIcon className={cn(
                        "size-4 transition-colors duration-75 pointer-events-none",
                        isDark ? "text-primary" : "text-foreground/80"
                    )} outline={isDark ? false : true} />
                </div>
            </div>

            <motion.div
                className={cn(
                    "absolute top-0.5 bottom-1 size-6 border border-primary/10 rounded-full transition-all duration-100 shadow-inner shadow-primary/20 z-0",
                    isDark ? "bg-primary/10" : "bg-primary/10"
                )}
                initial={false}
                animate={{
                    x: isDark ? 30 : 0,
                    y: 1
                }}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30
                }}
            />
        </div>
    )
}
