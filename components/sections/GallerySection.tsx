"use client";

import Link from "next/link";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

// Все 26 фото из папки /public/photos/
const galleryImages = [
  { src: "/photos/61721cc2.jpg", label: "КОНЦЕРТЫ И ТУРЫ"   },
  { src: "/photos/f9e05266.jpg", label: "ФЕСТИВАЛИ"         },
  { src: "/photos/bf925159.jpg", label: "ГОРОДСКИЕ СОБЫТИЯ" },
  { src: "/photos/48081692.jpg", label: "КОНЦЕРТЫ И ТУРЫ"   },
  { src: "/photos/0935157f.jpg", label: "ТУРЫ И ГАСТРОЛИ"   },
  { src: "/photos/8edb3ea6.jpg", label: "ИНСТАЛЛЯЦИИ"       },
  { src: "/photos/02ac7b6d.jpg", label: "КОНЦЕРТЫ И ТУРЫ"   },
  { src: "/photos/13d4e9e3.jpg", label: "КОРПОРАТИВНЫЕ"     },
  { src: "/photos/2d600a69.jpg", label: "ИНСТАЛЛЯЦИИ"       },
  { src: "/photos/f4ca6ed7.jpg", label: "СПОРТИВНЫЕ"        },
  { src: "/photos/09fc13c0.jpg", label: "КОНЦЕРТЫ И ТУРЫ"   },
  { src: "/photos/0a0fc3bf.jpg", label: "ФЕСТИВАЛИ"         },
  { src: "/photos/111fa4b0.jpg", label: "ГОРОДСКИЕ СОБЫТИЯ" },
  { src: "/photos/189640b9.jpg", label: "КОРПОРАТИВНЫЕ"     },
  { src: "/photos/1bccc14e.jpg", label: "ТУРЫ И ГАСТРОЛИ"   },
  { src: "/photos/1f8a42d5.jpg", label: "СПОРТИВНЫЕ"        },
  { src: "/photos/2150f754.jpg", label: "КОНЦЕРТЫ И ТУРЫ"   },
  { src: "/photos/27e987f4.jpg", label: "ФЕСТИВАЛИ"         },
  { src: "/photos/2f455e57.jpg", label: "ГОРОДСКИЕ СОБЫТИЯ" },
  { src: "/photos/461de058.jpg", label: "КОРПОРАТИВНЫЕ"     },
  { src: "/photos/80b01b92.jpg", label: "ТУРЫ И ГАСТРОЛИ"   },
  { src: "/photos/a55acebb.jpg", label: "КОНЦЕРТЫ И ТУРЫ"   },
  { src: "/photos/abcd5599.jpg", label: "ФЕСТИВАЛИ"         },
  { src: "/photos/c43181fe.jpg", label: "ГОРОДСКИЕ СОБЫТИЯ" },
  { src: "/photos/d8bf2192.jpg", label: "ИНСТАЛЛЯЦИИ"       },
  { src: "/photos/fe4241cf.jpg", label: "СПОРТИВНЫЕ"        },
];

// Позиции для 26 фото — заполняем весь экран мозаикой
// top/left — смещение от центра (relative), h/w — размер блока
// Отрицательные: -top-[X] / -left-[X]
const positions = [
  "",                                                                    //  0 — центр 25×25
  "!-top-[30vh]  !left-[5vw]     !h-[30vh] !w-[35vw]",                //  1
  "!-top-[10vh]  !-left-[25vw]   !h-[45vh] !w-[20vw]",                //  2
  "!top-0        !left-[27.5vw]  !h-[25vh] !w-[25vw]",                //  3
  "!top-[27.5vh] !left-[5vw]     !h-[25vh] !w-[20vw]",                //  4
  "!top-[27.5vh] !-left-[22.5vw] !h-[25vh] !w-[30vw]",               //  5
  "!top-[22.5vh] !left-[25vw]    !h-[15vh] !w-[15vw]",                //  6
  "!-top-[22vh]  !left-[28vw]    !h-[20vh] !w-[18vw]",                //  7
  "!top-[38vh]   !-left-[5vw]    !h-[16vh] !w-[22vw]",                //  8
  "!-top-[8vh]   !left-[37vw]    !h-[32vh] !w-[13vw]",                //  9
  "!-top-[25vh]  !-left-[8vw]    !h-[18vh] !w-[16vw]",                // 10
  "!-top-[32vh]  !left-[15vw]    !h-[14vh] !w-[20vw]",                // 11
  "!top-[15vh]   !-left-[32vw]   !h-[20vh] !w-[14vw]",                // 12
  "!top-[10vh]   !left-[35vw]    !h-[22vh] !w-[16vw]",                // 13
  "!top-[35vh]   !left-[22vw]    !h-[18vh] !w-[20vw]",                // 14
  "!top-[40vh]   !-left-[25vw]   !h-[14vh] !w-[18vw]",                // 15
  "!-top-[38vh]  !-left-[18vw]   !h-[16vh] !w-[22vw]",                // 16
  "!-top-[35vh]  !left-[5vw]     !h-[12vh] !w-[24vw]",                // 17
  "!top-[18vh]   !left-[18vw]    !h-[14vh] !w-[14vw]",                // 18
  "!-top-[18vh]  !-left-[38vw]   !h-[24vh] !w-[14vw]",                // 19
  "!top-[32vh]   !-left-[12vw]   !h-[12vh] !w-[16vw]",                // 20
  "!-top-[12vh]  !left-[20vw]    !h-[16vh] !w-[10vw]",                // 21
  "!top-[42vh]   !left-[8vw]     !h-[10vh] !w-[18vw]",                // 22
  "!-top-[42vh]  !left-[22vw]    !h-[14vh] !w-[12vw]",                // 23
  "!top-[8vh]    !-left-[40vw]   !h-[20vh] !w-[12vw]",                // 24
  "!-top-[20vh]  !left-[12vw]    !h-[10vh] !w-[12vw]",                // 25
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

  const scales = [
    scale4, scale5, scale6, scale5, scale6, scale8, scale9,
    scale4, scale5, scale6, scale4, scale5, scale6, scale8,
    scale5, scale4, scale6, scale5, scale9, scale4, scale5,
    scale6, scale4, scale8, scale5, scale6,
  ];

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
          {galleryImages.map(({ src, label }, index) => (
            <motion.div
              key={index}
              style={{ scale: scales[index] }}
              className="absolute top-0 flex h-full w-full items-center justify-center"
            >
              <div className={`relative h-[25vh] w-[25vw] ${positions[index] ?? ""}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={label}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
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
          ))}
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
