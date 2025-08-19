import { vars } from 'nativewind';
import { colors } from './colors';
import { colorsToCSSVars } from './provider.helpers';
import type {
  ColorScheme,
  ColorVariablesCSS,
  NonColorVariablesCSS,
  ThemeVariables,
} from './types';

export const nonColorsVars: NonColorVariablesCSS = {
  /* Radius */
  '--radius': '12px',
  '--radius-panel': '8px',
  '--radius-panel-inner': 'calc(var(--radius-panel) * 0.5)',

  /* Opacity */
  '--opacity-disabled': 0.5,
};

// Export raw theme variables for merging
export const themeVariables: Record<ColorScheme, ThemeVariables> = {
  light: {
    ...(colorsToCSSVars(colors.light) as ColorVariablesCSS),
    ...nonColorsVars,
  },
  dark: {
    ...(colorsToCSSVars(colors.dark) as ColorVariablesCSS),
    ...nonColorsVars,
  },
};

// Default themes with vars applied
export const themes: Record<ColorScheme, Record<string, string>> = {
  light: vars<ThemeVariables>(themeVariables.light),
  dark: vars<ThemeVariables>(themeVariables.dark),
};
