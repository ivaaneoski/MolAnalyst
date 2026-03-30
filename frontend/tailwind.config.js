/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0A0F1E',
        },
        electric: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8',
          active: '#1E40AF',
        },
        ice: {
          DEFAULT: '#EFF6FF',
        },
        slate: {
          900: '#0F172A',
          600: '#475569',
          400: '#94A3B8',
          100: '#F1F5F9',
        },
        cyan: {
          accent: '#06B6D4',
        },
        amber: {
          DEFAULT: '#F59E0B',
        },
        emerald: {
          DEFAULT: '#10B981',
        },
        rose: {
          DEFAULT: '#F43F5E',
        },
        softgreen: {
          DEFAULT: '#86EFAC',
        }
      },
      fontFamily: {
        sora: ['Sora', 'system-ui', 'sans-serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
        jetbrains: ['"JetBrains Mono"', 'monospace'],
      }
    },
  },
  plugins: [],
}
