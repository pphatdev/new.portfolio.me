import AboutHero from "./about-hero";
import { SectionExperience } from "@/app/(home)/experience";
import { experiencesData } from "@/app/(home)/experience-data";
import Footer from "@/shared/components/layouts/footer";
import { GotoTop } from "@/shared/components/layouts/goto-top";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About LEAT Sophat",
    description: "I am Leat Sophat (LEAT Sophat, PPhat), a Senior Front-end Developer and Freelance UI/UX Designer from Phnom Penh, Cambodia. Learn more about my journey, skills, and experience.",
};

export default function About() {
    return (
        <main className="w-full flex flex-col gap-7 pb-5">
            <AboutHero />
            <SectionExperience experiences={experiencesData} />
            <Footer />
            <GotoTop />
        </main>
    );
}
