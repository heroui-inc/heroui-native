import type { ReactNode } from 'react';
import type { StyleProp, TextProps, ViewStyle } from 'react-native';
import type {
  SharedValue,
  WithSpringConfig,
  WithTimingConfig,
} from 'react-native-reanimated';
import type {
  Animation,
  AnimationRoot,
  AnimationValue,
} from '../../helpers/types/animation';
import type * as DialogPrimitivesTypes from '../../primitives/dialog/dialog.types';

/**
 * Dialog internal state for animation coordination
 */
export type DialogState = 'idle' | 'open' | 'close';

/**
 * Context value for dialog animation state
 */
export interface DialogAnimationContextValue {
  /** Extended internal state for animation control */
  dialogState: DialogState;
  /** Animation progress shared value (0=idle, 1=open, 2=close) */
  progress: SharedValue<number>;
  /** Dragging state shared value */
  isDragging: SharedValue<boolean>;
}

/**
 * Spring animation configuration
 */
interface SpringAnimationConfig {
  type: 'spring';
  config?: WithSpringConfig;
}

/**
 * Timing animation configuration
 */
interface TimingAnimationConfig {
  type: 'timing';
  config?: WithTimingConfig;
}

/**
 * Animation configuration for Dialog root component
 */
export type DialogRootAnimation = AnimationRoot<{
  /**
   * Animation configuration for entering (opening)
   */
  entering?: AnimationValue<SpringAnimationConfig | TimingAnimationConfig>;
  /**
   * Animation configuration for exiting (closing)
   */
  exiting?: AnimationValue<SpringAnimationConfig | TimingAnimationConfig>;
}>;

/**
 * Dialog Root component props
 */
export interface DialogRootProps extends DialogPrimitivesTypes.RootProps {
  /**
   * The content of the dialog
   */
  children?: ReactNode;
  /**
   * Delay in milliseconds before the dialog closes (for exit animations)
   * @default 300
   */
  closeDelay?: number;
  /**
   * Whether to dismiss the keyboard when the dialog closes
   * @default true
   */
  isDismissKeyboardOnClose?: boolean;
  /**
   * Animation configuration for dialog root
   * - `"disable-all"`: Disable all animations including children
   * - `false` or `"disabled"`: Disable only root animations
   * - `true` or `undefined`: Use default animations
   * - `object`: Custom animation configuration
   */
  animation?: DialogRootAnimation;
}

/**
 * Dialog Trigger component props
 */
export interface DialogTriggerProps extends DialogPrimitivesTypes.TriggerProps {
  /**
   * The trigger element content
   */
  children?: ReactNode;
}

/**
 * Dialog Portal component props
 */
export interface DialogPortalProps extends DialogPrimitivesTypes.PortalProps {
  /**
   * Additional CSS class for the portal container
   */
  className?: string;
  /**
   * Additional style for the portal container
   */
  style?: StyleProp<ViewStyle>;
  /**
   * The portal content
   */
  children: ReactNode;
}

/**
 * Animation configuration for Dialog Overlay component
 */
export type DialogOverlayAnimation = Animation<{
  /**
   * Opacity animation configuration
   */
  opacity?: AnimationValue<{
    /**
     * Opacity values [idle, open, close]
     * @default [0, 1, 0]
     */
    value?: [number, number, number];
  }>;
}>;

/**
 * Dialog Overlay component props
 */
export interface DialogOverlayProps
  extends Omit<DialogPrimitivesTypes.OverlayProps, 'asChild' | 'style'> {
  /**
   * Additional CSS class for the overlay
   */
  className?: string;
  /**
   * Additional style for the overlay container
   */
  style?: ViewStyle;
  /**
   * Animation configuration for overlay
   * - `false` or `"disabled"`: Disable all animations
   * - `true` or `undefined`: Use default animations
   * - `object`: Custom animation configuration
   */
  animation?: DialogOverlayAnimation;
}

/**
 * Animation configuration for Dialog Content component
 */
export type DialogContentAnimation = Animation<{
  /**
   * Opacity animation configuration
   */
  opacity?: AnimationValue<{
    /**
     * Opacity values [idle, open, close]
     * @default [0, 1, 0]
     */
    value?: [number, number, number];
  }>;
  /**
   * Scale animation configuration
   */
  scale?: AnimationValue<{
    /**
     * Scale values [idle, open, close]
     * @default [0.97, 1, 0.97]
     */
    value?: [number, number, number];
  }>;
}>;

/**
 * Dialog Content component props
 */
export interface DialogContentProps
  extends Omit<DialogPrimitivesTypes.ContentProps, 'asChild'> {
  /**
   * Additional CSS class for the content container
   */
  className?: string;
  /**
   * The dialog content
   */
  children?: ReactNode;
  /**
   * Animation configuration for content
   * - `false` or `"disabled"`: Disable all animations
   * - `true` or `undefined`: Use default animations
   * - `object`: Custom animation configuration
   */
  animation?: DialogContentAnimation;
}

/**
 * Dialog Close component props
 */
export interface DialogCloseProps extends DialogPrimitivesTypes.CloseProps {
  /**
   * Close icon props
   */
  iconProps?: DialogCloseIconProps;
  /**
   * Additional CSS class for the close button
   */
  className?: string;
  /**
   * The close button content
   */
  children?: ReactNode;
}

/**
 * Close icon props
 */
export interface DialogCloseIconProps {
  /**
   * Size of the close icon
   * @default 18
   */
  size?: number;
  /**
   * Color of the close icon
   * @default --colors-foreground
   */
  color?: string;
}

/**
 * Dialog Label component props
 */
export interface DialogLabelProps extends TextProps {
  /**
   * Additional CSS class for the label
   */
  className?: string;
}

/**
 * Dialog Description component props
 */
export interface DialogDescriptionProps extends TextProps {
  /**
   * Additional CSS class for the description
   */
  className?: string;
}
