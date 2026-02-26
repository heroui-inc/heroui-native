import type { ViewProps } from 'react-native';
import type { AnimationRootDisableAll } from '../../helpers/internal/types';
import type { InputProps } from '../input';

/**
 * Context value provided by InputGroup root to child components.
 * Carries measured Prefix/Suffix widths so InputGroup.Input can
 * automatically apply matching paddingLeft / paddingRight.
 */
export interface InputGroupContextType {
  /** Whether the entire input group is disabled */
  isDisabled: boolean;
  /** Measured width of the Prefix element (0 when absent) */
  prefixWidth: number;
  /** Measured width of the Suffix element (0 when absent) */
  suffixWidth: number;
  /** Called by Prefix after layout to report its width */
  setPrefixWidth: (width: number) => void;
  /** Called by Suffix after layout to report its width */
  setSuffixWidth: (width: number) => void;
}

/**
 * Props for the InputGroup root component.
 * Acts as a layout container for Prefix, Input, and Suffix.
 */
export interface InputGroupProps extends ViewProps {
  /**
   * Children elements to be rendered inside the input group
   */
  children?: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Whether the entire input group and its children are disabled.
   * Cascades to Prefix, Suffix (opacity + pointer-events), and
   * Input (editable=false) via context.
   *
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Animation configuration for input group
   * - `"disable-all"`: Disable all animations including children (cascades down)
   * - `undefined`: Use default animations
   */
  animation?: AnimationRootDisableAll;
}

/**
 * Shared props for InputGroup.Prefix and InputGroup.Suffix.
 */
interface InputGroupDecoratorBaseProps extends ViewProps {
  /**
   * Content to render inside the decorator
   */
  children?: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * When `true` the decorator is non-interactive and hidden from
   * accessibility: touches pass through to the Input underneath
   * (focusing it) and the content is excluded from screen readers.
   *
   * Applies `pointerEvents="none"`, `accessibilityElementsHidden`,
   * and `importantForAccessibility="no-hide-descendants"`.
   *
   * @default false
   */
  isDecorative?: boolean;
}

/**
 * Props for the InputGroup.Prefix component.
 * Absolutely positioned on the left side of the Input.
 */
export interface InputGroupPrefixProps extends InputGroupDecoratorBaseProps {}

/**
 * Props for the InputGroup.Suffix component.
 * Absolutely positioned on the right side of the Input.
 */
export interface InputGroupSuffixProps extends InputGroupDecoratorBaseProps {}

/**
 * Props for the InputGroup.Input component.
 * Passes all props directly through to the underlying Input component.
 */
export interface InputGroupInputProps extends InputProps {}
