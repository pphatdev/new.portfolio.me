'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import RainbowEffects from "@/shared/components/background/rainbow-effects";
import { Cover } from "@/shared/components/ui/cover";

export default function AboutHero() {
    return (
        <section id="about-hero" className="max-w-5xl flex flex-col items-center my-20 pt-10 justify-center mx-auto">
            <h1 className="sr-only">About PPhat</h1>

            <div className="grid grid-cols-1 gap-8 items-center justify-center lg:grid-cols-2 relative w-full">

                <div className="px-2 sm:p-5 z-10 max-w-3xl bg-linear-to-b from-background/5 via-background to-background relative">

                    <motion.div
                        initial={{ opacity: 0, filter: 'blur(6px)', y: -6 }}
                        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <div className="text-3xl text-center md:text-left md:text-6xl font-bold">
                            <div className="relative mx-auto inline-block w-max filter-[drop-shadow(0px_1px_3px_rgba(27,37,80,0.14))]">
                                <div className="relative bg-clip-text text-transparent bg-no-repeat bg-linear-to-r from-sky-500 via-teal-500 to-green-500 py-4 [text-rendering:optimizeLegibility]">
                                    <span className="mr-2 font-sans [font-display:swap]">About</span>
                                </div>
                            </div>

                            <Cover>{`Me ✨`}</Cover>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, filter: 'blur(8px)', y: 10 }}
                        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="max-md:text-xl text-2xl text-center h-fit md:text-left font-semibold mt-2"
                    >
                        <span className="inline-block text-neutral-900 dark:text-neutral-100">I'm a Senior Front-end Developer</span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, filter: 'blur(6px)', y: -6 }}
                        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-5 relative flex text-center max-w-full md:text-left"
                    >
                        <div className="max-md:mb-0 my-5 text-left text-foreground/90 tracking-normal *:hover:transition-all [&>a]:text-primary [&>a]:hover:font-semibold">
                            My name is <span className="text-primary font-semibold">Leat Sophat</span>, my relegien name is <span className="text-primary font-semibold">LEAT Sophat</span>, and I am known online as <span className="text-primary font-semibold">PPhat</span>.<br />
                            I'm a Senior Front-end Developer at <a href="https://turbotech.com.kh/" target="_blank" rel="noopener noreferrer">TURBOTECH CO., LTD</a>, and as a Freelance UI/UX Designer.<br />
                            I'm from <a href="https://en.wikipedia.org/wiki/Phnom_Penh" target="_blank" rel="noopener noreferrer">Phnom Penh, Cambodia</a>.<br /><br />
                            I started my career as a Front-end Developer in 2021, and I have a passion for creating beautiful and functional user interfaces. I love to learn new technologies and improve my skills every day. I am also a big fan of open-source projects and I enjoy contributing to the community. I believe that sharing knowledge is the key to success in this field.<br />
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, filter: 'blur(6px)', y: -6 }}
                    animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="grid max-lg:-translate-y-1/4 max-lg:max-h-60 z-0 max-lg:order-first grid-cols-2 max-md:gap-5 max-lg:gap-2 gap-8 max-md:p-5"
                >

                    <div className="rotate-12 hover:rotate-0 transition-all duration-500">
                        <div className="relative flex aspect-square w-full rounded-2xl px-1 items-center justify-center overflow-hidden border text-foreground/10 bg-size-[8px_8px] bg-[repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,transparent_0,transparent_50%)]">
                            <Image
                                alt="Personal photo at Krate"
                                loading="eager"
                                fill
                                className="object-cover m-1"
                                style={{ maskImage: `url('/assets/masks/mask.webp')`, maskSize: '105% 100%', maskPosition: 'center', maskRepeat: 'no-repeat' }}
                                sizes="(max-width: 768px) 100vw, 50vw"
                                src="/assets/avatars/krate-1.webp"
                            />
                            <RainbowEffects />
                        </div>
                    </div>

                    <div className="row-span-2">
                        <div className="relative flex w-full h-full rounded-2xl px-2 items-center justify-center overflow-hidden border text-foreground/10 bg-size-[8px_8px] bg-[repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,transparent_0,transparent_50%)]">
                            <Image
                                alt="Personal photo at Rom Lech"
                                loading="eager"
                                fill
                                className="object-cover"
                                style={{ maskImage: `url('/assets/masks/mask.webp')`, maskSize: '130% 100%', maskPosition: 'center', maskRepeat: 'no-repeat' }}
                                sizes="(max-width: 768px) 100vw, 50vw"
                                src="/assets/avatars/rom-lech.webp"
                            />
                            <RainbowEffects />
                        </div>
                    </div>

                    <div className="-rotate-6 hover:rotate-0 transition-all duration-500">
                        <div className="relative flex aspect-square w-full rounded-2xl items-center justify-center overflow-hidden border text-foreground/10 bg-size-[8px_8px] bg-[repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,transparent_0,transparent_50%)]">
                            <Image
                                alt="Personal photo at Kampot"
                                loading="lazy"
                                fill
                                className="object-cover"
                                style={{ maskImage: `url('/assets/masks/mask.webp')`, maskSize: '105% 100%', maskPosition: 'center', maskRepeat: 'no-repeat' }}
                                sizes="(max-width: 768px) 100vw, 50vw"
                                src="/assets/avatars/kampot-2.webp"
                            />
                            <RainbowEffects />
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
