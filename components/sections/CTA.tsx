"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { RadialGlowOrb } from "@/components/ui/RadialGlowOrb";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { ShaderAnimation } from "@/components/ui/ShaderAnimation";

export function CTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden pt-24 pb-12 md:pt-40 md:pb-12"
      style={{ background: "#0A1B63" }}
    >
      {/* bg-room photo */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden>
        <Image src="/bg/bg-room.png" fill alt="" className="object-cover" style={{ opacity: 0.25 }} sizes="100vw" />
      </div>

      <ShaderAnimation />
      <NoiseOverlay />

      {/* Background orb */}
      <div className="absolute right-[-8%] top-1/2 -translate-y-1/2 pointer-events-none z-0" aria-hidden>
        <RadialGlowOrb size="60vw" />
      </div>

      <div className="container-page relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-center">

          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Live status — секретный ингредиент */}
            <div className="flex items-center gap-2.5 mb-8">
              <span className="relative flex h-2 w-2">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                  style={{ background: "#22c55e" }}
                />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "#22c55e" }} />
              </span>
              <span
                className="uppercase"
                style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", letterSpacing: "0.15em" }}
              >
                Свободны для новых проектов
              </span>
            </div>

            {/* L1 — Доминанта */}
            <h2
              className="font-display font-black text-white mb-7"
              style={{
                fontSize: "clamp(52px, 7.5vw, 112px)",
                lineHeight: 0.9,
                letterSpacing: "-0.058em",
              }}
            >
              СВЯЗАТЬСЯ<br />С НАМИ
            </h2>

            {/* L3 — Описание */}
            <p
              className="mb-12 leading-relaxed"
              style={{
                fontSize: "clamp(14px, 1.2vw, 17px)",
                color: "rgba(255,255,255,0.62)",
                maxWidth: "44ch",
                lineHeight: 1.65,
              }}
            >
              Расскажите формат события, площадку, дату и техническую задачу.
              Мы поможем собрать решение по звуку, свету, сцене и экранам.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a
                href="tel:+79033710400"
                className="btn-primary inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-base text-white"
              >
                Позвонить Фёдору
              </a>
              <a
                href="mailto:fmpuzikov@gmail.com"
                className="btn-outline inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-base text-white"
              >
                Написать на почту
              </a>
            </div>

            {/* L4 — Контакты */}
            <div>
              <p
                className="uppercase mb-3"
                style={{ fontSize: 10, color: "rgba(255,255,255,0.28)", letterSpacing: "0.15em" }}
              >
                Контакты
              </p>
              <a
                href="tel:+79033710400"
                className="block text-white/55 hover:text-white transition-colors duration-200 text-sm mb-1 tabular-nums"
              >
                +7 (903) 371-04-00
              </a>
              <a
                href="https://t.me/fmpuzikov"
                target="_blank"
                rel="noreferrer"
                className="block text-white/55 hover:text-white transition-colors duration-200 text-sm mb-1"
              >
                Telegram: @fmpuzikov
              </a>
              <a
                href="mailto:fmpuzikov@gmail.com"
                className="block text-white/55 hover:text-white transition-colors duration-200 text-sm"
              >
                fmpuzikov@gmail.com
              </a>
            </div>
          </motion.div>

          {/* Right — concert photo */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "16/11" }}>
              <Image
                src="/final_zvuk.png"
                alt="Звук Вокруг — концертное мероприятие"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Blue frame + tint */}
              <div
                className="absolute inset-0 rounded-2xl"
                style={{ boxShadow: "inset 0 0 0 1px rgba(33,85,255,0.3)" }}
              />
              <div
                className="absolute inset-0 rounded-2xl"
                style={{ background: "rgba(33,85,255,0.06)" }}
              />
              {/* Bottom fade */}
              <div
                className="absolute inset-x-0 bottom-0 h-1/3 rounded-b-2xl"
                style={{ background: "linear-gradient(to top, rgba(10,27,99,0.5), transparent)" }}
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
