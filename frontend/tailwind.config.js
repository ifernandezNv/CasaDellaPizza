/** @type {import('tailwindcss').Config} */

export default {
  content: ["index.html", "src/**/*.{jsx,tsx,ts,js}"],
  theme: {
    colors: {
      "red": "#FF0505",
      "yellow-main": "#FFB800",
      "yellow-dark": "#E4A400",
      "white": "#FFFFFF",
      "blue": "#2A16A4",
      "black": "#1D1D1D",
      "green": "#219653",
      "gray": "#F5F5F5",
      "strong-gray": "#545454",
      "mid-gray": "#D9D9D9",
      "light-gray": "#FBFBFB",
    },
    fontFamily: {
      'lato': ['Lato', 'sans-serif'],
      'sans': ['Lato', 'sans-serif'],
    },
    fontSize: {
      "6xl": "60px",
      "3xl": "30px",
      "2xl": "26px",
      "xl": "24px",
      "lg": "22px",
      "md": "20px",
      "sm": "18px",
      "mobile-6xl": "22px",
      "mobile-3xl": "18px",
      "mobile-2xl": "17px",
      "mobile-xl": "16px",
      "mobile-lg": "16px",
      "mobile-md": "14px",
      "mobile-sm": "12px",
    },
    fontWeight: {
      "extraligh": 100,
      "light": 300,
      "normal": 400,
      "semi-bold": 700,
      "bold": 900,
    },
    extend: {},
  },
  plugins: [],
}

