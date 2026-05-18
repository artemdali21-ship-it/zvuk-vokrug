"use client";

import React from "react";

/* ========= CSS Acoustic Wave Disk — Klein Blue ========= */

const RINGS = [
  { r: 15, opacity: 1.0, delay: "0s" },
  { r: 28, opacity: 0.7, delay: "0.18s" },
  { r: 40, opacity: 0.4, delay: "0.36s" },
  { r: 52, opacity: 0.25, delay: "0.54s" },
  { r: 63, opacity: 0.15, delay: "0.72s" },
  { r: 74, opacity: 0.08, delay: "0.90s" },
];

export function SoundObject() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <style>{`
        @keyframes sv-pulse {
          0%, 100% { transform: scale(1); opacity: var(--base-op); }
          50% { transform: scale(1.045); opacity: calc(var(--base-op) * 0.7); }
        }
        .sv-ring {
          animation: sv-pulse 3.6s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .sv-ring { animation: none; }
        }
      `}</style>

      <div
        style={{
          width: "clamp(320px, 60vw, 700px)",
          height: "clamp(320px, 60vw, 700px)",
          position: "relative",
          mixBlendMode: "multiply",
        }}
      >
        <svg
          viewBox="0 0 160 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "100%", overflow: "visible" }}
        >
          {RINGS.map((ring, i) => (
            <circle
              key={i}
              cx="80"
              cy="80"
              r={ring.r}
              stroke="#1C45D6"
              strokeWidth={i === 0 ? 2.5 : 1.2}
              fill={i === 0 ? "#1C45D6" : "none"}
              fillOpacity={i === 0 ? ring.opacity : 0}
              strokeOpacity={ring.opacity}
              className="sv-ring"
              style={
                {
                  "--base-op": ring.opacity,
                  animationDelay: ring.delay,
                  transformOrigin: "80px 80px",
                } as React.CSSProperties
              }
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
