import { herouiNative } from '../src/providers/theme/plugin';

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    // Example's app files
    './src/**/*.{js,jsx,ts,tsx}',
    // Library's source files (for development only)
    '../src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        'inter-400': ['Inter_400Regular'],
      },
    },
  },
  plugins: [herouiNative],
};
