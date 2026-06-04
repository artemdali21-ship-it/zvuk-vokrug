"use client";

import { NoiseOverlay } from "@/components/ui/NoiseOverlay";

const photos = [
  { src: "/photos/61721cc2.jpg", label: "КОНЦЕРТЫ И ТУРЫ" },
  { src: "/photos/f9e05266.jpg", label: "ФЕСТИВАЛИ" },
  { src: "/photos/bf925159.jpg", label: "ГОРОДСКИЕ СОБЫТИЯ" },
  { src: "/photos/48081692.jpg", label: "КОНЦЕРТЫ И ТУРЫ" },
  { src: "/photos/0935157f.jpg", label: "ТУРЫ И ГАСТРОЛИ" },
  { src: "/photos/8edb3ea6.jpg", label: "ИНСТАЛЛЯЦИИ" },
  { src: "/photos/02ac7b6d.jpg", label: "КОНЦЕРТЫ И ТУРЫ" },
  { src: "/photos/13d4e9e3.jpg", label: "КОРПОРАТИВНЫЕ" },
  { src: "/photos/2d600a69.jpg", label: "ИНСТАЛЛЯЦИИ" },
  { src: "/photos/f4ca6ed7.jpg", label: "СПОРТИВНЫЕ" },
  { src: "/photos/09fc13c0.jpg", label: "КОНЦЕРТЫ И ТУРЫ" },
  { src: "/photos/0a0fc3bf.jpg", label: "ФЕСТИВАЛИ" },
  { src: "/photos/111fa4b0.jpg", label: "ГОРОДСКИЕ СОБЫТИЯ" },
  { src: "/photos/189640b9.jpg", label: "КОРПОРАТИВНЫЕ" },
  { src: "/photos/1bccc14e.jpg", label: "ТУРЫ И ГАСТРОЛИ" },
  { src: "/photos/1f8a42d5.jpg", label: "СПОРТИВНЫЕ" },
  { src: "/photos/2150f754.jpg", label: "КОНЦЕРТЫ И ТУРЫ" },
  { src: "/photos/27e987f4.jpg", label: "ФЕСТИВАЛИ" },
  { src: "/photos/2f455e57.jpg", label: "ГОРОДСКИЕ СОБЫТИЯ" },
  { src: "/photos/461de058.jpg", label: "КОРПОРАТИВНЫЕ" },
  { src: "/photos/80b01b92.jpg", label: "ТУРЫ И ГАСТРОЛИ" },
  { src: "/photos/a55acebb.jpg", label: "КОНЦЕРТЫ И ТУРЫ" },
  { src: "/photos/abcd5599.jpg", label: "ФЕСТИВАЛИ" },
  { src: "/photos/c43181fe.jpg", label: "ГОРОДСКИЕ СОБЫТИЯ" },
  { src: "/photos/d8bf2192.jpg", label: "ИНСТАЛЛЯЦИИ" },
  { src: "/photos/fe4241cf.jpg", label: "СПОРТИВНЫЕ" },
];

function Card({ src, label }: { src: string; label: string }) {
  return (
    <div
      className="relative shrink-0 overflow-hidden group"
      style={{ width: "clamp(220px, 20vw, 320px)", aspectRatio: "16/10", borderRadius: 12 }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={label}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(2,6,23,0.85) 0%, transparent 50%)" }} />
      <p
        className="absolute bottom-3 left-3 font-display font-bold uppercase text-white/80"
        style={{ fontSize: "clamp(9px, 0.8vw, 12px)", letterSpacing: "0.12em" }}
      >
        {label}
      </p>
    </div>
  );
}

export function GallerySection() {
  // Дублируем для бесшовного зацикливания
  const loop1 = [...photos, ...photos];
  const loop2 = [...photos].reverse().concat([...photos].reverse());

  const CARD_GAP = 16; // px — gap-4
  const CARD_W = 280;  // clamp midpoint

  return (
    <section
      className="relative section-py-large"
      style={{ background: "#020617", overflow: "hidden" }}
    >
      <NoiseOverlay />

      {/* Header */}
      <div className="container-page relative z-10 mb-14 md:mb-20">
        <p className="eyebrow text-white/30 mb-4">Портфолио</p>
        <h2
          className="font-display font-black text-white"
          style={{ fontSize: "clamp(48px, 7vw, 104px)", lineHeight: 0.92, letterSpacing: "-0.055em" }}
        >
          НАШИ РАБОТЫ
        </h2>
      </div>

      <div className="relative z-10 flex flex-col gap-4">
        {/* Row 1 — влево */}
        <div
          className="overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)",
          }}
        >
          <div
            className="flex animate-marquee"
            style={{ gap: CARD_GAP, width: "max-content" }}
          >
            {loop1.map((p, i) => <Card key={i} src={p.src} label={p.label} />)}
          </div>
        </div>

        {/* Row 2 — вправо */}
        <div
          className="overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)",
          }}
        >
          <div
            className="flex animate-marquee-reverse"
            style={{ gap: CARD_GAP, width: "max-content" }}
          >
            {loop2.map((p, i) => <Card key={i} src={p.src} label={p.label} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
