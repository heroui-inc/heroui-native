import type { TextInputProps, TextProps, ViewProps } from 'react-native';
import type {
  AnimatedProps,
  EntryOrExitLayoutType,
  WithTimingConfig,
} from 'react-native-reanimated';
import type { ElementSlots } from '../../helpers/theme/types';
import type {
  Animation,
  AnimationRootDisableAll,
  AnimationValue,
} from '../../helpers/types/animation';
import type { ErrorViewRootProps } from '../error-view';
import type { InputSlots, LabelSlots } from './text-field.styles';

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
 * Animation configuration for TextField Input component
 */
export type TextFieldInputAnimation = Animation<{
  backgroundColor?: AnimationValue<{
    /**
     * Background color values for different states
     * @default Uses theme colors (field, field-focus, field)
     */
    value?: {
      /**
       * Background color when input is blurred
       * @default --colors-field
       */
      blur?: string;
      /**
       * Background color when input is focused
       * @default --colors-field-focus
       */
      focus?: string;
      /**
       * Background color when input is invalid
       * @default --colors-field (same as blur)
       */
      error?: string;
    };
  }>;
  borderColor?: AnimationValue<{
    /**
     * Border color values for different states
     * @default Uses theme colors (field-border, accent, danger)
     */
    value?: {
      /**
       * Border color when input is blurred
       * @default --colors-field-border
       */
      blur?: string;
      /**
       * Border color when input is focused
       * @default --colors-accent
       */
      focus?: string;
      /**
       * Border color when input is invalid
       * @default --colors-danger
       */
      error?: string;
    };
  }>;
  /**
   * Animation timing configuration for focus/blur transitions
   */
  focus?: AnimationValue<{
    /**
     * Animation timing configuration
     * @default { duration: 150, easing: Easing.out(Easing.ease) }
     */
    timingConfig?: WithTimingConfig;
  }>;
  /**
   * Animation timing configuration for error state transitions
   */
  error?: AnimationValue<{
    /**
     * Animation timing configuration
     * @default { duration: 150, easing: Easing.out(Easing.ease) }
     */
    timingConfig?: WithTimingConfig;
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
   * Children elements to be rendered inside the input container
   */
  children?: React.ReactNode;
  /**
   * Whether the input is in an invalid state (overrides context)
   * @default undefined - uses context value
   */
  isInvalid?: boolean;
  /**
   * Additional CSS classes
   *
   * @note The following style properties are occupied by animations and cannot be set via className:
   * - `backgroundColor` - Animated for focus/blur and error state transitions (applied to container)
   * - `borderColor` - Animated for focus/blur and error state transitions (applied to container)
   *
   * To customize these properties, use the `animation` prop:
   * ```tsx
   * <TextField.Input
   *   animation={{
   *     backgroundColor: { value: { blur: '#fff', focus: '#f0f0f0', error: '#fee' } },
   *     borderColor: { value: { blur: '#ccc', focus: '#007AFF', error: '#ff0000' } }
   *   }}
   * />
   * ```
   *
   * To completely disable animated styles and use your own via className or style prop, set `isAnimatedStyleActive={false}`.
   */
  className?: string;
  /**
   * Additional CSS classes for different parts of the input
   *
   * @note The `container` slot has the following animated properties that cannot be set via className:
   * - `backgroundColor` - Animated for focus/blur and error state transitions
   * - `borderColor` - Animated for focus/blur and error state transitions
   *
   * To customize these properties, use the `animation` prop:
   * ```tsx
   * <TextField.Input
   *   classNames={{
   *     container: "custom-class", // backgroundColor and borderColor cannot be overridden here
   *     input: "custom-input-class"
   *   }}
   *   animation={{
   *     backgroundColor: { value: { blur: '#fff', focus: '#f0f0f0', error: '#fee' } },
   *     borderColor: { value: { blur: '#ccc', focus: '#007AFF', error: '#ff0000' } }
   *   }}
   * />
   * ```
   *
   * To completely disable animated styles and use your own via className or style prop, set `isAnimatedStyleActive={false}`.
   */
  classNames?: ElementSlots<InputSlots>;
  /**
   * Animation configuration for input focus/blur and error state transitions
   * - `false` or `"disabled"`: Disable all animations
   * - `true` or `undefined`: Use default animations
   * - `object`: Custom animation configuration
   */
  animation?: TextFieldInputAnimation;
  /**
   * Whether animated styles (react-native-reanimated) are active
   * When `false`, the animated style is removed and you can implement custom logic
   * This prop should only be used when you want to write custom styling logic instead of the default animated styles
   * @default true
   */
  isAnimatedStyleActive?: boolean;
}

/**
 * Props for the TextField.InputStartContent component
 */
export interface TextFieldInputStartContentProps extends ViewProps {
  /**
   * Children elements to be rendered at the start of the input
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for the TextField.InputEndContent component
 */
export interface TextFieldInputEndContentProps extends ViewProps {
  /**
   * Children elements to be rendered at the end of the input
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
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
