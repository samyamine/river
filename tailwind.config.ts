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
        primaryGray: {
          50: "#F2F1F1",
          100: "#E4E2E3",
          200: "#D0CCCD",
          300: "#B0A9AA",
          400: "#8E8688",
          500: "#72696B",
          600: "#5A5153",
          700: "#433A3C",
          800: "#2C2426",
          900: "#140D0F",
        },
      },
      fontFamily: {
        agathoblack: "agatho-black",
        agathobold: "agatho-bold",
        agatholight: "agatho-light",
        agathomedium: "agatho-medium",
        agathonarrow: "agatho-narrow",
        agathoregular: "agatho-regular",
      }
    },
  },
  plugins: [],
}