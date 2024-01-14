/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/react");
module.exports = {
  content: ["./src/**/*.{html,js}",'./public/**/*.{html,js}',
  './components/**/*.{html,js}','./pages/**/*.{html,js}',"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
  
  theme: {
    extend: {},
  },
  darkMode: "class",

  plugins: [nextui()],
}

