import type { ReactNode } from 'react';
import type { TextProps } from 'react-native';
import type * as PopoverPrimitivesTypes from '../../primitives/popover/popover.types';

/**
 * Popover placement options
 */
export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right';

/**
 * Popover alignment options
 */
export type PopoverAlign = 'start' | 'center' | 'end';

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
  /**
   * The preferred placement of the popover
   * @default 'bottom'
   */
  placement?: PopoverPlacement;
  /**
   * The alignment of the popover relative to the trigger
   * @default 'center'
   */
  align?: PopoverAlign;
  /**
   * Whether to automatically adjust the popover placement to avoid collisions
   * @default true
   */
  avoidCollisions?: boolean;
  /**
   * The offset from the trigger element
   * @default 8
   */
  offset?: number;
  /**
   * The alignment offset
   * @default 0
   */
  alignOffset?: number;
  /**
   * Screen edge insets to maintain when positioning the popover
   * Can be a number for all sides or an object with top/right/bottom/left
   * @default 12 + safeAreaInset
   */
  insets?:
    | number
    | { top?: number; right?: number; bottom?: number; left?: number };
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
 * Popover Content component props
 */
export interface PopoverContentProps
  extends PopoverPrimitivesTypes.ContentProps {
  /**
   * Additional CSS class for the content container
   */
  className?: string;
  /**
   * The popover content
   */
  children?: ReactNode;
}

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
 * Popover context type
 */
export interface PopoverContextType {
  /**
   * Whether the popover is open
   */
  isOpen: boolean | undefined;
  /**
   * Callback to change open state
   */
  onOpenChange: ((isOpen: boolean) => void) | undefined;
  /**
   * The placement of the popover
   */
  placement: PopoverPlacement;
  /**
   * The alignment of the popover
   */
  align: PopoverAlign;
  /**
   * Whether to avoid collisions
   */
  avoidCollisions: boolean;
  /**
   * The offset from the trigger
   */
  offset: number;
  /**
   * The alignment offset
   */
  alignOffset: number;
  /**
   * Screen edge insets
   */
  insets:
    | { top?: number; right?: number; bottom?: number; left?: number }
    | undefined;
}
