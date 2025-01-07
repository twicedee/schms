const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite.plugin()
  ],
}


// module.exports = {
//   content: ['./src/**/*.html', './node_modules/flowbite/**/*.js'],
//   plugins: [
//     require('flowbite/plugin')
//   ]
// }


// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./node_modules/flowbite/**/*.js"],
//   theme: {
//     extend: {},
//   },
//   plugins: [require('flowbite/plugin')],
// };