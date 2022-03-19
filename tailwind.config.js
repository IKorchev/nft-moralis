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
        "primary-900": "#060412",
        "primary-800": "#070617",
        "primary-700": "#08071c",
        "primary-600": "#0a0820",
        "primary-500": "#0b0925",
        "primary-400": "#0d0a29",
        "primary-300": "#0e0b2e",
        "primary-200": "#0e0b2e",
        "primary-100": "#202664",

        "secondary-100": "#da2eef",
        "secondary-200": "#c429d7",
        "secondary-300": "#ae25bf",
        "secondary-400": "#9920a7",
        "secondary-500": "#831c8f",
        "secondary-600": "#6d1778",
        "secondary-700": "#571260",
        "secondary-800": "#410e48",
        "secondary-900": "#160518",

        "tertiary-50": "#ebfafb",
        "tertiary-100": "#89e3e8",
        "tertiary-200": "#62d9e0",
        "tertiary-300": "#3bd0d8",
        "tertiary-400": "#35bbc2",
        "tertiary-500": "#2fa6ad",
        "tertiary-600": "#299297",
        "tertiary-700": "#237d82",
        "tertiary-800": "#1e686c",
        "tertiary-900": "#185356",
        white: "#ebfafb",
        light: "#ebfafb",
      },
      scale: {
        102: "1.01",
      },
      boxShadow: {
        "3xl": "0px 5px 8px ",
        "4xl": "-3px -3px 5px , 3px 3px 5px",
        glass: "-1px -3px 4px rgba(255, 255, 255,0.2), 1px 3px 4px rgba(0, 0, 0,0.4)",
        "glass-small": "-1px -2px 4px rgba(255, 255, 255,0.3), 1px 2px 2px rgba(0,0,0,0.5)",
        "glass-large": "0px -2px 6px rgba(143, 51, 154,0.5), 0px 5px 6px rgba(0, 0, 0,0.6)",
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
  plugins: [require("tailwind-scrollbar"), require("@tailwindcss/forms")({ strategy: "class" })],
}
