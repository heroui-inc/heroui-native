import type { ViewProps } from 'react-native';
import type { AnimatedProps } from 'react-native-reanimated';
import type { ItemProps, RootProps } from '../../primitives/radio-group';
import type { ErrorViewRootProps } from '../error-view/error-view.types';
import type {
  FormFieldDescriptionProps,
  FormFieldTitleProps,
} from '../form-field';

/**
 * RadioGroupItem color variant
 * @default 'default'
 */
export type RadioGroupItemColor = 'default' | 'success' | 'warning' | 'danger';

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
 * Context values shared between RadioGroupItem compound components
 */
export interface RadioGroupItemContextValue {
  /** Current color variant */
  color: RadioGroupItemColor;
  /** Whether the radio item is selected */
  isSelected: boolean;
  /** Whether the radio item is disabled */
  isDisabled?: boolean;
  /** Whether the radio item is invalid */
  isInvalid?: boolean;
}

/**
 * Props for the RadioGroupItem component
 */
export interface RadioGroupItemProps extends ItemProps {
  /** Radio item content */
  children?: React.ReactNode;
  /** Color variant */
  color?: RadioGroupItemColor;
  /** Whether the radio item is invalid @default false */
  isInvalid?: boolean;
  /** Custom class name */
  className?: string;
}

/**
 * Props for RadioGroup.Indicator component
 */
export interface RadioGroupIndicatorProps extends AnimatedProps<ViewProps> {
  /** Indicator content */
  children?: React.ReactNode;
  /** Custom class name */
  className?: string;
}

/**
 * Props for RadioGroup.IndicatorThumb component
 */
export interface RadioGroupIndicatorThumbProps
  extends Omit<AnimatedProps<ViewProps>, 'children'> {
  /** Custom class name */
  className?: string;
}

/**
 * Props for RadioGroup.Title component
 */
export interface RadioGroupTitleProps extends FormFieldTitleProps {}

/**
 * Props for RadioGroup.Description component
 */
export interface RadioGroupDescriptionProps extends FormFieldDescriptionProps {}

/**
 * Props for RadioGroup.ErrorMessage component
 */
export interface RadioGroupErrorMessageProps extends ErrorViewRootProps {}
