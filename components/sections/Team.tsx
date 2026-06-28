"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";

export function Team() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const photoInView = useInView(photoRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Photo moves up slower than the scroll — classic parallax depth
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pt-10 pb-24 md:pt-12 md:pb-48 lg:pb-56"
      style={{ background: "#020617" }}
    >
      <NoiseOverlay />

      {/* Parallax photo frame — fixed height container, photo scrolls slower */}
      <motion.div
        ref={photoRef}
        initial={{ opacity: 0 }}
        animate={photoInView ? { opacity: 1 } : {}}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full overflow-hidden"
        style={{ height: "clamp(360px, 60vw, 780px)" }}
      >
        {/* Photo layer — moves at parallax speed */}
        <motion.div
          style={{ y: photoY }}
          className="absolute inset-0 scale-[1.22] will-change-transform"
        >
          <Image
            src="/team/team-new-3.png"
            alt="Команда Звук Вокруг"
            fill
            sizes="100vw"
            quality={90}
            className="object-cover object-top"
          />
        </motion.div>

        {/* Overlay gradients — at normal scroll speed (stay fixed relative to frame) */}
        <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: "inset 0 0 200px rgba(107,78,255,0.22)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(2,6,23,0.06) 0%, rgba(2,6,23,0.80) 100%)" }} />
        <div className="absolute inset-x-0 bottom-0" style={{ height: 120, background: "linear-gradient(to top, #020617, transparent)" }} />
      </motion.div>

    </section>
  );
}
