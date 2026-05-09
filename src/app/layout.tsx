import { ThemeProvider } from 'next-themes';
import { aladin, kantumruyPro, poppins, srisakdi, openSans } from "@/shared/libs/fonts";
import { cn } from "@/shared/libs/utils";
import ProgressBarProvider from '@/shared/components/extension/progress-bar-provider';
import DefaultHead from '@/shared/components/seo/head';


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
                        {children}
                    </ProgressBarProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}