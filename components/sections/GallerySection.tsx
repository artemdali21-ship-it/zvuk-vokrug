"use client";

import Link from "next/link";

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

// Две строки — разные фото, разные скорости
const row1 = photos.slice(0, 13);
const row2 = photos.slice(13);

interface CardProps {
  src: string;
  label: string;
}

function Card({ src, label }: CardProps) {
  return (
    <div className="relative flex-shrink-0 w-60 h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-2xl overflow-hidden shadow-xl group">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={label}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      {/* Gradient + label */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
      <p
        className="absolute bottom-0 left-0 right-0 px-3 pb-3 display text-paper uppercase leading-tight"
        style={{ fontSize: "clamp(7px, 0.9vw, 11px)", letterSpacing: "0.15em" }}
      >
        {label}
      </p>
    </div>
  );
}

export function GallerySection() {
  // Дублируем для бесшовного лупа
  const loop1 = [...row1, ...row1];
  const loop2 = [...row2, ...row2];

  return (
    <section className="bg-ink py-0 overflow-hidden">
      {/* Заголовок */}
      <div className="container-page flex items-end justify-between pt-14 md:pt-20 pb-10 md:pb-14">
        <h2 className="display text-huge text-paper uppercase">ГАЛЕРЕЯ</h2>
        <Link
          href="/projects"
          className="px-6 py-3 border border-paper/30 text-paper text-sm font-medium hover:border-paper hover:bg-paper/5 transition-colors shrink-0 hidden md:inline-flex"
        >
          Все проекты →
        </Link>
      </div>

      {/* Строка 1 — движется влево */}
      <div className="marquee-fade mb-4 md:mb-5">
        <div
          className="flex gap-4 md:gap-5 w-max"
          style={{ animation: "marquee 45s linear infinite" }}
        >
          {loop1.map((p, i) => <Card key={i} src={p.src} label={p.label} />)}
        </div>
      </div>

      {/* Строка 2 — движется вправо */}
      <div className="marquee-fade pb-14 md:pb-20">
        <div
          className="flex gap-4 md:gap-5 w-max"
          style={{ animation: "marquee-reverse 55s linear infinite" }}
        >
          {loop2.map((p, i) => <Card key={i} src={p.src} label={p.label} />)}
        </div>
      </div>
    </section>
  );
}
