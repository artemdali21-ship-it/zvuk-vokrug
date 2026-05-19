"use client";

import Link from "next/link";
import { useScroll, useTransform, motion, type MotionValue } from "framer-motion";
import { useRef } from "react";

// Все 26 фото разбиты на 4 волны по 6-7 штук
const waves = [
  // Волна 1 — первый экран
  [
    { src: "/photos/61721cc2.jpg", label: "КОНЦЕРТЫ И ТУРЫ"   },
    { src: "/photos/f9e05266.jpg", label: "ФЕСТИВАЛИ"         },
    { src: "/photos/bf925159.jpg", label: "ГОРОДСКИЕ СОБЫТИЯ" },
    { src: "/photos/48081692.jpg", label: "КОНЦЕРТЫ И ТУРЫ"   },
    { src: "/photos/0935157f.jpg", label: "ТУРЫ И ГАСТРОЛИ"   },
    { src: "/photos/8edb3ea6.jpg", label: "ИНСТАЛЛЯЦИИ"       },
    { src: "/photos/02ac7b6d.jpg", label: "КОНЦЕРТЫ И ТУРЫ"   },
  ],
  // Волна 2
  [
    { src: "/photos/13d4e9e3.jpg", label: "КОРПОРАТИВНЫЕ"     },
    { src: "/photos/2d600a69.jpg", label: "ИНСТАЛЛЯЦИИ"       },
    { src: "/photos/f4ca6ed7.jpg", label: "СПОРТИВНЫЕ"        },
    { src: "/photos/09fc13c0.jpg", label: "КОНЦЕРТЫ И ТУРЫ"   },
    { src: "/photos/0a0fc3bf.jpg", label: "ФЕСТИВАЛИ"         },
    { src: "/photos/111fa4b0.jpg", label: "ГОРОДСКИЕ СОБЫТИЯ" },
    { src: "/photos/189640b9.jpg", label: "КОРПОРАТИВНЫЕ"     },
  ],
  // Волна 3
  [
    { src: "/photos/1bccc14e.jpg", label: "ТУРЫ И ГАСТРОЛИ"   },
    { src: "/photos/1f8a42d5.jpg", label: "СПОРТИВНЫЕ"        },
    { src: "/photos/2150f754.jpg", label: "КОНЦЕРТЫ И ТУРЫ"   },
    { src: "/photos/27e987f4.jpg", label: "ФЕСТИВАЛИ"         },
    { src: "/photos/2f455e57.jpg", label: "ГОРОДСКИЕ СОБЫТИЯ" },
    { src: "/photos/461de058.jpg", label: "КОРПОРАТИВНЫЕ"     },
    { src: "/photos/80b01b92.jpg", label: "ТУРЫ И ГАСТРОЛИ"   },
  ],
  // Волна 4
  [
    { src: "/photos/a55acebb.jpg", label: "КОНЦЕРТЫ И ТУРЫ"   },
    { src: "/photos/abcd5599.jpg", label: "ФЕСТИВАЛИ"         },
    { src: "/photos/c43181fe.jpg", label: "ГОРОДСКИЕ СОБЫТИЯ" },
    { src: "/photos/d8bf2192.jpg", label: "ИНСТАЛЛЯЦИИ"       },
    { src: "/photos/fe4241cf.jpg", label: "СПОРТИВНЫЕ"        },
  ],
];

// Позиции для 7 фото — одинаковы для каждой волны
const POSITIONS = [
  "",                                                                // 0 — центр (фронт, летит быстрее всех)
  "!-top-[30vh]  !left-[5vw]     !h-[30vh] !w-[35vw]",            // 1
  "!-top-[10vh]  !-left-[25vw]   !h-[45vh] !w-[20vw]",            // 2
  "!top-0        !left-[27.5vw]  !h-[25vh] !w-[25vw]",            // 3
  "!top-[27.5vh] !left-[5vw]     !h-[25vh] !w-[20vw]",            // 4
  "!top-[27.5vh] !-left-[22.5vw] !h-[25vh] !w-[30vw]",           // 5
  "!top-[22.5vh] !left-[25vw]    !h-[15vh] !w-[15vw]",            // 6
];

// Финальный масштаб для каждой позиции (центр — быстрее всех)
const SCALE_MAX = [9, 5, 6, 5, 6, 5, 4];

// Диапазоны скролла для каждой волны (контейнер 500vh)
// Волны перекрываются на ~0.05 для плавного перехода
const WAVE_RANGES: [number, number][] = [
  [0.00, 0.32],
  [0.28, 0.60],
  [0.56, 0.82],
  [0.78, 1.00],
];

// ── Один слой фото ──────────────────────────────────────────────
interface LayerProps {
  src: string;
  label: string;
  posIndex: number;
  waveIndex: number;
  scrollYProgress: MotionValue<number>;
}

function PhotoLayer({ src, label, posIndex, waveIndex, scrollYProgress }: LayerProps) {
  const [gs, ge] = WAVE_RANGES[waveIndex];
  const isFirst = waveIndex === 0;
  const isLast  = waveIndex === waves.length - 1;

  const scale = useTransform(scrollYProgress, [gs, ge], [1, SCALE_MAX[posIndex]]);

  // Плавное появление и исчезновение волны
  const fadeIn  = isFirst ? 0 : Math.max(0, gs - 0.025);
  const fadeInE = isFirst ? 0 : gs;
  const fadeOut = isLast  ? 1 : ge - 0.03;
  const fadeOutE= isLast  ? 1 : ge;

  const opacity = useTransform(
    scrollYProgress,
    [fadeIn, fadeInE, fadeOut, fadeOutE],
    isFirst ? [1, 1, 1, 0] : [0, 1, 1, 0],
  );

  return (
    <motion.div
      style={{ scale, opacity }}
      className="absolute top-0 flex h-full w-full items-center justify-center"
    >
      <div className={`relative h-[25vh] w-[25vw] ${POSITIONS[posIndex] ?? ""}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={label} className="h-full w-full object-cover" />
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
  );
}

// ── Главный компонент ────────────────────────────────────────────
export function GallerySection() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section className="bg-ink">
      {/* Заголовок */}
      <div className="container-page flex items-end justify-between py-14 md:py-20">
        <h2 className="display text-huge text-paper uppercase">ГАЛЕРЕЯ</h2>
        <Link
          href="/projects"
          className="px-6 py-3 border border-paper/30 text-paper text-sm font-medium hover:border-paper hover:bg-paper/5 transition-colors shrink-0 hidden md:inline-flex"
        >
          Все проекты →
        </Link>
      </div>

      {/* 500vh — 4 волны последовательного параллакса */}
      <div ref={container} className="relative h-[500vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          {waves.map((wave, wi) =>
            wave.map((img, pi) => (
              <PhotoLayer
                key={`${wi}-${pi}`}
                src={img.src}
                label={img.label}
                posIndex={pi}
                waveIndex={wi}
                scrollYProgress={scrollYProgress}
              />
            ))
          )}
        </div>
      </div>

      {/* Мобильная ссылка */}
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
