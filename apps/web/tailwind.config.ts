import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './lib/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#172033',
        line: '#d9e1ea',
        surface: '#f6f8fb',
        accent: '#0f766e',
      },
    },
  },
  plugins: [],
};

export default config;
