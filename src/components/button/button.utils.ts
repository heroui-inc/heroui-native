import { hslToRgba } from '@/helpers/utils';
import type { ColorVariables } from '@/theme/types';
import { RIPPLE_ALPHA_MAP, VARIANT_TO_COLOR_MAP } from './button.constants';
import type { ButtonVariant } from './button.types';

/**
 * Gets the ripple color for a button based on variant and theme
 * @param variant - Button variant
 * @param colors - Theme colors
 * @param isDark - Whether dark theme is active
 * @returns RGBA color string for ripple effect
 */
export function getHighlightColor(
  variant: ButtonVariant,
  colors: ColorVariables,
  isDark: boolean
): string {
  const colorKey = VARIANT_TO_COLOR_MAP[variant];
  const hslColor = colors[colorKey];
  const alpha = RIPPLE_ALPHA_MAP[isDark ? 'dark' : 'light'][variant];

  return hslToRgba(hslColor, alpha);
}
