/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ds: {
          white: "#FFFFFF",
          abyss: "#00171F",
          deep: "#003459",
          ocean: "#007EA7",
          sky: "#00A8E8",
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Syne', 'Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
        heading: ['Space Grotesk', 'Syne', 'sans-serif']
      },
      boxShadow: {
        'glow-sky': '0 0 25px rgba(0, 168, 232, 0.45)',
        'glow-ocean': '0 0 30px rgba(0, 126, 167, 0.4)',
        'glow-subtle': '0 0 15px rgba(0, 168, 232, 0.2)',
        'neumorph-dark': '6px 6px 16px #001015, -6px -6px 16px #00222e',
        'neumorph-inset': 'inset 3px 3px 8px #001015, inset -3px -3px 8px #002636',
        'glass-card': '0 8px 32px 0 rgba(0, 23, 31, 0.45)',
        'glass-highlight': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.15)',
      },
      backdropBlur: {
        'xs': '2px',
        '2xl': '24px',
        '3xl': '36px',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'radar': 'radar 3s linear infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        radar: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
