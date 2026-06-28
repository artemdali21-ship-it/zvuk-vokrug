"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: EASE },
});

export function Hero() {
  return (
    <section
      className="relative min-h-[100dvh] flex flex-col overflow-hidden"
      style={{ background: "#020617" }}
    >
      <h1 className="sr-only">
        Звук Вокруг — комплексное техническое обеспечение мероприятий. Волгоград, Юг России. С 1994 года.
      </h1>

      {/* Background — mobile: vertical portrait, desktop: landscape */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg/hero-mobile.png"
          alt=""
          fill
          priority
          className="object-cover [object-position:50%_60%] md:hidden"
          sizes="100vw"
          quality={95}
        />
        <Image
          src="/bg/hero-main.png"
          alt=""
          fill
          priority
          className="hidden md:block object-cover [object-position:50%_55%]"
          sizes="100vw"
          quality={95}
        />
      </div>

      {/* Gradient overlay desktop */}
      <div
        aria-hidden
        className="hidden md:block"
        style={{
          position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
          background: [
            "linear-gradient(180deg,",
            "rgba(2,6,23,0.78) 0%,",
            "rgba(2,6,23,0.50) 14%,",
            "rgba(2,6,23,0.04) 48%,",
            "rgba(2,6,23,0.45) 100%)",
          ].join(" "),
        }}
      />
      {/* Gradient overlay mobile — светлее сверху, небо видно */}
      <div
        aria-hidden
        className="md:hidden"
        style={{
          position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
          background: [
            "linear-gradient(180deg,",
            "rgba(2,6,23,0.55) 0%,",
            "rgba(2,6,23,0.20) 20%,",
            "rgba(2,6,23,0.0) 45%,",
            "rgba(2,6,23,0.10) 65%,",
            "rgba(2,6,23,0.55) 100%)",
          ].join(" "),
        }}
      />

      <NoiseOverlay />

      {/* Content */}
      <div
        className="relative flex flex-col flex-1 items-center text-center"
        style={{ zIndex: 10, paddingLeft: "clamp(20px, 5vw, 80px)", paddingRight: "clamp(20px, 5vw, 80px)" }}
      >
        {/* Nav spacer — mobile: минимум, desktop: лого опускается ниже */}
        <div className="md:hidden" style={{ height: "clamp(76px, 10vh, 96px)" }} />
        <div className="hidden md:block" style={{ height: "clamp(86px, 10vh, 120px)" }} />

        {/* Logo eyebrow — крупнее, меньше отступ до полоски */}
        <motion.div {...fade(0)} style={{ marginBottom: "clamp(18px, 2.5vh, 36px)" }}>
          <Image
            src="/logo.png"
            alt="Звук Вокруг"
            width={160}
            height={112}
            className="h-[clamp(54px,7.5vh,90px)] w-auto object-contain brightness-0 invert opacity-70"
          />
        </motion.div>

        {/* Thin divider */}
        <motion.div
          {...fade(0.1)}
          style={{
            height: 1, width: "clamp(40px, 6vw, 80px)",
            background: "rgba(255,255,255,0.22)",
            marginBottom: "clamp(10px, 1.4vh, 20px)",
          }}
        />

        {/* Perspective text block — перспектива только на md+, mobile без transform (SEAM-020) */}
        <motion.div
          {...fade(0.2)}
          style={{
            marginBottom: "clamp(4px, 0.6vh, 8px)",
            overflow: "hidden",
          }}
        >
          <p
            className="font-display font-black text-white uppercase hero-perspective-text"
            style={{
              fontSize: "clamp(30px, 5.8vw, 92px)",
              lineHeight: 1.0,
              letterSpacing: "-0.01em",
              maxWidth: "22ch",
            }}
          >
            КОМПЛЕКСНОЕ ТЕХНИЧЕСКОЕ ОБЕСПЕЧЕНИЕ
          </p>
        </motion.div>

        <motion.p
          {...fade(0.3)}
          className="font-display font-black text-white/50 uppercase"
          style={{ fontSize: "clamp(11px, 1.2vw, 17px)", letterSpacing: "0.18em", marginBottom: "clamp(8px, 1.2vh, 16px)" }}
        >
          мероприятий · с&nbsp;1994
        </motion.p>

        {/* CTA — raised for air between button and objects */}
        <motion.div {...fade(0.4)} className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5">
          <a
            href="mailto:fmpuzikov@gmail.com?subject=Запрос%20предложения"
            className="btn-primary inline-flex items-center justify-center px-7 py-3.5 rounded-full font-bold text-sm tracking-wide uppercase text-white"
          >
            Получить предложение
          </a>
          <a
            href="tel:+79033710400"
            className="text-white/50 text-sm hover:text-white transition-colors duration-200"
          >
            +7&nbsp;(903)&nbsp;371-04-00
          </a>
        </motion.div>

        {/* Spacer pushes cities to bottom */}
        <div className="flex-1" />

        {/* Cities strip — full viewport width, large */}
        <motion.div
          {...fade(0.5)}
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: "clamp(14px, 2vh, 24px)",
            paddingBottom: "max(clamp(32px, 5vh, 56px), env(safe-area-inset-bottom, 0px))",
            paddingLeft: "clamp(20px, 5vw, 80px)",
            paddingRight: "clamp(20px, 5vw, 80px)",
            width: "calc(100% + 2 * clamp(20px, 5vw, 80px))",
            marginLeft: "calc(-1 * clamp(20px, 5vw, 80px))",
          }}
        >
          <div
            className="flex items-center justify-between w-full uppercase select-none"
            style={{ color: "rgba(255,255,255,0.25)", fontSize: "clamp(12px, 2.6vw, 42px)", letterSpacing: "0.04em" }}
          >
            <span>Волгоград</span>
            <span style={{ opacity: 0.5 }}>·</span>
            <span>Элиста</span>
            <span style={{ opacity: 0.5 }}>·</span>
            <span>Астрахань</span>
            <span style={{ opacity: 0.5 }}>·</span>
            <span>Саратов</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
