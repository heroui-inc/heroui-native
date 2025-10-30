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
  'background-secondary',
  'background-tertiary',
  'background-quaternary',
  'background-inverse',
  'foreground',
  'surface',
  'surface-foreground',
  'surface-secondary',
  'surface-tertiary',
  'surface-quaternary',
  'overlay',
  'overlay-foreground',
  'on-surface',
  'on-surface-foreground',
  'on-surface-hover',
  'on-surface-focus',
  'muted',
  'default',
  'default-foreground',
  'default-hover',
  'accent',
  'accent-foreground',
  'accent-hover',
  'accent-soft',
  'accent-soft-foreground',
  'accent-soft-hover',
  'field',
  'field-foreground',
  'field-placeholder',
  'field-border',
  'field-hover',
  'field-focus',
  'field-border-hover',
  'field-border-focus',
  'success',
  'success-foreground',
  'success-hover',
  'success-soft',
  'success-soft-foreground',
  'success-soft-hover',
  'warning',
  'warning-foreground',
  'warning-hover',
  'warning-soft',
  'warning-soft-foreground',
  'warning-soft-hover',
  'danger',
  'danger-foreground',
  'danger-hover',
  'danger-soft',
  'danger-soft-foreground',
  'danger-soft-hover',
  'segment',
  'segment-foreground',
  'border',
  'divider',
  'focus',
  'link',
] as const;

/**
 * Theme colors type derived from THEME_COLORS array
 */
type ThemeColor = (typeof THEME_COLORS)[number];

export { THEME_COLORS };
export type { CombinedStyles, ElementSlots, ThemeColor };
