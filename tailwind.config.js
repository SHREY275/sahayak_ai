/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        government: {
          blue: '#1e40af',
          green: '#059669',
          orange: '#ea580c',
          dark: '#1f2937',
          light: '#f8fafc'
        }
      },
      fontFamily: {
        'sans': ['Noto Sans', 'system-ui', 'sans-serif'],
        'serif': ['Noto Serif', 'serif'],
      }
    },
  },
  plugins: [],
}
