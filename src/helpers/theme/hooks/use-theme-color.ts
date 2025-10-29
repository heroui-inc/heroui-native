import { useCSSVariable } from 'uniwind';
import type { ThemeColor } from '../types';

export const useThemeColor = (themeColor: ThemeColor): string => {
  const cssVariable = `--color-${themeColor}`;
  const resolvedColor = useCSSVariable(cssVariable);
  const colorValue = resolvedColor ?? 'red';
  return colorValue as string;
};
