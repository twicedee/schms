import { Flowbite } from "flowbite-react";


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    Flowbite.content(),
  ],
  theme: {
    extend: {},
  },
  plugins: [
    Flowbite.plugin(),
  ],
};