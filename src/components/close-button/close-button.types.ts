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
 * Extends ButtonRootProps, allowing full override of all button props.
 * Defaults to variant='tertiary', size='sm', and isIconOnly=true.
 */
export type CloseButtonProps = ButtonRootProps & {
  /**
   * Props for customizing the close icon
   */
  iconProps?: CloseButtonIconProps;
};
