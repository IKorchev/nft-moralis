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
        "primary-900": "#10011F",
        "primary-800": "#1C0236",
        "primary-700": "#420042",
        "primary-600": "#7A08CF",
        "primary-500": "#A71EFE",
        "primary-400": "#C53CFE",
        "primary-300": "#D05AFD",
        "primary-200": "#D76BFF",
        "primary-100": "#DD86FF",
        secondary: "#F70C76",
        "secondary-dark": "#AB044F",
        "secondary-light": "#FF2688",
        light: "#faf7fc",
      },
      scale: {
        102: "1.01",
      },
      boxShadow: {
        "3xl": "0px 5px 8px ",
        "4xl": "-3px -3px 5px , 3px 3px 5px",
        glass: "-1px -3px 4px rgba(255, 255, 255,0.2), 1px 3px 4px rgba(0, 0, 0,0.4)",
        "glass-secondary": "-1px -4px 4px rgba(255, 38, 136,0.3), 1px 4px 4px rgba(0,0,0,0.5)",
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
