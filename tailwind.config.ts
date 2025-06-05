import type { Config } from 'tailwindcss';
import catppuccin from '@catppuccin/tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [
    catppuccin({
      defaultFlavour: 'mocha',
    }),
  ],
} satisfies Config;
