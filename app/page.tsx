import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Services } from "@/components/sections/Services";
import { MarqueeArtists } from "@/components/sections/MarqueeArtists";
import { Workflow } from "@/components/sections/Workflow";
import { Team } from "@/components/sections/Team";
import { MusicSection } from "@/components/sections/MusicSection";
import { EventCategories } from "@/components/sections/EventCategories";
import { Testimonials } from "@/components/sections/Testimonials";
import { GalleryPreview } from "@/components/sections/GalleryPreview";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <Services />
        <MarqueeArtists />
        <Workflow />
        <Team />
        <MusicSection />
        <EventCategories />
        <Testimonials />
        <GalleryPreview />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
