import type { TextProps } from 'react-native';

/**
 * Global text component configuration props.
 * These props are carefully selected to include only those that make sense
 * to configure globally across all Text components in the application.
 *
 * @description
 * Includes accessibility and font scaling settings that typically
 * should be consistent throughout the app for better UX.
 */
export type TextComponentProps = {
  /**
   * Specifies whether fonts should be scaled down automatically to fit given style constraints.
   *
   * @default false
   */
  adjustsFontSizeToFit?: TextProps['adjustsFontSizeToFit'];
  /**
   * Specifies whether fonts should scale to respect Text Size accessibility settings.
   *
   * @default true
   */
  allowFontScaling?: TextProps['allowFontScaling'];
  /**
   * Specifies the largest possible scale a font can reach when `allowFontScaling` is enabled.
   *
   * Possible values:
   *
   * - `null` or `undefined`: inherit from the parent node or the global default (0)
   * - `0`: no max, ignore parent/global default
   * - `>= 1`: sets the `maxFontSizeMultiplier` of this node to this value
   *
   * @default `undefined`
   */
  maxFontSizeMultiplier?: TextProps['maxFontSizeMultiplier'];
  /**
   * Specifies the smallest possible scale a font can reach when adjustsFontSizeToFit is enabled. (values 0.01-1.0).
   *
   * iOS only
   *
   * @default `undefined`
   */
  minimumFontScale?: TextProps['minimumFontScale'];
};

/**
 * Context value for text component configuration
 */
export interface TextComponentContextValue {
  textProps?: TextComponentProps;
}
