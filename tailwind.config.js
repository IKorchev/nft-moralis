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
        pinkish: "#f72585",
        light: "#faf7fc",
      },
      scale: {
        102: "1.01",
      },
      boxShadow: {
        "3xl": "0px 5px 8px rgba(0,0,0,0.4)",
        "4xl": "-3px -3px 5px rgba(164,58,214, 0.4), 3px 3px 5px rgba(0,0,0,0.4)",
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
