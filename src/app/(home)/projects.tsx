"use client";

import React from "react";
import { motion } from 'framer-motion';
import { Badge } from "../../shared/components/ui/badge";
import ProjectCard from "../../shared/components/ui/project-card";
import { useProjects } from "@/shared/hooks/projects";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Spinner } from "@/shared/components/ui/loading";
import { Title } from "@/shared/components/ui/title";

const Projects: React.FC = () => {
    const { projects, loading, error } = useProjects({ limit: 6 });
    const total = projects?.pagination.total || 0;

    return (
        <div className="w-full max-w-6xl mx-auto max-sm:p-0 sticky top-48 px-4 pb-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {loading && <div className="col-span-full flex justify-center items-center py-12">
                <Spinner variant={'bars'} />
            </div>}
            {error && <p className="text-center text-destructive col-span-full">Error: {error}</p>}

            {/* If using the custom hook, uncomment the line below */}
            {projects?.data.map((project, index) => (
                <React.Fragment key={index}>
                    <ProjectCard project={project} />
                </React.Fragment>
            ))}

            {total > 6 && (
                <div className="bg-linear-0 from-10% from-background via-background -bottom-20 h-96 w-full z-50 absolute">
                    <div className="p-5 w-full flex items-center justify-center h-full text-center">
                        <Link href={'/projects'} aria-label={'Projects'} className="group inline-flex">
                            <Badge variant="outline" className="max-w-[min(90vw,42rem)] rounded-full px-3 py-1 text-sm font-medium text-primary hover:bg-primary/15" title={'Projects'} >
                                <span className="flex min-w-0 items-center gap-2">
                                    <span className="relative flex size-2 shrink-0">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
                                        <span className="relative inline-flex size-2 rounded-full bg-primary" />
                                    </span>
                                    <span className="shrink-0">View More </span>
                                    <span className="ml-1 inline-flex w-0 overflow-hidden transition-[width] duration-200 group-hover:w-4">
                                        <ArrowRight className="h-3.5 w-3.5 shrink-0 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                                    </span>
                                </span>
                            </Badge>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}

export const SectionProjects = () => {
    return (
        <section id="projects" className="max-w-5xl flex relative flex-col items-center justify-center mx-auto">
            <motion.section
                variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                        opacity: 0.9,
                        y: 0,
                        transition: { duration: 0.6, delay: 0.4, staggerChildren: 0.1 }
                    }
                }}
                initial="hidden"
                animate="visible" className='max-w-5xl flex relative flex-col items-center justify-center mx-auto'>
                <div className="w-full mx-auto max-sm:p-3 max-sm:pb-4 z-999 gap-4 shadow-2xl shadow-primary/5 bg-background backdrop-blur-[2px]">
                    <Badge variant="outline" className='py-1.5 px-3 lg:ml-5'>Projects</Badge>
                    <Title as='h2' title={['Featured', 'Projects']} description={`Discover my portfolio of innovative web applications, from eCommerce platforms to digital libraries. Each project showcases modern development practices, user-centered design, and technical excellence in solving real-world challenges.`} />
                    <Projects />
                </div>
            </motion.section>
        </section>
    )
}