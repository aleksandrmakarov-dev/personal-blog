/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
        foreground: {
          primary: "#111827",
          secondary: "#4b5563",
        },
      },
    },
  },
  plugins: [],
};
