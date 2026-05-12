import { languages } from "@/app/(home)/brands"
import { Badge } from "@/shared/components/ui/badge"
import { BlurFade } from "@/shared/components/background/blur-fade"
import { Title } from "@/shared/components/ui/title"
import MagneticArea from "@/shared/components/ui/magnetic-area"
import Image from "next/image"
import { cn } from "@/shared/libs/utils"

export const SectionSkills = () => {

    const title = ["My ", "Tech Stack"]
    const description = `My tech stack includes modern frameworks, languages, and development tools that enable me to build efficient and scalable applications.`

    const colors = [
        "text-red-500 bg-red-500/10 border-red-500/20 shadow-red-500/10",
        "text-blue-500 bg-blue-500/10 border-blue-500/20 shadow-blue-500/10",
        "text-green-500 bg-green-500/10 border-green-500/20 shadow-green-500/10",
        "text-purple-500 bg-purple-500/10 border-purple-500/20 shadow-purple-500/10",
        "text-pink-500 bg-pink-500/10 border-pink-500/20 shadow-pink-500/10",
        "text-orange-500 bg-orange-500/10 border-orange-500/20 shadow-orange-500/10",
        "text-cyan-500 bg-cyan-500/10 border-cyan-500/20 shadow-cyan-500/10",
        "text-teal-500 bg-teal-500/10 border-teal-500/20 shadow-teal-500/10",
        "text-indigo-500 bg-indigo-500/10 border-indigo-500/20 shadow-indigo-500/10",
    ]

    return (
        <section id="skills" className="max-w-5xl flex flex-col items-center my-20 justify-center mx-auto">
            <BlurFade delay={0.25} inView className="flex flex-col items-center justify-center pb-1 mt-5">
                <div className="block w-full px-5 py-3 ">
                    <Badge variant="outline" className='py-1.5 px-3'>My Skills</Badge>
                </div>
                <Title as='h2' title={title} description={description} />
                <div className="w-full flex gap-5 mb-5 rounded-2xl shadow-card shadow-primary/5 bg-background/10 p-8 px-5 flex-wrap justify-start">
                    {languages.map((lang, key) => {
                        const randomColor = colors[key % colors.length]
                        return (
                            <MagneticArea key={key}>
                                <div className={cn(
                                    "relative flex max-sm:h-9 max-sm:w-9 h-16 shadow-card w-16 p-1 rounded-3xl items-center justify-center overflow-hidden border transition-all duration-300 hover:scale-110",
                                    randomColor
                                )}>
                                    {lang.svg ? (
                                        <div
                                            className="w-full h-full z-10 [&>svg]:w-full [&>svg]:h-full [&>svg]:object-contain [&>svg]:text-current [&>svg>[data-foreground]]:text-white"
                                            dangerouslySetInnerHTML={{ __html: lang.svg }}
                                        />
                                    ) : (
                                        <Image
                                            src={lang.src}
                                            alt={lang.alt}
                                            width={40}
                                            height={40}
                                            className="object-contain p-2 z-10"
                                        />
                                    )}
                                </div>
                            </MagneticArea>
                        )
                    })}
                </div>
            </BlurFade>
        </section>
    )
}