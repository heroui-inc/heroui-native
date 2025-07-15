import { vars } from 'nativewind';
import type { ColorScheme, ColorVariablesCSS } from './types';

const nonColorsVars = {
  /* Radius */
  '--radius': '12px',
  '--radius-panel': '8px',
  '--radius-panel-inner': 'calc(var(--radius-panel) * 0.5)',

  /* Misc */
  '--opacity-disabled': '0.5',
};

export const themes: Record<ColorScheme, Record<string, string>> = {
  light: vars<ColorVariablesCSS & typeof nonColorsVars>({
    /* Base Colors */
    '--background': '300 50% 100%',
    '--foreground': '348 0% 4%',
    '--panel': '300 50% 100%',

    '--muted': '0 0% 45%',
    '--muted-foreground': '0 0% 64%',

    '--surface': '0 0% 96%',
    '--surface-foreground': 'var(--foreground)',

    '--base': '0 0% 98%',
    '--base-foreground': '0 0% 32%',

    '--accent': '300 0% 4%',
    '--accent-foreground': '300 0% 99%',

    '--accent-soft': '0 0% 90%',
    '--accent-soft-foreground': '0 0% 25%',

    /* Status Colors */
    '--success': '145.56 57% 33%',
    '--success-foreground': '300 0% 99%',

    '--warning': '39.44 99% 40%',
    '--warning-foreground': '300 0% 99%',

    '--danger': '4.69 82% 49%',
    '--danger-foreground': '300 0% 99%',

    /* Misc Colors */
    '--border': '0 0% 0%',
    '--link': 'var(--foreground)',

    ...nonColorsVars,
  }),
  dark: vars<ColorVariablesCSS & typeof nonColorsVars>({
    /* Base Colors */
    '--background': '0 0% 5%',
    '--foreground': '300 0% 99%',
    '--panel': '0 0% 10%',

    '--muted': '0 0% 32%',
    '--muted-foreground': '0 0% 45%',

    '--surface': '0 0% 98%',
    '--surface-foreground': '0 0% 25%',

    '--base': '0 0% 98%',
    '--base-foreground': '0 0% 25%',

    '--accent': '300 0% 99%',
    '--accent-foreground': '0 0% 10%',

    '--accent-soft': '0 0% 96%',
    '--accent-soft-foreground': '0 0% 25%',

    /* Status Colors */
    '--success': '143.49 63% 61%',
    '--success-foreground': '345.19 62% 2%',

    '--warning': '38.02 100% 67%',
    '--warning-foreground': '345.19 62% 2%',

    '--danger': '5.79 75% 54%',
    '--danger-foreground': '300 0% 99%',

    /* Misc Colors */
    '--border': '300 50% 100%',
    '--link': 'var(--foreground)',

    ...nonColorsVars,
  }),
};
