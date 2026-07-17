import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#f1efe9",
        ink: "#121210",
        muted: "#8c8a83",
        line: "#d8d5cc",
        dark: "#0b0b0a",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        grotesk: ["var(--font-grotesk)", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        widest2: "0.22em",
      },
    },
  },
  plugins: [],
};

export default config;
