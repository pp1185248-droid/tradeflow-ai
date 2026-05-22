/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#0ea5e9', dark: '#0284c7', light: '#38bdf8' },
        dark: { DEFAULT: '#0f172a', card: '#1e293b', border: '#334155' },
        accent: { green: '#10b981', red: '#ef4444', yellow: '#f59e0b' },
      },
      fontFamily: { sans: ['Inter', 'sans-serif'] },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
