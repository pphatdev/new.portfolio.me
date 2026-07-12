"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Briefcase, FileText, Users, Settings } from "lucide-react";
import { cn } from "@/shared/libs/utils";

const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Projects", href: "/admin/projects", icon: Briefcase },
    { name: "Posts", href: "/admin/posts", icon: FileText },
    { name: "Contacts", href: "/admin/contacts", icon: Users },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden md:flex flex-col w-64 border-r border-primary/5 bg-background/50 backdrop-blur-xl h-screen sticky top-0">
            <div className="p-6">
                <Link href="/admin" className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary">
                    <span className="bg-primary/10 p-2 rounded-xl">
                        <Settings className="size-5" />
                    </span>
                    Admin Panel
                </Link>
            </div>
            
            <nav className="flex-1 px-4 space-y-1 mt-4">
                {navigation.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href));
                    
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300",
                                isActive 
                                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                            )}
                        >
                            <item.icon className="size-5" />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-6 text-xs text-muted-foreground text-center border-t border-primary/5">
                <p>&copy; {new Date().getFullYear()} Pphat.me</p>
                <p className="mt-1">All rights reserved.</p>
            </div>
        </aside>
    );
}
