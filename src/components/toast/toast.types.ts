import type { ViewProps, ViewStyle } from 'react-native';

// Toast component type definitions
export interface ToastProps extends Omit<ViewProps, 'id'> {
  id: string | number;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  onDismiss?: (id: string | number) => void;
  onAutoClose?: (id: string | number) => void;
  action?: {
    label: string;
    onPress: () => void;
  };
  closeButton?: {
    enabled?: boolean;
    className?: string;
    textClassName?: string;
    text?: string;
  }
  className?: string;
  entering?: any;
  exiting?: any;
}

export interface ToastContextValue {
  addToast: AddToastContextHandler;
  dismissToast: (id: string | number) => void;
}

export type ToastVariant = 'success' | 'danger' | 'warning' | 'default';

export type ToastPosition = 'top-center' | 'bottom-center' | 'center';

export type ToasterProps = Omit<ViewProps, 'style'> & {
  duration?: number;
  position?: ToastPosition;
  visibleToasts?: number;
  closeButton?: boolean;
  toastOptions?: {
    actionButtonClassName?: string;
    actionButtonTextClassName?: string;
    titleClassName?: string;
    descriptionClassName?: string;
    style?: ViewStyle;
    unstyled?: boolean;
    toastContainerClassName?: string;
    toastContentClassName?: string;
    buttonsClassName?: string;
    closeButtonClassName?: string;
    closeButtonIconClassName?: string;
  };
  gap?: number;
  icons?: {
    success?: React.ReactNode;
    error?: React.ReactNode;
    warning?: React.ReactNode;
    info?: React.ReactNode;
  };
  pauseWhenPageIsHidden?: boolean;
  ToasterOverlayWrapper?: React.ComponentType<{ children: React.ReactNode }>;
  ToastWrapper?: React.ComponentType<
    ViewProps & {
      children: React.ReactNode;
      toastId: string | number;
    }
  >;
};

export type AddToastContextHandler = (
  data: Omit<ToastProps, 'id'> & { id?: string | number }
) => string | number;

export type ToasterContextType = Required<
  Pick<
    ToasterProps,
    'duration' | 'position' | 'closeButton' | 'gap' | 'toastOptions'
  >
> & {
  addToast: AddToastContextHandler;
  dismissToast: (id: string | number) => void;
};

export type ToastOptions = Omit<ToastProps, 'id'>;
