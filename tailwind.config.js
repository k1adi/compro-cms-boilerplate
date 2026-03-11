import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
    "./storage/framework/views/*.php",
    "./resources/views/**/*.blade.php",
    "./resources/js/**/*.js",
    "./resources/js/**/*.jsx",
  ],

  safelist: [
    {
      pattern: /bg-(primary|secondary|accent)/,
      variants: ['hover', 'group-hover'],
    },
    {
      pattern: /text-(primary|secondary|accent)/,
      variants: ['hover', 'group-hover']
    },
    {
      pattern: /border-(primary|secondary|accent)/,
      variants: ['focus'],
    },
    {
      pattern: /ring-(primary|secondary|accent)/,
      variants: ['focus'],
    },
  ],

  theme: {
    screens: {
      "2xs": "375px",
      xs: "425px",
      "2md": "992px",
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        sans: ["Figtree", ...defaultTheme.fontFamily.sans],
        heading: ["Poppins", ...defaultTheme.fontFamily.sans],
      },

      colors: {
        stroke: '#E2E8F0',
        danger: '#D34053',
        success: '#219653',
        warning: '#FFA70B',
        info: '#2EABFF',
        'white-transparent': 'rgba(255, 255, 255, 0.3)',

        primary: "#3f48cc",
        secondary: "#2d3391",
        accent: "#6a92ff",

        midnight: {
          50: "#F0F1FD",
          100: "#E0E3FB",
          200: "#C1C7F7",
          300: "#A2ABF3",
          400: "#8390EF",
          500: "#3f48cc",
          600: "#3840B8",
          700: "#2D34A0",
          800: "#222888",
          900: "#171C70",
        },

        dark: "#0E1317",
      },

			fontSize: {
        'title-xxl': ['44px', '55px'],
        'title-xl': ['36px', '45px'],
        'title-xl2': ['33px', '45px'],
        'title-lg': ['28px', '35px'],
        'title-md': ['24px', '30px'],
        'title-md2': ['26px', '30px'],
        'title-sm': ['20px', '26px'],
        'title-xsm': ['18px', '24px'],
      },
			zIndex: {
        999999: '999999',
        99999: '99999',
        9999: '9999',
        999: '999',
        99: '99',
        9: '9',
        1: '1',
      },
      boxShadow: {
        default: '0px 8px 13px -3px rgba(0, 0, 0, 0.07)',
        card: '0px 1px 3px rgba(0, 0, 0, 0.12)',
        'card-2': '0px 1px 2px rgba(0, 0, 0, 0.05)',
        switcher:
          '0px 2px 4px rgba(0, 0, 0, 0.2), inset 0px 2px 2px #FFFFFF, inset 0px -1px 1px rgba(0, 0, 0, 0.1)',
        'switch-1': '0px 0px 5px rgba(0, 0, 0, 0.15)',
        1: '0px 1px 3px rgba(0, 0, 0, 0.08)',
        2: '0px 1px 4px rgba(0, 0, 0, 0.12)',
        3: '0px 1px 5px rgba(0, 0, 0, 0.14)',
        4: '0px 4px 10px rgba(0, 0, 0, 0.12)',
        5: '0px 1px 1px rgba(0, 0, 0, 0.15)',
        6: '0px 3px 15px rgba(0, 0, 0, 0.1)',
        7: '-5px 0 0 #313D4A, 5px 0 0 #313D4A',
        8: '1px 0 0 #313D4A, -1px 0 0 #313D4A, 0 1px 0 #313D4A, 0 -1px 0 #313D4A, 0 3px 13px rgb(0 0 0 / 8%)',
        ...defaultTheme.boxShadow,
      },
      dropShadow: {
        1: '0px 1px 0px #E2E8F0',
        2: '0px 1px 4px rgba(0, 0, 0, 0.12)',
        ...defaultTheme.dropShadow,
      },
    },
  },

  plugins: [forms],
};
