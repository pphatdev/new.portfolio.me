import Footer from "@/shared/components/layouts/footer";
import { GotoTop } from "@/shared/components/layouts/goto-top";
import { Metadata } from "next";
import { ContactHero } from "./contact-hero";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
    title: "Contact LEAT Sophat",
    description: "Get in touch with me. I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.",
};

export default function Contact() {
    return (
        <main className="w-full flex flex-col relative">
            <ContactHero />
            <ContactForm />
            <Footer />
            <GotoTop />
        </main>
    );
}
