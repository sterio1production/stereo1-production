import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { Services } from "@/components/site/services";
import { Events } from "@/components/site/events";
import { Gallery } from "@/components/site/gallery";
import { HowItWorks } from "@/components/site/how-it-works";
import { WhyUs } from "@/components/site/why-us";
import { Faq } from "@/components/site/faq";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { WhatsAppFab } from "@/components/site/whatsapp-fab";
import { BackToTop } from "@/components/site/back-to-top";
import { ScrollProgress } from "@/components/site/scroll-progress";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Services />
        <Events />
        <Gallery />
        <HowItWorks />
        <WhyUs />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
      <BackToTop />
    </div>
  );
}
