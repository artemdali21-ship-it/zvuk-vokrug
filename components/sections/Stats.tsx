"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative overflow-hidden" style={{ background: "#030817" }}>
      {/* Background photo */}
      <div className="absolute inset-0 z-0" aria-hidden>
        <Image
          src="/bg/bg-room-corner.png"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          quality={90}
        />
        <div className="absolute inset-0" style={{ background: "rgba(2,6,23,0.55)" }} />
      </div>

      <NoiseOverlay />
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />

      <div className="container-page relative z-10 py-24 md:py-44 lg:py-56">
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2">

          {/* 30 лет */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col pb-16 md:pb-0 md:pr-16 lg:pr-24"
          >
            {/* L1 — Доминанта */}
            <div
              className="font-display font-black text-white tabular-nums select-none"
              style={{
                fontSize: "clamp(96px, 14vw, 212px)",
                letterSpacing: "-0.07em",
                lineHeight: 0.82,
                marginLeft: "-0.03em",
              }}
            >
              30
            </div>

            {/* L2 — Метка */}
            <p
              className="font-display font-black uppercase text-white mt-7"
              style={{ fontSize: "clamp(13px, 1.5vw, 21px)", letterSpacing: "0.08em" }}
            >
              ЛЕТ ОПЫТА
            </p>

            {/* L3 — Описание */}
            <p
              className="mt-4"
              style={{
                fontSize: "clamp(13px, 1.05vw, 15.5px)",
                color: "rgba(255,255,255,0.40)",
                maxWidth: "34ch",
                lineHeight: 1.68,
              }}
            >
              Работаем с 1994 года. За три десятилетия — тысячи мероприятий от городских праздников до туров федерального уровня.
            </p>

            {/* L4 — Мета */}
            <p
              className="mt-6 uppercase"
              style={{ fontSize: 10, color: "rgba(255,255,255,0.22)", letterSpacing: "0.14em" }}
            >
              Волгоград · С 1994
            </p>
          </motion.div>

          {/* 9000+ */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.0, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col pt-16 md:pt-0 col-indent-left"
          >
            {/* L1 — Доминанта */}
            <div
              className="font-display font-black text-white tabular-nums select-none"
              style={{
                fontSize: "clamp(96px, 14vw, 212px)",
                letterSpacing: "-0.07em",
                lineHeight: 0.82,
                marginLeft: "-0.03em",
              }}
            >
              9000<span style={{ color: "#2155FF" }}>+</span>
            </div>

            {/* L2 — Метка */}
            <p
              className="font-display font-black uppercase text-white mt-7"
              style={{ fontSize: "clamp(13px, 1.5vw, 21px)", letterSpacing: "0.08em" }}
            >
              МЕРОПРИЯТИЙ
            </p>

            {/* L3 — Описание */}
            <p
              className="mt-4"
              style={{
                fontSize: "clamp(13px, 1.05vw, 15.5px)",
                color: "rgba(255,255,255,0.40)",
                maxWidth: "34ch",
                lineHeight: 1.68,
              }}
            >
              Концерты, корпоративы, городские события, театральные постановки, спортивные шоу — полное техническое сопровождение любого формата.
            </p>

            {/* L4 — Мета */}
            <p
              className="mt-6 uppercase"
              style={{ fontSize: 10, color: "rgba(255,255,255,0.22)", letterSpacing: "0.14em" }}
            >
              Юг России · Международный уровень
            </p>
          </motion.div>

        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
    </section>
  );
}
