/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#5bec13",
        "background-light": "#f6f8f6",
        "background-dark": "#162210",
        "card-dark": "#1f2e18",
        "card-dark-hover": "#26381d",
        "input-bg": "#2a3d21",
        "pill-bg": "#2F4526",
      },
      fontFamily: {
        "display": ["Plus Jakarta Sans", "sans-serif"],
      },
      borderRadius: {
        "DEFAULT": "1rem",
        "lg": "1.5rem",
        "xl": "2rem",
        "2xl": "2.5rem",
        "full": "9999px",
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'fade-out': 'fadeOut 0.5s ease-out forwards',
        'wave': 'wave 1s ease-in-out infinite',
        'fadeIn': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 0 0px rgba(91, 236, 19, 0.7)' },
          '50%': { opacity: '.8', boxShadow: '0 0 0 10px rgba(91, 236, 19, 0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeOut: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.9)', height: '0', margin: '0', padding: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        wave: {
          '0%, 100%': { height: '20%' },
          '50%': { height: '80%' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
}
