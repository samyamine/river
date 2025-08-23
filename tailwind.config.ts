
/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["app/**/*.{js,jsx,ts,tsx}", "./App.tsx", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primaryColor: "#FB6F92",
        primaryBlack: "#140D0F",
      },
      fontFamily: {
        agathobold: "agatho-bold",
        agathoboldCAPS: "agatho-boldCAPS",
        agatholight: "agatho-light",
        agatholightCAPS: "agatho-lightCAPS",
        agathomedium: "agatho-medium",
        agathonarrow: "agatho-narrow",
        agathoregular: "agatho-regular",
        agathoregularCAPS: "agatho-regularCAPS",
      }
    },
  },
  plugins: [],
}
