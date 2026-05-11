import "../shared/styles/globals.css"
import { ThemeProvider } from '@/shared/extension/next-theme-provider';
import { aladin, kantumruyPro, poppins, srisakdi, openSans } from "@/shared/libs/fonts";
import { cn } from "@/shared/libs/utils";
import ProgressBarProvider from '@/shared/extension/progress-bar-provider';
import DefaultHead from '@/shared/seo/head';
import { NavigationBar } from "@/shared/components/layouts/navbar";


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
                        {children}
                    </ProgressBarProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}