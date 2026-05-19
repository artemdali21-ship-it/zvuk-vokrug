"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const dominant = { value: "30", label: "ЛЕТ", sub: "с 1994 года" };

const secondary = [
  { value: "9 000", suffix: "+", label: "МЕРОПРИЯТИЙ", sub: "за 30 лет" },
  { value: "60", suffix: "+", label: "ТОПОВЫХ АРТИСТОВ", sub: "опыт тех. сопровождения", klein: true },
];

function SecondaryItem({
  stat,
  index,
  inView,
}: {
  stat: (typeof secondary)[0];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.15 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="py-8 border-t border-ink/10 first:border-t-0 md:first:border-t"
    >
      <div className="display text-mega text-ink leading-none mb-2 tabular-nums">
        {stat.value}
        {stat.klein ? (
          <span className="text-klein">{stat.suffix}</span>
        ) : (
          <span>{stat.suffix}</span>
        )}
      </div>
      <p className="text-xs md:text-sm text-ink uppercase tracking-[0.12em] font-semibold mb-1">
        {stat.label}
      </p>
      <p className="text-xs text-ink2 leading-snug max-w-[200px]">
        {stat.sub}
      </p>
    </motion.div>
  );
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-paper2">
      <div className="container-page">
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-12">
          {/* Left: dominant number */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-5 flex flex-col justify-center py-14 md:py-20 pr-0 md:pr-12 border-b md:border-b-0 md:border-r border-ink/[0.08]"
          >
            <div className="display leading-none tabular-nums mb-3"
              style={{ fontSize: "clamp(5rem, 14vw, 12rem)", letterSpacing: "-0.04em", color: "#0A0A0A" }}>
              {dominant.value}
            </div>
            <p className="display text-[clamp(1.5rem,3vw,2.5rem)] text-ink uppercase tracking-[0.12em] mb-2">
              {dominant.label}
            </p>
            <p className="text-sm text-ink2">{dominant.sub}</p>
          </motion.div>

          {/* Right: three secondary stats */}
          <div className="md:col-span-7 flex flex-col justify-center py-6 md:py-0 md:pl-12 divide-y divide-ink/10 md:divide-y-0">
            {secondary.map((s, i) => (
              <SecondaryItem key={s.label} stat={s} index={i} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
