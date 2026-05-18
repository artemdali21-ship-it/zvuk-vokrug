"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Volume2, Lightbulb, LayoutGrid, Monitor, Sparkles } from "lucide-react";
import { services } from "@/data/services";

const iconMap = {
  Volume2,
  Lightbulb,
  LayoutGrid,
  Monitor,
  Sparkles,
} as const;

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = iconMap[service.icon as keyof typeof iconMap];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-paper2 p-8 md:p-10 hover:bg-ink transition-colors duration-500 cursor-default overflow-hidden"
    >
      {/* Klein accent line top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-klein scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

      <Icon className="w-5 h-5 text-klein mb-8 stroke-[1.5]" />

      <h3 className="display text-2xl md:text-3xl text-ink group-hover:text-paper mb-4 transition-colors duration-500 leading-tight">
        {service.title}
      </h3>
      <p className="text-ink2 group-hover:text-paper/55 text-sm md:text-base leading-relaxed transition-colors duration-500">
        {service.description}
      </p>
    </motion.div>
  );
}

export function Services() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: "-60px" });

  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="container-page">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16"
        >
          <p className="text-xs text-ink2 uppercase tracking-[0.14em] mb-4">
            Аренда профессионального оборудования
          </p>
          <h2 className="display text-huge text-ink">
            Что мы даём площадке.
          </h2>
        </motion.div>

        {/* Bento: 2+3 или 2 col на мобиле */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
