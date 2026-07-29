import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand ramp anchored on target-schools (#184c5e) at 900
        brand: {
          50:  "#eff8fb",
          100: "#dbeff6",
          200: "#b6dfec",
          300: "#86c9e0",
          400: "#4dafd2",
          500: "#2e91b3",
          600: "#257793",
          700: "#1f637a",
          800: "#1b566a",
          900: "#184c5e",
          950: "#10323e",
        },
        // Accent ramp anchored on target-smes (#15a1e4) at 600
        accent: {
          50:  "#ebf7fd",
          100: "#cbebfa",
          200: "#9cd9f6",
          300: "#64c3f1",
          400: "#35b1ec",
          500: "#23aaeb",
          600: "#15a1e4",
          700: "#1287bf",
          800: "#0f709e",
          900: "#0c5c82",
        },
        // Target-group color coding: Schools, SMEs, Bridging the Two Worlds, General
        target: {
          schools: "#184c5e",
          smes:    "#15a1e4",
          bridge:  "#5e7d89",
          general: "#acd1de",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "card-hover": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      },
    },
  },
  plugins: [forms, typography],
};

export default config;
