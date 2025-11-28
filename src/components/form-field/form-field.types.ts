import type { PressableProps, TextProps, ViewProps } from 'react-native';
import type { AnimatedProps, SharedValue } from 'react-native-reanimated';

/**
 * Render function props for form field children
 */
export type FormFieldRenderProps = Pick<
  FormFieldProps,
  'isSelected' | 'isDisabled' | 'isInvalid'
>;

/**
 * FormField component props
 */
export interface FormFieldProps
  extends Omit<AnimatedProps<PressableProps>, 'children'> {
  /** Content to render inside the form control, or a render function */
  children?:
    | React.ReactNode
    | ((props: FormFieldRenderProps) => React.ReactNode);

  /** Custom class name for the root element */
  className?: string;

  /** Whether the control is selected/checked @default undefined */
  isSelected?: boolean;

  /** Whether the form control is disabled @default false */
  isDisabled?: boolean;

  /** Whether the form control is invalid @default false */
  isInvalid?: boolean;

  /** Callback when selection state changes */
  onSelectedChange?: (isSelected: boolean) => void;
}

/**
 * Props for the FormFieldLabel component
 */
export interface FormFieldLabelProps extends AnimatedProps<TextProps> {
  /** Label text content */
  children?: React.ReactNode;

  /** Custom class name for the label element */
  className?: string;
}

/**
 * Props for the FormFieldDescription component
 */
export interface FormFieldDescriptionProps extends AnimatedProps<TextProps> {
  /** Description text content */
  children?: React.ReactNode;

  /** Custom class name for the description element */
  className?: string;
}

/**
 * Props for the FormFieldIndicator component
 */
export interface FormFieldIndicatorProps extends AnimatedProps<ViewProps> {
  /** Control component to render (Switch, Checkbox) */
  children?: React.ReactNode;

  /** Custom class name for the indicator element */
  className?: string;
}

/**
 * Context value for form control components
 */
export interface FormFieldContextValue
  extends Pick<
    FormFieldProps,
    'isSelected' | 'onSelectedChange' | 'isDisabled' | 'isInvalid'
  > {
  isPressed: SharedValue<boolean>;
}
