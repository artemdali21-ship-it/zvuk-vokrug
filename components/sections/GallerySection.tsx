"use client";

import Link from "next/link";
import { useScroll, useTransform, motion, type MotionValue } from "framer-motion";
import { useRef } from "react";

// Все 26 фото с категориями
const photos = [
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

// 4 направления — фото летит на тебя с этой стороны
// wrapClass:  как выровнять в полноэкранном контейнере
// imgClass:   размер самого фото
// originX/Y:  точка роста (0=лево/верх, 1=право/низ, 0.5=центр)
const DIRS = [
  { wrapClass: "items-center justify-start",  imgClass: "h-[70vh] w-[48vw]", originX: 0,   originY: 0.5 }, // ← лево
  { wrapClass: "items-start  justify-center", imgClass: "h-[48vh] w-[80vw]", originX: 0.5, originY: 0   }, // ↑ верх
  { wrapClass: "items-center justify-end",    imgClass: "h-[70vh] w-[48vw]", originX: 1,   originY: 0.5 }, // → право
  { wrapClass: "items-end    justify-center", imgClass: "h-[48vh] w-[80vw]", originX: 0.5, originY: 1   }, // ↓ низ
] as const;

// Тайминг: каждое фото занимает 0.08 прогресса, старт каждый 0.034
// → последнее фото заканчивается на ≈ 0.955 → укладывается в 1.0
const STEP     = 0.034;
const DURATION = 0.08;
const FADE     = 0.008; // fade in/out

// ── Один слой ───────────────────────────────────────────────────
interface LayerProps {
  src: string;
  label: string;
  index: number;
  scrollYProgress: MotionValue<number>;
}

function PhotoLayer({ src, label, index, scrollYProgress }: LayerProps) {
  const start = index * STEP;
  const end   = start + DURATION;
  const dir   = DIRS[index % 4];

  // Зум: от маленького (0.35) до большого (3) — летит на тебя и улетает
  const scale = useTransform(scrollYProgress, [start, end], [0.35, 3]);

  // Появляется быстро, исчезает быстро
  const opacity = useTransform(
    scrollYProgress,
    [start, start + FADE, end - FADE, end],
    [0, 1, 1, 0],
  );

  return (
    <motion.div
      style={{ scale, opacity, originX: dir.originX, originY: dir.originY }}
      className={`absolute top-0 flex h-full w-full ${dir.wrapClass}`}
    >
      <div className={`relative shrink-0 ${dir.imgClass}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={label} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-3 pb-3">
          <p
            className="display text-paper uppercase leading-tight"
            style={{ fontSize: "clamp(7px, 1vw, 13px)", letterSpacing: "0.15em" }}
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

      {/* 700vh — 26 фото по одному, цикл лево→верх→право→низ */}
      <div ref={container} className="relative h-[700vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          {photos.map((p, i) => (
            <PhotoLayer
              key={i}
              src={p.src}
              label={p.label}
              index={i}
              scrollYProgress={scrollYProgress}
            />
          ))}
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
