"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: "30", suffix: "", label: "ЛЕТ НА РЫНКЕ", sub: "с 1994 года" },
  { value: "9 000", suffix: "+", label: "МЕРОПРИЯТИЙ", sub: "за 30 лет" },
  { value: "4", suffix: "", label: "РЕГИОНА", sub: "Волгоград · Элиста · Астрахань · Саратов" },
  { value: "60", suffix: "+", label: "ТОПОВЫХ АРТИСТОВ", sub: "опыт тех. сопровождения" },
];

function StatItem({
  stat,
  index,
}: {
  stat: (typeof stats)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="py-6 md:py-0"
    >
      <div className="display text-mega text-ink leading-none mb-2 tabular-nums">
        {stat.value}
        <span className="text-klein">{stat.suffix}</span>
      </div>
      <p className="text-xs md:text-sm text-ink uppercase tracking-[0.12em] font-semibold mb-1">
        {stat.label}
      </p>
      <p className="text-xs text-ink2 leading-snug max-w-[180px]">
        {stat.sub}
      </p>
    </motion.div>
  );
}

export function Stats() {
  return (
    <section className="bg-paper2">
      <div className="container-page">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-ink/[0.08] divide-y md:divide-y-0">
          {stats.map((s, i) => (
            <div key={s.label} className="px-6 py-12 md:px-10 md:py-16">
              <StatItem stat={s} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
