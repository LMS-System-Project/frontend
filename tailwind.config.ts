import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  // Safelist dynamic color classes used in stat cards / course cards
  safelist: [
    {
      pattern: /bg-(indigo|emerald|amber|rose|cyan|purple|blue|teal|orange|pink)-(50|100|400|500|600)/,
      variants: [],
    },
    {
      pattern: /text-(indigo|emerald|amber|rose|cyan|purple|blue|teal|orange|pink)-(400|500|600|700)/,
      variants: [],
    },
    {
      pattern: /from-(indigo|emerald|amber|rose|cyan|purple|blue|teal|orange|pink)-(400|500)/,
    },
    {
      pattern: /to-(indigo|emerald|amber|rose|cyan|purple|blue|teal|orange|pink)-(500|600)/,
    },
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: "var(--bg-primary)",
          secondary: "var(--bg-secondary)",
          card: "var(--bg-card)",
          sidebar: "var(--bg-sidebar)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
        },
        border: {
          DEFAULT: "var(--border-color)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          light: "var(--accent-light)",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "primary-gradient": "var(--primary-gradient)",
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
      },
    },
  },
  plugins: [],
};
export default config;
