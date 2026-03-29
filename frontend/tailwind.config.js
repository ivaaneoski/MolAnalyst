/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0A0F1E',
        ice: '#EFF6FF',
        blue: '#2563EB',
        slate: '#1E293B',
        cyan: '#06B6D4',
        amber: '#F59E0B',
        emerald: '#10B981',
        rose: '#F43F5E',
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
