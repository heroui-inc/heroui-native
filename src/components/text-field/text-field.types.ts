import type { TextInputProps, TextProps, ViewProps } from 'react-native';
import type {
  AnimatedProps,
  EntryOrExitLayoutType,
} from 'react-native-reanimated';
import type {
  Animation,
  AnimationRootDisableAll,
  AnimationValue,
  ElementSlots,
} from '../../helpers/internal/types';
import type { ErrorViewRootProps } from '../error-view';
import type { LabelSlots } from './text-field.styles';

/**
 * Animation configuration for TextField Label component
 */
export type TextFieldLabelAnimation = Animation<{
  entering?: AnimationValue<{
    /**
     * Custom entering animation for label
     */
    value?: EntryOrExitLayoutType;
  }>;
  exiting?: AnimationValue<{
    /**
     * Custom exiting animation for label
     */
    value?: EntryOrExitLayoutType;
  }>;
}>;

/**
 * Animation configuration for TextField Description component
 */
export type TextFieldDescriptionAnimation = Animation<{
  entering?: AnimationValue<{
    /**
     * Custom entering animation for description
     */
    value?: EntryOrExitLayoutType;
  }>;
  exiting?: AnimationValue<{
    /**
     * Custom exiting animation for description
     */
    value?: EntryOrExitLayoutType;
  }>;
}>;

/**
 * Props for the TextField.Root component
 */
export interface TextFieldRootProps extends ViewProps {
  /**
   * Children elements to be rendered inside the root container
   */
  children?: React.ReactNode;
  /**
   * Whether the entire text field is disabled
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Whether the text field is in an invalid state
   * @default false
   */
  isInvalid?: boolean;
  /**
   * Whether the text field is required (shows asterisk in label)
   * @default false
   */
  isRequired?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Animation configuration for text field root
   * - `"disable-all"`: Disable all animations including children (cascades down to all child components)
   * - `undefined`: Use default animations
   */
  animation?: AnimationRootDisableAll;
}

/**
 * Props for the TextField.Label component
 */
export interface TextFieldLabelProps
  extends Omit<AnimatedProps<TextProps>, 'entering' | 'exiting'> {
  /**
   * Whether the label is in an invalid state (overrides context)
   * @default undefined - uses context value
   */
  isInvalid?: boolean;
  /**
   * Children elements to be rendered as the label text
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Additional CSS classes for different parts of the label
   */
  classNames?: ElementSlots<LabelSlots>;
  /**
   * Animation configuration for label
   * - `false` or `"disabled"`: Disable all animations
   * - `true` or `undefined`: Use default animations
   * - `object`: Custom animation configuration
   */
  animation?: TextFieldLabelAnimation;
}

/**
 * Props for the TextField.Input component
 */
export interface TextFieldInputProps extends TextInputProps {
  /**
   * Whether the input is in an invalid state (overrides context)
   * @default undefined - uses context value
   */
  isInvalid?: boolean;
  /**
   * Variant style for the input
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary';
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Custom className for the selection color
   * @default "accent-accent"
   */
  selectionColorClassName?: string;
  /**
   * Custom className for the placeholder text color
   * @default "field-placeholder"
   */
  placeholderColorClassName?: string;
}

/**
 * Props for the TextField.Description component
 */
export interface TextFieldDescriptionProps
  extends Omit<AnimatedProps<TextProps>, 'entering' | 'exiting'> {
  /**
   * Children elements to be rendered as the description text
   */
  children?: React.ReactNode;
  /**
   * Whether the description is in an invalid state (overrides context)
   * @default undefined - uses context value
   */
  isInvalid?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Animation configuration for description
   * - `false` or `"disabled"`: Disable all animations
   * - `true` or `undefined`: Use default animations
   * - `object`: Custom animation configuration
   */
  animation?: TextFieldDescriptionAnimation;
}

/**
 * Props for the TextField.ErrorMessage component
 */
export interface TextFieldErrorMessageProps extends ErrorViewRootProps {}

/**
 * Context value for the TextField component
 */
export interface TextFieldContextValue {
  /**
   * Whether the entire text field is disabled
   */
  isDisabled: boolean;
  /**
   * Whether the text field is in an invalid state
   * @default false
   */
  isInvalid: boolean;
  /**
   * Whether the text field is required
   */
  isRequired: boolean;
}
