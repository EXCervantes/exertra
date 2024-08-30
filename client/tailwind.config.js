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
    extend: {},
  },
  plugins: [
    flowbite.plugin(),
  ],
}
