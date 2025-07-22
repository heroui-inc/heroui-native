import type {
  PressableRef,
  SlottablePressableProps,
  SlottableTextProps,
  TextRef,
} from '@/helpers/types';
import type { ViewStyle } from 'react-native';

/**
 * Props for the label root component.
 *
 * @extends SlottablePressableProps Inherits pressable props except 'children', 'hitSlop', and 'style'
 */
type RootProps = Omit<
  SlottablePressableProps,
  'children' | 'hitSlop' | 'style'
> & {
  /** The content to be rendered inside the label */
  children: React.ReactNode;
  /** Style properties for the label container */
  style?: ViewStyle;
};

/**
 * Props for the label text component.
 *
 * @extends SlottableTextProps Inherits text props for slot-based styling
 */
type TextProps = SlottableTextProps & {
  /** Equivalent to `id` so that the same value can be passed as `aria-labelledby` to the input element */
  nativeID?: string;
};

/** Reference type for the label root component */
type RootRef = PressableRef;

export type { RootProps, RootRef, TextProps, TextRef };
