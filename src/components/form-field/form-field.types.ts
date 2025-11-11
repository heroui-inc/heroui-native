import type { PressableProps, TextProps, ViewProps } from 'react-native';
import type { AnimatedProps, SharedValue } from 'react-native-reanimated';

type FormFieldAlignIndicator = 'start' | 'end';

type FormFieldOrientation = 'horizontal' | 'vertical';

/**
 * Base FormField props shared between all orientations
 */
interface FormFieldBaseProps extends AnimatedProps<PressableProps> {
  /** Content to render inside the form control */
  children?: React.ReactNode;

  /** Custom class name for the root element */
  className?: string;

  /** Whether the control is selected/checked @default undefined */
  isSelected?: boolean;

  /** Whether the form control is disabled @default false */
  isDisabled?: boolean;

  /** Whether the form control is inline (using inside flex-row container) @default false */
  isInline?: boolean;

  /** Whether the form control is invalid @default false */
  isInvalid?: boolean;

  /** Callback when selection state changes */
  onSelectedChange?: (isSelected: boolean) => void;
}

/**
 * FormField props for horizontal orientation
 */
interface FormFieldHorizontalProps extends FormFieldBaseProps {
  /** Layout orientation of the form control */
  orientation?: Extract<FormFieldOrientation, 'horizontal'>;

  /** Alignment of the indicator @default 'end' */
  alignIndicator?: FormFieldAlignIndicator;
}

/**
 * FormField props for vertical orientation
 */
interface FormFieldVerticalProps extends FormFieldBaseProps {
  /** Layout orientation of the form control */
  orientation: Extract<FormFieldOrientation, 'vertical'>;
  /** alignIndicator is not allowed with vertical orientation */
  alignIndicator?: undefined;
}

/**
 * Base FormField component props that extend ViewProps
 */
export type FormFieldProps = FormFieldHorizontalProps | FormFieldVerticalProps;

/**
 * Props for the FormFieldContent component
 */
export interface FormFieldContentProps extends AnimatedProps<ViewProps> {
  /** Content to render inside the content container */
  children?: React.ReactNode;

  /** Custom class name for the content element */
  className?: string;
}

/**
 * Props for the FormFieldTitle component
 */
export interface FormFieldTitleProps extends AnimatedProps<TextProps> {
  /** Title text content */
  children?: React.ReactNode;

  /** Custom class name for the title element */
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
    FormFieldBaseProps,
    'isSelected' | 'onSelectedChange' | 'isDisabled' | 'isInline' | 'isInvalid'
  > {
  isPressed: SharedValue<boolean>;
}
