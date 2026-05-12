import HeroSection from "./hero";
import { SectionSkills } from "./skills";

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
        </div>
    );
}
