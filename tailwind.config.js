/** @type {import('tailwindcss').Config} */

const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",

  plugins: [
    nextui({
      themes: {
        light: {
          // ...
          colors: {
            danger: {
              //... 50 to 900
              foreground: "#FFFFFF",
              DEFAULT: "#cc0033",
            },
          },
        },
        dark: {
          // ...
          colors: {
            danger: {
              //... 50 to 900
              foreground: "#FFFFFF",
              DEFAULT: "#CC0033",
            },
          },
        },
      },
    }),
  ],
};
