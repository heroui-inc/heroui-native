import type { ColorScheme, ColorVariables } from './types';

export const colors: Record<ColorScheme, ColorVariables> = {
  light: {
    /* Base Colors */
    background: 'hsl(300 50% 100%)',
    foreground: 'hsl(348 0% 4%)',
    panel: 'hsl(300 50% 100%)',

    muted: 'hsl(0 0% 45%)',
    mutedForeground: 'hsl(0 0% 64%)',

    surface: 'hsl(0 0% 96%)',
    surfaceForeground: 'hsl(348 0% 4%)',

    default: 'hsl(0 0% 98%)',
    defaultForeground: 'hsl(0 0% 32%)',

    accent: 'hsl(300 0% 4%)',
    accentForeground: 'hsl(300 0% 99%)',

    accentSoft: 'hsl(0 0% 90%)',
    accentSoftForeground: 'hsl(0 0% 25%)',

    /* Status Colors */
    success: 'hsl(145.56 57% 33%)',
    successForeground: 'hsl(300 0% 99%)',

    warning: 'hsl(39.44 99% 40%)',
    warningForeground: 'hsl(300 0% 99%)',

    danger: 'hsl(4.69 82% 49%)',
    dangerForeground: 'hsl(300 0% 99%)',

    /* Surface Colors */
    surface1: 'hsl(300 50% 100%)',
    surface2: 'hsl(0 0% 96%)',
    surface3: 'hsl(0 0% 90%)',

    /* Misc Colors */
    border: 'hsl(0 0% 86%)',
    link: 'hsl(348 0% 4%)',
  },
  dark: {
    /* Base Colors */
    background: 'hsl(0 0% 5%)',
    foreground: 'hsl(300 0% 99%)',
    panel: 'hsl(0 0% 10%)',

    muted: 'hsl(0 0% 32%)',
    mutedForeground: 'hsl(0 0% 45%)',

    surface: 'hsl(0 0% 98%)',
    surfaceForeground: 'hsl(0 0% 25%)',

    default: 'hsl(0 0% 9%)',
    defaultForeground: 'hsl(0 0% 90%)',

    accent: 'hsl(300 0% 99%)',
    accentForeground: 'hsl(0 0% 10%)',

    accentSoft: 'hsl(0 0% 96%)',
    accentSoftForeground: 'hsl(0 0% 25%)',

    /* Status Colors */
    success: 'hsl(143.49 63% 61%)',
    successForeground: 'hsl(345.19 62% 2%)',

    warning: 'hsl(38.02 100% 67%)',
    warningForeground: 'hsl(345.19 62% 2%)',

    danger: 'hsl(5.79 75% 54%)',
    dangerForeground: 'hsl(300 0% 99%)',

    /* Surface Colors */
    surface1: 'hsl(0 0% 5%)',
    surface2: 'hsl(0 0% 9%)',
    surface3: 'hsl(0 0% 15%)',

    /* Misc Colors */
    border: 'hsl(0 0% 20%)',
    link: 'hsl(300 0% 99%)',
  },
};
