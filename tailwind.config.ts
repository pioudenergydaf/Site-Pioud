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
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          lime: "var(--accent-lime)",
          limeSoft: "var(--accent-lime-soft)",
          peach: "var(--accent-peach)",
          dark: "var(--bg-dark)",
          darkSoft: "var(--bg-dark-soft)",
          orange: "var(--brand-orange)",
        },
        surface: {
          primary: "var(--bg-primary)",
          soft: "var(--bg-soft)",
          cream: "var(--bg-cream)",
        },
        text: {
          primary: "var(--text-primary)",
          muted: "var(--text-muted)",
          onDark: "var(--text-on-dark)",
        },
      },
    },
  },
  plugins: [],
};
export default config;
