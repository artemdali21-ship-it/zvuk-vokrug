import Image from "next/image";
import Link from "next/link";
import { photos } from "@/data/photos";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
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
      <main className="pt-24 pb-20 min-h-screen bg-paper">
        <div className="container-page">
          <div className="mb-12 md:mb-16">
            <h1 className="display text-huge text-ink mb-3">Проекты.</h1>
            <p className="text-ink2 text-lg">
              9000+ мероприятий. Часть из них — здесь.
            </p>
          </div>

          {/* Gallery masonry-style grid */}
          <div className="columns-2 md:columns-3 gap-4 space-y-4">
            {photos.map((photo) => (
              <div
                key={photo.src}
                className="break-inside-avoid relative overflow-hidden bg-paper2 group"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={800}
                  height={600}
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                {photo.caption && (
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-ink/60 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-paper text-xs">{photo.caption}</p>
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
      <Footer />
    </>
  );
}
