import type { PressableProps, ViewProps } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import type { AnimationRootDisableAll } from '../../helpers/internal/types';

/**
 * Render function props for control field children
 */
export type ControlFieldRenderProps = Pick<
  ControlFieldProps,
  'isSelected' | 'isDisabled' | 'isInvalid'
>;

/**
 * ControlField component props
 */
export interface ControlFieldProps extends Omit<PressableProps, 'children'> {
  /** Content to render inside the form control, or a render function */
  children?:
    | React.ReactNode
    | ((props: ControlFieldRenderProps) => React.ReactNode);

  /** Custom class name for the root element */
  className?: string;

  /** Whether the control is selected/checked @default undefined */
  isSelected?: boolean;

  /** Whether the form control is disabled @default false */
  isDisabled?: boolean;

  /** Whether the form control is invalid @default false */
  isInvalid?: boolean;

  /** Whether the form control is required @default false */
  isRequired?: boolean;

  /** Callback when selection state changes */
  onSelectedChange?: (isSelected: boolean) => void;

  /** Animation configuration. Use `"disable-all"` to disable all animations including children */
  animation?: AnimationRootDisableAll;
}

/**
 * Props for the ControlFieldIndicator component
 */
export interface ControlFieldIndicatorProps extends ViewProps {
  /** Control component to render (Switch, Checkbox) */
  children?: React.ReactNode;

  /** Custom class name for the indicator element */
  className?: string;

  /** Variant of the control to render when no children provided @default 'switch' */
  variant?: 'checkbox' | 'radio' | 'switch';
}

/**
 * Context value for form control components
 */
export interface ControlFieldContextValue
  extends Pick<
    ControlFieldProps,
    'isSelected' | 'onSelectedChange' | 'isDisabled' | 'isInvalid'
  > {
  isPressed: SharedValue<boolean>;
}
