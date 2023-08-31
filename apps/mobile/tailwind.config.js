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
        gray_100: "#f2f2f3",
        gray_200: "#D6D6D5",
        gray_300: "#afafaf",
        gray_400: "#646464",

        buttonGreen: "#38c7a4",
        // buttonGreen: "#0aff9d",

        dark: "#242132",

        purple_100: "#746CFE",
        purple_500: "#AE8CFA",
        purple_600: "#6738DC",

        background_color: "#151515",

        Header: "#d3f46f",
        card: "#1b1a1a",
        pearl: "#fdfdfc",
        subGray: "#909090",
      },
    },
  },
  extend: {},
  plugins: [],
};
