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
        "middle-red": "#E28B6F",
      },
      height: {
        "fit-content": "fit-content",
      },
      width: {
        "fit-content": "fit-content",
      },
    },
  },
  variants: {},
  safelist: [
    "medium-widget",
    "medium-widget-article__row",
    "medium-widget-article__item",
    "medium-widget-article__column",
    "medium-widget-article__image",
    "medium-widget-article__content",
    "medium-widget-article__title",
    "medium-widget-article__info",
    "medium-widget-article__date",
  ],
  plugins: [],
};
