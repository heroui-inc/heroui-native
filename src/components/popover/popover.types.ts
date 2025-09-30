import type BottomSheet from '@gorhom/bottom-sheet';
import type { BottomSheetViewProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetView/types';
import type { ReactNode } from 'react';
import type { TextProps } from 'react-native';
import type * as PopoverPrimitivesTypes from '../../primitives/popover/popover.types';

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
  bottomSheetViewProps?: BottomSheetViewProps;
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
   * @default theme.colors.foreground
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
   * Color of the arrow (defaults to content background)
   */
  color?: string;
  /**
   * Placement of the popover (inherited from content)
   */
  placement?: PopoverPlacement;
}
