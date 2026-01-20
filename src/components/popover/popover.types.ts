import type BottomSheet from '@gorhom/bottom-sheet';
import type { ReactNode } from 'react';
import type { StyleProp, TextProps, ViewStyle } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import type {
  AnimationRoot,
  BaseBottomSheetContentProps,
  PopupOverlayAnimation,
  PopupPopoverContentAnimation,
  PopupRootAnimationConfig,
} from '../../helpers/internal/types';
import type * as PopoverPrimitivesTypes from '../../primitives/popover/popover.types';

/**
 * Popover internal state for animation coordination
 */
export type PopoverState = 'idle' | 'open' | 'close';

/**
 * Context value for popover animation state
 */
export interface PopoverAnimationContextValue {
  /** Extended internal state for animation control */
  popoverState: PopoverState;
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
 * Animation configuration for Popover root component
 */
export type PopoverRootAnimation = AnimationRoot<PopupRootAnimationConfig>;

/**
 * Popover Root component props
 */
export interface PopoverRootProps extends PopoverPrimitivesTypes.RootProps {
  /**
   * The content of the popover
   */
  children?: ReactNode;
  /**
   * The controlled open state of the popover
   */
  isOpen?: boolean;
  /**
   * The open state of the popover when initially rendered (uncontrolled)
   */
  isDefaultOpen?: boolean;
  /**
   * Delay in milliseconds before the popover closes (for exit animations)
   * @default 400
   */
  closeDelay?: number;
  /**
   * Animation configuration for popover root
   * - `"disable-all"`: Disable all animations including children
   * - `false` or `"disabled"`: Disable only root animations
   * - `true` or `undefined`: Use default animations
   * - `object`: Custom animation configuration
   */
  animation?: PopoverRootAnimation;
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
   * Additional CSS class for the portal container
   */
  className?: string;
  /**
   * The portal content
   */
  children: ReactNode;
}

/**
 * Animation configuration for Popover Overlay component
 */
export type PopoverOverlayAnimation = PopupOverlayAnimation;

/**
 * Popover Overlay component props
 */
export interface PopoverOverlayProps
  extends PopoverPrimitivesTypes.OverlayProps {
  /**
   * Additional CSS class for the overlay
   *
   * @note The following style properties are occupied by animations and cannot be set via className:
   * - `opacity` - Animated for overlay show/hide transitions (idle: 0, open: 1, close: 0)
   *
   * To customize this property, use the `animation` prop:
   * ```tsx
   * <Popover.Overlay
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
   * - `"disable-all"`: Disable all animations including children
   * - `false` or `"disabled"`: Disable only overlay animations
   * - `true` or `undefined`: Use default animations
   * - `object`: Custom animation configuration
   */
  animation?: PopoverOverlayAnimation;
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
   * Additional CSS class for the content container
   *
   * @note The following style properties are occupied by animations and cannot be set via className:
   * - `opacity` - Animated for content show/hide transitions (idle: 0, open: 1, close: 0)
   * - `transform` (specifically `scale`, `translateX`, `translateY`) - Animated for content show/hide transitions (scale: idle: 0.95, open: 1, close: 0.95; translateX/translateY: based on placement)
   * - `transformOrigin` - Animated for content show/hide transitions (based on placement: 'top', 'bottom', 'left', 'right')
   *
   * To customize these properties, use the `animation` prop:
   * ```tsx
   * <Popover.Content
   *   animation={{
   *     opacity: { value: [0, 1, 0] },
   *     scale: { value: [0.95, 1, 0.95] },
   *     translateX: { value: [4, 0, 4] },
   *     translateY: { value: [4, 0, 4] },
   *     transformOrigin: { value: 'top' }
   *   }}
   * />
   * ```
   *
   * To completely disable animated styles and use your own via className or style prop, set `isAnimatedStyleActive={false}`.
   */
  className?: string;
  /**
   * The popover content
   */
  children?: ReactNode;
  /**
   * Presentation mode for the popover
   */
  presentation?: 'popover';
  /**
   * Animation configuration for content
   * - `false` or `"disabled"`: Disable all animations
   * - `true` or `undefined`: Use default animations
   * - `object`: Custom animation configuration
   */
  animation?: PopupPopoverContentAnimation;
  /**
   * Whether animated styles (react-native-reanimated) are active
   * When `false`, the animated style is removed and you can implement custom logic
   * This prop should only be used when you want to write custom styling logic instead of the default animated styles
   * @default true
   */
  isAnimatedStyleActive?: boolean;
}

/**
 * Popover Content props for 'bottom-sheet' presentation
 */
export interface PopoverContentBottomSheetProps
  extends Partial<React.ComponentProps<typeof BottomSheet>>,
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
 */
export interface PopoverCloseProps extends PopoverPrimitivesTypes.CloseProps {
  /**
   * Additional CSS class for the close button
   */
  className?: string;
  /**
   * The close button content
   */
  children?: ReactNode;
  /**
   * Close icon props
   */
  iconProps?: PopoverCloseIconProps;
}

/**
 * Close icon props
 */
export interface PopoverCloseIconProps {
  /**
   * Size of the close icon
   * @default 18
   */
  size?: number;
  /**
   * Color of the close icon
   * @default --colors.muted
   */
  color?: string;
}

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
   * @default 8
   */
  height?: number;
  /**
   * Width of the arrow in pixels
   * @default 16
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
   * Extended internal state for coordinating animations
   */
  popoverState: PopoverState;
  /**
   * Animation progress shared value (0=idle, 1=open, 2=close)
   */
  progress: SharedValue<number>;
  /**
   * Dragging state shared value
   */
  isDragging: SharedValue<boolean>;
}
