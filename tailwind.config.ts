import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-serif)", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
      },
      borderRadius: {
        pill: "9999px",
        card: "24px",
        "card-lg": "32px",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        navy: {
          900: "#0F2B46",
        },
        cream: "#F4F1EA",
        "cream-soft": "#FAF8F2",
        sage: {
          DEFAULT: "#E8F0E5",
          100: "#E8F0E5",
          400: "#87A878",
          500: "#5C8D4E",
        },
        forest: "#1F3A2E",
        "forest-soft": "#2D4A3A",
        emerald: {
          50: "#ECFDF5",
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
          700: "#047857",
          800: "#065F46",
          900: "#064E3B",
        },
        peach: "#F5B97D",
        "peach-soft": "#FAD4AE",
        "pioud-orange": "#E8590C",
        ink: "#1F3A2E",
        "ink-muted": "#5C6B5F",
        "ink-soft": "#8A9A8D",
      },
    },
  },
  plugins: [],
};
export default config;
