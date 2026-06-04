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
      className="relative overflow-hidden py-24 md:py-36"
      style={{ background: "#0A1B63" }}
    >
      {/* bg-room photo */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden>
        <Image src="/bg/bg-room.png" fill alt="" className="object-cover" style={{ opacity: 0.3 }} sizes="100vw" />
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
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow text-white/35 mb-8">Готовы к работе</p>
            <h2
              className="font-display font-black text-white mb-6"
              style={{ fontSize: "clamp(48px, 7vw, 104px)", lineHeight: 0.92, letterSpacing: "-0.055em" }}
            >
              СВЯЗАТЬСЯ<br />С НАМИ
            </h2>
            <p className="text-white/55 text-lg mb-12 max-w-lg leading-relaxed">
              Расскажите формат события, площадку, дату и техническую задачу.
              Мы поможем собрать решение по звуку, свету, сцене и экранам.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a
                href="tel:+79033710400"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-base text-white transition-colors duration-200"
                style={{ background: "#2155FF" }}
              >
                Позвонить Фёдору
              </a>
              <a
                href="mailto:fmpuzikov@gmail.com"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold text-base text-white transition-all duration-200"
                style={{ border: "1px solid rgba(255,255,255,0.25)" }}
              >
                Написать на почту
              </a>
            </div>

            <div>
              <p className="eyebrow text-white/30 mb-3">Контакты</p>
              <a href="tel:+79033710400" className="block text-white/60 hover:text-white transition-colors text-sm mb-1">
                +7 (903) 371-04-00
              </a>
              <a href="https://t.me/fmpuzikov" target="_blank" rel="noreferrer" className="block text-white/60 hover:text-white transition-colors text-sm mb-1">
                Telegram: @fmpuzikov
              </a>
              <a href="mailto:fmpuzikov@gmail.com" className="block text-white/60 hover:text-white transition-colors text-sm">
                fmpuzikov@gmail.com
              </a>
            </div>
          </motion.div>

          {/* Right — concert photo full */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.0, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start md:items-end"
          >
            <div className="relative w-full">
              <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "16/11" }}>
                <Image
                  src="/final_zvuk.png"
                  alt="Звук Вокруг — концертное мероприятие"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 rounded-2xl" style={{ boxShadow: "inset 0 0 0 1px rgba(33,85,255,0.3)" }} />
                <div className="absolute inset-0 rounded-2xl" style={{ background: "rgba(33,85,255,0.08)" }} />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
