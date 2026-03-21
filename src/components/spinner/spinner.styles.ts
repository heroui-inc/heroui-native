import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/internal/utils';

const root = tv({
  base: 'items-center justify-center',
  variants: {
    size: {
      sm: 'size-4',
      md: 'size-6',
      lg: 'size-8',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

/**
 * Indicator style definition
 *
 * @note ANIMATED PROPERTIES (cannot be set via className):
 * The following property is animated and cannot be overridden using Tailwind classes:
 * - `transform` (specifically `rotate`) - Animated for continuous rotation animation
 *
 * To customize this property, use the `animation` prop on `Spinner.Indicator`:
 * ```tsx
 * <Spinner.Indicator
 *   animation={{
 *     rotation: { speed: 1.1, easing: Easing.linear }
 *   }}
 * />
 * ```
 *
 * To completely disable animated styles and apply your own via className or style prop,
 * set `isAnimatedStyleActive={false}` on `Spinner.Indicator`.
 */
const indicator = tv({
  base: 'size-full items-center justify-center',
});

export const spinnerClassNames = combineStyles({
  root,
  indicator,
});
