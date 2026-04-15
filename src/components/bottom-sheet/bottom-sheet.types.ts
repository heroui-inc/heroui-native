import type { BottomSheetProps } from '@gorhom/bottom-sheet';
import type { ReactNode } from 'react';
import type { TextProps } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import type {
  AnimationRootDisableAll,
  BaseBottomSheetContentProps,
  PopupOverlayAnimation,
} from '../../helpers/internal/types';
import type * as BottomSheetPrimitivesTypes from '../../primitives/bottom-sheet/bottom-sheet.types';
import type { CloseButtonProps } from '../close-button/close-button.types';

/**
 * Context value for bottom sheet animation state
 */
export interface BottomSheetAnimationContextValue {
  /** Animation progress shared value (0=idle, 1=open, 2=close) */
  progress: SharedValue<number>;
  /** Dragging state shared value */
  isDragging: SharedValue<boolean>;
}

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
   * Animation configuration for bottom sheet root
   * - `"disable-all"`: Disable all animations including children
   * - `undefined`: Use default animations
   */
  animation?: AnimationRootDisableAll;
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
   * The portal content
   */
  children: ReactNode;
}

/**
 * BottomSheet Overlay component props
 */
export interface BottomSheetOverlayProps
  extends BottomSheetPrimitivesTypes.OverlayProps {
  /**
   * Additional CSS class for the overlay
   *
   * @note The following style properties are occupied by animations and cannot be set via className:
   * - `opacity` - Animated for overlay show/hide transitions (idle: 0, open: 1, close: 0)
   *
   * To customize this property, use the `animation` prop:
   * ```tsx
   * <BottomSheet.Overlay
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
  animation?: Omit<PopupOverlayAnimation, 'entering' | 'exiting'>;
  /**
   * Whether animated styles (react-native-reanimated) are active
   * When `false`, the animated style is removed and you can implement custom logic
   * This prop should only be used when you want to write custom styling logic instead of the default animated styles
   * @default true
   */
  isAnimatedStyleActive?: boolean;
}

/**
 * BottomSheet Content component props
 */
export interface BottomSheetContentProps
  extends Partial<BottomSheetProps>,
    BaseBottomSheetContentProps {}

/**
 * BottomSheet Close component props
 *
 * Extends CloseButtonProps, allowing full override of all close button props.
 * Automatically handles bottom sheet close functionality when pressed.
 */
export type BottomSheetCloseProps = CloseButtonProps;

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
   * Animation progress shared value (0=idle, 1=open, 2=close)
   */
  progress: SharedValue<number>;
}
