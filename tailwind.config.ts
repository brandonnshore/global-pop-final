import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'chicago': ['var(--font-chicago)'],
      },
      colors: {
        'mac-gray': '#c0c0c0',
        'mac-dark-gray': '#808080',
        'mac-light-gray': '#e0e0e0',
        'retro-cyan': '#66cccc',
        'retro-pink': '#ff6699',
        'retro-yellow': '#ffcc66',
        'retro-purple': '#9966ff',
        'retro-green': '#66ff99',
        'retro-orange': '#ff9966',
      },
    },
  },
  plugins: [],
};
export default config;
