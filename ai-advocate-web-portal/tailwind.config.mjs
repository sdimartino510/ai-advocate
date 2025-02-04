import { Montserrat } from 'next/font/google';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        skyBlue: "#BAE2FF",
        grayBlue:"#8DBEF4",
        paleBlue: "#E0F2FF",
        lightBlue: "#F7FCFF",
        darkBlue: "#0064AE",
        green: "#C5F5C7",
        grey: "#ECEEF0",
        red: "#FF0000",
        lightRed: "#FED9D9",
      },
      fontFamily: {
        Montserrat: ['Montserrat', 'sans-serif']
      }
    },
  },
  plugins: [],
};
