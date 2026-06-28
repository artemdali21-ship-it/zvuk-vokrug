"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";

// ─── Blue AetherHero shader ───────────────────────────────────────────────────
const VERT = `#version 300 es
precision highp float;
in vec2 position;
void main(){ gl_Position = vec4(position, 0.0, 1.0); }`;

const FRAG = `#version 300 es
precision highp float;
out vec4 O;
uniform float time;
uniform vec2 resolution;
#define FC gl_FragCoord.xy
#define R resolution
#define T time
#define MN min(R.x,R.y)

float pattern(vec2 uv) {
  float d=.0;
  for (float i=.0; i<3.; i++) {
    uv.x+=sin(T*(1.+i)+uv.y*1.5)*.2;
    d+=.005/abs(uv.x);
  }
  return d;
}

vec3 scene(vec2 uv) {
  vec3 col=vec3(0);
  uv=vec2(atan(uv.x,uv.y)*2./6.28318,-log(length(uv))+T);
  for (float i=.0; i<3.; i++) {
    int k=int(mod(i,3.));
    col[k]+=pattern(uv+i*6./MN);
  }
  return col;
}

void main() {
  vec2 uv=(FC-.5*R)/MN;
  vec3 col=vec3(0);
  float s=12., e=9e-4;
  col+=e/(sin(uv.x*s)*cos(uv.y*s));
  uv.y+=R.x>R.y?.5:.5*(R.y/R.x);
  col+=scene(uv);
  float br = col.r*0.3 + col.g*0.4 + col.b*0.3;
  col = vec3(
    br*0.07 + col.b*0.10,
    br*0.16 + col.b*0.22,
    br*0.55 + col.b*0.85 + 0.04
  ) * 1.45;
  O=vec4(col,1.);
}`;

// ─── WebGL hook ──────────────────────────────────────────────────────────────
function useShader(canvasRef: React.RefObject<HTMLCanvasElement | null>, active: boolean, dprMax = 2) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2", { alpha: true, antialias: false });
    if (!gl) return;
    const compile = (src: string, type: number) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      return sh;
    };
    const vs = compile(VERT, gl.VERTEX_SHADER);
    const fs = compile(FRAG, gl.FRAGMENT_SHADER);
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
    gl.deleteShader(vs); gl.deleteShader(fs);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,1,-1,-1,1,1,1,-1]), gl.STATIC_DRAW);
    gl.useProgram(prog);
    const posLoc = gl.getAttribLocation(prog, "position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
    const uTime = gl.getUniformLocation(prog, "time");
    const uRes  = gl.getUniformLocation(prog, "resolution");
    gl.clearColor(0.008, 0.024, 0.09, 1);
    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, dprMax);
      const r = canvas.getBoundingClientRect();
      const w = Math.floor(r.width * dpr), h = Math.floor(r.height * dpr);
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(canvas);
    let raf: number;
    const loop = (t: number) => {
      gl.clear(gl.COLOR_BUFFER_BIT); gl.useProgram(prog); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, t * 1e-3);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); gl.deleteBuffer(buf); gl.deleteProgram(prog); };
  }, [active, dprMax]);
}

// ─── Animation variants ───────────────────────────────────────────────────────
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const lineVariant = {
  hidden: { y: "110%", opacity: 0 },
  visible: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: { duration: 0.85, delay: i * 0.12, ease: EASE },
  }),
};

const fadeVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.5 + i * 0.1, ease: EASE },
  }),
};

