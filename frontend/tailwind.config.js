/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        xxs: "0.6rem",
        max: "5.6em",
      },
      colors: {
        darkBlue: "#2763ff",
        lightGray: "#ebeef2",
        darkGray: "#afafaf",
      },
    },
  },
  plugins: [],
};
