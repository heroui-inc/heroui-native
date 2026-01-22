import type { ButtonRootProps } from '../button/button.types';

/**
 * Props for customizing the close icon
 */
export interface CloseButtonIconProps {
  /**
   * Size of the icon
   * @default 16
   */
  size?: number;
  /**
   * Color of the icon
   * @default Uses theme foreground color
   */
  color?: string;
}

/**
 * Props for the CloseButton component
 *
 * Extends ButtonRootProps but excludes variant, size, and isIconOnly as these are fixed
 * to 'tertiary', 'sm', and true respectively.
 */
export interface CloseButtonProps
  extends Omit<ButtonRootProps, 'variant' | 'size' | 'isIconOnly'> {
  /**
   * Props for customizing the close icon
   */
  iconProps?: CloseButtonIconProps;
}