// ─── Hero ─────────────────────────────────────────────────────────────────────
export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const h = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  useShader(canvasRef, !prefersReducedMotion, isMobile ? 1 : 2);

  return (
    <section
      className="relative min-h-[100dvh] flex flex-col overflow-hidden"
      style={{ background: "#020617" }}
    >
      <h1 className="sr-only">
        Звук Вокруг — аренда звука, света, сцены и LED-экранов. Волгоград, Юг России. С 1994 года.
      </h1>

      {/* Shader */}
      <canvas
        ref={canvasRef}
        aria-hidden
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block", userSelect: "none", touchAction: "none" }}
      />

      {/* Vignette */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2,
        background: "linear-gradient(180deg, rgba(2,6,23,0.65) 0%, rgba(2,6,23,0.0) 35%, rgba(2,6,23,0.75) 100%)",
      }} />

      <NoiseOverlay />

      {/* ─── Main content ─────────────────────────────────────────────── */}
      <div
        className="relative flex flex-col flex-1"
        style={{ zIndex: 10, paddingLeft: "clamp(20px, 5vw, 80px)", paddingRight: "clamp(20px, 5vw, 80px)" }}
      >
        {/* Top spacer (nav height + breathing) */}
        <div style={{ height: "clamp(100px, 16vh, 160px)" }} />

        {/* Headline — ЗВУК / ВОКРУГ with clip reveal */}
        <div aria-hidden className="overflow-hidden mb-1">
          <motion.span
            className="block font-display font-black text-white select-none"
            style={{ fontSize: "clamp(80px, 17vw, 248px)", lineHeight: 0.88, letterSpacing: "-0.065em" }}
            custom={0}
            initial="hidden"
            animate="visible"
            variants={lineVariant}
          >
            ЗВУК
          </motion.span>
        </div>
        <div aria-hidden className="overflow-hidden">
          <motion.span
            className="block font-display font-black text-white select-none"
            style={{ fontSize: "clamp(80px, 17vw, 248px)", lineHeight: 0.88, letterSpacing: "-0.065em" }}
            custom={1}
            initial="hidden"
            animate="visible"
            variants={lineVariant}
          >
            ВОКРУГ
          </motion.span>
        </div>

        {/* Thin divider */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeVariant}
          style={{ height: 1, background: "rgba(255,255,255,0.18)", marginTop: "clamp(20px, 3vh, 36px)", marginBottom: "clamp(20px, 3vh, 36px)", maxWidth: "clamp(240px, 40vw, 560px)" }}
        />

        {/* Subtitle + meta */}
        <motion.p
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeVariant}
          className="text-white/55 mb-1"
          style={{ fontSize: "clamp(14px, 1.4vw, 20px)", lineHeight: 1.5, maxWidth: "44ch" }}
        >
          Комплексное техническое обеспечение мероприятий
        </motion.p>
        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeVariant}
          className="text-white/30 mb-8 md:mb-12"
          style={{ fontSize: "clamp(11px, 0.9vw, 13px)", letterSpacing: "0.12em", textTransform: "uppercase" }}
        >
          Волгоград · с 1994 года
        </motion.p>

        {/* CTA */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeVariant}
          className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5"
        >
          <a
            href="mailto:fmpuzikov@gmail.com?subject=Запрос%20предложения"
            className="btn-primary inline-flex items-center justify-center px-7 py-3.5 rounded-full font-bold text-sm tracking-wide uppercase text-white w-fit"
          >
            Получить предложение
          </a>
          <a
            href="tel:+79033710400"
            className="text-white/55 text-sm hover:text-white transition-colors duration-200 underline-offset-4 hover:underline"
          >
            позвонить Фёдору&nbsp; +7 (903) 371-04-00
          </a>
        </motion.div>

        {/* Flex spacer */}
        <div className="flex-1" />

        {/* Location — full-width display text at bottom */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeVariant}
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: "clamp(16px, 2vh, 24px)",
            paddingBottom: "max(clamp(28px, 4vh, 48px), env(safe-area-inset-bottom, 0px))",
          }}
        >
          <p
            className="font-display font-black text-white/40 select-none"
            style={{ fontSize: "clamp(20px, 4vw, 58px)", letterSpacing: "-0.04em", lineHeight: 0.92 }}
          >
            Волгоград&nbsp;·&nbsp;Элиста&nbsp;·&nbsp;Астрахань&nbsp;·&nbsp;Саратов
          </p>
        </motion.div>
      </div>
    </section>
  );
}
