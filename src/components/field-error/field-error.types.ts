import type { TextProps, TextStyle, ViewProps, ViewStyle } from 'react-native';
import type {
  AnimatedProps,
  EntryOrExitLayoutType,
} from 'react-native-reanimated';
import type {
  AnimationRoot,
  AnimationValue,
  ElementSlots,
} from '../../helpers/internal/types';
import type { FieldErrorSlots } from './field-error.styles';

/**
 * Animation configuration for FieldError root component
 */
export type FieldErrorRootAnimation = AnimationRoot<{
  entering?: AnimationValue<{
    /**
     * Custom entering animation for field error
     */
    value?: EntryOrExitLayoutType;
  }>;
  exiting?: AnimationValue<{
    /**
     * Custom exiting animation for field error
     */
    value?: EntryOrExitLayoutType;
  }>;
}>;

/**
 * Props for the FieldError root component
 */
export interface FieldErrorRootProps
  extends Omit<AnimatedProps<ViewProps>, 'entering' | 'exiting'> {
  /**
   * The content of the error field
   * When passed as string, it will be wrapped with Text component
   */
  children?: React.ReactNode;

  /**
   * Controls the visibility of the error field (overrides context)
   * When false, the field error is hidden
   * @default undefined - uses form-item-state context value
   */
  isInvalid?: boolean;

  /**
   * Additional CSS class for styling
   */
  className?: string;

  /**
   * Additional CSS classes for different parts of the component
   */
  classNames?: ElementSlots<FieldErrorSlots>;

  /**
   * Styles for different parts of the field error
   */
  styles?: {
    container?: ViewStyle;
    text?: TextStyle;
  };

  /**
   * Additional props to pass to the Text component when children is a string
   */
  textProps?: TextProps;

  /**
   * Animation configuration for field error
   * - `false` or `"disabled"`: Disable all animations
   * - `true` or `undefined`: Use default animations
   * - `object`: Custom animation configuration
   */
  animation?: FieldErrorRootAnimation;
}
