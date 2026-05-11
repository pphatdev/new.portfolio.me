"use client";

import { cn } from "@/shared/libs/utils";
import Image from "next/image";
import AutoScroll from "embla-carousel-auto-scroll";
import { NextJsIcon } from "../icons/nextjs";
import { Carousel, CarouselContent, CarouselItem } from "./carousel";

const logos = [
    {
        id: "logo-1",
        description: "TypeScript",
        image: "./assets/brands/language/typescript.svg",
        className: "h-5",
    },
    {
        id: "logo-2",
        description: "JavaScript",
        image: "./assets/brands/language/javascript.svg",
        className: "h-5",
    },
    {
        id: "logo-3",
        description: "Node JS",
        image: "./assets/brands/language/nodejs.svg",
        className: "h-5",
    },
    {
        id: "logo-4",
        description: "React JS",
        image: "./assets/brands/language/react.svg",
        className: "h-5",
    },
    {
        id: "logo-5",
        description: "Next Js",
        image: "./assets/brands/language/nextjs.svg",
        icons: NextJsIcon,
        className: "h-7 w-7",
    },
    {
        id: "logo-6",
        description: "Vue JS",
        image: "./assets/brands/language/vuejs.svg",
        className: "h-5",
    },
    {
        id: "logo-7",
        description: "Nuxt JS",
        image: "./assets/brands/language/nuxtjs.svg",
        className: "h-5",
    },
    {
        id: "logo-8",
        description: "PHP",
        image: "./assets/brands/language/php.svg",
        className: "h-5",
    },
    {
        id: "logo-9",
        description: "Laravel",
        image: "./assets/brands/language/laravel.svg",
        className: "h-5",
    },
    {
        id: "logo-10",
        description: "CSS",
        image: "./assets/brands/language/css.svg",
        className: "h-5",
    },
    {
        id: "logo-11",
        description: "Tailwind CSS",
        image: "./assets/brands/language/tailwind.svg",
        className: "h-5",
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
                                    {logo.icons && <logo.icons />}
                                    {!logo.icons && (
                                        <Image
                                            width={100}
                                            height={100}
                                            src={logo.image}
                                            alt={logo.description}
                                            className={cn("h-7 w-7", logo.className)}
                                        />
                                    )}
                                    <span className='font-medium'>{logo.description}</span>
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