import type { ViewProps } from 'react-native';
import type { AnimationRootDisableAll } from '../../helpers/internal/types';
import type { InputProps } from '../input';

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
