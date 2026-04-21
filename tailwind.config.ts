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
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          blue: "#0F2B46",
          emerald: "#10B981",
        },
        navy: {
          50: "#F0F5FA",
          100: "#DBE7F2",
          200: "#B8CFE5",
          700: "#2E4A6B",
          800: "#1E3A5F",
          900: "#152B47",
        },
        emerald: {
          300: "#6EE7B7",
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
        },
        cream: "#FAFAF7",
        softGray: "#F5F7FA",
        ink: {
          DEFAULT: "#152B47",
          muted: "#5A6B82",
          soft: "#8A99B0",
        },
      },
    },
  },
  plugins: [],
};
export default config;
