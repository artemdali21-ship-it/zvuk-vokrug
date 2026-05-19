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

function ServiceRow({
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
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8 py-6 md:py-8 border-t border-ink/10 cursor-default"
    >
      {/* Left: icon + title */}
      <div className="flex items-baseline gap-4">
        <Icon className="w-4 h-4 text-ink2 group-hover:text-klein transition-colors duration-300 shrink-0 mt-1 self-start translate-y-[2px]" />
        <h3 className="display text-huge text-ink group-hover:text-klein transition-colors duration-300 relative">
          {service.title}
          <span className="absolute bottom-0 left-0 h-[2px] bg-klein w-0 group-hover:w-full transition-all duration-400 origin-left" />
        </h3>
      </div>

      {/* Right: description */}
      <p className="text-ink2 text-sm md:text-base leading-relaxed md:self-center md:pt-0 pl-8 md:pl-0">
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
          className="mb-4 md:mb-6"
        >
          <p className="text-xs text-ink2 uppercase tracking-[0.14em] mb-4">
            Аренда и прокат профессионального оборудования
          </p>
          <h2 className="display text-huge text-ink mb-4">
            Звук. Свет. Сцена. Экраны.
          </h2>
          <p className="text-ink2 text-lg max-w-2xl">
            Мы создаём технические решения для событий любого масштаба — от камерных концертов до городских праздников с десятками тысяч зрителей.
          </p>
        </motion.div>

        <div>
          {services.map((s, i) => (
            <ServiceRow key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
