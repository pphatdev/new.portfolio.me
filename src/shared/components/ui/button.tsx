import { cn } from "@/shared/libs/utils"
import { Slot } from "@radix-ui/react-slot"
import { type VariantProps, cva } from "class-variance-authority"
import * as React from "react"

const buttonVariants = cva(
    "inline-flex items-center justify-center cursor-pointer gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-primary-accent max-sm:px-3 max-sm:pr-4 max-sm:bg-foreground/5 font-sans transition-all duration-300 max-sm:mt-0 items-center max-sm:ring hover:ring w-fit ring-foreground/10 justify-start flex rounded-full hover:px-4 p-1.5",
                destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
                outline: "border border-foreground/10 bg-transparent hover:shadow-xs hover:bg-foreground/10 hover:text-primary",
                secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
                ghost: "hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/10",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-9 px-4 py-2 has-[>svg]:px-3",
                sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
                lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
                icon: "size-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

function Button({
    className,
    variant,
    size,
    asChild = false,
    ...props
}: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean
    }) {
    const Comp = asChild ? Slot : "button"

    return (
        <Comp
            data-slot="button"
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    )
}

export { Button, buttonVariants }