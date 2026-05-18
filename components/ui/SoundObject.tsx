"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import type { ExtendedFeature, GeoGeometryObjects } from "d3";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GeoFeature = ExtendedFeature<GeoGeometryObjects, any>;

export function SoundObject() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const SIZE = 420;
    const radius = SIZE / 2 - 10;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    canvas.style.width = `${SIZE}px`;
    canvas.style.height = `${SIZE}px`;
    context.scale(dpr, dpr);

    const cx = SIZE / 2;
    const cy = SIZE / 2;

    // Klein blue palette
    const KLEIN_DARK = "#1301E9";
    const LAND_DOT = "rgba(255,255,255,0.55)";
    const GRID = "rgba(255,255,255,0.18)";
    const BORDER = "rgba(28,69,214,0.25)";

    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([cx, cy])
      .clipAngle(90);

    const path = d3.geoPath().projection(projection).context(context);

    // --- helpers ---
    const pointInPolygon = (point: [number, number], polygon: number[][]): boolean => {
      const [x, y] = point;
      let inside = false;
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i];
        const [xj, yj] = polygon[j];
        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside;
        }
      }
      return inside;
    };

    const pointInFeature = (point: [number, number], feature: GeoFeature): boolean => {
      const geo = feature.geometry;
      if (!geo) return false;
      // Cast coordinates to loose type for manual traversal
      const coords = (geo as { type: string; coordinates: number[][][][] }).coordinates;
      if (geo.type === "Polygon") {
        const rings = coords as unknown as number[][][];
        if (!pointInPolygon(point, rings[0])) return false;
        for (let i = 1; i < rings.length; i++) {
          if (pointInPolygon(point, rings[i])) return false;
        }
        return true;
      } else if (geo.type === "MultiPolygon") {
        const polys = coords as unknown as number[][][][];
        for (const poly of polys) {
          if (pointInPolygon(point, poly[0])) {
            let inHole = false;
            for (let i = 1; i < poly.length; i++) {
              if (pointInPolygon(point, poly[i])) { inHole = true; break; }
            }
            if (!inHole) return true;
          }
        }
      }
      return false;
    };

    const generateDots = (feature: GeoFeature): [number, number][] => {
      const dots: [number, number][] = [];
      const [[minLng, minLat], [maxLng, maxLat]] = d3.geoBounds(feature as d3.ExtendedFeature);
      const step = 6 * 0.08;
      for (let lng = minLng; lng <= maxLng; lng += step) {
        for (let lat = minLat; lat <= maxLat; lat += step) {
          const pt: [number, number] = [lng, lat];
          if (pointInFeature(pt, feature)) dots.push(pt);
        }
      }
      return dots;
    };

    const allDots: [number, number][] = [];
    let landFeatures: { features: GeoFeature[] } | null = null;

    const render = () => {
      context.clearRect(0, 0, SIZE, SIZE);

      // Globe sphere — Klein blue gradient
      const grad = context.createRadialGradient(cx - radius * 0.25, cy - radius * 0.2, radius * 0.05, cx, cy, radius);
      grad.addColorStop(0, "#2d56e8");
      grad.addColorStop(1, KLEIN_DARK);

      context.beginPath();
      context.arc(cx, cy, radius, 0, 2 * Math.PI);
      context.fillStyle = grad;
      context.fill();

      // Subtle outer ring
      context.strokeStyle = BORDER;
      context.lineWidth = 1.5;
      context.stroke();

      if (landFeatures) {
        // Graticule grid
        const graticule = d3.geoGraticule()();
        context.beginPath();
        path(graticule);
        context.strokeStyle = GRID;
        context.lineWidth = 0.7;
        context.stroke();

        // Land outlines
        context.beginPath();
        landFeatures.features.forEach((f: GeoFeature) => path(f));
        context.strokeStyle = "rgba(255,255,255,0.30)";
        context.lineWidth = 0.8;
        context.stroke();

        // Halftone dots on land
        allDots.forEach(([lng, lat]) => {
          const pt = projection([lng, lat]);
          if (pt && pt[0] >= 0 && pt[0] <= SIZE && pt[1] >= 0 && pt[1] <= SIZE) {
            context.beginPath();
            context.arc(pt[0], pt[1], 1.15, 0, 2 * Math.PI);
            context.fillStyle = LAND_DOT;
            context.fill();
          }
        });
      }
    };

    const load = async () => {
      try {
        const res = await fetch(
          "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json"
        );
        landFeatures = await res.json();
        landFeatures!.features.forEach((f: GeoFeature) => {
          generateDots(f).forEach((d) => allDots.push(d));
        });
        setLoaded(true);
        render();
      } catch {
        // fallback: just show the sphere without land
        setLoaded(true);
        render();
      }
    };

    const rotation: [number, number] = [0, -20];
    let autoRotate = true;

    const timer = d3.timer(() => {
      if (autoRotate) {
        rotation[0] += 0.3;
        projection.rotate(rotation);
        render();
      }
    });

    // Drag to rotate
    const onMouseDown = (e: MouseEvent) => {
      autoRotate = false;
      const sx = e.clientX, sy = e.clientY;
      const sr: [number, number] = [rotation[0], rotation[1]];
      const onMove = (me: MouseEvent) => {
        rotation[0] = sr[0] + (me.clientX - sx) * 0.4;
        rotation[1] = Math.max(-90, Math.min(90, sr[1] - (me.clientY - sy) * 0.4));
        projection.rotate(rotation);
        render();
      };
      const onUp = () => {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
        setTimeout(() => { autoRotate = true; }, 50);
      };
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    };

    canvas.addEventListener("mousedown", onMouseDown);
    load();

    return () => {
      timer.stop();
      canvas.removeEventListener("mousedown", onMouseDown);
    };
  }, []);

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
        zIndex: 20,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          pointerEvents: "auto",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.8s ease",
          borderRadius: "50%",
          boxShadow: "0 0 60px rgba(28,69,214,0.18), 0 0 120px rgba(28,69,214,0.08)",
        }}
      />
    </div>
  );
}
