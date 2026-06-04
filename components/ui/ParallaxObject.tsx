"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface ParallaxObjectProps {
  src: string;
  width?: string;
  aspect?: string;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  parallax?: number;
  blendMode?: React.CSSProperties["mixBlendMode"];
  opacity?: number;
  zIndex?: number;
  sizes?: string;
  float?: boolean;
  imgStyle?: React.CSSProperties;
}

export function ParallaxObject({
  src,
  width = "40vw",
  aspect = "1/1",
  top,
  right,
  bottom,
  left,
  parallax = 0.2,
  blendMode = "screen",
  opacity = 0.7,
  zIndex = 2,
  sizes = "50vw",
  float = false,
  imgStyle,
}: ParallaxObjectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const strength = parallax * 100;
  const y = useTransform(scrollYProgress, [0, 1], [`${strength / 2}%`, `-${strength / 2}%`]);

  return (
    <motion.div
      ref={ref}
      aria-hidden
      style={{
        position: "absolute",
        pointerEvents: "none",
        zIndex,
        width,
        aspectRatio: aspect,
        top,
        right,
        bottom,
        left,
        y,
        willChange: "transform",
      }}
    >
      <motion.div
        style={{ width: "100%", height: "100%", mixBlendMode: blendMode, opacity }}
        animate={float ? { y: ["0%", "-2.5%", "0%"] } : undefined}
        transition={float ? { duration: 9, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" } : undefined}
      >
        <Image
          src={src}
          fill
          alt=""
          style={{ objectFit: "contain", ...imgStyle }}
          sizes={sizes}
        />
      </motion.div>
    </motion.div>
  );
}
