import type { ViewRef } from '../../helpers/types';
import type * as ToastPrimitive from '../../primitives/toast';
import type { ToastComponentProps } from '../../providers/toast';
import type { ButtonRootProps } from '../button';

/**
 * Toast variant types
 */
export type ToastVariant =
  | 'default'
  | 'accent'
  | 'success'
  | 'warning'
  | 'danger';

/**
 * Toast placement types
 */
export type ToastPlacement = 'top' | 'bottom';

/**
 * Props for the Toast.Root component
 */
export interface ToastRootProps
  extends Omit<ToastPrimitive.RootProps, 'id'>,
    ToastComponentProps {
  /**
   * Visual variant of the toast
   * @default 'default'
   */
  variant?: ToastVariant;
  /**
   * Placement of the toast
   * @default 'top'
   */
  placement?: ToastPlacement;
  /**
   * Additional CSS class for the toast container
   */
  className?: string;
}

/**
 * Props for the Toast.Label component
 */
export interface ToastLabelProps extends ToastPrimitive.LabelProps {
  /**
   * Content to be rendered as label
   */
  children?: React.ReactNode;
  /**
   * Additional CSS class for the label
   */
  className?: string;
}

/**
 * Props for the Toast.Description component
 */
export interface ToastDescriptionProps extends ToastPrimitive.DescriptionProps {
  /**
   * Content to be rendered as description
   */
  children?: React.ReactNode;
  /**
   * Additional CSS class for the description
   */
  className?: string;
}

/**
 * Props for the Toast.Action component
 */
export type ToastActionProps = ButtonRootProps;

/**
 * Props for the Toast.Close component
 */
export type ToastCloseProps = ButtonRootProps & {
  /**
   * Custom icon props for the close button icon
   */
  iconProps?: {
    size?: number;
    color?: string;
  };
};

/**
 * Context values shared between Toast components
 */
export interface ToastContextValue {
  /**
   * Visual variant of the toast
   */
  variant: ToastVariant;
}

/**
 * Ref type for the Toast.Root component
 */
export type ToastRootRef = ViewRef;
