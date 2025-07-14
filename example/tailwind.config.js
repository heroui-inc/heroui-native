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
      colors: {
        /* Base Colors */
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        panel: 'hsl(var(--panel))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        surface: {
          DEFAULT: 'hsl(var(--surface))',
          foreground: 'hsl(var(--surface-foreground))',
        },
        base: {
          DEFAULT: 'hsl(var(--base))',
          foreground: 'hsl(var(--base-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
          soft: {
            DEFAULT: 'hsl(var(--accent-soft))',
            foreground: 'hsl(var(--accent-soft-foreground))',
          },
        },
        /* Status Colors */
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
        },
        danger: {
          DEFAULT: 'hsl(var(--danger))',
          foreground: 'hsl(var(--danger-foreground))',
        },
        /* Misc Colors */
        border: 'hsl(var(--border) / 0.1)',
        link: 'hsl(var(--link))',
      },
      borderRadius: {
        'xs': 'calc(var(--radius) * 0.25)',
        'sm': 'calc(var(--radius) * 0.5)',
        'md': 'calc(var(--radius) * 0.75)',
        'lg': 'calc(var(--radius) * 1)',
        'xl': 'calc(var(--radius) * 1.5)',
        '2xl': 'calc(var(--radius) * 2)',
        '3xl': 'calc(var(--radius) * 3)',
        '4xl': 'calc(var(--radius) * 4)',
      },
    },
  },
  plugins: [],
};
