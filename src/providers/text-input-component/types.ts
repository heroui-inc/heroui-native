import type { TextInputProps } from 'react-native';

/**
 * Global text input component configuration props.
 * These props are carefully selected to include only those that make sense
 * to configure globally across all TextInput components in the application.
 *
 * @description
 * Includes font scaling settings that typically should be consistent
 * throughout the app for better UX.
 */
export type TextInputComponentProps = {
  /**
   * Specifies whether fonts should scale to respect Text Size accessibility settings.
   *
   * @default true
   */
  allowFontScaling?: TextInputProps['allowFontScaling'];
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
  maxFontSizeMultiplier?: TextInputProps['maxFontSizeMultiplier'];
};

/**
 * Context value for text input component configuration
 */
export interface TextInputComponentContextValue {
  textInputProps?: TextInputComponentProps;
}
