import type { ViewProps } from 'react-native';
import type { AnimatedProps } from 'react-native-reanimated';
import type { ElementSlots } from '../../theme';
import type { ErrorFieldSlots } from './error-field.styles';

/**
 * Props for the ErrorField root component
 */
export interface ErrorFieldRootProps extends AnimatedProps<ViewProps> {
  /**
   * The content of the error field
   * When passed as string, it will be wrapped with Text component
   */
  children?: React.ReactNode;

  /**
   * Additional CSS class for styling
   */
  className?: string;

  /**
   * Additional CSS classes for different parts of the component
   */
  classNames?: ElementSlots<ErrorFieldSlots>;

  /**
   * Controls the visibility of the error field
   * @default true
   */
  isValid?: boolean;
}
