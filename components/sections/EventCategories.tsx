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

// ─── Mobile: простой скролл, никакой sticky-механики ─────────────────────────
function EventCategoriesMobile() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-20px" });
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

      <div className="container-page relative z-10">
        {/* Header */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <p className="eyebrow text-white/35 mb-4">Специализация</p>
          <h2
            className="font-display font-black text-white"
            style={{ fontSize: "clamp(36px, 10vw, 72px)", lineHeight: 0.92, letterSpacing: "-0.055em" }}
          >
            Для каких событий.
          </h2>
        </motion.div>

        {/* Grid 2-col */}
        <div ref={gridRef} className="grid grid-cols-2 gap-2">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.n}
              initial={{ opacity: 0, y: 12 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: "3/4", borderRadius: 10 }}
              >
                <Image
                  src={cat.photo}
                  alt={cat.title}
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to bottom, rgba(2,6,23,0.0) 30%, rgba(2,6,23,0.8) 100%)" }}
                />
                <span
                  className="absolute top-2 left-2.5 font-display font-black tabular-nums"
                  style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: "0.06em" }}
                >
                  {cat.n}
                </span>
              </div>
              <div className="mt-1.5 px-0.5">
                <h3
                  className="font-display font-black text-white/70 uppercase"
                  style={{ fontSize: "clamp(9px, 2.8vw, 12px)", letterSpacing: "0.05em", lineHeight: 1.3 }}
                >
                  {cat.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Desktop: полный sticky-parallax эффект ──────────────────────────────────
function EventCategoriesDesktop() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-20px" });
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
          <div className="container-page pt-14 md:pt-16">
            <motion.div
              ref={headRef}
              initial={{ opacity: 0, y: 20 }}
              animate={headInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mb-10 md:mb-16"
            >
              <p className="eyebrow text-white/35 mb-4">Специализация</p>
              <h2
                className="font-display font-black text-white"
                style={{ fontSize: "clamp(36px, 7vw, 104px)", lineHeight: 0.92, letterSpacing: "-0.055em" }}
              >
                Для каких событий.
              </h2>
            </motion.div>

            <div ref={gridRef} className="grid grid-cols-3 gap-4">
              {categories.map((cat, i) => (
                <motion.div
                  key={cat.n}
                  initial={{ opacity: 0, y: 16 }}
                  animate={gridInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="group cursor-default"
                >
                  <div
                    className="relative overflow-hidden"
                    style={{ aspectRatio: "3/4", borderRadius: 12 }}
                  >
                    <Image
                      src={cat.photo}
                      alt={cat.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="33vw"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(to bottom, rgba(2,6,23,0.05) 0%, rgba(2,6,23,0.75) 100%)" }}
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: "rgba(33,85,255,0.15)" }}
                    />
                    <span
                      className="absolute top-2 left-3 font-display font-black tabular-nums"
                      style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.06em" }}
                    >
                      {cat.n}
                    </span>
                  </div>
                  <div className="mt-2 px-0.5">
                    <h3
                      className="font-display font-black text-white/70 group-hover:text-white transition-colors duration-300 uppercase"
                      style={{ fontSize: "clamp(9px, 1.1vw, 14px)", letterSpacing: "0.05em", lineHeight: 1.3 }}
                    >
                      {cat.title}
                    </h3>
                  </div>
                </motion.div>
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

  // SSR / first paint — рендерим десктоп-версию (безопасно для SEO, нет layout shift на десктопе)
  if (!mounted) return <EventCategoriesDesktop />;

  return isMobile ? <EventCategoriesMobile /> : <EventCategoriesDesktop />;
}
