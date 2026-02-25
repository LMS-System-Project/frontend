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
        // Professional SaaS Palette
        background: "#F8FAFC", // Slate-50
        "primary-text": "#0F172A", // Slate-900
        accent: "#1E293B", // Oxford Blue/Navy
        border: "#E2E8F0", // Slate-200 for 1px sharp borders
        slate: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          800: "#1E293B",
          900: "#0F172A",
        },
      },
      fontFamily: {
        sans: ["Inter", "Public Sans", "system-ui", "sans-serif"],
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "sharp-1px": "0 0 0 1px rgba(15, 23, 42, 0.05), 0 1px 2px 0 rgba(15, 23, 42, 0.05)",
      },
      borderRadius: {
        none: "0",
        sm: "0.125rem",
        md: "0.375rem",
        lg: "0.5rem",
        full: "9999px",
      },
      animation: {
        "fade-in": "fade-in-up 0.35s ease-out both",
        "slide-in": "slide-in-left 0.3s ease-out both",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
      },
      keyframes: {
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          from: { opacity: "0", transform: "translateX(-12px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
      spacing: {
        sidebar: "260px",
        "sidebar-collapsed": "72px",
      },
    },
  },
  plugins: [],
};
export default config;
