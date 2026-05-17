'use client'

import Image from "next/image";
import { motion } from 'framer-motion';
import { ExperienceCard } from "@/shared/components/ui/experience-card";
import { cn } from "@/shared/libs/utils";
import { CompaniesProps } from "@/shared/hooks/skills";
import { Badge } from "@/shared/components/ui/badge";
import { Title } from "@/shared/components/ui/title";


export const SectionExperience = ({ experiences }: { experiences: CompaniesProps[] }) => {

    return (
        <motion.section
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 0.9, y: 0, transition: { duration: 0.6, delay: 0.2 } }
            }}
            initial="hidden"
            animate="visible"
            className='max-w-5xl flex flex-col relative items-center justify-center mx-auto'>

            <div className="mx-auto max-w-6xl w-full sm:my-10">

                <Badge variant="outline" className='py-1.5 px-3 lg:ml-5'>Experience</Badge>

                <Title as='h2' title={['Work', 'Timeline']} description={`With over 5 years of experience in frontend development, I have honed my skills in creating dynamic and user-friendly web applications. My journey has taken me from content writing and UI/UX design to becoming a Senior Frontend Developer at TURBOTECH, where I lead projects that blend technical excellence with innovative design.`} />

                <div className="w-full sm:pl-7">
                    <div className="relative max-sm:p-4 sm:pb-12 max-sm:border-t sm:ml-[calc(2rem+1px)] mt-10 md:ml-[calc(3.5rem+1px)] lg:ml-[max(calc(14.5rem+1px),calc(100%-68rem))]">
                        <div className="hidden absolute top-3 bottom-0 right-full mr-7 md:mr-13 w-px bg-foreground/20 sm:block"> </div>
                        <div className="flex flex-col gap-12">
                            {experiences.map(({ works, title, logo }, index) => (
                                <div key={index} className="flex flex-col">
                                    <div className={cn(`flex gap-2 items-center pb-10 md:-translate-x-16`, index === 0 ? "max-sm:mt-0" : "max-sm:mt-10")}>
                                        {logo && <Image src={`/${logo}`} alt="Avatar" className="object-cover size-6 bg-background border max-sm:rounded-none rounded-md" width={32} height={32} />}
                                        <h2 className="text-xl font-bold text-foreground/80"> {title} </h2>
                                    </div>
                                    <div className="flex flex-col gap-5 space-y-12">
                                        {works.map((item, index) => (
                                            <ExperienceCard
                                                key={index}
                                                date={item.date}
                                                title={item.title}
                                                skills={item.skills}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    )
}