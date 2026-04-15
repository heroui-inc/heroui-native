import type { ReactNode } from 'react';
import type { StyleProp, TextProps, ViewStyle } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import type {
  AnimationRootDisableAll,
  PopupDialogContentAnimation,
  PopupOverlayAnimation,
} from '../../helpers/internal/types';
import type * as DialogPrimitivesTypes from '../../primitives/dialog/dialog.types';
import type { CloseButtonProps } from '../close-button/close-button.types';

/**
 * Dialog internal state for animation coordination
 */
export type DialogState = 'idle' | 'open' | 'close';

/**
 * Context value for dialog animation state
 */
export interface DialogAnimationContextValue {
  /** Animation progress shared value (0=idle, 1=open, 2=close) */
  progress: SharedValue<number>;
  /** Dragging state shared value */
  isDragging: SharedValue<boolean>;
  /** Gesture release animation running state shared value */
  isGestureReleaseAnimationRunning: SharedValue<boolean>;
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
   * Animation configuration for dialog root
   * - `"disable-all"`: Disable all animations including children
   * - `false` or `"disabled"`: Disable only root animations
   * - `true` or `undefined`: Use default animations
   */
  animation?: AnimationRootDisableAll;
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
   * When true, uses a regular View instead of FullWindowOverlay on iOS.
   * Enables React Native element inspector but overlay won't appear above native modals.
   * @default false
   */
  disableFullWindowOverlay?: boolean;
  /**
   * Controls whether VoiceOver treats the overlay window as a modal container.
   * When `false`, VoiceOver can still access elements behind the overlay.
   * When `true`, VoiceOver is restricted to elements inside the overlay.
   * @default false
   * @platform ios
   * @unstable This prop maps directly to the native `accessibilityViewIsModal`
   * on the container view and may change in a future react-native-screens release.
   */
  unstable_accessibilityContainerViewIsModal?: boolean;
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
export type DialogOverlayAnimation = PopupOverlayAnimation;

/**
 * Dialog Overlay component props
 */
export interface DialogOverlayProps
  extends Omit<DialogPrimitivesTypes.OverlayProps, 'asChild'> {
  /**
   * Additional CSS class for the overlay
   *
   * @note The following style properties are occupied by animations and cannot be set via className:
   * - `opacity` - Animated for overlay show/hide transitions (idle: 0, open: 1, close: 0)
   *
   * To customize this property, use the `animation` prop:
   * ```tsx
   * <Dialog.Overlay
   *   animation={{
   *     opacity: { value: [0, 1, 0] }
   *   }}
   * />
   * ```
   *
   * To completely disable animated styles and use your own via className or style prop, set `isAnimatedStyleActive={false}`.
   */
  className?: string;
  /**
   * Animation configuration for overlay
   * - `false` or `"disabled"`: Disable all animations
   * - `true` or `undefined`: Use default animations
   * - `object`: Custom animation configuration
   */
  animation?: DialogOverlayAnimation;
  /**
   * Whether animated styles (react-native-reanimated) are active
   * When `false`, the animated style is removed and you can implement custom logic
   * This prop should only be used when you want to write custom styling logic instead of the default animated styles
   * @default true
   */
  isAnimatedStyleActive?: boolean;
}

/**
 * Animation configuration for Dialog Content component
 * Reuses PopupDialogContentAnimation since they share the same animation behavior
 */
export type DialogContentAnimation = PopupDialogContentAnimation;

/**
 * Dialog Content component props
 */
export interface DialogContentProps
  extends Omit<DialogPrimitivesTypes.ContentProps, 'asChild'> {
  /**
   * Additional CSS class for the content container
   *
   * @note The following style properties are occupied by animations and cannot be set via className:
   * - `opacity` - Animated for content show/hide transitions (idle: 0, open: 1, close: 0)
   * - `transform` (specifically `scale`) - Animated for content show/hide transitions (idle: 0.97, open: 1, close: 0.97)
   *
   * To customize these properties, use the `animation` prop:
   * ```tsx
   * <Dialog.Content
   *   animation={{
   *     opacity: { value: [0, 1, 0] },
   *     scale: { value: [0.97, 1, 0.97] }
   *   }}
   * />
   * ```
   *
   * To completely disable animated styles and use your own via className or style prop, set `isAnimatedStyleActive={false}`.
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
  /**
   * Whether the dialog content can be swiped to dismiss
   * @default true
   */
  isSwipeable?: boolean;
}

/**
 * Dialog Close component props
 *
 * Extends CloseButtonProps, allowing full override of all close button props.
 * Automatically handles dialog close functionality when pressed.
 */
export type DialogCloseProps = CloseButtonProps;

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
