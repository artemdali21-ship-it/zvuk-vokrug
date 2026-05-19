"use client";

import Link from "next/link";
import { ZoomParallax } from "@/components/ui/ZoomParallax";

// 7 лучших фото для параллакса
const galleryImages = [
  { src: "/photos/61721cc2.jpg",  alt: "Концерт — звуковое оборудование" },
  { src: "/photos/f9e05266.jpg",  alt: "Сцена на открытой площадке" },
  { src: "/photos/bf925159.jpg",  alt: "Городское событие, Волгоград" },
  { src: "/photos/48081692.jpg",  alt: "Концерт — световое оборудование" },
  { src: "/photos/0935157f.jpg",  alt: "Фестиваль, большая сцена" },
  { src: "/photos/8edb3ea6.jpg",  alt: "Театральное мероприятие" },
  { src: "/photos/02ac7b6d.jpg",  alt: "Звукорежиссёр за работой" },
];

export function GalleryPreview() {
  return (
    <section className="bg-ink">
      {/* Header */}
      <div className="container-page flex items-end justify-between py-14 md:py-20">
        <h2 className="display text-huge text-paper">
          Галерея проектов.
        </h2>
        <Link
          href="/projects"
          className="px-6 py-3 border border-paper/30 text-paper text-sm font-medium hover:border-paper hover:bg-paper/5 transition-colors shrink-0 hidden md:inline-flex"
        >
          Смотреть все →
        </Link>
      </div>

      {/* ZoomParallax */}
      <ZoomParallax images={galleryImages} />

      {/* Mobile link */}
      <div className="container-page pb-12 md:hidden">
        <Link
          href="/projects"
          className="inline-flex px-6 py-3 border border-paper/30 text-paper text-sm font-medium hover:border-paper transition-colors"
        >
          Смотреть все →
        </Link>
      </div>
    </section>
  );
}
