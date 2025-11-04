import type BottomSheet from '@gorhom/bottom-sheet';
import type { BottomSheetViewProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetView/types';
import type { ReactNode } from 'react';
import type { StyleProp, TextProps, ViewStyle } from 'react-native';
import type {
  WithSpringConfig,
  WithTimingConfig,
} from 'react-native-reanimated';
import type * as PopoverPrimitivesTypes from '../../primitives/popover/popover.types';

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
 * Progress animation configuration for popover transitions
 */
export interface PopoverProgressAnimationConfigs {
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
 * Popover Root component props
 */
export interface PopoverRootProps extends PopoverPrimitivesTypes.RootProps {
  /**
   * The content of the popover
   */
  children?: ReactNode;
  /**
   * Whether the popover is open
   */
  isOpen?: boolean;
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
  /**
   * Animation configurations for open/close progress animations
   */
  progressAnimationConfigs?: PopoverProgressAnimationConfigs;
}

/**
 * Popover Overlay component props
 */
export interface PopoverOverlayProps
  extends PopoverPrimitivesTypes.OverlayProps {
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
 * Popover Content props for 'popover' presentation
 */
export interface PopoverContentPopoverProps
  extends PopoverPrimitivesTypes.ContentProps {
  /**
   * Additional CSS class for the content container
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
   * Whether to disable the default animations (opacity, scale, translate)
   * Use this when you want to animate these properties using your own Reanimated useAnimatedStyle
   * @default false
   */
  isDefaultAnimationDisabled?: boolean;
}

/**
 * Popover Content props for 'bottom-sheet' presentation
 */
export interface PopoverContentBottomSheetProps
  extends Partial<React.ComponentProps<typeof BottomSheet>> {
  /**
   * Presentation mode for the popover
   */
  presentation: 'bottom-sheet';
  /**
   * Additional CSS class for the bottom sheet view
   */
  bottomSheetViewClassName?: string;
  /**
   * Props for the bottom sheet view
   */
  bottomSheetViewProps?: Omit<BottomSheetViewProps, 'children'>;
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
