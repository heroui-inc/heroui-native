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
