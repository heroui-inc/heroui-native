import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/theme/utils/combine-styles';

const root = tv({
  base: 'gap-1',
  variants: {
    isDisabled: {
      true: 'pointer-events-none opacity-disabled',
    },
  },
});

const label = tv({
  slots: {
    text: 'mx-1 text-base text-foreground font-medium',
    asterisk: 'text-lg/6 text-danger',
  },
  variants: {
    isDisabled: {
      true: {
        text: '',
        asterisk: 'text-muted',
      },
    },
    isInvalid: {
      true: {
        text: 'text-danger',
      },
    },
  },
});

/**
 * Input style definition
 *
 * @note ANIMATED PROPERTIES (cannot be set via className):
 * The following properties are animated and cannot be overridden using Tailwind classes:
 * - `backgroundColor` - Animated for focus/blur and error state transitions
 * - `borderColor` - Animated for focus/blur and error state transitions
 *
 * To customize these properties, use the `animation` prop on `TextField.Input`:
 * ```tsx
 * <TextField.Input
 *   animation={{
 *     backgroundColor: { value: { blur: '#fff', focus: '#f0f0f0', error: '#fee' } },
 *     borderColor: { value: { blur: '#ccc', focus: '#007AFF', error: '#ff0000' } }
 *   }}
 * />
 * ```
 *
 * To completely disable animated styles and apply your own via className or style prop,
 * set `isAnimatedStyleActive={false}` on `TextField.Input`.
 */
const input = tv({
  base: 'py-3.5 px-3 rounded-2xl border-[1.5px] text-foreground font-normal',
});

const placeholderTextColor = tv({
  base: 'field-placeholder',
});

const inputSelectionColor = tv({
  base: 'accent-accent',
  variants: {
    isInvalid: {
      true: 'accent-danger',
    },
  },
});

const description = tv({
  base: 'm-1 text-sm text-muted',
});

const errorMessage = tv({
  base: 'p-1',
});

export const styleSheet = StyleSheet.create({
  borderCurve: {
    borderCurve: 'continuous',
  },
});

const textFieldStyles = combineStyles({
  root,
  label,
  input,
  inputSelectionColor,
  placeholderTextColor,
  description,
  errorMessage,
});

export type LabelSlots = keyof ReturnType<typeof label>;

export default textFieldStyles;
