import type { TextStyle } from 'react-native';
import type {
  AnimationRootDisableAll,
  ElementSlots,
  PressableRef,
  TextRef,
} from '../../helpers/internal/types';
import type * as LabelPrimitivesTypes from '../../primitives/label/label.types';
import type { LabelSlots } from './label.styles';

/**
 * Props for the main Label component
 */
export interface LabelProps extends LabelPrimitivesTypes.RootProps {
  /**
   * Whether the label is required (shows asterisk)
   * @default false
   */
  isRequired?: boolean;

  /**
   * Whether the label is in an invalid state
   * @default false
   */
  isInvalid?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Animation configuration for label
   * - `"disable-all"`: Disable all animations including children
   * - `undefined`: Use default animations
   */
  animation?: AnimationRootDisableAll;
}

/**
 * Props for the Label.Text component
 */
export interface LabelTextProps extends LabelPrimitivesTypes.TextProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Additional CSS classes for different parts of the label
   */
  classNames?: ElementSlots<LabelSlots>;
  /**
   * Styles for different parts of the label
   */
  styles?: Partial<Record<LabelSlots, TextStyle>>;
}

/**
 * Context value for Label components
 */
export interface LabelContextValue {
  /**
   * Whether the label is disabled
   */
  isDisabled: boolean;

  /**
   * Whether the label is required
   */
  isRequired: boolean;

  /**
   * Whether the label is in an invalid state
   */
  isInvalid: boolean;
}

/**
 * Reference type for the Label component
 */
export type LabelRef = PressableRef;

/**
 * Reference type for the Label.Text component
 */
export type LabelTextRef = TextRef;
