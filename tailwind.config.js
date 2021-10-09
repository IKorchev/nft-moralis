module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blackish: "#131515",
        grayish: "#2B2C28",
        "light-grayish": "#404241",
        tealish: "#339989",
        "light-tealish": "#7DE2D1",
        light: "#FFFAFB",
      },
      scale: {
        102: "1.02",
      },
      boxShadow: {
        "3xl": "0px 5px 8px rgba(0,0,0,0.4)",
      },
    },
  },
  variants: {
    scrollbars: ["rounded"],

    extend: {},
  },
  plugins: [require("tailwind-scrollbar")],
}
