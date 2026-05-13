import Link from "next/link";
import { Button } from "../ui/button";
import { Ripple } from "../background/ripple";
import { LockIcon } from "lucide-react";
import GithubIcon from "../icons/github";
import { alterName } from "@/shared/data";

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    );
}

const footerLinks = {
    product: [
        { label: "Projects", href: "/projects" },
        { label: "Gallery", href: "/gallery" },
    ],
    company: [
        { label: "TURBOTECH Co., Ltd", href: "https://turbotech.com.kh/", external: true },
        { label: "PPhat Labs", href: "https://github.com/pphatlabs", external: true },
    ],
    resources: [
        { label: "Documentation", href: "/posts" },
        { label: "Community", href: "https://github.com/pphatdev/pphat.me/discussions", external: true },
        { label: "Support", href: "/contact" },
    ],
};

const socialLinks = [
    {
        label: "GitHub",
        href: "https://github.com/pphatdev",
        icon: GithubIcon
    },
    {
        label: "LinkedIn",
        href: "https://linkedin.com/in/pphatdev",
        icon: GithubIcon
    },
    {

        label: "Email",
        href: "/contact",
        icon: GithubIcon
    },
    {
        label: "Login",
        href: "/admin",
        icon: LockIcon
    },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative w-full border-t sm:px-3 mt-20 border-foreground/5 bg-linear-to-b from-background via-background/95 to-background backdrop-blur supports-backdrop-filter:bg-background/60">

            <div className="absolute overflow-hidden inset-0 pointer-events-none" aria-hidden="true">
                <Ripple mainCircleSize={150} numCircles={12} className="opacity-30" />
            </div>

            <div className="max-w-5xl mx-auto max-sm:px-5 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12 md:px-5">
                    {/* Product Links */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-base text-primary sm:pl-1">Product</h3>
                        <ul className="max-sm:gap-2 flex flex-col">
                            {footerLinks.product.map((link) => (
                                <li key={link.href}>
                                    <Button variant={'ghost'} asChild className="mt-0 text-foreground/70 h-7 text-xs hover:text-primary -translate-x-2.5  hover:translate-x-0 transition-all duration-300 ease-in-out">
                                        <Link href={link.href}>
                                            <ArrowRightIcon className='w-4 h-4' /> {link.label}
                                        </Link>
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-base text-primary sm:pl-1">Working at</h3>
                        <ul className="max-sm:gap-2 flex flex-col">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Button variant={'ghost'} asChild className="mt-0 text-foreground/70 h-7 text-xs hover:text-primary -translate-x-2.5  hover:translate-x-0 transition-all duration-300 ease-in-out">
                                        <Link href={link.href}>
                                            <ArrowRightIcon className='w-4 h-4' /> {link.label}
                                        </Link>
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-base text-primary sm:pl-1">Resources</h3>
                        <ul className="max-sm:gap-2 flex flex-col">
                            {footerLinks.resources.map((link) => (
                                <li key={link.href}>
                                    <Button variant={'ghost'} asChild className="mt-0 text-foreground/70 h-7 text-xs hover:text-primary -translate-x-2.5  hover:translate-x-0 transition-all duration-300 ease-in-out">
                                        <Link href={link.href}>
                                            <ArrowRightIcon className='w-4 h-4' /> {link.label}
                                        </Link>
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-base sm:pl-1 text-primary">Social</h3>
                        <ul className="max-sm:gap-2 flex flex-col">
                            {socialLinks.map((link) => {
                                // const Icon = link.icon;

                                return (
                                    <li key={link.href}>
                                        <Button variant={'ghost'} asChild className="mt-0 text-foreground/70 h-7 text-xs hover:text-primary -translate-x-2.5  hover:translate-x-0 transition-all duration-300 ease-in-out">
                                            <Link href={link.href}>
                                                <ArrowRightIcon className='w-4 h-4' /> {link.label}
                                            </Link>
                                        </Button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-foreground/5 bg-background">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:px-5">
                        <p className="text-sm text-foreground/80 foreground text-center md:text-left">
                            Copyright © {currentYear}{" "}
                            <Link href="/" className="font-semibold text-foreground hover:text-primary transition-colors" > {alterName} </Link>
                            {" "}· All rights reserved
                        </p>

                        <div className="flex items-center gap-6">
                            <Button variant={'ghost'} asChild className="mt-0 text-foreground/70 h-7 text-xs hover:text-primary">
                                <Link href="https://github.com/pphatdev/api.pphat.me?tab=security-ov-file#security-policy">
                                    <span className="flex min-w-0 items-center gap-2">
                                        <span className="relative flex size-2 shrink-0">
                                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
                                            <span className="relative inline-flex size-2 rounded-full bg-primary" />
                                        </span>
                                        <span className="truncate text-foreground">Privacy Policy</span>
                                    </span>
                                </Link>
                            </Button>
                            {/* <Link
                                href="/terms"
                                className="text-sm text-foreground/80 foreground hover:text-foreground transition-colors"
                            >
                                Terms of Service
                            </Link> */}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
