"use client";

import { useRef } from "react";
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

export function EventCategories() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-20px" });
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-20px" });

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  // Content: enters from below → reads → exits to top
  const contentY = useTransform(
    scrollYProgress,
    [0, 0.15, 0.8, 1],
    ["55vh", "0vh", "0vh", "-55vh"]
  );

  // 3D object rises slower — creates depth between it and content
  const objY = useTransform(scrollYProgress, [0, 1], ["5%", "-20%"]);

  return (
    // 280vh: enough scroll travel on both desktop and mobile without feeling endless
    <div ref={wrapperRef} style={{ height: "280vh" }}>
      <section
        style={{
          position: "sticky",
          top: 0,
          // SEAM-002: 100svh avoids iOS address-bar overflow issue
          height: "100svh",
          overflow: "hidden",
          background: "#071133",
        }}
      >
        {/* SEAM-001: background-attachment:fixed breaks iOS Safari.
            Fix: absolutely positioned Image inside sticky section =
            effectively viewport-fixed on ALL devices including iOS. */}
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
          <Image
            src="/bg/bg-deep-blue.png"
            fill
            alt=""
            style={{ objectFit: "cover", opacity: 0.7 }}
            sizes="100vw"
          />
        </div>

        {/* 3D object — parallax layer between bg and content, z-0 = behind cards */}
        <motion.div
          style={{ y: objY, x: "-50%", left: "50%", top: "10%" }}
          className="absolute pointer-events-none z-0 will-change-transform"
          aria-hidden
        >
          {/* Hidden on mobile — too large and distracting on small screens */}
          <div className="hidden sm:block" style={{ width: "clamp(600px, 90vw, 1400px)", opacity: 0.40 }}>
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

        {/* Content scrolls over fixed background */}
        <motion.div
          style={{ y: contentY }}
          className="absolute inset-x-0 z-10 will-change-transform"
        >
          <div className="container-page pt-14 md:pt-16">
            {/* Header */}
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

            {/* Grid 2-col mobile / 3-col desktop */}
            <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
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
                    // Mobile: 3/4 aspect fits 2 rows in 100svh without overflow
                    // Desktop: 4/5 looks better with more vertical space
                    style={{ aspectRatio: "3/4", borderRadius: 12 }}
                  >
                    <Image
                      src={cat.photo}
                      alt={cat.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, 33vw"
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
