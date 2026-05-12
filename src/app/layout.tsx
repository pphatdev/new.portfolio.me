import "../shared/styles/globals.css"
import { ThemeProvider } from '@/shared/extension/next-theme-provider';
import { aladin, kantumruyPro, poppins, srisakdi, openSans } from "@/shared/libs/fonts";
import { cn } from "@/shared/libs/utils";
import ProgressBarProvider from '@/shared/extension/progress-bar-provider';
import DefaultHead from '@/shared/seo/head';
import { NavigationBar } from "@/shared/components/layouts/navbar";
import RainbowEffects from "@/shared/components/background/rainbow-effects";
import { BeamsWithCollision } from "@/shared/components/background/beams-with-collision";
import { GridPattern } from "@/shared/components/background/grid-pattern";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en" suppressHydrationWarning className="scroll-smooth">
            <head>
                <DefaultHead />
            </head>
            <body className={cn(poppins.variable, kantumruyPro.variable, aladin.variable, srisakdi.variable, openSans.variable, `antialiased p-0 m-0 font-sans bg-body`)} style={{ overflowX: 'hidden' }}>
                <ThemeProvider
                    attribute="class"
                    enableSystem
                    defaultTheme="system"
                    disableTransitionOnChange
                >
                    <ProgressBarProvider>
                        <NavigationBar />
                        <RainbowEffects className="opacity-5" />
                        <BeamsWithCollision className="flex items-center absolute -z-1 pointer-events-none max-w-5xl left-1/2 -translate-x-1/2 mx-auto justify-center w-full h-full" />
                        <div className="absolute inset-y-0 left-1/3 right-0 pointer-events-none" aria-hidden="true">
                            <GridPattern width={30} height={30} x={-1} y={-1} strokeDasharray={"4 2"} className={"mask-[radial-gradient(300px_circle_at_center,white,transparent)] absolute w-full "} />
                        </div>
                        {children}
                    </ProgressBarProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}