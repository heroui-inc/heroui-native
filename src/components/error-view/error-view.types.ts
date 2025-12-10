import type { TextProps, ViewProps } from 'react-native';
import type {
  AnimatedProps,
  EntryOrExitLayoutType,
} from 'react-native-reanimated';
import type { ElementSlots } from '../../helpers/theme/types';
import type {
  AnimationRoot,
  AnimationValue,
} from '../../helpers/types/animation';
import type { ErrorViewSlots } from './error-view.styles';

/**
 * Animation configuration for ErrorView root component
 */
export type ErrorViewRootAnimation = AnimationRoot<{
  entering?: AnimationValue<{
    /**
     * Custom entering animation for error view
     */
    value?: EntryOrExitLayoutType;
  }>;
  exiting?: AnimationValue<{
    /**
     * Custom exiting animation for error view
     */
    value?: EntryOrExitLayoutType;
  }>;
}>;

/**
 * Props for the ErrorView root component
 */
export interface ErrorViewRootProps
  extends Omit<AnimatedProps<ViewProps>, 'entering' | 'exiting'> {
  /**
   * The content of the error field
   * When passed as string, it will be wrapped with Text component
   */
  children?: React.ReactNode;

  /**
   * Controls the visibility of the error field
   * @default false
   */
  isInvalid?: boolean;

  /**
   * Additional CSS class for styling
   */
  className?: string;

  /**
   * Additional CSS classes for different parts of the component
   */
  classNames?: ElementSlots<ErrorViewSlots>;

  /**
   * Additional props to pass to the Text component when children is a string
   */
  textProps?: TextProps;

  /**
   * Animation configuration for error view
   * - `false` or `"disabled"`: Disable all animations
   * - `true` or `undefined`: Use default animations
   * - `object`: Custom animation configuration
   */
  animation?: ErrorViewRootAnimation;
}
