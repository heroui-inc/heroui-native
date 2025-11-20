import type { ReactNode } from 'react';
import type { StyleProp, TextProps, ViewStyle } from 'react-native';
import type {
  SharedValue,
  WithSpringConfig,
  WithTimingConfig,
} from 'react-native-reanimated';
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
  animationType: 'spring';
  animationConfig?: WithSpringConfig;
}

/**
 * Timing animation configuration
 */
interface TimingAnimationConfig {
  animationType: 'timing';
  animationConfig?: WithTimingConfig;
}

/**
 * Progress animation configuration
 */
export interface DialogProgressAnimationConfigs {
  /**
   * Animation configuration for opening
   */
  onOpen?: SpringAnimationConfig | TimingAnimationConfig;
  /**
   * Animation configuration for closing
   */
  onClose?: SpringAnimationConfig | TimingAnimationConfig;
}

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
   * Animation configurations for open/close progress animations
   */
  progressAnimationConfigs?: DialogProgressAnimationConfigs;
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
 * Dialog Overlay component props
 */
export interface DialogOverlayProps
  extends Omit<DialogPrimitivesTypes.OverlayProps, 'asChild'> {
  /**
   * Additional CSS class for the overlay
   */
  className?: string;
  /**
   * Whether to disable the default opacity animation
   * Use this when you want to animate opacity using your own Reanimated useAnimatedStyle
   * @default false
   */
  isDefaultAnimationDisabled?: boolean;
}

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
   * Whether to disable the default animations (opacity, scale)
   * Use this when you want to animate these properties using your own Reanimated useAnimatedStyle
   * @default false
   */
  isDefaultAnimationDisabled?: boolean;
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
 * Dialog Title component props
 */
export interface DialogTitleProps extends TextProps {
  /**
   * Additional CSS class for the title
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
