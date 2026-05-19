"use client";

import Link from "next/link";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

// Все фото из EventCategories + GalleryPreview — объединено
const galleryImages = [
  { src: "/photos/61721cc2.jpg",  alt: "Концерт",              label: "КОНЦЕРТЫ И ТУРЫ"    },
  { src: "/photos/f9e05266.jpg",  alt: "Открытая сцена",       label: "ФЕСТИВАЛИ"          },
  { src: "/photos/bf925159.jpg",  alt: "Городское событие",    label: "ГОРОДСКИЕ СОБЫТИЯ"  },
  { src: "/photos/48081692.jpg",  alt: "Световое оборудование",label: "КОНЦЕРТЫ И ТУРЫ"    },
  { src: "/photos/0935157f.jpg",  alt: "Большая сцена",        label: "ТУРЫ И ГАСТРОЛИ"    },
  { src: "/photos/8edb3ea6.jpg",  alt: "Театральное событие",  label: "ИНСТАЛЛЯЦИИ"        },
  { src: "/photos/02ac7b6d.jpg",  alt: "Звукорежиссёр",        label: "КОНЦЕРТЫ И ТУРЫ"    },
  { src: "/photos/13d4e9e3.jpg",  alt: "Корпоратив",           label: "КОРПОРАТИВНЫЕ"      },
  { src: "/photos/2d600a69.jpg",  alt: "Инсталляция",          label: "ИНСТАЛЛЯЦИИ"        },
  { src: "/photos/f4ca6ed7.jpg",  alt: "Спортивное событие",   label: "СПОРТИВНЫЕ"         },
];

// Позиции для 10 фото — заполняем весь экран мозаикой
const positions: string[] = [
  "",                                                                               // 0 — центр (дефолт)
  "!-top-[30vh] !left-[5vw]   !h-[30vh] !w-[35vw]",                              // 1 — верх-лево
  "!-top-[10vh] !-left-[25vw] !h-[45vh] !w-[20vw]",                              // 2 — лево
  "!top-0       !left-[27.5vw]!h-[25vh] !w-[25vw]",                              // 3 — право
  "!top-[27.5vh]!left-[5vw]   !h-[25vh] !w-[20vw]",                              // 4 — низ-лево
  "!top-[27.5vh]!-left-[22.5vw]!h-[25vh]!w-[30vw]",                             // 5 — низ-далеко-лево
  "!top-[22.5vh]!left-[25vw]  !h-[15vh] !w-[15vw]",                              // 6 — право-низ малое
  "!-top-[22vh] !left-[28vw]  !h-[20vh] !w-[18vw]",                              // 7 — верх-право
  "!top-[38vh]  !-left-[5vw]  !h-[16vh] !w-[22vw]",                              // 8 — самый низ центр
  "!-top-[8vh]  !left-[37vw]  !h-[32vh] !w-[13vw]",                              // 9 — право вертикаль
];

export function GallerySection() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const photoScales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9, scale4, scale5, scale6];

  return (
    <section className="bg-ink">
      {/* Header */}
      <div className="container-page flex items-end justify-between py-14 md:py-20">
        <h2 className="display text-huge text-paper uppercase">
          ГАЛЕРЕЯ
        </h2>
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
          {galleryImages.map(({ src, alt, label }, index) => {
            const scale = photoScales[index % photoScales.length];
            const pos = positions[index] ?? "";
            return (
              <motion.div
                key={index}
                style={{ scale }}
                className="absolute top-0 flex h-full w-full items-center justify-center"
              >
                <div
                  className={`relative h-[25vh] w-[25vw] ${pos}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={alt}
                    className="h-full w-full object-cover"
                  />
                  {/* Gradient for label readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                  {/* Category label */}
                  <div className="absolute bottom-0 left-0 right-0 px-2 pb-2 md:px-3 md:pb-2">
                    <p
                      className="display text-paper uppercase leading-tight"
                      style={{ fontSize: "clamp(6px, 0.85vw, 11px)", letterSpacing: "0.14em" }}
                    >
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
