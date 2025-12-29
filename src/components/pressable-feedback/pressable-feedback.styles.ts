/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';

/**
 * PressableFeedback root style definition
 *
 * @note ANIMATED PROPERTIES (cannot be set via className):
 * The following property is animated and cannot be overridden using Tailwind classes:
 * - `transform` (specifically `scale`) - Animated for press feedback transitions (unpressed: 1, pressed: adjusted scale based on container width, default: 0.985)
 *
 * To customize this property, use the `animation` prop on `PressableFeedback`:
 * ```tsx
 * <PressableFeedback
 *   animation={{
 *     scale: { value: 0.985, timingConfig: { duration: 300, easing: Easing.out(Easing.ease) } }
 *   }}
 * />
 * ```
 *
 * To completely disable animated styles and apply your own via className or style prop,
 * set `isAnimatedStyleActive={false}` on `PressableFeedback`.
 */
const pressableFeedbackStyles = tv({
  base: 'overflow-hidden',
});

export const styleSheet = StyleSheet.create({
  root: {
    borderCurve: 'continuous',
  },
});

export default pressableFeedbackStyles;
