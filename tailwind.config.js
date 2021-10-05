module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      scale: {
        102: "1.02",
      },
      boxShadow: {
        "3xl": "0px 5px 8px rgba(0,0,0,0.4)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
