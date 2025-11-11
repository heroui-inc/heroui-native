import type { ViewProps } from 'react-native';
import type { AnimatedProps } from 'react-native-reanimated';
import type { ItemProps, RootProps } from '../../primitives/radio-group';
import type { ErrorViewRootProps } from '../error-view/error-view.types';
import type {
  FormFieldDescriptionProps,
  FormFieldTitleProps,
} from '../form-field';

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
  /** Whether the radio item is selected */
  isSelected: boolean;
  /** Whether the radio item is disabled */
  isDisabled?: boolean;
  /** Whether the radio item is invalid */
  isInvalid?: boolean;
  /** Whether the radio item is on surface */
  isOnSurface?: boolean;
}

/**
 * Render function props for RadioGroupItem children
 */
export interface RadioGroupItemRenderProps {
  /** Whether the radio item is selected */
  isSelected: boolean;
  /** Whether the radio item is disabled */
  isDisabled: boolean;
  /** Whether the radio item is invalid */
  isInvalid: boolean;
}

/**
 * Props for the RadioGroupItem component
 */
export interface RadioGroupItemProps extends Omit<ItemProps, 'children'> {
  /** Radio item content, or a render function */
  children?:
    | React.ReactNode
    | ((props: RadioGroupItemRenderProps) => React.ReactNode);
  /** Whether the radio item is invalid @default false */
  isInvalid?: boolean;
  /** Whether the radio item is on surface */
  isOnSurface?: boolean;
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
 * Props for RadioGroup.Label component
 */
export interface RadioGroupLabelProps extends FormFieldTitleProps {}

/**
 * Props for RadioGroup.Description component
 */
export interface RadioGroupDescriptionProps extends FormFieldDescriptionProps {}

/**
 * Props for RadioGroup.ErrorMessage component
 */
export interface RadioGroupErrorMessageProps extends ErrorViewRootProps {}
