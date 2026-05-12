import Footer from "@/shared/components/layouts/footer";
import HeroSection from "./hero";
import { SectionSkills } from "./skills";
import { GotoTop } from "@/shared/components/layouts/goto-top";

export default function Home() {
    return (
        <div className="w-full flex flex-col">
            {/* <HomePersonStructuredData />
            <WebsiteStructuredData />
            <OrganizationStructuredData /> */}

            {/* Hero Section */}
            <HeroSection />

            {/* Skill Section */}
            <SectionSkills />

            {/* Goto Top Section */}
            <GotoTop />

            {/* Footer Section */}
            <Footer />
        </div>
    );
}
