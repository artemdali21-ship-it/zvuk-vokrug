"use client";

import React, { useEffect, useRef, useState } from "react";

/* ========= GLSL: Phosphor 30 Klein-adapted ========= */
const SHADER_SRC = `#version 300 es
precision highp float;
out vec4 fragColor;
in vec2 v_uv;
uniform vec3  iResolution;
uniform float iTime;
uniform int   iFrame;
uniform vec4  iMouse;
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2  r  = iResolution.xy;
    float t  = iTime * 0.4;
    vec3  FC = vec3(fragCoord, t);
    vec4  o  = vec4(0.0);
    float s  = 0.0;
    for (float i = 0.0, z = 0.0, d = 0.0;
         i++ < 8e1;
         o += (cos(s + vec4(4.0, 3.5, 2.5, 0.0)) + 1.0) / d) {
        vec3 p = z * normalize(FC.rgb * 2.0 - r.xyy);
        vec3 a = normalize(cos(vec3(5.0, 0.0, 1.0) + t - d * 4.0));
        p.z += 5.0;
        a = a * dot(a, p) - cross(a, p);
        for (d = 1.0; d++ < 9.0; )
            a -= sin(a * d + t).zxy / d;
        z += d = 0.1 * abs(length(p) - 3.0) + 0.07 * abs(cos(s = a.y));
    }
    o = tanh(o / 5e3);
    vec3  klein = vec3(0.11, 0.27, 0.84);
    float alpha = clamp(length(o.rgb) * 1.6, 0.0, 0.95);
    fragColor   = vec4(klein * alpha, alpha);
}
void main(){
  mainImage(fragColor, gl_FragCoord.xy);
}
`;

const VERT_SRC = `#version 300 es
precision highp float;
layout(location=0) in vec2 a_pos;
out vec2 v_uv;
void main(){
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

function safeCompile(
  gl: WebGL2RenderingContext,
  type: number,
  src: string
) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  const ok = gl.getShaderParameter(sh, gl.COMPILE_STATUS);
  return { shader: ok ? sh : null };
}

function safeLink(
  gl: WebGL2RenderingContext,
  vs: WebGLShader,
  fs: WebGLShader
) {
  const prog = gl.createProgram()!;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  const ok = gl.getProgramParameter(prog, gl.LINK_STATUS);
  return { program: ok ? prog : null };
}

function ShaderCanvas({ pixelRatio }: { pixelRatio?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef(0);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const gl = canvas.getContext("webgl2", {
      premultipliedAlpha: true,
      alpha: true,
      antialias: false,
      preserveDrawingBuffer: false,
    });
    if (!gl) return;

    let disposed = false;
    let vao: WebGLVertexArrayObject | null = null;
    let vbo: WebGLBuffer | null = null;
    let program: WebGLProgram | null = null;
    let ro: ResizeObserver | null = null;
    let resizeScheduled = false;

    const getDpr = () =>
      Math.max(1, Math.min(2, pixelRatio ?? window.devicePixelRatio ?? 1));

    function applySize() {
      resizeScheduled = false;
      if (disposed || !gl) return;
      const dpr = getDpr();
      const cssW = Math.max(1, canvas.clientWidth | 0);
      const cssH = Math.max(1, canvas.clientHeight | 0);
      const w = Math.max(1, Math.floor(cssW * dpr));
      const h = Math.max(1, Math.floor(cssH * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    }

    function scheduleSize() {
      if (resizeScheduled) return;
      resizeScheduled = true;
      requestAnimationFrame(applySize);
    }

    vao = gl.createVertexArray();
    vbo = gl.createBuffer();
    if (!vao || !vbo) return cleanup;

    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const vs = safeCompile(gl, gl.VERTEX_SHADER, VERT_SRC);
    if (!vs.shader) return cleanup;
    const fs = safeCompile(gl, gl.FRAGMENT_SHADER, SHADER_SRC);
    if (!fs.shader) {
      gl.deleteShader(vs.shader);
      return cleanup;
    }

    const linked = safeLink(gl, vs.shader, fs.shader);
    gl.deleteShader(vs.shader);
    gl.deleteShader(fs.shader);
    if (!linked.program) return cleanup;

    program = linked.program;
    const uResolution = gl.getUniformLocation(program, "iResolution");
    const uTime = gl.getUniformLocation(program, "iTime");
    const uFrame = gl.getUniformLocation(program, "iFrame");

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    ro = new ResizeObserver(scheduleSize);
    ro.observe(canvas);
    scheduleSize();

    startRef.current = performance.now();
    frameRef.current = 0;

    function tick(now: number) {
      if (disposed) return;
      if (gl!.isContextLost()) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const t = (now - startRef.current) / 1000;
      frameRef.current += 1;

      try {
        if (resizeScheduled) applySize();
        gl!.useProgram(program);
        gl!.clearColor(0, 0, 0, 0);
        gl!.clear(gl!.COLOR_BUFFER_BIT);
        if (uResolution)
          gl!.uniform3f(uResolution, canvas.width, canvas.height, getDpr());
        if (uTime) gl!.uniform1f(uTime, t);
        if (uFrame) gl!.uniform1i(uFrame, frameRef.current);
        gl!.bindVertexArray(vao);
        gl!.drawArrays(gl!.TRIANGLES, 0, 3);
      } catch {}

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);

    function cleanup() {
      disposed = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      ro?.disconnect();
      if (gl) {
        if (vbo) gl.deleteBuffer(vbo);
        if (vao) gl.deleteVertexArray(vao);
        if (program) gl.deleteProgram(program);
      }
    }

    return cleanup;
  }, [pixelRatio]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        mixBlendMode: "multiply",
      }}
    />
  );
}

function KleinSphereFallback() {
  return (
    <div
      aria-hidden
      style={{
        width: "38vw",
        height: "38vw",
        maxWidth: 560,
        maxHeight: 560,
        borderRadius: "9999px",
        background:
          "radial-gradient(circle at 30% 30%, #4068E8 0%, #1C45D6 45%, #0F2A9A 100%)",
        boxShadow:
          "inset -40px -40px 80px rgba(0,0,0,0.25), 0 60px 120px -20px rgba(28,69,214,0.4)",
        filter: "blur(0.5px)",
        mixBlendMode: "multiply",
      }}
    />
  );
}

export function SoundObject() {
  const [mode, setMode] = useState<"shader" | "fallback" | null>(null);

  useEffect(() => {
    const prm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const probe = document.createElement("canvas").getContext("webgl2");
    setMode(prm || !probe ? "fallback" : "shader");
  }, []);

  if (mode === null) return null;

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
      {mode === "shader" ? (
        <div style={{ width: "70vw", height: "70vh", position: "relative" }}>
          <ShaderCanvas />
        </div>
      ) : (
        <KleinSphereFallback />
      )}
    </div>
  );
}
