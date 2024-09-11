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
