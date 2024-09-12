/** @type {import('tailwindcss').Config} */
import flowbite from 'flowbite-react/tailwind'

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{jsx,js,ts,tsx}",
    flowbite.content(),
  ],
  darkMode: "class",
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1400px',
    },
    extend: {
      colors: {
        light: {
          primary: '#0078A8',
          secondary: '#F3F4F6',
          accent: '#4A90E2',
          background: '#F9FAFB',
          text: '#111827',
        },
        dark: {
          primary: '#1F2937',
          secondary: '#374151',
          accent: '#3B82F6',
          background: '#111827',
          text: '#F9FAFB',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      dropShadow: {
        glow: [
          "0 0px 20px rgba(255,255, 255, 0.35)",
          "0 0px 65px rgba(255, 255,255, 0.2)"
        ]
      }
    }
  },
  plugins: [
    flowbite.plugin(),
  ],
}
