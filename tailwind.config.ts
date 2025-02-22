import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/sections/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1200px',
    },
    extend: {
      fontFamily: {
        heading: ['var(--font-sora)', 'sans-serif'],
        body: ['var(--font-space-grotesk)', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          lg: '2rem',
        },
      },
      gap: {
        18: '4.5rem',
      },
      inset: {
        18: '4.5rem',
      },
      height: {
        18: '4.5rem',
      },
      padding: {
        18: '4.5rem',
      },
      rotate: {
        135: '135deg',
        225: '225deg',
        270: '270deg',
        315: '315deg',
      },
      keyframes: {
        'cursor-blink': {
          '0%': { opacity: '1' },
          '50%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'cursor-blink': 'cursor-blink 1s step-start infinite',
      },
    },
  },
  plugins: [],
};
export default config;
