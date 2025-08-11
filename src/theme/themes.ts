import { vars } from 'nativewind';
import { colors } from './colors';
import { colorsToCSSVars } from './helpers';
import type {
  ColorScheme,
  ColorVariablesCSS,
  NonColorVariablesCSS,
  ThemeVariables,
} from './types';

const nonColorsVars: NonColorVariablesCSS = {
  /* Radius */
  '--radius': '12px',
  '--radius-panel': '8px',
  '--radius-panel-inner': 'calc(var(--radius-panel) * 0.5)',

  /* Opacity */
  '--opacity-disabled': 0.5,
};

export const themes: Record<ColorScheme, Record<string, string>> = {
  light: vars<ThemeVariables>({
    ...(colorsToCSSVars(colors.light) as ColorVariablesCSS),
    ...nonColorsVars,
  }),
  dark: vars<ThemeVariables>({
    ...(colorsToCSSVars(colors.dark) as ColorVariablesCSS),
    ...nonColorsVars,
  }),
};
