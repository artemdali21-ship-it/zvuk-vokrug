"use client";

import { motion } from "framer-motion";

interface RadialGlowOrbProps {
  size?: string;
  className?: string;
}

export function RadialGlowOrb({ size = "52vw", className = "" }: RadialGlowOrbProps) {
  return (
    <motion.div
      aria-hidden
      animate={{ scale: [1, 1.04, 1] }}
      transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
      className={className}
      style={{
        width: size,
        height: size,
        maxWidth: 760,
        maxHeight: 760,
        borderRadius: "9999px",
        background: `radial-gradient(
          circle at 50% 50%,
          #346BFF 0%,
          #2155FF 20%,
          rgba(33, 85, 255, 0.6) 45%,
          rgba(33, 85, 255, 0.15) 70%,
          transparent 100%
        )`,
        filter: "blur(2px)",
        mixBlendMode: "screen",
        flexShrink: 0,
      }}
    />
  );
}
