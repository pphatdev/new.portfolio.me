'use client'

import Image from "next/image";
import { motion } from 'framer-motion';
import { ExperienceCard } from "@/shared/components/ui/experience-card";
import { cn } from "@/shared/libs/utils";
import { CompaniesProps } from "@/shared/hooks/skills";
import { NextJsIcon } from "@/shared/components/icons/nextjs";
import { Badge } from "@/shared/components/ui/badge";
import { Title } from "@/shared/components/ui/title";

export const SectionExperience = () => {

    const experiences: CompaniesProps[] = [
        {
            title: "TURBOTECH CO., LTD",
            logo: "assets/brands/org/turbotech.png",
            works: [
                {
                    date: "Oct 2022 - Present",
                    title: "Senior Frontend Developer",
                    skills: [
                        { title: "Figma", image: "assets/brands/design/figma.svg" },
                        { title: "Laravel", image: "assets/brands/stacks/laravel.svg" },
                        { title: "React", image: "assets/brands/stacks/react.svg" },
                        { title: "Next.js", image: "assets/brands/stacks/nextjs.svg" },
                        { title: "Tailwind CSS", image: "assets/brands/stacks/tailwindcss.svg" },
                        { title: "Typescript", image: "assets/brands/stacks/typescript.svg" },
                        { title: "Node.js", image: "assets/brands/stacks/nodejs.svg" },
                        { title: "Express.js", image: "assets/brands/stacks/express.svg" },
                        { title: "PostgreSQL", image: "assets/brands/stacks/postgresql.svg" },
                        { title: "MySQL", image: "assets/brands/stacks/mysql.svg" },
                    ]
                },
                {
                    date: "Oct 2020 - Oct 2022",
                    title: "Junior Frontend Developer",
                    skills: [
                        { title: "JavaScript", image: "assets/brands/stacks/javascript.svg" },
                        { title: "JQuery", image: "assets/brands/stacks/jquery.svg" },
                        { title: "HTML", image: "assets/brands/stacks/html.svg" },
                        { title: "CSS", image: "assets/brands/stacks/css.svg" },
                        { title: "Sass", image: "assets/brands/stacks/sass.svg" },
                        { title: "Tailwind CSS", image: "assets/brands/stacks/tailwindcss.svg" },
                        { title: "Bootstrap", image: "assets/brands/stacks/bootstrap.svg" },
                        { title: "PHP", image: "assets/brands/stacks/php.svg" },
                        { title: "MySQL", image: "assets/brands/stacks/mysql.svg" },
                        { title: "Laravel", image: "assets/brands/stacks/laravel.svg" },
                    ]
                },
                {
                    date: "Nov 2019 - Oct 2020",
                    title: "Content Writing Officer & UI/UX Designer",
                    skills: [
                        { title: "Ms.Word", image: "assets/brands/office/word.svg" },
                        { title: "Ms.Excel", image: "assets/brands/office/excel.svg" },
                        { title: "Ms.Powerpoint", image: "assets/brands/office/powerpoint.svg" },
                        { title: "Figma", image: "assets/brands/design/figma.svg" },
                        { title: "Adobe XD", image: "assets/brands/design/xd.svg" },
                    ]
                }
            ]
        },
        {
            title: "Nintrea Labs",
            logo: "assets/brands/org/nintrea.png",
            works: [
                {
                    date: "2021 - Present",
                    title: "Creator & Developer of Nintrea",
                    skills: [
                        { title: "Figma", image: "assets/brands/design/figma.svg" },
                        { title: "HTML", image: "assets/brands/stacks/html.svg" },
                        { title: "CSS", image: "assets/brands/stacks/css.svg" },
                        { title: "JavaScript", image: "assets/brands/stacks/javascript.svg" },
                        { title: "Typescript", image: "assets/brands/stacks/typescript.svg" },
                        { title: "JQuery", image: "assets/brands/stacks/jquery.svg" },
                        { title: "Tailwind CSS", image: "assets/brands/stacks/tailwind.svg" },
                        { title: "Sass", image: "assets/brands/stacks/sass.svg" },
                        { title: "Bootstrap", image: "assets/brands/stacks/bootstrap.svg" },
                        { title: "React", image: "assets/brands/stacks/react.svg" },
                        { title: "Next.js", icon: <NextJsIcon className="size-6 stroke-1 text-foreground/90" /> },
                        { title: "Nuxt.js", image: "assets/brands/stacks/nuxtjs.svg" },
                        { title: "EJS", image: "assets/brands/stacks/ejs.svg" },
                        { title: "PHP", image: "assets/brands/stacks/php.svg" },
                        { title: "Laravel", image: "assets/brands/stacks/laravel.svg" },
                        { title: "Node.js", image: "assets/brands/stacks/nodejs.svg" },
                        { title: "Express.js", image: "assets/brands/stacks/express.svg" },
                        { title: "Hono", image: "assets/brands/stacks/hono.svg" },
                        { title: "PostgreSQL", image: "assets/brands/stacks/pgsql.svg" },
                        { title: "MySQL", image: "assets/brands/stacks/mysql.svg" },
                        { title: "Vercel", image: "assets/brands/stacks/vercel.svg" },
                        { title: "Netlify", image: "assets/brands/stacks/netlify.svg" },
                        { title: "Worker", image: "assets/brands/stacks/cloudflare-workers.svg" },
                        { title: "Github", image: "assets/brands/stacks/github.svg" },
                        { title: "Ubuntu", image: "assets/brands/stacks/ubuntu.svg" },
                        { title: "Nginx", image: "assets/brands/stacks/nginx.svg" },
                        { title: "C#", image: "assets/brands/stacks/csharp.svg" },
                        { title: "C++", image: "assets/brands/stacks/cpp.svg" },
                        { title: "Python", image: "assets/brands/stacks/python.svg" },
                        { title: "Git", image: "assets/brands/stacks/git.svg" },
                        { title: "GitLab", image: "assets/brands/stacks/gitlab.svg" }
                    ]
                }
            ]
        }
    ]

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