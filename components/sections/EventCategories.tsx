"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";

const categories = [
  { n: "01", title: "КОНЦЕРТЫ И ТУРЫ",                    photo: "/photos/02ac7b6d.jpg" },
  { n: "02", title: "ЧАСТНЫЕ И КОРПОРАТИВНЫЕ ПРАЗДНИКИ",  photo: "/photos/13d4e9e3.jpg" },
  { n: "03", title: "ФЕСТИВАЛИ И КОНФЕРЕНЦИИ",            photo: "/photos/0935157f.jpg" },
  { n: "04", title: "ГОРОДСКИЕ СОБЫТИЯ",                  photo: "/photos/bf925159.jpg" },
  { n: "05", title: "ИНСТАЛЛЯЦИИ",                        photo: "/photos/2d600a69.jpg" },
  { n: "06", title: "СПОРТИВНЫЕ СОБЫТИЯ",                 photo: "/photos/f4ca6ed7.jpg" },
];

// Карточка с текстом поверх фото
function CategoryCard({
  cat,
  index,
  inView,
  sizes,
  radius = 12,
}: {
  cat: typeof categories[0];
  index: number;
  inView: boolean;
  sizes: string;
  radius?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group cursor-default"
    >
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: "3/4", borderRadius: radius }}
      >
        <Image
          src={cat.photo}
          alt={cat.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes={sizes}
        />
        {/* Gradient — тёмнее снизу и сверху для читаемости текста */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(2,6,23,0.35) 0%, rgba(2,6,23,0.15) 40%, rgba(2,6,23,0.75) 100%)" }}
        />
        {/* Blue hover tint */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: "rgba(33,85,255,0.15)" }}
        />
        {/* Номер — маленький, верхний угол */}
        <span
          className="absolute top-2.5 left-3 font-display font-black tabular-nums"
          style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em" }}
        >
          {cat.n}
        </span>
        {/* Название — по центру карточки, крупно */}
        <div className="absolute inset-0 flex items-center justify-center p-3">
          <h3
            className="font-display font-black text-white text-center uppercase group-hover:scale-[1.03] transition-transform duration-300"
            style={{
              fontSize: "clamp(13px, 1.6vw, 22px)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              textShadow: "0 2px 16px rgba(0,0,0,0.7)",
            }}
          >
            {cat.title}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Mobile: простой скролл, никакой sticky-механики ─────────────────────────
function EventCategoriesMobile() {
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-20px" });

  return (
    <section
      className="relative overflow-hidden section-py"
      style={{ background: "#071133" }}
    >
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
        <Image
          src="/bg/bg-deep-blue.png"
          fill
          alt=""
          style={{ objectFit: "cover", opacity: 0.5 }}
          sizes="100vw"
        />
      </div>
      <NoiseOverlay />

      <div ref={gridRef} className="container-page relative z-10 grid grid-cols-2 gap-2">
        {categories.map((cat, i) => (
          <CategoryCard
            key={cat.n}
            cat={cat}
            index={i}
            inView={gridInView}
            sizes="50vw"
            radius={10}
          />
        ))}
      </div>
    </section>
  );
}

// ─── Desktop: полный sticky-parallax эффект ──────────────────────────────────
function EventCategoriesDesktop() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-20px" });

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const contentY = useTransform(
    scrollYProgress,
    [0, 0.15, 0.8, 1],
    ["55vh", "0vh", "0vh", "-55vh"]
  );
  const objY = useTransform(scrollYProgress, [0, 1], ["5%", "-20%"]);

  return (
    <div ref={wrapperRef} style={{ height: "280vh" }}>
      <section
        style={{
          position: "sticky",
          top: 0,
          height: "100svh",
          overflow: "hidden",
          background: "#071133",
        }}
      >
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
          <Image
            src="/bg/bg-deep-blue.png"
            fill
            alt=""
            style={{ objectFit: "cover", opacity: 0.7 }}
            sizes="100vw"
          />
        </div>

        <motion.div
          style={{ y: objY, x: "-50%", left: "50%", top: "10%" }}
          className="absolute pointer-events-none z-0 will-change-transform"
          aria-hidden
        >
          <div style={{ width: "clamp(600px, 90vw, 1400px)", opacity: 0.40 }}>
            <Image
              src="/3d/obj-cards-float.png"
              width={1536}
              height={1024}
              alt=""
              style={{ objectFit: "contain", width: "100%", height: "auto" }}
              sizes="700px"
            />
          </div>
        </motion.div>

        <NoiseOverlay />

        <motion.div
          style={{ y: contentY }}
          className="absolute inset-x-0 z-10 will-change-transform"
        >
          <div className="container-page pt-20 md:pt-24">
            <div ref={gridRef} className="grid grid-cols-3 gap-4">
              {categories.map((cat, i) => (
                <CategoryCard
                  key={cat.n}
                  cat={cat}
                  index={i}
                  inView={gridInView}
                  sizes="33vw"
                  radius={12}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

// ─── Router: мобилка / десктоп ────────────────────────────────────────────────
export function EventCategories() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (!mounted) return <EventCategoriesDesktop />;
  return isMobile ? <EventCategoriesMobile /> : <EventCategoriesDesktop />;
}
