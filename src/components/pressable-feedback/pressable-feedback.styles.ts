/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/internal/utils';

const root = tv({
  base: 'overflow-hidden',
});

/**
 * PressableFeedback highlight style definition
 *
 * @note ANIMATED PROPERTIES (cannot be set via className):
 * The following properties are animated and cannot be overridden using Tailwind classes:
 * - `backgroundColor` - Animated for highlight background color transitions (default: theme-aware gray)
 * - `opacity` - Animated for highlight visibility transitions (unpressed: 0, pressed: 0.1, default duration: 200ms)
 *
 * To customize these properties, use the `animation` prop on `PressableFeedback.Highlight`:
 * ```tsx
 * <PressableFeedback.Highlight
 *   animation={{
 *     backgroundColor: { value: '#3f3f46' },
 *     opacity: { value: [0, 0.2], timingConfig: { duration: 300 } }
 *   }}
 * />
 * ```
 *
 * To completely disable animated styles and apply your own via className or style prop,
 * set `isAnimatedStyleActive={false}` on `PressableFeedback.Highlight`.
 */
const highlight = tv({
  base: 'absolute inset-0',
});

/**
 * PressableFeedback ripple style definition
 *
 * Contains two slots:
 * - `container`: Outer container (`absolute inset-0`) that handles touch events and positioning - styles can be fully customized
 * - `ripple`: Inner ripple element (`absolute top-0 left-0 rounded-full`) that contains animated styles
 *
 * @note ANIMATED PROPERTIES (cannot be set via className on the `ripple` slot only):
 * The following properties on the `ripple` slot are animated and cannot be overridden using Tailwind classes:
 * - `width`, `height`, `borderRadius` - Animated for ripple circle size calculations (based on container diagonal)
 * - `opacity` - Animated for ripple visibility transitions (unpressed: 0, expanding: 0.1, fading: 0)
 * - `transform` (specifically `translateX`, `translateY`, `scale`) - Animated for ripple position and expansion from touch point
 *
 * The `container` slot styles can be fully customized via className or `classNames.container`.
 *
 * To customize the animated properties on the `ripple` slot, use the `animation` prop on `PressableFeedback.Ripple`:
 * ```tsx
 * <PressableFeedback.Ripple
 *   animation={{
 *     opacity: { value: [0, 0.1, 0], timingConfig: { duration: 400 } },
 *     scale: { value: [0, 1, 1] },
 *     backgroundColor: { value: '#3f3f46' }
 *   }}
 * />
 * ```
 *
 * Touch handlers (`onTouchStart`, `onTouchEnd`, `onTouchCancel`) can be customized via props and will be called alongside animation handlers.
 *
 * To completely disable animated styles and apply your own via className or style prop,
 * set `isAnimatedStyleActive={false}` on `PressableFeedback.Ripple`.
 */
const ripple = tv({
  slots: {
    container: 'absolute inset-0',
    ripple: 'absolute top-0 left-0 rounded-full',
  },
});

export const pressableFeedbackClassNames = combineStyles({
  root,
  highlight,
  ripple,
});

export const pressableFeedbackStyleSheet = StyleSheet.create({
  root: {
    borderCurve: 'continuous',
  },
});

export type RippleSlots = keyof ReturnType<typeof ripple>;
