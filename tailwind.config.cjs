/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
      'bg-desktop-dark': 'url(./images/bg-desktop.svg)',
      'bg-desktop-light': 'url(./images/bg-desktop-light.svg)',
      'bg-mobile-dark': 'url(./images/bg-mobile.svg)',
      'bg-mobile-light': 'url(./images/bg-mobile-light.svg)',
      }
    },
  },
  plugins: [],
}
