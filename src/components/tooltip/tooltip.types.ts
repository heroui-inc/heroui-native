import type { ReactNode } from 'react';
import type {
  AccessibilityRole,
  StyleProp,
  TextProps,
  ViewStyle,
} from 'react-native';
import type {
  AnimationRootDisableAll,
  PopupPopoverContentAnimation,
} from '../../helpers/internal/types';
import type * as PopoverPrimitivesTypes from '../../primitives/popover/popover.types';

/**
 * Tooltip placement options
 */
export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

/**
 * Tooltip alignment options
 */
export type TooltipAlign = 'start' | 'center' | 'end';

/**
 * How the tooltip is triggered on mobile
 * - `'press'`: Toggles open/closed on press (similar to Popover behavior)
 * - `'long-press'`: Opens on long press, closes when the finger is released
 */
export type TooltipTriggerMode = 'press' | 'long-press';

/**
 * Ref type for the Tooltip Trigger component — exposes imperative open/close methods
 */
export type TooltipTriggerRef = PopoverPrimitivesTypes.TriggerRef;

/**
 * Context value passed from Tooltip Root to Trigger
 */
export interface TooltipTriggerContextValue {
  /** How the tooltip is triggered */
  mode: TooltipTriggerMode;
  /** Delay in milliseconds before the tooltip opens on long press */
  delay: number;
}

/**
 * Context value for tooltip content placement — consumed by Tooltip.Arrow
 */
export interface TooltipContentContextValue {
  /** Resolved placement of the tooltip content */
  placement?: TooltipPlacement;
}

/**
 * Tooltip Root component props
 */
export interface TooltipRootProps
  extends Omit<PopoverPrimitivesTypes.RootProps, 'presentation'> {
  /**
   * The content of the tooltip
   */
  children?: ReactNode;
  /**
   * Animation configuration for the tooltip root.
   * - `"disable-all"`: Disable all animations including children
   */
  animation?: AnimationRootDisableAll;
  /**
   * How the tooltip is triggered.
   * @default 'press'
   */
  mode?: TooltipTriggerMode;
  /**
   * Delay in milliseconds before the tooltip opens when using `mode="long-press"`.
   * @default 500
   */
  delay?: number;
}

/**
 * Tooltip Trigger component props
 */
export interface TooltipTriggerProps {
  /**
   * The element that triggers the tooltip.
   *
   * @note Tooltip.Trigger wraps its children in a Pressable. If the child is
   * itself interactive (e.g. a Button), both elements will respond to gestures —
   * the outer Pressable handles the tooltip gesture, the inner element handles
   * its own press. This is consistent with Popover.Trigger behavior but can
   * cause gesture conflicts on Android. Use `asChild`-style composition if
   * stricter control is needed.
   */
  children?: ReactNode;
  /**
   * Whether the trigger (and therefore the tooltip) is disabled
   */
  isDisabled?: boolean;
  /**
   * Accessibility role for the trigger element.
   * @default 'button'
   */
  accessibilityRole?: AccessibilityRole;
}

/**
 * Tooltip Portal component props
 */
export interface TooltipPortalProps extends PopoverPrimitivesTypes.PortalProps {
  /**
   * Additional CSS class for the portal container view
   */
  className?: string;
  /**
   * The portal content
   */
  children: ReactNode;
  /**
   * When `true`, uses a regular View instead of FullWindowOverlay on iOS.
   * Enables the React Native element inspector but the tooltip will not appear
   * above native modal windows.
   * @default false
   */
  disableFullWindowOverlay?: boolean;
}

/**
 * Tooltip Content component props
 */
export interface TooltipContentProps
  extends PopoverPrimitivesTypes.ContentProps {
  /**
   * Additional CSS class for the tooltip bubble
   */
  className?: string;
  /**
   * The tooltip content
   */
  children?: ReactNode;
  /**
   * Animation configuration for the tooltip content.
   * - `true` or `undefined`: Use default animations
   * - `false` or `"disabled"`: Disable all animations
   * - `object`: Custom entering/exiting animation configuration.
   *   Include `state: "disabled"` in the object to disable animations while
   *   still providing custom configuration.
   */
  animation?: PopupPopoverContentAnimation;
  /**
   * Placement of the tooltip relative to the trigger.
   * @default 'bottom'
   */
  placement?: TooltipPlacement;
  /**
   * Alignment of the tooltip relative to the trigger along the cross-axis.
   * @default 'center'
   */
  align?: TooltipAlign;
}

/**
 * Tooltip Arrow component props
 */
export interface TooltipArrowProps {
  /**
   * Custom arrow content — replaces the default SVG arrow when provided
   */
  children?: ReactNode;
  /**
   * Style for the arrow container view
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Additional CSS class for the arrow container
   */
  className?: string;
  /**
   * Height of the arrow in pixels.
   * @default 12
   */
  height?: number;
  /**
   * Width of the arrow in pixels.
   * @default 20
   */
  width?: number;
  /**
   * Fill color of the arrow. Defaults to the `overlay` theme color.
   *
   * Provided as a convenience prop because the theme color is resolved automatically
   * when omitted.
   */
  fill?: string;
  /**
   * Stroke (border) color of the arrow. No stroke is rendered by default.
   *
   * Set this when the tooltip content has a visible border so the arrow stroke
   * aligns seamlessly with it. Use `strokeBaselineInset` to match the border width.
   */
  stroke?: string;
  /**
   * Stroke width of the arrow border in pixels.
   * @default 1
   */
  strokeWidth?: number;
  /**
   * Inset in pixels used to align the arrow stroke baseline with the tooltip border.
   * Set this to match the tooltip's border width so the arrow stroke aligns seamlessly.
   * @default 1
   */
  strokeBaselineInset?: number;
  /**
   * Explicit placement override. When omitted, inherits placement from `Tooltip.Content`.
   */
  placement?: TooltipPlacement;
}

/**
 * Tooltip Text component props
 */
export interface TooltipTextProps extends TextProps {
  /**
   * Additional CSS class for the text
   */
  className?: string;
}

/**
 * Return type for the useTooltip hook
 */
export type UseTooltipReturn = PopoverPrimitivesTypes.IRootContext;
