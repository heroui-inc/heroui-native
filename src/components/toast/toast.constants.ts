import type { ButtonVariant } from '../button';
import type { ToastVariant } from './toast.types';

// Toast component constants
export const TOAST_DISPLAY_NAME = 'Toast';

export const TOAST_ANIMATION_DURATION = 300;

// Animation constants
export const ANIMATION_DURATION = 300;
export const ANIMATION_EASING = 'ease-out';

export const TOAST_DEFAULT_TIMEOUT = 5000;

export const toastDefaultValues = {
  duration: TOAST_DEFAULT_TIMEOUT,
  position: 'top-center' as const,
  variant: 'default' as const,
  closeButton: false,
  visibleToasts: 3,
  gap: 8,
  pauseWhenPageIsHidden: true,
};

export const toastCloseButtonVariants: {
  [key in ToastVariant]: ButtonVariant;
} = {
  default: 'secondary',
  success: 'primary',
  danger: 'danger',
  warning: 'primary',
};
