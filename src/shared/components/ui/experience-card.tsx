import { WorkExperience } from "@/shared/hooks/skills";
import { cn } from "@/shared/libs/utils";
import MagneticArea from "@/shared/components/ui/magnetic-area";

export const ExperienceCard = (
    { title, date, skills }: WorkExperience
) => {

    return (
        <article className="relative group">
            <div className="absolute max-sm:border-b -inset-y-2.5 transition-colors -inset-x-4 md:-inset-y-4 md:-inset-x-4 sm:rounded-2xl group-hover:bg-foreground/5"></div>

            <svg viewBox="0 0 9 9" stroke="currentColor" className="hidden absolute right-full mr-6 top-2 text-primary/20 md:mr-12 w-2.25 h-2.25 overflow-visible sm:block">
                <circle cx="4.5" cy="4.5" r="4.5" strokeWidth="1" className="fill-primary"></circle>
            </svg>

            <div className="relative flex items-start justify-start gap-5">

                {/* <div className="h-full shrink-0">
                    <Image src={image} alt="Avatar" className="object-cover w-32 h-20 rounded-md sm:h-32 sm:w-44" width={100} height={100} />
                </div> */}

                <div className="relative w-full">
                    <div className="inline-flex space-x-3 items-center">
                        <h2 className="pt-5 text-base font-semibold tracking-tight line-clamp-2 sm:line-clamp-1 text-foreground lg:pt-0"> {title} </h2>
                    </div>
                    {/* <p className="mt-2 mb-3 sm:block line-clamp-2 text-foreground/80"> {description} </p> */}

                    <p className="text-xs my-2 font-medium">+ Basic Skills</p>
                    <div className="flex gap-2 flex-wrap mt-3">
                        {skills.map(({ title, svg }, key) => {
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
                                <MagneticArea key={key}>
                                    <div className={cn(
                                        "flex space-x-1.5 shrink-0 w-fit shadow-card rounded-full items-center justify-center border p-0.5 pr-3 transition-all duration-300 hover:scale-105",
                                        colors[key % colors.length]
                                    )}>
                                        {svg && (
                                            <div
                                                className="size-5 p-0.5 z-10 [&>svg]:w-full [&>svg]:h-full [&>svg]:object-contain [&>svg]:text-current [&>svg>[data-foreground]]:text-white"
                                                dangerouslySetInnerHTML={{ __html: svg }}
                                            />
                                        )}
                                        <span className="text-[10px] font-medium text-foreground/80">{title}</span>
                                    </div>
                                </MagneticArea>
                            )
                        })}
                    </div>
                </div>
            </div>

            <dl className="absolute max-sm:left-0 pointer-events-none -top-1 lg:-left-58 lg:mr-26.25">
                <dt className="sr-only">Date</dt>
                <dd className="max-sm:text-[8px] max-sm:rounded-none text-xs max-sm:leading-4 leading-6 max-sm:border px-1.5 rounded-t-lg font-medium sm:text-sm whitespace-nowrap text-foreground/50">
                    {date}
                </dd>
            </dl>
        </article>
    )
}