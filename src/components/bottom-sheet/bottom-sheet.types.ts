import type GorhomBottomSheet from '@gorhom/bottom-sheet';
import type { ReactNode } from 'react';
import type { TextProps } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import type {
  AnimationRootDisableAll,
  PopupOverlayAnimation,
} from '../../helpers/types/animation';
import type { BaseBottomSheetContentProps } from '../../helpers/types/bottom-sheet';
import type * as BottomSheetPrimitivesTypes from '../../primitives/bottom-sheet/bottom-sheet.types';

/**
 * Bottom sheet internal state for animation coordination
 */
export type BottomSheetState = 'idle' | 'open' | 'close';

/**
 * Context value for bottom sheet animation state
 */
export interface BottomSheetAnimationContextValue {
  /** Extended internal state for animation control */
  bottomSheetState: BottomSheetState;
  /** Animation progress shared value (0=idle, 1=open, 2=close) */
  progress: SharedValue<number>;
}

/**
 * Animation configuration for BottomSheet root component
 */
export type BottomSheetRootAnimation = AnimationRootDisableAll;

/**
 * BottomSheet Root component props
 */
export interface BottomSheetRootProps
  extends BottomSheetPrimitivesTypes.RootProps {
  /**
   * The content of the bottom sheet
   */
  children?: ReactNode;
  /**
   * Delay in milliseconds before the bottom sheet closes (for exit animations)
   * @default 300
   */
  closeDelay?: number;
  /**
   * Whether to dismiss the keyboard when the bottom sheet closes
   * @default true
   */
  isDismissKeyboardOnClose?: boolean;
  /**
   * Animation configuration for bottom sheet root
   * - `"disable-all"`: Disable all animations including children
   * - `undefined`: Use default animations
   */
  animation?: BottomSheetRootAnimation;
}

/**
 * BottomSheet Trigger component props
 */
export interface BottomSheetTriggerProps
  extends BottomSheetPrimitivesTypes.TriggerProps {
  /**
   * The trigger element content
   */
  children?: ReactNode;
}

/**
 * BottomSheet Portal component props
 */
export interface BottomSheetPortalProps
  extends BottomSheetPrimitivesTypes.PortalProps {
  /**
   * The portal content
   */
  children: ReactNode;
}

/**
 * Animation configuration for BottomSheet Overlay component
 */
export type BottomSheetOverlayAnimation = PopupOverlayAnimation;

/**
 * BottomSheet Overlay component props
 */
export interface BottomSheetOverlayProps
  extends BottomSheetPrimitivesTypes.OverlayProps {
  /**
   * Additional CSS class for the overlay
   */
  className?: string;
  /**
   * Animation configuration for overlay
   * - `false` or `"disabled"`: Disable all animations
   * - `true` or `undefined`: Use default animations
   * - `object`: Custom animation configuration
   */
  animation?: BottomSheetOverlayAnimation;
}

/**
 * BottomSheet Content component props
 */
export interface BottomSheetContentProps
  extends Partial<React.ComponentProps<typeof GorhomBottomSheet>>,
    BaseBottomSheetContentProps {}

/**
 * BottomSheet Close component props
 */
export interface BottomSheetCloseProps
  extends BottomSheetPrimitivesTypes.CloseProps {
  /**
   * Close icon props
   */
  iconProps?: BottomSheetCloseIconProps;
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
export interface BottomSheetCloseIconProps {
  /**
   * Size of the close icon
   * @default 18
   */
  size?: number;
  /**
   * Color of the close icon
   * @default theme color muted
   */
  color?: string;
}

/**
 * BottomSheet Title component props
 */
export interface BottomSheetTitleProps extends TextProps {
  /**
   * Additional CSS class for the title
   */
  className?: string;
}

/**
 * BottomSheet Description component props
 */
export interface BottomSheetDescriptionProps extends TextProps {
  /**
   * Additional CSS class for the description
   */
  className?: string;
}

/**
 * Return type for the useBottomSheetAnimation hook
 */
export interface UseBottomSheetAnimationReturn {
  /**
   * Extended internal state for coordinating animations
   */
  bottomSheetState: BottomSheetState;
  /**
   * Animation progress shared value (0=idle, 1=open, 2=close)
   */
  progress: SharedValue<number>;
}
