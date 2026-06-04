"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { artists } from "@/data/artists";
import { clients } from "@/data/clients";

function MarqueeTrack({
  items,
  direction = "left",
  speed = "70s",
  colorClass = "text-white",
  sizeClass = "text-2xl md:text-4xl",
}: {
  items: string[];
  direction?: "left" | "right";
  speed?: string;
  colorClass?: string;
  sizeClass?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const doubled = [...items, ...items];
  const cls = prefersReducedMotion
    ? ""
    : direction === "left"
    ? "animate-marquee"
    : "animate-marquee-reverse";

  return (
    <div className="overflow-hidden py-1 select-none" aria-hidden>
      <div className={`flex whitespace-nowrap w-max ${cls}`}>
        {doubled.map((item, i) => (
          <span
            key={i}
            className={`font-display font-black ${sizeClass} ${colorClass} shrink-0 mx-4 md:mx-6`}
          >
            {item}
            <span className="mx-4 md:mx-6 opacity-20">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function MarqueeArtists() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden py-20 md:py-28"
      style={{
        background: "#020617",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="marquee-fade mb-3">
        <MarqueeTrack
          items={artists}
          direction="left"
          speed="70s"
          colorClass="text-white"
          sizeClass="text-xl md:text-3xl"
        />
      </div>
      <div className="marquee-fade">
        <MarqueeTrack
          items={clients}
          direction="right"
          speed="50s"
          colorClass="text-white/50"
          sizeClass="text-lg md:text-2xl"
        />
      </div>
    </motion.section>
  );
}
