const colors = {
  primary: "#502675",
  "primary-dark": "#28133a",
  "primary-900": "#271339",
  "primary-lightest": "#a43ad6",
  pinkish: "#e056eb",
  blackish: "#131515",
  grayish: "#100117",
  secondary: "#00AACB",
  "secondary-dark": "#1FDBDF",
  teal: "#339989",
  light: "#faf7fc",
}

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    fontWeight: 600,
    background: state.isSelected
      ? "linear-gradient(90deg, rgba(255,59,92,1) 0%, rgba(176,63,251,1) 76%)"
      : colors.light,
    color: state.isSelected ? colors.light : colors.primary,
  }),
  indicatorSeparator: () => {
    return {
      display: "none",
    }
  },

  control: (provided, state) => ({
    ...provided,
    width: "150px",
    textAlign: "center",
    fontSize: "20px",
    padding: "0.3rem 0",
    borderColor: "#fff",
    border: "none",
    cursor: "pointer",
    background: `linear-gradient(90deg, rgba(255,59,92,1) 0%, rgba(176,63,251,1) 76%);`,
    borderRadius: "6px",
    color: "#faf7fc",
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: colors["light"],
  }),
  input: (provided, state) => ({
    ...provided,
    color: colors.light,
    fontWeight: "600",
  }),
  dropdownIndicator: () => ({
    display: "none",
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: "white",
  }),
}
export default customStyles
