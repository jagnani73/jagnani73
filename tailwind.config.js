module.exports = {
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        "sans-serif": ["Nunito Sans", "sans-serif"],
      },
      colors: {
        "eerie-black": "#232323",
        cultured: "#FAFAFA",
        "steel-blue": "#4688B4",
        "light-green": "#7AE485",
      },
    },
  },
  variants: {
    extend: {
      translate: ["group-hover"],
      textColor: ["group-hover"],
    },
  },
  plugins: [],
};
