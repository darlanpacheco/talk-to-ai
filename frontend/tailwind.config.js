/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#cccccc",
          dark: "#0f0f0f",
        },
        secondary: {
          DEFAULT: "#dedede",
          dark: "#151515",
        },
        tertiary: {
          DEFAULT: "#dedede",
          dark: "#252525",
        },
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
