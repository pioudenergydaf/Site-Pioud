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
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        pill: "9999px",
        card: "24px",
        "card-lg": "32px",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        cream: "#F4F1EA",
        "cream-soft": "#FAF8F2",
        sage: "#E8EDE3",
        forest: "#1F3A2E",
        "forest-soft": "#2D4A3A",
        lime: "#C8E85C",
        "lime-soft": "#DDF096",
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
