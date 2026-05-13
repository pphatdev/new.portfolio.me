import Footer from "@/shared/components/layouts/footer";
import HeroSection from "./hero";
import { SectionSkills } from "./skills";
import { GotoTop } from "@/shared/components/layouts/goto-top";
import { SectionAboutMe } from "./about";
import { SectionProjects } from "@/app/(home)/projects";
import { SectionExperience } from "./experience";

export default function Home() {
    return (
        <div className="w-full flex flex-col">
            {/* <HomePersonStructuredData />
            <WebsiteStructuredData />
            <OrganizationStructuredData /> */}

            {/* Hero Section */}
            <HeroSection />

            {/* About Me Section */}
            <SectionAboutMe />

            {/* Skill Section */}
            <SectionSkills />

            {/* Projects Section */}
            <SectionProjects />

            {/* Experience Section */}
            <SectionExperience />

            {/* Goto Top Section */}
            <GotoTop />

            {/* Footer Section */}
            <Footer />
        </div>
    );
}
