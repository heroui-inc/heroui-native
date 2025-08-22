import { hairlineWidth } from 'nativewind/theme';
import plugin from 'tailwindcss/plugin';

const herouiNativeTailwindPlugin = plugin(function () {}, {
  theme: {
    extend: {
      colors: {
        /* Base Colors */
        'background': 'hsl(var(--background))',
        'foreground': 'hsl(var(--foreground))',
        'panel': 'hsl(var(--panel))',
        'muted': {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        'surface': {
          DEFAULT: 'hsl(var(--surface))',
          foreground: 'hsl(var(--surface-foreground))',
        },
        'default': {
          DEFAULT: 'hsl(var(--default))',
          foreground: 'hsl(var(--default-foreground))',
        },
        'accent': {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
          soft: {
            DEFAULT: 'hsl(var(--accent-soft))',
            foreground: 'hsl(var(--accent-soft-foreground))',
          },
        },
        /* Status Colors */
        'success': {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        'warning': {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
        },
        'danger': {
          DEFAULT: 'hsl(var(--danger))',
          foreground: 'hsl(var(--danger-foreground))',
        },
        /* Surface Colors */
        'surface-1': 'hsl(var(--surface-1))',
        'surface-2': 'hsl(var(--surface-2))',
        'surface-3': 'hsl(var(--surface-3))',
        /* Misc Colors */
        'border': 'hsl(var(--border))',
        'divider': 'hsl(var(--divider))',
        'link': 'hsl(var(--link))',
      },
      /* Layout */
      height: {
        hairline: hairlineWidth(),
      },
      width: {
        hairline: hairlineWidth(),
      },
      borderWidth: {
        hairline: hairlineWidth(),
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
      /* Misc */
      opacity: {
        disabled: 'var(--opacity-disabled)',
      },
    },
  },
});

export default herouiNativeTailwindPlugin;
