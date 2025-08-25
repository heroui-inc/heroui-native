import type { ViewProps } from 'react-native';
import type { AnimatedProps } from 'react-native-reanimated';
import type { ElementSlots } from '../../providers/theme';
import type { ErrorViewSlots } from './error-view.styles';

/**
 * Props for the ErrorView root component
 */
export interface ErrorViewRootProps extends AnimatedProps<ViewProps> {
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
}
