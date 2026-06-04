import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { MarqueeArtists } from "@/components/sections/MarqueeArtists";
import { Reviews } from "@/components/sections/Reviews";
import { Services } from "@/components/sections/Services";
import { EventCategories } from "@/components/sections/EventCategories";
import { Team } from "@/components/sections/Team";
import { GallerySection } from "@/components/sections/GallerySection";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />            {/* БЛОК 1 — ЗВУК ← orb → ВОКРУГ */}
        <Stats />           {/* БЛОК 2 — 30 лет · 9000+ */}
        <MarqueeArtists />  {/* Бегущие строки артистов + клиентов */}
        <Reviews />         {/* БЛОК — горизонтальный скролл фото-карточек артистов */}
        <Services />        {/* БЛОК 4 — ЧТО ЦЕНИТ ЗАКАЗЧИК */}
        <EventCategories /> {/* БЛОК 5 — 6 категорий мероприятий */}
        <GallerySection />  {/* Галерея — marquee фото */}
        <Team />            {/* Команда — ч/б + violet rim */}
        <CTA />             {/* БЛОК 7 — СВЯЗАТЬСЯ С НАМИ */}
      </main>
      <Footer />
    </>
  );
}
