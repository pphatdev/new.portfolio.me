"use client";

import { ThemeToggle } from "@/shared/components/ui/theme-switch";
import { Button } from "@/shared/components/ui/button";
import { LogOut } from "lucide-react";

export function AdminHeader() {
    // In a real implementation we would call signOut() from @/shared/libs/auth here
    // but since we might not have a client-side wrapper, we can just use a server action or API route.
    const handleLogout = () => {
        // Redirect to a logout route or perform client-side cleanup
        window.location.href = "/api/auth/logout"; // Placeholder
    };

    return (
        <header className="h-16 w-full border-b border-primary/5 bg-background/50 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-40">
            <div className="flex items-center md:hidden">
                <span className="font-bold text-lg text-primary">Admin Panel</span>
            </div>
            <div className="hidden md:flex" /> {/* Spacer */}
            
            <div className="flex items-center gap-4">
                <ThemeToggle />
                <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleLogout}
                    className="rounded-xl border-primary/5 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
                >
                    <LogOut className="size-4 mr-2" />
                    Sign Out
                </Button>
            </div>
        </header>
    );
}
