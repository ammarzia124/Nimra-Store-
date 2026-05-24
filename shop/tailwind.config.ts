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
        brand: {
          white: "#F8F9FA", // Cloud White
          charcoal: "#1A1A1B", // Deep Charcoal
          red: "#E63946", // Conversion Red
        },
      },
      fontFamily: {
        editorial: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      gridTemplateColumns: {
        "editorial": "repeat(12, minmax(0, 1fr))",
      },
      spacing: {
        "editorial-gutter": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
