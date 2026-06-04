"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative overflow-hidden section-py" style={{ background: "#030817", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <NoiseOverlay />

      <div className="container-page relative z-10">
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2">

          {/* 30 лет */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            // col-border-right: shows divider on md+, hidden on mobile 1-col
            className="flex flex-col justify-center py-10 md:py-0 col-border-right"
          >
            <div
              className="font-display font-black text-white tabular-nums leading-none select-none"
              style={{ fontSize: "clamp(52px, 10vw, 160px)", letterSpacing: "-0.06em", lineHeight: 0.8 }}
            >
              30
            </div>
            <p
              className="font-display font-black uppercase text-white mt-4"
              style={{ fontSize: "clamp(12px, 1.4vw, 20px)", letterSpacing: "0.06em" }}
            >
              ЛЕТ ОПЫТА
            </p>
            <p className="text-white/40 text-xs mt-2 tracking-wider">с 1994 года</p>
          </motion.div>

          {/* 9000+ */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            // col-indent-left: adds left padding on md+, 0 on mobile
            className="flex flex-col justify-center pt-10 md:pt-0 col-indent-left"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div
              className="font-display font-black text-white tabular-nums leading-none select-none"
              style={{ fontSize: "clamp(52px, 10vw, 160px)", letterSpacing: "-0.06em", lineHeight: 0.8 }}
            >
              9000<span style={{ color: "#2155FF" }}>+</span>
            </div>
            <p
              className="font-display font-black uppercase text-white mt-4"
              style={{ fontSize: "clamp(12px, 1.4vw, 20px)", letterSpacing: "0.06em" }}
            >
              УСПЕШНЫХ МЕРОПРИЯТИЙ
            </p>
            <p className="text-white/40 text-xs mt-2 tracking-wider">за 30 лет</p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
