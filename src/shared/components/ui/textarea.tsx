import { cn } from "@/shared/libs/utils"
import * as React from "react"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
    return (
        <textarea
            data-slot="textarea"
            className={cn(
                "file:text-foreground placeholder:text-foreground/30 selection:bg-primary selection:text-primary-foreground dark:bg-background/10 border-input flex min-h-[60px] w-full rounded-xl border bg-transparent px-3 py-2 text-base transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                "border-foreground/10 focus-visible:border-primary/20 focus-visible:ring-primary/50 focus-visible:ring-2",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive resize-none",
                className
            )}
            {...props}
        />
    )
}

export { Textarea }
