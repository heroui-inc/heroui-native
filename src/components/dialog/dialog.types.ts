import type { ReactNode } from 'react';
import type { ViewProps } from 'react-native';
import type * as DialogPrimitivesTypes from '../../primitives/dialog/dialog.types';
import type { ElementSlots } from '../../providers/theme';
import type { ContentSlots } from './dialog.styles';

/**
 * Dialog Root component props
 */
export interface DialogProps extends DialogPrimitivesTypes.RootProps {
  /**
   * The content of the dialog
   */
  children?: ReactNode;
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
 * Close icon props
 */
export interface DialogCloseIconProps {
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
 * Dialog Content component props
 */
export interface DialogContentProps
  extends Omit<DialogPrimitivesTypes.ContentProps, 'asChild'> {
  /**
   * Whether to show the close button
   * @default true
   */
  isCloseVisible?: boolean;
  /**
   * Props for customizing the close icon
   */
  iconProps?: DialogCloseIconProps;
  /**
   * Custom portal host name for rendering in specific container
   */
  portalHost?: string;
  /**
   * Additional CSS classes for different parts of the dialog content
   */
  classNames?: ElementSlots<ContentSlots>;
  /**
   * Additional CSS class for the content container
   */
  className?: string;
  /**
   * The dialog content
   */
  children?: ReactNode;
}

/**
 * Dialog Header component props
 */
export interface DialogHeaderProps extends ViewProps {
  /**
   * Additional CSS class for the header
   */
  className?: string;
  /**
   * Header content
   */
  children?: ReactNode;
}

/**
 * Dialog Body component props
 */
export interface DialogBodyProps extends ViewProps {
  /**
   * Additional CSS class for the body
   */
  className?: string;
  /**
   * Body content
   */
  children?: ReactNode;
}

/**
 * Dialog Footer component props
 */
export interface DialogFooterProps extends ViewProps {
  /**
   * Additional CSS class for the footer
   */
  className?: string;
  /**
   * Footer content
   */
  children?: ReactNode;
}

/**
 * Dialog Title component props
 */
export interface DialogTitleProps extends DialogPrimitivesTypes.TitleProps {
  /**
   * Additional CSS class for the title
   */
  className?: string;
  /**
   * Title content
   */
  children?: ReactNode;
}

/**
 * Dialog Description component props
 */
export interface DialogDescriptionProps
  extends DialogPrimitivesTypes.DescriptionProps {
  /**
   * Additional CSS class for the description
   */
  className?: string;
  /**
   * Description content
   */
  children?: ReactNode;
}
