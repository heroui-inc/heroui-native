import type { ClassValue } from 'tailwind-variants';

/**
 * This Typescript utility transform a list of slots into a list of {slot: classes}
 */
type ElementSlots<S extends string> = {
  [key in S]?: Exclude<ClassValue, 0n>;
};

/**
 * Type helper that preserves the exact type of combined style objects
 * This ensures that VariantProps inference works correctly for each style
 */
type CombinedStyles<T extends Record<string, any>> = {
  [K in keyof T]: T[K];
};

/**
 * Theme colors as const array for efficient mapping
 */
const THEME_COLORS = [
  'background',
  'foreground',
  'panel',
  'panel-foreground',
  'muted',
  'default',
  'default-foreground',
  'surface-1',
  'surface-2',
  'surface-3',
  'accent',
  'accent-foreground',
  'accent-soft',
  'accent-soft-foreground',
  'success',
  'success-foreground',
  'warning',
  'warning-foreground',
  'danger',
  'danger-foreground',
  'border',
  'divider',
  'link',
] as const;

/**
 * Theme colors type derived from THEME_COLORS array
 */
type ThemeColor = (typeof THEME_COLORS)[number];

export { THEME_COLORS };
export type { CombinedStyles, ElementSlots, ThemeColor };
