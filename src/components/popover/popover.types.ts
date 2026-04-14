import type { BottomSheetProps } from '@gorhom/bottom-sheet';
import type { ReactNode } from 'react';
import type { StyleProp, TextProps, ViewStyle } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import type {
  AnimationRootDisableAll,
  BaseBottomSheetContentProps,
  PopupOverlayAnimation,
  PopupPopoverContentAnimation,
} from '../../helpers/internal/types';
import type * as PopoverPrimitivesTypes from '../../primitives/popover/popover.types';
import type { CloseButtonProps } from '../close-button/close-button.types';

/**
 * Context value for popover animation state
 */
export interface PopoverAnimationContextValue {
  /** Animation progress shared value (0=idle, 1=open, 2=close) */
  progress: SharedValue<number>;
  /** Dragging state shared value */
  isDragging: SharedValue<boolean>;
}

/**
 * Ref type for the Popover Trigger component
 */
export type PopoverTriggerRef = PopoverPrimitivesTypes.TriggerRef;

/**
 * Presentation mode for the popover content
 */
export type PopoverPresentation = 'popover' | 'bottom-sheet';

/**
 * Popover placement options
 */
export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right';

/**
 * Popover alignment options
 */
export type PopoverAlign = 'start' | 'center' | 'end';

/**
 * Popover context value with presentation and placement
 */
export interface PopoverContentContextValue {
  /**
   * Current placement of the popover
   */
  placement?: PopoverPlacement;
}

/**
 * Popover Root component props
 */
export interface PopoverRootProps extends PopoverPrimitivesTypes.RootProps {
  /**
   * The content of the popover
   */
  children?: ReactNode;
  /**
   * Animation configuration for popover root
   * - `"disable-all"`: Disable all animations including children
   * - `false` or `"disabled"`: Disable only root animations
   * - `true` or `undefined`: Use default animations
   */
  animation?: AnimationRootDisableAll;
}

/**
 * Popover Trigger component props
 */
export interface PopoverTriggerProps
  extends PopoverPrimitivesTypes.TriggerProps {
  /**
   * The trigger element content
   */
  children?: ReactNode;
  /**
   * Additional CSS class for the trigger
   */
  className?: string;
}

/**
 * Popover Portal component props
 */
export interface PopoverPortalProps extends PopoverPrimitivesTypes.PortalProps {
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
   * The portal content
   */
  children: ReactNode;
}

/**
 * Popover Overlay component props
 */
export interface PopoverOverlayProps
  extends Omit<PopoverPrimitivesTypes.OverlayProps, 'asChild'> {
  /**
   * Additional CSS class for the overlay
   *
   * @note The following style properties are occupied by animations and cannot be set via className:
   * - `opacity` - Animated for overlay show/hide transitions (idle: 0, open: 1, close: 0) - only for bottom-sheet/dialog presentation
   *
   * To customize this property, use the `animation` prop:
   * ```tsx
   * <Popover.Overlay
   *   animation={{
   *     opacity: { value: [0, 1, 0] } // for bottom-sheet/dialog
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
   *   - `opacity`: Progress-based opacity animation (for bottom-sheet/dialog presentation)
   *   - `entering`: Entering animation (for popover presentation)
   *   - `exiting`: Exiting animation (for popover presentation)
   */
  animation?: PopupOverlayAnimation;
  /**
   * Whether animated styles (react-native-reanimated) are active
   * When `false`, the animated style is removed and you can implement custom logic
   * This prop should only be used when you want to write custom styling logic instead of the default animated styles
   * @default true
   */
  isAnimatedStyleActive?: boolean;
}

/**
 * Popover Content props for 'popover' presentation
 */
export interface PopoverContentPopoverProps
  extends PopoverPrimitivesTypes.ContentProps {
  /**
   * Presentation mode for the popover content
   */
  presentation: 'popover';
  /**
   * Additional CSS class for the content container
   */
  className?: string;
  /**
   * The popover content
   */
  children?: ReactNode;
  /**
   * Animation configuration for content
   * - `false` or `"disabled"`: Disable all animations
   * - `true` or `undefined`: Use default animations
   * - `object`: Custom animation configuration
   */
  animation?: PopupPopoverContentAnimation;
}

/**
 * Popover Content props for 'bottom-sheet' presentation
 */
export interface PopoverContentBottomSheetProps
  extends Partial<BottomSheetProps>,
    BaseBottomSheetContentProps {
  /**
   * Presentation mode for the popover
   */
  presentation: 'bottom-sheet';
}

/**
 * Popover Content component props
 */
export type PopoverContentProps =
  | PopoverContentPopoverProps
  | PopoverContentBottomSheetProps;

/**
 * Popover Close component props
 *
 * Extends CloseButtonProps, allowing full override of all close button props.
 * Automatically handles popover close functionality when pressed.
 */
export type PopoverCloseProps = CloseButtonProps;

/**
 * Popover Title component props
 */
export interface PopoverTitleProps extends TextProps {
  /**
   * Additional CSS class for the title
   */
  className?: string;
}

/**
 * Popover Description component props
 */
export interface PopoverDescriptionProps extends TextProps {
  /**
   * Additional CSS class for the description
   */
  className?: string;
}

/**
 * Return type for the usePopover hook
 */
export type UsePopoverReturn = PopoverPrimitivesTypes.IRootContext;

/**
 * Popover Arrow component props
 */
export interface PopoverArrowProps {
  /**
   * The arrow content
   */
  children?: ReactNode;
  /**
   * Style for the arrow
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Additional CSS class for the arrow
   */
  className?: string;
  /**
   * Height of the arrow in pixels
   * @default 12
   */
  height?: number;
  /**
   * Width of the arrow in pixels
   * @default 20
   */
  width?: number;
  /**
   * Fill color of the arrow (defaults to content background)
   */
  fill?: string;
  /**
   * Stroke (border) color of the arrow (defaults to content border color)
   */
  stroke?: string;
  /**
   * Stroke width of the arrow border in pixels
   * @default 1
   */
  strokeWidth?: number;
  /**
   * Baseline inset in pixels for stroke alignment (defaults to 1)
   * Set this to match the popover's border width so the arrow stroke
   * aligns seamlessly with the popover border. For example, if your
   * popover has a 2px border, set this to 2
   */
  strokeBaselineInset?: number;
  /**
   * Placement of the popover (inherited from content)
   */
  placement?: PopoverPlacement;
}

/**
 * Return type for the usePopoverAnimation hook
 */
export interface UsePopoverAnimationReturn {
  /**
   * Animation progress shared value (0=idle, 1=open, 2=close)
   */
  progress: SharedValue<number>;
  /**
   * Dragging state shared value
   */
  isDragging: SharedValue<boolean>;
}
