import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cine: {
          950: "#06080d",
          900: "#0b0f17",
          850: "#101622",
          800: "#161f30",
          700: "#222f47",
          600: "#334566",
          accent: {
            purple: "#8b5cf6",
            glow: "#a855f7",
            cyan: "#06b6d4",
            blue: "#38bdf8",
            gold: "#f59e0b",
            crimson: "#f43f5e",
            emerald: "#10b981"
          }
        }
      },
      fontFamily: {
        arabic: ["Cairo", "Tajawal", "Segoe UI", "sans-serif"],
        mono: ["JetBrains Mono", "Courier New", "monospace"]
      },
      boxShadow: {
        "glow-purple": "0 0 25px -5px rgba(139, 92, 246, 0.4)",
        "glow-cyan": "0 0 25px -5px rgba(6, 182, 212, 0.4)",
        "glow-crimson": "0 0 20px -5px rgba(244, 63, 94, 0.4)",
      },
      animation: {
        "pulse-subtle": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "film-grain": "grain 8s steps(10) infinite",
      }
    },
  },
  plugins: [],
};
export default config;
