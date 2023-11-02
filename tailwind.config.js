/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        teal: "#167C80",
        green: "#007055",
        grey: "#545C52",
        black: "#212121",
      },
      backgroundImage: {
        'ccFront': "url('/credit-card-front.jpg')",
        'ccBack': "url('/credit-card-back.png')",
        'ccLogo': "url('/credit-card-logo.png')",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
