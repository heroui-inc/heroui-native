import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/internal/utils';

/**
 * Root style definition for the Alert container
 */
const root = tv({
  base: 'p-3 flex-row gap-3 rounded-3xl bg-surface shadow-surface',
});

/**
 * Indicator style definition for the status icon container
 */
const indicator = tv({
  base: 'pt-[3.5px]',
});

/**
 * Content style definition for the title/description wrapper
 */
const content = tv({
  base: 'flex-1',
});

/**
 * Title style definition with status-based color variants
 */
const title = tv({
  base: 'text-base font-medium',
  variants: {
    status: {
      default: 'text-foreground',
      accent: 'text-accent',
      success: 'text-success',
      warning: 'text-warning',
      danger: 'text-danger',
    },
  },
  defaultVariants: {
    status: 'default',
  },
});

/**
 * Description style definition
 */
const description = tv({
  base: 'text-sm text-muted',
});

export const alertClassNames = combineStyles({
  root,
  indicator,
  content,
  title,
  description,
});

/** StyleSheet for native-only properties (internal use only, NOT exported from index.ts) */
export const alertStyleSheet = StyleSheet.create({
  root: {
    borderCurve: 'continuous',
  },
});
