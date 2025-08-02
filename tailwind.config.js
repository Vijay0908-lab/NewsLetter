/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    //we as per our choice we selecting font familt rather than default fonts for that 1st link the fonts to index.html and the 2nd is below
    fontFamily: {
      sans: "Roboto Mono , monospace",
    },
    //extend is used to keep the default and add some new colors , fonts ,etc which we give
    extend: {},
  },
  plugins: [],
};
