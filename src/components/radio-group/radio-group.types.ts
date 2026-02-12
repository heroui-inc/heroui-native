import type { AnimationRootDisableAll } from '../../helpers/internal/types';
import type { ItemProps, RootProps } from '../../primitives/radio-group';

/**
 * Props for RadioGroup root component
 */
export interface RadioGroupProps extends Omit<RootProps, 'asChild'> {
  /** Radio group content */
  children?: React.ReactNode;
  /** Custom class name */
  className?: string;
  /**
   * Animation configuration for radio group
   * - `"disable-all"`: Disable all animations including children
   * - `undefined`: Use default animations
   */
  animation?: AnimationRootDisableAll;
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
  /** Variant style for the radio item */
  variant?: 'primary' | 'secondary';
  /** Callback to change the selection state (selects this item in the group) */
  onSelectedChange?: (isSelected: boolean) => void;
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
  /** Variant style for the radio item
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary';
  /** Custom class name */
  className?: string;
}
