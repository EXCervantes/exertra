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
    extend: {},
  },
  plugins: [
    flowbite.plugin(),
  ],
}
