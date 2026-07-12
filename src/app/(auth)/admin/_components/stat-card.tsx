"use client";

import { ReactNode } from "react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { cn } from "@/shared/libs/utils";

interface StatCardProps {
    title: string;
    value: string | number;
    description?: string;
    icon?: ReactNode;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    className?: string;
}

export function StatCard({ title, value, description, icon, trend, className }: StatCardProps) {
    return (
        <Card className={cn("overflow-hidden bg-background/80 backdrop-blur-3xl relative rounded-3xl border-primary/5 shadow-lg shadow-primary/5", className)}>
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-muted-foreground tracking-wide">{title}</h3>
                    {icon && (
                        <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
                            {icon}
                        </div>
                    )}
                </div>
                
                <div className="flex flex-col gap-1">
                    <span className="text-3xl font-bold tracking-tight text-foreground">{value}</span>
                    
                    {(description || trend) && (
                        <div className="flex items-center gap-2 mt-1">
                            {trend && (
                                <span className={cn(
                                    "text-xs font-semibold px-2 py-0.5 rounded-full",
                                    trend.isPositive ? "bg-green-500/10 text-green-500" : "bg-destructive/10 text-destructive"
                                )}>
                                    {trend.isPositive ? "+" : "-"}{Math.abs(trend.value)}%
                                </span>
                            )}
                            {description && (
                                <span className="text-sm text-muted-foreground">{description}</span>
                            )}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
