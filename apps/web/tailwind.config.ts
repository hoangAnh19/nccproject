import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: '#016b69',
        gold: '#c5a85c',
        green: '#008750',
        red: '#DD3636',
      },
      borderRadius: {
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        10: '2.5rem',
      },
      fontSize: {
        14: '0.875rem',
        18: '1.125rem',
        20: '1.25rem',
        22: '1.375rem',
        24: '1.5rem',
        28: '1.75rem',
        32: '2rem',
      },
    },
  },
  plugins: [],
};

export default config;
