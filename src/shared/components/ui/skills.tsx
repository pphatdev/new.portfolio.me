"use client";

import { cn } from "@/shared/libs/utils";
import AutoScroll from "embla-carousel-auto-scroll";
import { NextJsIcon } from "../icons/nextjs";
import { Carousel, CarouselContent, CarouselItem } from "./carousel";
import { TypeScriptIcon } from "../icons/typescript";
import { JavaScriptIcon } from "../icons/javascript";
import { ReactIcon } from "../icons/reactjs";
import { VueIcon } from "../icons/vuejs";
import { NuxtIcon } from "../icons/nuxtjs";
import { PhpIcon } from "../icons/php";
import { LaravelIcon } from "../icons/laravel";
import { CssIcon } from "../icons/css";
import { TailwindIcon } from "../icons/tailwindcss";
import { NodeJsIcon } from "../icons/nodejs";

const logos = [
    {
        id: "logo-1",
        description: "TypeScript",
        icons: TypeScriptIcon,
        className: "text-blue-600",
    },
    {
        id: "logo-2",
        description: "JavaScript",
        icons: JavaScriptIcon,
        className: "text-yellow-500",
    },
    {
        id: "logo-3",
        description: "Node.JS",
        icons: NodeJsIcon,
        className: "text-green-600",
    },
    {
        id: "logo-4",
        description: "React.JS",
        icons: ReactIcon,
        className: "text-sky-500",
    },
    {
        id: "logo-5",
        description: "Next.JS",
        icons: NextJsIcon,
        className: "text-foreground",
    },
    {
        id: "logo-6",
        description: "Vue.JS",
        icons: VueIcon,
        className: "text-emerald-500",
    },
    {
        id: "logo-7",
        description: "Nuxt.JS",
        icons: NuxtIcon,
        className: "text-emerald-400",
    },
    {
        id: "logo-8",
        description: "PHP",
        icons: PhpIcon,
        className: "text-indigo-600 size-7",
    },
    {
        id: "logo-9",
        description: "Laravel",
        icons: LaravelIcon,
        className: "text-red-500",
    },
    {
        id: "logo-10",
        description: "CSS",
        icons: CssIcon,
        className: "text-blue-500",
    },
    {
        id: "logo-11",
        description: "Tailwind.CSS",
        icons: TailwindIcon,
        className: "text-cyan-400",
    },
];

export const Skills = () => {
    return (
        <div className="pt-10 hidden sm:block">
            <div className="relative mx-auto w-full flex items-center justify-center lg:max-w-5xl">
                <Carousel
                    opts={{ loop: true }}
                    plugins={[AutoScroll({ playOnInit: true, speed: 0.5, stopOnFocusIn: true })]}
                    className='overflow-hidden'
                >
                    <CarouselContent className="ml-0">
                        {logos.map((logo) => (
                            <CarouselItem
                                key={logo.id}
                                className="flex justify-center w-full pl-0 basis-1/4"
                            >
                                <div className="px-10 flex shrink-0 gap-1 items-center justify-center">
                                    {logo.icons && <logo.icons className={logo.className} />}
                                    <span className='font-medium text-foreground/70'>{logo.description}</span>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
                <div className="absolute inset-y-0 left-0 w-12 bg-linear-to-r  from-background to-transparent"></div>
                <div className="absolute inset-y-0 right-0 w-12 bg-linear-to-l from-background to-transparent"></div>
            </div>
        </div>
    );
};