// import { bgGradientLine45deg } from '@components/background/gradient-line';
import { BlurFade } from '@/shared/components/background/blur-fade';
import { bgGradientLine45deg } from '@/shared/components/background/gradient-line';
import { Badge } from '@/shared/components/ui/badge';
import { Title } from '@/shared/components/ui/title';
import { alterName, appName } from '@/shared/data';
import { cn } from '@/shared/libs/utils';
import Image from 'next/image';


export const SectionAboutMe = () => {
    const title = "About me!";

    const description = `My name is ${appName}, and I&apos;m known online as ${alterName}. I'm a Senior Front-end Developer at TURBOTECH CO., LTD, and as a Freelance UI/UX Designer. I'm from Phnom Penh, Cambodia. I started my career as a Front-end Developer in 2021, and I have a passion for creating beautiful and functional user interfaces. I love to learn new technologies and improve my skills every day. I am also a big fan of open-source projects and I enjoy contributing to the community. I believe that sharing knowledge is the key to success in this field.`;

    return (
        <section id="about" className="max-w-5xl flex flex-col relative items-center justify-center mx-auto">
            <div className="grid grid-cols-1 gap-8 items-center md:grid-cols-2">
                <BlurFade delay={0.2} className="flex gap-4 flex-col">
                    <div className='px-5'>
                        <Badge variant="outline" className='py-1.5 px-3'>{title}</Badge>
                    </div>
                    <div className="flex gap-4 flex-col">
                        <Title as='h2' title={["Who", "the hell am I ?"]} description={description} />
                        <p className="sr-only">
                            {appName}, {alterName}
                        </p>
                    </div>
                </BlurFade>
                <BlurFade delay={0.1} inView className="grid grid-cols-2 order-first max-md:gap-5 max-lg:gap-2 gap-8 max-md:p-5">
                    <div>
                        <div className={cn(
                            "relative flex aspect-square w-full rotate-12 rounded-2xl px-1 items-center justify-center overflow-hidden border text-foreground/10 bg-size-[8px_8px] bg-top-left",
                            bgGradientLine45deg
                        )}>
                            <Image
                                src={'/assets/gallery/WEBP/IMG_1915.webp'}
                                alt={`Profile photo of ${appName}`}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-contain m-1 -rotate-12"
                                style={{
                                    maskImage: `url('/assets/masks/mask.webp')`,
                                    maskSize: '105% 100%',
                                    maskPosition: 'center',
                                    maskRepeat: 'no-repeat'
                                }}
                                loading="eager"
                                priority
                            />
                        </div>
                    </div>
                    <div className='row-span-2'>
                        <div className={cn(
                            "relative flex w-full h-full rounded-2xl px-2 items-center justify-center overflow-hidden border text-foreground/10 bg-size-[8px_8px] bg-top-left",
                            bgGradientLine45deg
                        )}>
                            <div
                                className="h-full w-full bg-center bg-no-repeat mask-size-[130%_100%] mask-center mask-no-repeat"
                                style={{
                                    backgroundSize: "contain",
                                    backgroundImage: `url('/assets/avatars/rom-lech.webp')`,
                                    maskImage: `url('/assets/masks/mask.webp')`,
                                }}
                            />
                        </div>
                    </div>
                    <div>
                        <div className={cn(
                            "relative flex aspect-square w-full rounded-xl items-center justify-center overflow-hidden border text-foreground/10 bg-size-[8px_8px] bg-top-left",
                            bgGradientLine45deg
                        )}>
                            <div
                                className="h-full w-full bg-center bg-no-repeat mask-size-[105%_100%] mask-center mask-no-repeat"
                                style={{
                                    backgroundSize: "cover",
                                    backgroundImage: `url('/assets/avatars/kampot-2.webp')`,
                                    maskImage: `url('/assets/masks/mask.webp')`,
                                }}
                            />
                        </div>
                    </div>
                </BlurFade>
            </div>
        </section>
    )
}