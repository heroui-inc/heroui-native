import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type * as DialogPrimitivesTypes from '../../primitives/dialog/dialog.types';

/**
 * Dialog Root component props
 */
export interface DialogRootProps extends DialogPrimitivesTypes.RootProps {
  /**
   * The content of the dialog
   */
  children?: ReactNode;
  /**
   * Animation duration in milliseconds
   * @default 200
   */
  animationDuration?: number;
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
 * Dialog Portal component props
 */
export interface DialogPortalProps extends DialogPrimitivesTypes.PortalProps {
  /**
   * Additional CSS class for the portal container
   */
  className?: string;
  /**
   * Additional style for the portal container
   */
  style?: StyleProp<ViewStyle>;
  /**
   * The portal content
   */
  children: ReactNode;
}

/**
 * Dialog Overlay component props
 */
export interface DialogOverlayProps
  extends Omit<DialogPrimitivesTypes.OverlayProps, 'asChild'> {
  /**
   * Additional CSS class for the overlay
   */
  className?: string;
}

/**
 * Dialog Content component props
 */
export interface DialogContentProps
  extends Omit<DialogPrimitivesTypes.ContentProps, 'asChild'> {
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
 * Dialog Close component props
 */
export interface DialogCloseProps extends DialogPrimitivesTypes.CloseProps {
  /**
   * Close icon props
   */
  iconProps?: DialogCloseIconProps;
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
