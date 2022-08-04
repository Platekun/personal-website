module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './templates/**/*.{js,ts,jsx,tsx}',
    './organisms/**/*.{js,ts,jsx,tsx}',
    './atoms/**/*.{js,ts,jsx,tsx}',
    './transformers/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeInDownwards: {
          '0%': { opacity: 0, transform: 'translateY(-0.5%)' },
          '100%': { opacity: 1, transform: 'translateY(0%)' },
        },
        fadeInUpwards: {
          '0%': { opacity: 0, transform: 'translateY(0.5%)' },
          '100%': { opacity: 1, transform: 'translateY(0%)' },
        },
        popInAndFadeIn: {
          '0%': { transform: 'scale(0)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in forwards',
        'fade-in-downwards': 'fadeInDownwards 0.5s ease-in forwards',
        'fade-in-upwards': 'fadeInUpwards 0.5s ease-in forwards',
        'pop-and-fade': 'popInAndFadeIn 0.15s ease-in forwards',
      },
    },
  },
  plugins: [],
};
