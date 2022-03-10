module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      zIndex: {
        "-1": "-1",
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },

      colors: {
        "primary-900": "#110319",
        "primary-800": "#210633",
        "primary-700": "#32094c",
        "primary-600": "#430c66",
        "primary-500": "#540f7f",
        "primary-400": "#641298",
        "primary-300": "#7515b2",
        "primary-200": "#8618cb",
        "primary-100": "#961be5",

        "secondary-100": "#de0b6a",
        "secondary-200": "#c60a5e",
        "secondary-300": "#ad0853",
        "secondary-400": "#940747",
        "secondary-500": "#7c063b",
        "secondary-600": "#63052f",
        "secondary-700": "#4a0423",
        "secondary-800": "#310218",
        "secondary-900": "#19010c",

        light: "#faf7fc",
      },
      scale: {
        102: "1.01",
      },
      boxShadow: {
        "3xl": "0px 5px 8px ",
        "4xl": "-3px -3px 5px , 3px 3px 5px",
        glass: "-1px -3px 4px rgba(255, 255, 255,0.2), 1px 3px 4px rgba(0, 0, 0,0.4)",
        "glass-small": "-1px -2px 4px rgba(255, 255, 255,0.3), 1px 2px 2px rgba(0,0,0,0.5)",
        "glass-large": "0px -2px 6px rgba(255, 38, 136,0.5), 0px 5px 6px rgba(0, 0, 0,0.6)",
      },
    },
  },
  variants: {
    scrollbars: ["rounded"],
    border: ["focus", "hover"],
    outline: ["focus"],
    extend: {
      boxShadow: ["hover", "focus"],
    },
  },
  plugins: [require("tailwind-scrollbar"), require("@tailwindcss/forms")],
}
