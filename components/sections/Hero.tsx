"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const REPEAT = 10;
const LINE = Array(REPEAT).fill("ЗВУК ВОКРУГ").join(" · ") + " · ";

export function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function scale() {
      if (!contentRef.current) return;
      const vw = window.innerWidth;
      const base = 1000;
      const s = vw < base ? (vw / base) * 0.95 : 1;
      contentRef.current.style.transform = `scale(${s})`;
      contentRef.current.style.transformOrigin = "top center";
    }
    scale();
    window.addEventListener("resize", scale);
    return () => window.removeEventListener("resize", scale);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#060608]" style={{ height: "100dvh" }}>
      <h1 className="sr-only">30 лет звука для Юга России. Аренда звукового, светового и сценического оборудования.</h1>

      <style>{`
        /* ── 3D Room ── */
        .zv-scene {
          perspective: 550px;
          perspective-origin: 50% 42%;
          position: absolute;
          inset: 0;
        }
        .zv-cube-wrap {
          transform-style: preserve-3d;
          position: absolute;
          inset: 0;
        }

        /* Ceiling */
        .zv-ceil {
          position: absolute;
          left: 0; right: 0; top: 0;
          height: 56%;
          transform-origin: top center;
          transform: rotateX(-72deg);
          background: linear-gradient(180deg, #08080f 0%, #0d0d1a 100%);
          overflow: hidden;
        }
        /* LED strips on ceiling */
        .zv-ceil::before {
          content: '';
          position: absolute;
          left: 8%; right: 8%; top: 22%;
          height: 1.5px;
          background: #1C45D6;
          box-shadow: 0 0 8px 2px rgba(28,69,214,0.7), 0 0 30px 6px rgba(28,69,214,0.3);
        }
        .zv-ceil::after {
          content: '';
          position: absolute;
          left: 18%; right: 18%; top: 52%;
          height: 1px;
          background: #1C45D6;
          box-shadow: 0 0 8px 2px rgba(28,69,214,0.5), 0 0 24px 4px rgba(28,69,214,0.2);
        }

        /* Floor */
        .zv-floor {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          height: 56%;
          transform-origin: bottom center;
          transform: rotateX(72deg);
          background: linear-gradient(0deg, #08080f 0%, #0d0d14 100%);
        }

        /* Left wall */
        .zv-left {
          position: absolute;
          top: 0; bottom: 0;
          left: 0;
          width: 100%;
          transform-origin: left center;
          transform: rotateY(52deg);
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        /* Right wall */
        .zv-right {
          position: absolute;
          top: 0; bottom: 0;
          right: 0;
          width: 100%;
          transform-origin: right center;
          transform: rotateY(-52deg);
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        /* Back wall */
        .zv-back {
          position: absolute;
          top: 0; bottom: 0; left: 0; right: 0;
          transform: translateZ(-560px);
          display: flex;
          align-items: center;
          overflow: hidden;
          background: rgba(8,8,20,0.6);
        }

        /* Marquee tracks */
        .zv-track {
          white-space: nowrap;
          overflow: hidden;
          width: 100%;
          flex-shrink: 0;
        }
        .zv-inner {
          display: inline-flex;
          animation: zv-run 22s linear infinite;
        }
        .zv-inner-rev {
          display: inline-flex;
          animation: zv-run-rev 28s linear infinite;
        }
        .zv-inner-slow {
          display: inline-flex;
          animation: zv-run 36s linear infinite;
        }
        @keyframes zv-run {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes zv-run-rev {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }

        /* Text shimmer */
        .zv-txt {
          font-family: var(--font-inter-tight, 'Inter Tight', sans-serif);
          font-weight: 900;
          letter-spacing: -0.025em;
          background: linear-gradient(90deg,
            #ffffff 0%,
            #c5d4ff 30%,
            #1C45D6 50%,
            #c5d4ff 70%,
            #ffffff 100%
          );
          background-size: 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: zv-shimmer 5s linear infinite;
        }
        @keyframes zv-shimmer {
          from { background-position: 200% center; }
          to   { background-position: -200% center; }
        }

        /* Ambient Klein glow */
        .zv-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 70% 50% at 50% 40%,
            rgba(28,69,214,0.14) 0%,
            transparent 70%
          );
          pointer-events: none;
        }

        /* Reflection — faded mirror below */
        .zv-reflect {
          position: absolute;
          inset: 0;
          opacity: 0.18;
          transform: scaleY(-1);
          pointer-events: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .zv-inner, .zv-inner-rev, .zv-inner-slow { animation: none; }
          .zv-txt { animation: none; background-position: 0% center; }
        }
      `}</style>

      {/* ── 3D scene ── */}
      <div className="zv-scene">
        <div className="zv-cube-wrap">
          <div className="zv-ceil" />
          <div className="zv-floor" />

          {/* Left wall */}
          <div className="zv-left">
            <div className="zv-track">
              <div className="zv-inner">
                <span className="zv-txt" style={{ fontSize: 80 }}>{LINE}&nbsp;&nbsp;</span>
                <span className="zv-txt" style={{ fontSize: 80 }}>{LINE}&nbsp;&nbsp;</span>
              </div>
            </div>
          </div>

          {/* Right wall */}
          <div className="zv-right">
            <div className="zv-track">
              <div className="zv-inner-rev">
                <span className="zv-txt" style={{ fontSize: 80 }}>{LINE}&nbsp;&nbsp;</span>
                <span className="zv-txt" style={{ fontSize: 80 }}>{LINE}&nbsp;&nbsp;</span>
              </div>
            </div>
          </div>

          {/* Back wall */}
          <div className="zv-back">
            <div className="zv-track">
              <div className="zv-inner-slow">
                <span className="zv-txt" style={{ fontSize: 40 }}>{LINE}&nbsp;&nbsp;</span>
                <span className="zv-txt" style={{ fontSize: 40 }}>{LINE}&nbsp;&nbsp;</span>
              </div>
            </div>
          </div>

          {/* Ambient glow */}
          <div className="zv-glow" />
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="absolute bottom-6 left-6 md:bottom-10 md:left-12 z-40 flex gap-3"
      >
        <a
          href="tel:+79033710400"
          className="px-5 py-3 bg-klein text-paper text-sm font-medium hover:bg-klein-deep transition-colors"
        >
          Позвонить Фёдору
        </a>
        <Link
          href="/projects"
          className="px-5 py-3 border border-paper/30 text-paper text-sm font-medium hover:border-paper/60 hover:bg-paper/5 transition-colors"
        >
          Проекты
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="absolute bottom-6 right-6 md:bottom-10 md:right-12 z-40 text-right"
      >
        <p className="display text-xs md:text-sm font-bold uppercase tracking-[0.14em] text-paper mb-1">
          30 лет звука для Юга России
        </p>
        <p className="text-paper/40 text-xs">
          9000+ мероприятий · Волгоград · Элиста · Астрахань · Саратов · с 1994
        </p>
      </motion.div>
    </section>
  );
}
