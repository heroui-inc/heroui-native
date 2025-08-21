// For development only
import heroUINativePlugin from '../src/providers/theme/plugin';
// In production use this
// import heroUINativePlugin from 'heroui-native/tailwind-plugin';

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
        normal: ['Inter_400Regular'],
        medium: ['Inter_500Medium'],
        semibold: ['Inter_600SemiBold'],
        bold: ['Inter_700Bold'],
      },
    },
  },
  plugins: [heroUINativePlugin],
};
