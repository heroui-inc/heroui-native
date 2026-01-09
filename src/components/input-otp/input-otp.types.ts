import type { TextProps, ViewProps } from 'react-native';
import type {
  Animation,
  AnimationRootDisableAll,
  AnimationValue,
} from '../../helpers/types/animation';
import type { TextRef, ViewRef } from '../../helpers/types/primitives';
import type * as InputOTPPrimitivesTypes from '../../primitives/input-otp/input-otp.types';

/**
 * Render function props for InputOTP.Group children
 */
export interface InputOTPGroupRenderProps {
  /** Array of slot data for each position */
  slots: InputOTPPrimitivesTypes.SlotData[];
  /** Maximum length of the OTP */
  maxLength: number;
  /** Current OTP value */
  value: string;
  /** Whether the input is currently focused */
  isFocused: boolean;
  /** Whether the input is disabled */
  isDisabled: boolean;
  /** Whether the input is in an invalid state */
  isInvalid: boolean;
}

/**
 * Props for the InputOTP.Root component
 * Extends the primitive RootProps
 */
export interface InputOTPRootProps extends InputOTPPrimitivesTypes.RootProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Animation configuration for InputOTP
   * - `"disable-all"`: Disable all animations including children
   * - `undefined`: Use default animations
   */
  animation?: AnimationRootDisableAll;
}

/**
 * Ref type for InputOTP.Root component
 */
export type InputOTPRootRef = InputOTPPrimitivesTypes.RootRef;

/**
 * Props for the InputOTP.Group component
 * Extends the primitive GroupProps
 */
export interface InputOTPGroupProps
  extends Omit<InputOTPPrimitivesTypes.GroupProps, 'children'> {
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Children elements to be rendered inside the group, or a render function
   * that receives slot data and other context values
   */
  children?:
    | React.ReactNode
    | ((props: InputOTPGroupRenderProps) => React.ReactNode);
}

/**
 * Ref type for InputOTP.Group component
 */
export type InputOTPGroupRef = InputOTPPrimitivesTypes.GroupRef;

/**
 * Props for the InputOTP.Slot component
 * Extends the primitive SlotProps
 */
export interface InputOTPSlotProps extends InputOTPPrimitivesTypes.SlotProps {
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Ref type for InputOTP.Slot component
 */
export type InputOTPSlotRef = InputOTPPrimitivesTypes.SlotRef;

/**
 * Props for the InputOTP.SlotText component
 */
export interface InputOTPSlotTextProps extends TextProps {
  /**
   * Text content to display (required)
   */
  children: string;
  /**
   * Whether the slot is a placeholder
   */
  isPlaceholder: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Ref type for InputOTP.SlotText component
 */
export type InputOTPSlotTextRef = TextRef;

/**
 * Animation configuration for InputOTP.SlotCaret component
 */
export type InputOTPSlotCaretAnimation = Animation<{
  /**
   * Opacity animation configuration
   */
  opacity?: AnimationValue<{
    /**
     * Opacity values [min, max]
     * @default [0, 1]
     */
    value?: [number, number];
    /**
     * Animation duration in milliseconds
     * @default 500
     */
    duration?: number;
  }>;
  /**
   * Height animation configuration
   */
  height?: AnimationValue<{
    /**
     * Height values [min, max]
     * @default [16, 18]
     */
    value?: [number, number];
    /**
     * Animation duration in milliseconds
     * @default 500
     */
    duration?: number;
  }>;
}>;

/**
 * Props for the InputOTP.SlotCaret component
 */
export interface InputOTPSlotCaretProps extends ViewProps {
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Animation configuration for SlotCaret
   */
  animation?: InputOTPSlotCaretAnimation;
  /**
   * Whether animated styles (react-native-reanimated) are active
   * When `false`, the animated style is removed and you can implement custom logic
   * This prop should only be used when you want to write custom styling logic instead of the default animated styles
   * @default true
   */
  isAnimatedStyleActive?: boolean;
}

/**
 * Ref type for InputOTP.SlotCaret component
 */
export type InputOTPSlotCaretRef = ViewRef;

/**
 * Props for the InputOTP.Separator component
 * Extends the primitive SeparatorProps
 */
export interface InputOTPSeparatorProps
  extends InputOTPPrimitivesTypes.SeparatorProps {
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Ref type for InputOTP.Separator component
 */
export type InputOTPSeparatorRef = InputOTPPrimitivesTypes.SeparatorRef;
