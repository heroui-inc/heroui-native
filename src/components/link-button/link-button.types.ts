import type {
  ButtonLabelProps,
  ButtonRootPropsScaleHighlight,
} from '../button/button.types';

/**
 * Props for the LinkButton component.
 *
 * Extends ButtonRootPropsScaleHighlight with `variant` omitted — the ghost
 * variant is enforced internally and cannot be overridden by consumers.
 */
export type LinkButtonProps = Omit<ButtonRootPropsScaleHighlight, 'variant'>;

/**
 * Props for the LinkButton.Label sub-component.
 * Equivalent to ButtonLabelProps.
 */
export type LinkButtonLabelProps = ButtonLabelProps;
