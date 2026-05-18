"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// Текст для 3D куба — "ЗВУК ВОКРУГ" многократно
const POEM_HTML = `<p>
  ЗВУК ВОКРУГ · <span>ЗВУК</span> ВОКРУГ · ЗВУК <span>ВОКРУГ</span> · <span>ЗВУК</span> ВОКРУГ ·
  ЗВУК <span>ВОКРУГ</span> · ЗВУК ВОКРУГ · <span>ЗВУК</span> ВОКРУГ · ЗВУК <span>ВОКРУГ</span> ·
  ЗВУК ВОКРУГ · <span>ЗВУК</span> ВОКРУГ · ЗВУК <span>ВОКРУГ</span> · ЗВУК ВОКРУГ ·
</p>`;

const BG_URL = "https://i.ibb.co/q3XSxR9W/20250831-120144.jpg";
const BOY_URL = "https://i.ibb.co/Y4FKvK38/20250831-113022.png";

export function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function adjustSize() {
      if (!contentRef.current) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      // cover: заполняем весь экран, не оставляя чёрных полос
      const scaleW = vw / 1000;
      const scaleH = vh / 562;
      const scale = Math.max(scaleW, scaleH);
      contentRef.current.style.transform = `scale(${scale})`;
      contentRef.current.style.transformOrigin = "center center";
    }
    adjustSize();
    window.addEventListener("resize", adjustSize);
    return () => window.removeEventListener("resize", adjustSize);
  }, []);

  return (
    <section className="hero-section">
      <style>{`
        /* ── Fonts ── */
        @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@900&display=swap');

        /* ── Base layout ── */
        .hero-section {
          position: relative;
          width: 100%;
          height: 100dvh;
          background: #000;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-section > .hero-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }

        .hero-content {
          display: block;
          width: 1000px;
          height: 562px;
          position: relative;
          transform-origin: top center;
        }

        /* ── Full container (holds bg image + cube) ── */
        .container-full {
          position: relative;
          width: 1000px;
          height: 562px;
          overflow: hidden;
        }

        /* ── Background corridor image ── */
        .backgroundImage {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          z-index: 0;
        }

        /* ── Silhouette image ── */
        .boyImage {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          height: 90%;
          width: auto;
          z-index: 30;
          pointer-events: none;
        }

        /* ── Klein blue hue overlay ── */
        .animated.hue {
          position: absolute;
          inset: 0;
          z-index: 5;
          background: rgba(28, 69, 214, 0.28);
          mix-blend-mode: color;
          animation: hue-cycle 8s linear infinite;
          pointer-events: none;
        }
        @keyframes hue-cycle {
          0%   { filter: hue-rotate(0deg)   saturate(1.2); }
          50%  { filter: hue-rotate(20deg)  saturate(1.5); }
          100% { filter: hue-rotate(0deg)   saturate(1.2); }
        }

        /* ── 3D cube scene ── */
        .cube-scene {
          position: absolute;
          inset: 0;
          perspective: 450px;
          perspective-origin: 50% 48%;
          z-index: 10;
        }

        .cube-scene-reflect {
          position: absolute;
          inset: 0;
          perspective: 450px;
          perspective-origin: 50% 48%;
          z-index: 8;
          transform: scaleY(-1) translateY(-10px);
          opacity: 0.25;
          pointer-events: none;
        }

        .cube {
          position: relative;
          width: 1000px;
          height: 562px;
          margin: auto;
          transform-style: preserve-3d;
        }

        /* ── Cube faces ── */
        .face {
          position: absolute;
          overflow: hidden;
        }

        /* Top face — ceiling */
        .face.top {
          width: 1000px;
          height: 600px;
          top: 0;
          left: 0;
          transform-origin: top center;
          transform: rotateX(-90deg);
          background: rgba(0,0,0,0.5);
        }

        /* Bottom face — floor */
        .face.bottom {
          width: 1000px;
          height: 600px;
          bottom: 0;
          left: 0;
          transform-origin: bottom center;
          transform: rotateX(90deg);
          background: rgba(0,0,0,0.5);
        }

        /* Front face — transparent (where we look through) */
        .face.front {
          width: 1000px;
          height: 562px;
          top: 0;
          left: 0;
          transform: translateZ(0);
          background: transparent;
        }

        /* Left wall */
        .face.left {
          width: 600px;
          height: 562px;
          top: 0;
          left: 0;
          transform-origin: left center;
          transform: rotateY(90deg);
          background: rgba(0,5,30,0.55);
        }

        /* Right wall */
        .face.right {
          width: 600px;
          height: 562px;
          top: 0;
          right: 0;
          transform-origin: right center;
          transform: rotateY(-90deg);
          background: rgba(0,5,30,0.55);
        }

        /* Back wall */
        .face.back {
          width: 1000px;
          height: 562px;
          top: 0;
          left: 0;
          transform: translateZ(-600px) rotateY(180deg);
          background: rgba(0,5,30,0.7);
        }

        /* ── Scrolling text on faces ── */
        .face.text p {
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          white-space: nowrap;
          margin: 0;
          padding: 0;
          font-family: 'Inter Tight', 'Inter', sans-serif;
          font-weight: 900;
          font-size: 62px;
          letter-spacing: -0.02em;
          color: rgba(255,255,255,0.92);
          text-transform: uppercase;
          animation: scroll-left 18s linear infinite;
          width: max-content;
        }
        .face.right.text p {
          animation: scroll-right 22s linear infinite;
        }
        .face.back.text p {
          font-size: 36px;
          animation: scroll-left 28s linear infinite;
        }

        .face.text p span {
          color: #1C45D6;
          -webkit-text-stroke: 1px rgba(28,69,214,0.5);
        }

        @keyframes scroll-left {
          from { transform: translateX(0) translateY(-50%); }
          to   { transform: translateX(-55%) translateY(-50%); }
        }
        @keyframes scroll-right {
          from { transform: translateX(-55%) translateY(-50%); }
          to   { transform: translateX(0)   translateY(-50%); }
        }

        @media (prefers-reduced-motion: reduce) {
          .face.text p,
          .face.right.text p,
          .face.back.text p { animation: none; }
          .animated.hue      { animation: none; }
        }
      `}</style>

      {/* SEO */}
      <h1 className="sr-only">30 лет звука для Юга России. Аренда звукового, светового и сценического оборудования.</h1>

      <div className="hero-container">
        <div ref={contentRef} className="hero-content">
          <div className="container-full">

            {/* Background corridor */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="backgroundImage" src={BG_URL} alt="" aria-hidden />

            {/* Klein blue hue overlay */}
            <div className="animated hue" />

            {/* 3D cube — main */}
            <div className="cube-scene">
              <div className="cube">
                <div className="face top" />
                <div className="face bottom" />
                <div className="face front" />
                <div
                  className="face left text"
                  dangerouslySetInnerHTML={{ __html: POEM_HTML }}
                />
                <div
                  className="face right text"
                  dangerouslySetInnerHTML={{ __html: POEM_HTML }}
                />
                <div
                  className="face back text"
                  dangerouslySetInnerHTML={{ __html: POEM_HTML }}
                />
              </div>
            </div>

            {/* Reflection */}
            <div className="cube-scene-reflect">
              <div className="cube">
                <div className="face top" />
                <div className="face bottom" />
                <div className="face front" />
                <div
                  className="face left text"
                  dangerouslySetInnerHTML={{ __html: POEM_HTML }}
                />
                <div
                  className="face right text"
                  dangerouslySetInnerHTML={{ __html: POEM_HTML }}
                />
                <div
                  className="face back text"
                  dangerouslySetInnerHTML={{ __html: POEM_HTML }}
                />
              </div>
            </div>

            {/* People silhouette */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="boyImage" src={BOY_URL} alt="" aria-hidden />
          </div>
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="absolute bottom-6 left-6 md:bottom-10 md:left-12 z-50 flex gap-3"
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
        className="absolute bottom-6 right-6 md:bottom-10 md:right-12 z-50 text-right"
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
