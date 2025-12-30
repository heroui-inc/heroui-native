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
 * The following properties in the `container` slot are animated and cannot be overridden using Tailwind classes:
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
  slots: {
    container:
      'h-[48px] px-3 rounded-2xl border-[1.5px] flex-row items-center gap-3',
    input: 'flex-1 h-full text-foreground font-normal',
  },
  variants: {
    isMultiline: {
      true: {
        container: 'h-[120px]',
        input: 'py-2.5',
      },
    },
  },
});

const inputStartContent = tv({
  base: '',
});

const inputEndContent = tv({
  base: '',
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
  inputStartContent,
  inputEndContent,
  description,
  errorMessage,
});

export type LabelSlots = keyof ReturnType<typeof label>;
export type InputSlots = keyof ReturnType<typeof input>;

export default textFieldStyles;
