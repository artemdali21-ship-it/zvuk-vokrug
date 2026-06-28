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

      {/* Background photo — original PNG, mobile shifted left to show all objects */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg/hero-main.png"
          alt=""
          fill
          priority
          className="object-contain [object-position:center_bottom] md:object-cover md:[object-position:center]"
          sizes="100vw"
          quality={95}
        />
      </div>

      {/* Gradient overlay — lighter so photo breathes */}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
          background: [
            "linear-gradient(180deg,",
            "rgba(2,6,23,0.78) 0%,",
            "rgba(2,6,23,0.50) 14%,",
            "rgba(2,6,23,0.04) 48%,",
            "rgba(2,6,23,0.12) 100%)",
          ].join(" "),
        }}
      />

      <NoiseOverlay />

      {/* Content */}
      <div
        className="relative flex flex-col flex-1 items-center text-center"
        style={{ zIndex: 10, paddingLeft: "clamp(20px, 5vw, 80px)", paddingRight: "clamp(20px, 5vw, 80px)" }}
      >
        {/* Nav spacer — smaller so CTA sits higher */}
        <div style={{ height: "clamp(60px, 8vh, 90px)" }} />

        {/* Logo eyebrow — bigger, more space before divider */}
        <motion.div {...fade(0)} style={{ marginBottom: "clamp(20px, 3.2vh, 42px)" }}>
          <Image
            src="/logo.png"
            alt="Звук Вокруг"
            width={160}
            height={112}
            className="h-[clamp(46px,6vh,72px)] w-auto object-contain brightness-0 invert opacity-70"
          />
        </motion.div>

        {/* Thin divider */}
        <motion.div
          {...fade(0.1)}
          style={{
            height: 1, width: "clamp(40px, 6vw, 80px)",
            background: "rgba(255,255,255,0.22)",
            marginBottom: "clamp(14px, 2vh, 26px)",
          }}
        />

        {/* Perspective text block — logo small top, headline large bottom = depth illusion */}
        <motion.div
          {...fade(0.2)}
          style={{
            perspective: "700px",
            perspectiveOrigin: "50% 100%",
            marginBottom: "clamp(6px, 1vh, 12px)",
          }}
        >
          <p
            className="font-display font-black text-white uppercase"
            style={{
              fontSize: "clamp(30px, 5.8vw, 92px)",
              lineHeight: 1.0,
              letterSpacing: "-0.01em",
              maxWidth: "13ch",
              transform: "perspective(700px) rotateX(18deg)",
              transformOrigin: "bottom center",
            }}
          >
            КОМПЛЕКСНОЕ ТЕХНИЧЕСКОЕ ОБЕСПЕЧЕНИЕ
          </p>
        </motion.div>

        <motion.p
          {...fade(0.3)}
          className="font-display font-black text-white/50 uppercase"
          style={{ fontSize: "clamp(11px, 1.2vw, 17px)", letterSpacing: "0.18em", marginBottom: "clamp(12px, 1.8vh, 24px)" }}
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
            paddingBottom: "max(clamp(20px, 3vh, 36px), env(safe-area-inset-bottom, 0px))",
            width: "calc(100% + 2 * clamp(20px, 5vw, 80px))",
            marginLeft: "calc(-1 * clamp(20px, 5vw, 80px))",
          }}
        >
          <p
            className="text-white/25 uppercase select-none"
            style={{ fontSize: "clamp(11px, 2.4vw, 36px)", letterSpacing: "0.06em" }}
          >
            Волгоград&nbsp;·&nbsp;Элиста&nbsp;·&nbsp;Астрахань&nbsp;·&nbsp;Саратов
          </p>
        </motion.div>
      </div>
    </section>
  );
}
