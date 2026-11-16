import type { ViewStyle } from 'react-native';

/**
 * Style properties that position and size the Input inside its parent.
 * When Input renders a background layer it wraps the text input in a
 * container, so these must land on that container to keep the same layout
 * as the unwrapped text input (e.g. `flex-1` inside a `flex-row`).
 */
export const WRAPPER_LAYOUT_PROPERTY_NAMES = [
  'flex',
  'flexGrow',
  'flexShrink',
  'flexBasis',
  'alignSelf',
  'width',
  'minWidth',
  'maxWidth',
  'margin',
  'marginHorizontal',
  'marginVertical',
  'marginTop',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'marginStart',
  'marginEnd',
] as const;

type WrapperLayoutPropertyName = (typeof WRAPPER_LAYOUT_PROPERTY_NAMES)[number];

const MARGIN_PROPERTY_NAMES: readonly WrapperLayoutPropertyName[] = [
  'margin',
  'marginHorizontal',
  'marginVertical',
  'marginTop',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'marginStart',
  'marginEnd',
];

/**
 * Splits resolved layout values between the wrapper and the text input.
 *
 * - `wrapperStyle` carries every resolved layout value so the wrapper sits
 *   in the parent exactly where the bare text input would.
 * - `inputStyle` neutralises the values that would otherwise apply twice
 *   inside the wrapper: margins (outer spacing), `alignSelf` (the input must
 *   fill the wrapper) and `width` (a percentage would compound).
 *
 * @param values - Resolved values, in `WRAPPER_LAYOUT_PROPERTY_NAMES` order
 * @returns Styles for the wrapper and the text input, or `undefined` when no
 * layout value is set
 */
export function splitWrapperLayoutStyle(
  values: readonly unknown[]
): { wrapperStyle: ViewStyle; inputStyle: ViewStyle } | undefined {
  const wrapperStyle: Record<string, unknown> = {};
  const inputStyle: Record<string, unknown> = {};

  WRAPPER_LAYOUT_PROPERTY_NAMES.forEach((propertyName, index) => {
    const value = values[index];
    if (value === undefined) {
      return;
    }

    wrapperStyle[propertyName] = value;

    if (MARGIN_PROPERTY_NAMES.includes(propertyName)) {
      inputStyle[propertyName] = 0;
    } else if (propertyName === 'alignSelf') {
      inputStyle.alignSelf = 'stretch';
    } else if (propertyName === 'width') {
      inputStyle.width = '100%';
    }
  });

  if (Object.keys(wrapperStyle).length === 0) {
    return undefined;
  }

  return {
    wrapperStyle: wrapperStyle as ViewStyle,
    inputStyle: inputStyle as ViewStyle,
  };
}
