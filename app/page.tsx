import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Services } from "@/components/sections/Services";
import { MarqueeArtists } from "@/components/sections/MarqueeArtists";
import { Reviews } from "@/components/sections/Reviews";
import { Testimonials } from "@/components/sections/Testimonials";
import { EventCategories } from "@/components/sections/EventCategories";
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
        <Reviews />
        <Testimonials />
        <EventCategories />
        <GalleryPreview />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
