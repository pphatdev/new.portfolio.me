import { NavigationBar } from "@/shared/components/layouts/navbar";
import HeroSection from "./hero";

export default function Home() {
    return (
        <div className="w-full flex flex-col">
            {/* <HomePersonStructuredData />
            <WebsiteStructuredData />
            <OrganizationStructuredData /> */}
            <NavigationBar />

            <HeroSection />
        </div>
    );
}
