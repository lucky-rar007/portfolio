/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-alt": "var(--bg-alt)",
        fg: "var(--fg)",
        "fg-muted": "var(--fg-muted)",
        brblue: "#0066FF",
        "accent-soft": "var(--accent-soft)",
        "theme-border": "var(--border)",
      },
      fontFamily: {
        Aeonik: ["var(--font-inter)", "sans-serif"],
        AeonikMedium: ["var(--font-inter)", "sans-serif"],
        AeonikBold: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-3d")],
};
