import { cn } from "@/shared/libs/utils";

export default function MoonIcon({ className, outline = true }: { className?: string, outline?: boolean }) {

    if (outline) return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={cn('w-5 h-5', className)}>
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9" />
        </svg>
    );

    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={cn('w-5 h-5', className)}>
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9" />
        </svg>
    );
}