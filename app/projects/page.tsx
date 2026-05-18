import Image from "next/image";
import Link from "next/link";
import { photos } from "@/data/photos";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { CTA } from "@/components/sections/CTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Проекты — ЗВУК ВОКРУГ · Аренда звука и света Волгоград",
  description:
    "Фотографии проектов: концерты, городские события, фестивали, театральные постановки. Аренда звукового и сценического оборудования в Волгограде.",
};

export default function Projects() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-paper">
        {/* Hero */}
        <div className="pt-32 pb-16 md:pt-40 md:pb-20 bg-paper2">
          <div className="container-page">
            <p className="text-[10px] text-ink2 uppercase tracking-[0.18em] mb-4">
              Галерея
            </p>
            <h1 className="display text-huge text-ink mb-4">Проекты.</h1>
            <p className="text-ink2 text-lg max-w-md">
              9000+ мероприятий за 30 лет. Здесь — часть из них.
            </p>
          </div>
        </div>

        {/* Masonry gallery */}
        <div className="container-page py-12 md:py-16">
          <div className="columns-2 md:columns-3 gap-3 md:gap-4">
            {photos.map((photo) => (
              <div
                key={photo.src}
                className="break-inside-avoid mb-3 md:mb-4 relative overflow-hidden bg-paper2 group"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={800}
                  height={600}
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="w-full h-auto object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-600"
                />
                {photo.caption && (
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-ink/65 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-paper text-xs leading-snug">{photo.caption}</p>
                  </div>
                )}
                {photo.category && (
                  <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[10px] text-paper bg-ink/60 px-2 py-0.5 uppercase tracking-wider">
                      {photo.category}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/"
              className="px-6 py-3 border border-ink text-ink text-sm font-medium hover:bg-ink hover:text-paper transition-colors"
            >
              ← На главную
            </Link>
          </div>
        </div>
      </main>
      <CTA />
      <Footer />
    </>
  );
}
