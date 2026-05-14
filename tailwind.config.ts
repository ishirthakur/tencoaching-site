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
        cream:  "#F5EDD8",
        ink:    "#2A2A28",
        deep:   "#5C7A4F",
        mid:    "#8FAE7F",
        light:  "#A8C49A",
      },
      fontFamily: {
        display: ["var(--font-bebas)", "Archivo Black", "Impact", "sans-serif"],
        sans:    ["var(--font-space)", "Inter", "-apple-system", "sans-serif"],
        mono:    ["var(--font-mono)", "ui-monospace", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
