import type { RootProps } from '@/primitives/radio-group';

/**
 * Props for RadioGroup root component
 */
export interface RadioGroupProps extends Omit<RootProps, 'asChild'> {
  /** Radio group content */
  children?: React.ReactNode;
  /** Custom class name */
  className?: string;
}
