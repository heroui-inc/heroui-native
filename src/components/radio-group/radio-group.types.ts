import type { RootProps } from '../../primitives/radio-group';
import type { ErrorFieldRootProps } from '../error-field/error-field.types';

/**
 * Props for RadioGroup root component
 */
export interface RadioGroupProps extends Omit<RootProps, 'asChild'> {
  /** Radio group content */
  children?: React.ReactNode;
  /** Custom class name */
  className?: string;
}

/**
 * Props for RadioGroup.ErrorMessage component
 */
export interface RadioGroupErrorMessageProps extends ErrorFieldRootProps {}
