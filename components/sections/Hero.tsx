"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { RadialGlowOrb } from "@/components/ui/RadialGlowOrb";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { ParallaxObject } from "@/components/ui/ParallaxObject";
import WaveBackground from "@/components/ui/WaveBackground";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // На мобилке отключаем тяжёлый WebGL-шейдер и параллакс текста
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const disableParallax = prefersReducedMotion || isMobile;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const zvukY   = useTransform(scrollYProgress, [0, 1], disableParallax ? ["0%", "0%"] : ["0%", "-35%"]);
  const vokrugY = useTransform(scrollYProgress, [0, 1], disableParallax ? ["0%", "0%"] : ["0%", "25%"]);
  const orbY    = useTransform(scrollYProgress, [0, 1], disableParallax ? ["0%", "0%"] : ["0%", "-15%"]);
  const orbScale = useTransform(scrollYProgress, [0, 1], disableParallax ? [1, 1] : [1, 1.08]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100dvh] overflow-hidden"
      style={{
        background: `linear-gradient(180deg, #020617 0%, #071133 100%)`,
      }}
    >
      {/* SEO h1 — screen reader only */}
      <h1 className="sr-only">
        Звук Вокруг — аренда звука, света, сцены и LED-экранов. Волгоград, Юг России. С 1994 года.
      </h1>

      {/* Wave Background — только на десктопе, WebGL тяжёл на мобилке */}
      {!isMobile && (
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
          <WaveBackground darkTheme resolutionScale={0.6} />
        </div>
      )}

      {/* bg-room overlay — поверх волны, создаёт глубину */}
      <div className="absolute inset-0 z-[1] pointer-events-none" aria-hidden>
        <Image
          src="/bg/bg-room-corner.png"
          fill
          alt=""
          style={{ objectFit: "cover", objectPosition: "center", opacity: 0.25 }}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(2,6,23,0.2) 0%, rgba(2,6,23,0.05) 50%, rgba(2,6,23,0.8) 100%)" }} />
      </div>

      <NoiseOverlay />

      {/* Galaxy — right accent, только на десктопе */}
      {!isMobile && (
        <ParallaxObject
          src="/3d/obj-galaxy.png"
          width="clamp(420px, 65vw, 820px)"
          top="0%"
          right="-18vw"
          parallax={0.3}
          opacity={0.22}
          zIndex={5}
          float
          sizes="1100px"
        />
      )}

      {/* ── z-10: ЗВУК — за orb ── */}
      <motion.div
        style={{ y: zvukY }}
        className={`absolute inset-0 z-10 flex items-start justify-start pointer-events-none ${!isMobile ? "will-change-transform" : ""}`}
      >
        <motion.span
          initial={{ y: 48, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
          className="font-display font-black text-white select-none"
          style={{
            fontSize: isMobile ? "clamp(72px, 22vw, 120px)" : "clamp(88px, 18vw, 260px)",
            lineHeight: 0.86,
            letterSpacing: "-0.065em",
            paddingTop: isMobile ? "clamp(80px, 14vh, 140px)" : "clamp(120px, 18vh, 200px)",
            paddingLeft: "clamp(20px, 5vw, 80px)",
          }}
        >
          ЗВУК
        </motion.span>
      </motion.div>

      {/* ── z-20: Orb — скрыт на мобилке ── */}
      {!isMobile && (
        <motion.div
          style={{ y: orbY, scale: orbScale }}
          className="absolute inset-0 z-20 flex items-center justify-center will-change-transform"
        >
          <RadialGlowOrb size="32vw" />
        </motion.div>
      )}

      {/* ── z-30: ВОКРУГ — перед orb ── */}
      <motion.div
        style={{ y: vokrugY }}
        className={`absolute inset-0 z-30 flex items-end justify-end pointer-events-none ${!isMobile ? "will-change-transform" : ""}`}
      >
        <motion.span
          initial={{ y: 48, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
          className="font-display font-black text-white select-none"
          style={{
            fontSize: isMobile ? "clamp(72px, 22vw, 120px)" : "clamp(88px, 18vw, 260px)",
            lineHeight: 0.86,
            letterSpacing: "-0.065em",
            paddingBottom: isMobile ? "clamp(180px, 26vh, 260px)" : "clamp(220px, 28vh, 320px)",
            paddingRight: "clamp(20px, 5vw, 80px)",
          }}
        >
          ВОКРУГ
        </motion.span>
      </motion.div>

      {/* ── z-40: Контент-блок снизу ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute bottom-0 left-0 right-0 z-40"
        style={{ paddingBottom: "max(clamp(48px, 7vh, 80px), env(safe-area-inset-bottom, 0px))", paddingLeft: "clamp(20px, 5vw, 80px)", paddingRight: "clamp(20px, 5vw, 80px)" }}
      >
        {/* Service line */}
        <p
          className="font-display font-black text-white mb-3"
          style={{
            fontSize: "clamp(20px, 3.5vw, 52px)",
            lineHeight: 0.92,
            letterSpacing: "-0.055em",
          }}
        >
          ЗВУК&nbsp;&nbsp;СВЕТ&nbsp;&nbsp;СЦЕНА&nbsp;&nbsp;ЭКРАНЫ
        </p>

        {/* Body */}
        <p className="text-white/60 text-sm md:text-lg mb-6 mt-3 max-w-xl">
          комплексное техническое обеспечение мероприятий
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mb-8">
          <a
            href="mailto:fmpuzikov@gmail.com?subject=Запрос%20предложения"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full font-bold text-sm tracking-wide uppercase text-white transition-colors duration-200"
            style={{ background: "#2155FF" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#346BFF")}
            onMouseLeave={e => (e.currentTarget.style.background = "#2155FF")}
          >
            Получить предложение
          </a>
          <a
            href="tel:+79033710400"
            className="text-white/60 text-sm hover:text-white transition-colors duration-200 underline-offset-4 hover:underline"
          >
            позвонить Фёдору
          </a>
        </div>

        {/* Geo — на мобилке только города, теги артистов убираем */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-10 pt-2">
          <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-white/35">
            Волгоград · Элиста · Астрахань · Саратов
          </p>
          <div className="hidden sm:flex gap-5 overflow-x-auto scrollbar-none">
            {["Scorpions · Лепс · ЛЮБЭ", "Газпром · Министерство культуры", "Парад Победы · 9 Мая", "ParkSeason Festival"].map((item, i) => (
              <span key={i} className="text-[11px] font-bold tracking-[0.1em] uppercase text-white/20 whitespace-nowrap shrink-0">
                {item}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
