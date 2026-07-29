import type { TextProps, ViewProps } from 'react-native';
import type { EntryOrExitLayoutType } from 'react-native-reanimated';
import type { ThemeColor } from '../../helpers/external/hooks';
import type {
  Animation,
  AnimationRootDisableAll,
  AnimationValue,
  TextRef,
  ViewRef,
} from '../../helpers/internal/types';
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
export type InputOTPRef = InputOTPPrimitivesTypes.RootRef;

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
 * Props for the InputOTP.SlotBackground sub-component.
 * Generic absolute-fill container behind the slot content. When no
 * `children` are given, the active library theme decides the default
 * content (e.g. a frosted-glass blur layer when the theme is `glass`).
 */
export type InputOTPSlotBackgroundProps = ViewProps & {
  /** Additional CSS classes */
  className?: string;
  /**
   * Theme color token forwarded to the theme content as the opaque fallback
   * on platforms without native blur (Android / web)
   * @default 'field'
   */
  fallbackColor?: ThemeColor;
};

/**
 * Props for the InputOTP.Slot component
 * Extends the primitive SlotProps
 */
export interface InputOTPSlotProps extends InputOTPPrimitivesTypes.SlotProps {
  /**
   * Variant style for the slot
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary';
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Background layer rendered behind the slot content.
   * - `undefined` (default): renders `InputOTP.SlotBackground`, whose
   *   content is decided by the active library theme; the fallback color
   *   follows the variant (primary → field token, secondary → default token)
   * - custom node: replaces the default layer entirely (wrap content in
   *   `InputOTP.SlotBackground` to keep the absolute-fill and clipping)
   * - `null`: removes the background layer
   */
  background?: React.ReactNode;
}

/**
 * Ref type for InputOTP.Slot component
 */
export type InputOTPSlotRef = InputOTPPrimitivesTypes.SlotRef;

/**
 * Context value for InputOTP.Slot component
 */
export interface InputOTPSlotContextValue {
  /** Slot data for the current slot */
  slot: InputOTPPrimitivesTypes.SlotData | undefined;
  /** Whether this slot is currently active (where cursor is) */
  isActive: boolean;
  /** Whether to show fake caret (when active but empty) */
  isCaretVisible: boolean;
  /** Variant style for the slot */
  variant?: 'primary' | 'secondary';
}

/**
 * Props for the InputOTP.SlotPlaceholder component
 */
export interface InputOTPSlotPlaceholderProps extends TextProps {
  /**
   * Text content to display (optional, defaults to slot.placeholderChar)
   */
  children?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Ref type for InputOTP.SlotPlaceholder component
 */
export type InputOTPSlotPlaceholderRef = TextRef;

/**
 * Animation configuration for InputOTP.SlotValue component
 */
export type InputOTPSlotValueAnimation = Animation<{
  /**
   * Wrapper animation configuration (fade in/out for the container)
   */
  wrapper?: AnimationValue<{
    /**
     * Entering animation for wrapper
     * @default FadeIn.duration(250)
     */
    entering?: EntryOrExitLayoutType;
    /**
     * Exiting animation for wrapper
     * @default FadeOut.duration(100)
     */
    exiting?: EntryOrExitLayoutType;
  }>;
  /**
   * Text animation configuration (flip animations for the text)
   */
  text?: AnimationValue<{
    /**
     * Entering animation for text
     * @default FlipInXDown.duration(250).easing(...)
     */
    entering?: EntryOrExitLayoutType;
    /**
     * Exiting animation for text
     * @default FlipOutXDown.duration(250).easing(...)
     */
    exiting?: EntryOrExitLayoutType;
  }>;
}>;

/**
 * Props for the InputOTP.SlotValue component
 */
export interface InputOTPSlotValueProps extends TextProps {
  /**
   * Text content to display (optional, defaults to slot.char)
   */
  children?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Animation configuration for SlotValue
   * Controls both wrapper (fade) and text (flip) animations
   */
  animation?: InputOTPSlotValueAnimation;
}

/**
 * Ref type for InputOTP.SlotValue component
 */
export type InputOTPSlotValueRef = TextRef;

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
