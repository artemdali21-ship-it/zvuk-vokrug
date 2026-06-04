import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        "bg-main":      "#020617",
        "bg-deep":      "#030817",
        "bg-navy":      "#071133",
        "bg-blue-deep": "#0A1B63",
        // Primary blue
        "blue-primary":   "#2155FF",
        "blue-electric":  "#346BFF",
        "blue-soft":      "#7EA4FF",
        // Violet — ONLY Team section
        "violet-team":  "#6B4EFF",
        // Text
        "text-main":    "#FFFFFF",
        "text-muted":   "rgba(255,255,255,0.68)",
        "text-soft":    "rgba(255,255,255,0.42)",
      },
      fontFamily: {
        sans:    ["var(--font-inter)",       "system-ui", "sans-serif"],
        display: ["var(--font-inter-tight)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // H1 / Hero wordmark
        hero: [
          "clamp(72px, 14vw, 220px)",
          { lineHeight: "0.86", letterSpacing: "-0.065em" },
        ],
        // H2 / Section title
        section: [
          "clamp(48px, 7vw, 104px)",
          { lineHeight: "0.92", letterSpacing: "-0.055em" },
        ],
        // H3
        h3: [
          "clamp(32px, 4vw, 56px)",
          { lineHeight: "1", letterSpacing: "-0.04em" },
        ],
        // Metrics
        metrics: [
          "clamp(120px, 22vw, 320px)",
          { lineHeight: "0.8", letterSpacing: "-0.08em" },
        ],
      },
      animation: {
        marquee:         "marquee 70s linear infinite",
        "marquee-slow":  "marquee 50s linear infinite",
        "marquee-rev":   "marquee-reverse 50s linear infinite",
        "orb-breathe":   "orb-breathe 8s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%":   { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        "orb-breathe": {
          "0%, 100%": { transform: "scale(1)" },
          "50%":      { transform: "scale(1.04)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
