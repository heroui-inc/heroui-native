import * as CheckboxPrimitivesTypes from '../../primitives/checkbox/checkbox.types';

/**
 * Checkbox Indicator Icon Props
 */
export interface CheckboxIndicatorIconProps {
  /** Indicator size */
  size?: number;
  /** Indicator color */
  color?: string;
}

/**
 * Render function props for checkbox children
 */
export interface CheckboxRenderProps {
  /** Whether the checkbox is selected */
  isSelected?: boolean;
  /** Whether the checkbox is invalid */
  isInvalid: boolean;
  /** Whether the checkbox is disabled */
  isDisabled: boolean;
}

/**
 * Props for the main Checkbox component
 */
export interface CheckboxProps
  extends Omit<CheckboxPrimitivesTypes.RootProps, 'children'> {
  /** Child elements to render inside the checkbox, or a render function */
  children?:
    | React.ReactNode
    | ((props: CheckboxRenderProps) => React.ReactNode);

  /** Custom class name for the checkbox */
  className?: string;
}

/**
 * Props for the CheckboxIndicator component
 */
export interface CheckboxIndicatorProps
  extends Omit<CheckboxPrimitivesTypes.IndicatorProps, 'children'> {
  /** Child elements to render inside the indicator, or a render function */
  children?:
    | React.ReactNode
    | ((props: CheckboxRenderProps) => React.ReactNode);

  /** Custom class name for the indicator */
  className?: string;

  /** Custom icon props for the indicator */
  iconProps?: CheckboxIndicatorIconProps;
}
