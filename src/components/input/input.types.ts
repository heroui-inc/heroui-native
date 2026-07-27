import type { ReactNode } from 'react';
import type { TextInputProps, ViewProps } from 'react-native';
import type { ThemeColor } from '../../helpers/external/hooks';

/**
 * Props for the Input.Background sub-component.
 * Generic absolute-fill container behind the text input. When no `children`
 * are given, the active library theme decides the default content (e.g. a
 * frosted-glass blur layer when the theme is `glass`).
 */
export type InputBackgroundProps = ViewProps & {
  /** Additional CSS classes */
  className?: string;
  /**
   * Theme color token forwarded to the theme content as the opaque fallback
   * on platforms without native blur (Android / web)
   * @default 'field'
   */
  fallbackColor?: ThemeColor;
};

/**
 * Props for the Input component
 */
export interface InputProps extends TextInputProps {
  /**
   * Whether the input is in an invalid state (overrides context)
   * @default undefined
   */
  isInvalid?: boolean;
  /**
   * Whether the input is disabled (overrides context)
   * @default undefined
   */
  isDisabled?: boolean;
  /**
   * Variant style for the input
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary';
  /**
   * Additional CSS classes for the text input element
   */
  className?: string;
  /**
   * Additional CSS classes for the outer container that wraps the
   * background layer and the text input (e.g. `flex-1` in row layouts).
   * Only applied when a background layer is present (theme default or
   * custom `background`); otherwise the root remains the text input.
   */
  containerClassName?: string;
  /**
   * Background layer rendered behind the text input.
   * - `undefined` (default): renders `Input.Background` when the active
   *   library theme registers default background content (e.g. `glass`);
   *   the fallback color follows the variant (primary → field token,
   *   secondary → default token); otherwise no layer and no wrapper
   * - custom node: replaces the default layer entirely and wraps the text
   *   input (wrap content in `Input.Background` to keep absolute-fill and
   *   clipping)
   * - `null`: removes the background layer (bare text input root)
   */
  background?: ReactNode;
  /**
   * Custom className for the selection color
   * @default "accent-accent"
   */
  selectionColorClassName?: string;
  /**
   * Custom className for the placeholder text color
   * @default "field-placeholder"
   */
  placeholderColorClassName?: string;
}
