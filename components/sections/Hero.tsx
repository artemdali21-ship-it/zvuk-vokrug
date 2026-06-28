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

      {/* Background photo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg/hero-main.webp"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={90}
        />
      </div>

      {/* Gradient overlay — dark top/bottom, transparent middle so objects show */}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
          background: [
            "linear-gradient(180deg,",
            "rgba(2,6,23,0.88) 0%,",
            "rgba(2,6,23,0.88) 18%,",
            "rgba(2,6,23,0.18) 52%,",
            "rgba(2,6,23,0.72) 100%)",
          ].join(" "),
        }}
      />

      <NoiseOverlay />

      {/* Content */}
      <div
        className="relative flex flex-col flex-1 items-center text-center"
        style={{ zIndex: 10, paddingLeft: "clamp(20px, 5vw, 80px)", paddingRight: "clamp(20px, 5vw, 80px)" }}
      >
        {/* Nav spacer */}
        <div style={{ height: "clamp(80px, 13vh, 130px)" }} />

        {/* Eyebrow — ЗВУК ВОКРУГ (small label) */}
        <motion.p
          {...fade(0)}
          className="font-display font-black text-white/55 uppercase select-none"
          style={{ fontSize: "clamp(10px, 1.1vw, 14px)", letterSpacing: "0.26em", marginBottom: "clamp(14px, 2vh, 24px)" }}
        >
          ЗВУК&nbsp;&nbsp;ВОКРУГ
        </motion.p>

        {/* Thin divider */}
        <motion.div
          {...fade(0.1)}
          style={{
            height: 1, width: "clamp(40px, 6vw, 80px)",
            background: "rgba(255,255,255,0.22)",
            marginBottom: "clamp(14px, 2vh, 24px)",
          }}
        />

        {/* Main headline — large, centered */}
        <motion.p
          {...fade(0.2)}
          className="font-display font-black text-white"
          style={{
            fontSize: "clamp(30px, 5.8vw, 92px)",
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            maxWidth: "13ch",
            marginBottom: "clamp(6px, 1vh, 12px)",
          }}
        >
          Комплексное техническое обеспечение
        </motion.p>

        <motion.p
          {...fade(0.3)}
          className="font-display font-black text-white/50 uppercase"
          style={{ fontSize: "clamp(11px, 1.2vw, 17px)", letterSpacing: "0.18em", marginBottom: "clamp(28px, 4.5vh, 56px)" }}
        >
          мероприятий · с&nbsp;1994
        </motion.p>

        {/* CTA */}
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

        {/* Cities strip — bottom only, no duplication */}
        <motion.div
          {...fade(0.5)}
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: "clamp(12px, 1.8vh, 20px)",
            paddingBottom: "max(clamp(20px, 3vh, 36px), env(safe-area-inset-bottom, 0px))",
            width: "100%",
          }}
        >
          <p
            className="text-white/30 uppercase select-none"
            style={{ fontSize: "clamp(9px, 0.8vw, 11px)", letterSpacing: "0.18em" }}
          >
            Волгоград&nbsp;·&nbsp;Элиста&nbsp;·&nbsp;Астрахань&nbsp;·&nbsp;Саратов
          </p>
        </motion.div>
      </div>
    </section>
  );
}
