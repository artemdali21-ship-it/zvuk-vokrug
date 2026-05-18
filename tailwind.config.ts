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
        paper: "#F4F4F4",
        paper2: "#EFEFEF",
        ink: "#0A0A0A",
        ink2: "#434245",
        klein: "#1C45D6",
        "klein-deep": "#1301E9",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-inter-tight)", "system-ui", "sans-serif"],
      },
      fontSize: {
        mega: [
          "clamp(3.5rem, 10vw, 9rem)",
          { lineHeight: "0.9", letterSpacing: "-0.03em" },
        ],
        huge: [
          "clamp(2.5rem, 6vw, 5rem)",
          { lineHeight: "0.95", letterSpacing: "-0.025em" },
        ],
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "marquee-reverse": "marquee-reverse 50s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
