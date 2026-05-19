"use client";

import Link from "next/link";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

const galleryImages = [
  { src: "/photos/61721cc2.jpg", alt: "Концерт", label: "КОНЦЕРТЫ И ТУРЫ" },
  { src: "/photos/f9e05266.jpg", alt: "Открытая сцена", label: "ФЕСТИВАЛИ" },
  { src: "/photos/bf925159.jpg", alt: "Городское событие", label: "ГОРОДСКИЕ СОБЫТИЯ" },
  { src: "/photos/48081692.jpg", alt: "Световое оборудование", label: "КОРПОРАТИВНЫЕ" },
  { src: "/photos/0935157f.jpg", alt: "Большая сцена", label: "ТУРЫ И ГАСТРОЛИ" },
  { src: "/photos/8edb3ea6.jpg", alt: "Театральное мероприятие", label: "ИНСТАЛЛЯЦИИ" },
  { src: "/photos/02ac7b6d.jpg", alt: "Звукорежиссёр", label: "СПОРТИВНЫЕ" },
];

export function GallerySection() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  // Photo scales — different depths
  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  // Text scales — different from photos = creates depth layers
  const scale3 = useTransform(scrollYProgress, [0, 1], [1, 3]);
  const scale7 = useTransform(scrollYProgress, [0, 1], [1, 7]);

  const photoScales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

  return (
    <section className="bg-ink">
      {/* Header */}
      <div className="container-page flex items-end justify-between py-14 md:py-20">
        <div>
          <p className="text-[10px] text-paper/30 uppercase tracking-[0.18em] mb-4">
            Специализация · Галерея
          </p>
          <h2 className="display text-huge text-paper">
            Для каких событий.
          </h2>
        </div>
        <Link
          href="/projects"
          className="px-6 py-3 border border-paper/30 text-paper text-sm font-medium hover:border-paper hover:bg-paper/5 transition-colors shrink-0 hidden md:inline-flex"
        >
          Все проекты →
        </Link>
      </div>

      {/* Parallax gallery */}
      <div ref={container} className="relative h-[300vh]">
        <div className="sticky top-0 h-screen overflow-hidden">

          {/* ── Flying text layers ── */}

          {/* "ДЛЯ КАКИХ СОБЫТИЙ" — far back, slow */}
          <motion.div
            style={{ scale: scale3 }}
            className="absolute top-0 flex h-full w-full items-start justify-end pointer-events-none"
          >
            <div className="pt-[10vh] pr-[5vw] text-right">
              <p
                className="display text-paper/20 leading-tight"
                style={{ fontSize: "clamp(0.9rem, 3vw, 3.5rem)", letterSpacing: "0.08em" }}
              >
                ДЛЯ КАКИХ<br />СОБЫТИЙ
              </p>
            </div>
          </motion.div>

          {/* "КОНЦЕРТЫ" — fast, close, left */}
          <motion.div
            style={{ scale: scale7 }}
            className="absolute top-0 flex h-full w-full items-center justify-start pointer-events-none"
          >
            <div className="-mt-[30vh] ml-[2vw]">
              <p
                className="display text-paper leading-none"
                style={{
                  fontSize: "clamp(1.5rem, 6vw, 7rem)",
                  letterSpacing: "-0.02em",
                  opacity: 0.08,
                }}
              >
                КОНЦЕРТЫ
              </p>
            </div>
          </motion.div>

          {/* "ФЕСТИВАЛИ" — mid speed, top-left */}
          <motion.div
            style={{ scale: scale6 }}
            className="absolute top-0 flex h-full w-full items-start justify-start pointer-events-none"
          >
            <div className="mt-[22vh] ml-[3vw]">
              <p
                className="display text-paper/15 leading-none"
                style={{ fontSize: "clamp(1rem, 4vw, 5rem)", letterSpacing: "0.05em" }}
              >
                ФЕСТИВАЛИ
              </p>
            </div>
          </motion.div>

          {/* "ТУРЫ И ГАСТРОЛИ" — klein blue, bottom center */}
          <motion.div
            style={{ scale: scale5 }}
            className="absolute top-0 flex h-full w-full items-end justify-center pointer-events-none"
          >
            <div className="mb-[8vh] text-center">
              <p
                className="display text-klein leading-tight"
                style={{ fontSize: "clamp(0.7rem, 2vw, 2.5rem)", letterSpacing: "0.18em" }}
              >
                ТУРЫ<br />И ГАСТРОЛИ
              </p>
            </div>
          </motion.div>

          {/* "ГОРОДСКИЕ СОБЫТИЯ" — klein, right side */}
          <motion.div
            style={{ scale: scale4 }}
            className="absolute top-0 flex h-full w-full items-center justify-end pointer-events-none"
          >
            <div className="mt-[18vh] mr-[3vw] text-right">
              <p
                className="display text-klein/50 leading-tight"
                style={{ fontSize: "clamp(0.6rem, 1.6vw, 2rem)", letterSpacing: "0.2em" }}
              >
                ГОРОДСКИЕ<br />СОБЫТИЯ
              </p>
            </div>
          </motion.div>

          {/* ── Photo layers ── */}
          {galleryImages.slice(0, 7).map(({ src, alt, label }, index) => {
            const scale = photoScales[index % photoScales.length];
            return (
              <motion.div
                key={index}
                style={{ scale }}
                className={`absolute top-0 flex h-full w-full items-center justify-center
                  ${index === 1 ? "[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]" : ""}
                  ${index === 2 ? "[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]" : ""}
                  ${index === 3 ? "[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]" : ""}
                  ${index === 4 ? "[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]" : ""}
                  ${index === 5 ? "[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]" : ""}
                  ${index === 6 ? "[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]" : ""}
                `}
              >
                <div className="relative h-[25vh] w-[25vw]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={alt}
                    className="h-full w-full object-cover"
                  />
                  {/* Gradient overlay for label readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                  {/* Category label */}
                  <div className="absolute bottom-0 left-0 right-0 px-2 pb-2 md:px-3 md:pb-3">
                    <p className="display text-paper uppercase leading-tight"
                      style={{ fontSize: "clamp(6px, 0.9vw, 11px)", letterSpacing: "0.14em" }}>
                      {label}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Mobile link */}
      <div className="container-page pb-12 md:hidden">
        <Link
          href="/projects"
          className="inline-flex px-6 py-3 border border-paper/30 text-paper text-sm font-medium hover:border-paper transition-colors"
        >
          Все проекты →
        </Link>
      </div>
    </section>
  );
}
