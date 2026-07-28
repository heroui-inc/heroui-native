import { StyleSheet } from 'react-native';
import { tv } from '../../helpers/external/utils/cn';
import { combineStyles } from '../../helpers/internal/utils';

/**
 * Root style definition for the Alert container
 */
const root = tv({
  base: 'alert__root',
});

/**
 * Background style definition — absolute-fill container behind the alert
 * surface, hosting theme-specific layers (e.g. glass blur) or custom
 * content (gradients, images).
 */
const background = tv({
  base: 'alert__background',
});

/**
 * Indicator style definition for the status icon container
 */
const indicator = tv({
  base: 'alert__indicator',
});

/**
 * Content style definition for the title/description wrapper
 */
const content = tv({
  base: 'alert__content',
});

/**
 * Title style definition with status-based color variants
 */
const title = tv({
  base: 'alert__title',
  variants: {
    status: {
      default: 'alert__title--status-default',
      accent: 'alert__title--status-accent',
      success: 'alert__title--status-success',
      warning: 'alert__title--status-warning',
      danger: 'alert__title--status-danger',
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
  base: 'alert__description',
});

export const alertClassNames = combineStyles({
  root,
  background,
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
