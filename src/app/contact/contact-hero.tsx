import RainbowEffects from "@/shared/components/background/rainbow-effects";

export function ContactHero() {
    return (
        <div className="min-h-36 sm:min-h-60 pt-10 md:pt-40 flex bg-linear-to-b from-primary/10 to-background flex-col overflow-clip relative items-start justify-center">
            <RainbowEffects />
            <div className="w-full p-4 sm:px-5 space-y-5 flex flex-col max-w-5xl mx-auto">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-bold sm:text-5xl xl:text-6xl/none">
                        Get in <span className="text-left bg-background bg-clip-text bg-no-repeat text-transparent bg-linear-to-r from-sky-500 via-teal-500 to-green-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">Touch</span>
                    </h1>
                </div>
                <div className="flex flex-col items-start justify-center">
                    <p className="text-center max-w-3xl mx-auto">Get in touch with me. I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.</p>
                </div>
            </div>
        </div>
    );
}
