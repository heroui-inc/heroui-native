import type { ReanimatedAnimationProps } from '@/helpers/types';
import type { ElementSlots } from '@/theme';
import type { PressableProps, ViewProps } from 'react-native';

type FormFieldAlignIndicator = 'start' | 'end';

type FormFieldOrientation = 'horizontal' | 'vertical';

/**
 * Base FormField props shared between all orientations
 */
interface FormFieldBaseProps extends PressableProps, ReanimatedAnimationProps {
  /** Content to render inside the form control */
  children?: React.ReactNode;

  /** Custom class name for the root element */
  className?: string;

  /** Whether the control is selected/checked @default undefined */
  isSelected?: boolean;

  /** Callback when selection state changes */
  onSelectedChange?: (isSelected: boolean) => void;

  /** Whether the form control is disabled @default false */
  isDisabled?: boolean;

  /** Whether the form control is read-only @default false */
  isReadOnly?: boolean;

  /** Whether the form control is inline (using inside flex-row container) @default false */
  isInline?: boolean;

  /** Whether the form control is valid @default true */
  isValid?: boolean;
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
export interface FormFieldContentProps
  extends ViewProps,
    ReanimatedAnimationProps {
  /** Content to render inside the content container */
  children?: React.ReactNode;

  /** Custom class name for the content element */
  className?: string;
}

/**
 * Label slot names for styling customization
 */
export type LabelSlots = 'container' | 'text';

/**
 * Props for the FormFieldLabel component
 */
export interface FormFieldLabelProps
  extends ViewProps,
    ReanimatedAnimationProps {
  /** Label text content */
  children?: React.ReactNode;

  /** Custom class name for the label element */
  className?: string;

  /** Custom class names for different parts of the component */
  classNames?: ElementSlots<LabelSlots>;
}

/**
 * Description slot names for styling customization
 */
export type DescriptionSlots = 'container' | 'text';

/**
 * Props for the FormFieldDescription component
 */
export interface FormFieldDescriptionProps
  extends ViewProps,
    ReanimatedAnimationProps {
  /** Description text content */
  children?: React.ReactNode;

  /** Custom class name for the description element */
  className?: string;

  /** Custom class names for different parts of the component */
  classNames?: ElementSlots<DescriptionSlots>;
}

/**
 * Props for the FormFieldIndicator component
 */
export interface FormFieldIndicatorProps
  extends ViewProps,
    ReanimatedAnimationProps {
  /** Control component to render (Switch, Checkbox, Radio) */
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
    | 'isSelected'
    | 'onSelectedChange'
    | 'isDisabled'
    | 'isReadOnly'
    | 'isInline'
    | 'isValid'
  > {}
