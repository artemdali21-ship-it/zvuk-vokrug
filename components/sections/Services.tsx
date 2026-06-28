"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";

const values = [
  { n: "01", title: "Райдер выполняется без сюрпризов" },
  { n: "02", title: "Оборудование приезжает в рабочем состоянии" },
  { n: "03", title: "Саундчек проходит без суеты" },
  { n: "04", title: "Команда понимает специфику открытых площадок" },
  { n: "05", title: "Техническое обеспечение не отвлекает артистов" },
  { n: "06", title: "Без переплат" },
  { n: "07", title: "Дисциплина и субординация на важных городских событиях" },
  { n: "08", title: "Демонтаж проходит вовремя и чисто" },
];

export function Services() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px" });
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });

  return (
    <section className="relative overflow-hidden section-py-large" style={{ background: "#030817" }}>
      {/* bg-angular fon */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
        <Image src="/bg/bg-angular.png" fill alt="" style={{ objectFit: "cover", opacity: 0.45 }} sizes="100vw" />
      </div>
      <NoiseOverlay />

      <div className="container-page relative z-10">
        {/* Header */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 32 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 md:mb-28"
        >
          <h2
            className="font-display font-black text-white"
            style={{ fontSize: "clamp(48px, 7vw, 104px)", lineHeight: 0.92, letterSpacing: "-0.055em" }}
          >
            ЧТО ЦЕНИТ<br />ЗАКАЗЧИК
          </h2>
        </motion.div>

        {/* Grid 2×4 */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2">
          {values.map((v, i) => (
            <motion.div
              key={v.n}
              initial={{ opacity: 0, y: 16 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className={`flex gap-6 py-7 md:py-10 group ${i % 2 === 0 ? "col-border-right" : "col-indent-left"}`}
              style={{
                borderTop: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <span
                className="font-display font-black shrink-0 tabular-nums"
                style={{ fontSize: "clamp(48px, 5vw, 72px)", lineHeight: 0.9, color: "#2155FF" }}
              >
                {v.n}
              </span>
              <h3
                className="font-display font-black text-white group-hover:text-blue-electric transition-colors duration-300 self-center"
                style={{ fontSize: "clamp(20px, 2.5vw, 32px)", lineHeight: 1.1, letterSpacing: "-0.03em" }}
              >
                {v.title}
              </h3>
            </motion.div>
          ))}
        </div>

        {/* Перебивка — крупный слайд-тезис */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={gridInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-black text-white/70 text-center mt-20 md:mt-32"
          style={{
            fontSize: "clamp(28px, 5vw, 72px)",
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: "clamp(48px, 6vw, 80px)",
          }}
        >
          Мы создаем технические решения<br className="hidden md:block" /> для событий любого масштаба
        </motion.p>
      </div>
    </section>
  );
}
