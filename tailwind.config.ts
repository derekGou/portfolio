import type { Config } from "tailwindcss";

export default {
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
      },
      keyframes: {
        expandLeft: {
          '0%': { opacity: '0', maxWidth: '0', maxHeight: 'none' },
          '50%': { opacity: '0', maxWidth: '100%', maxHeight: 'none' },
          '100%': { opacity: '1', maxWidth: '100%', maxHeight: 'none' },
        },
        expandDown: {
          '0%': { opacity: '0', maxHeight: '0', maxWidth: 'none' },
          '50%': { opacity: '0', maxHeight: '100%', maxWidth: 'none' },
          '100%': { opacity: '1', maxHeight: '100%', maxWidth: 'none' },
        },
      },
      animation: {
        'slide-left': 'expandLeft 1s ease-out forwards',
        'slide-down': 'expandDown 1s ease-out forwards',
      },
    },
  },
  plugins: [],
} satisfies Config;
