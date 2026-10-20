/**
 * Clamps a number between min and max bounds
 * @param value - The value to clamp
 * @param min - Minimum bound
 * @param max - Maximum bound
 * @returns The clamped value
 */
export function clamp(value: number, min: number, max: number): number {
  'worklet';
  return Math.min(Math.max(value, min), max);
}

/**
 * Counts the decimal places of a number, including numbers that stringify
 * in exponent notation (e.g. `1e-7`)
 * @param value - The number to inspect
 * @returns The number of decimal places
 */
function getDecimalPlaces(value: number): number {
  'worklet';
  const [mantissa = '', exponent = '0'] = String(value).split('e');
  const decimals = mantissa.split('.')[1]?.length ?? 0;
  return Math.max(0, decimals - Number(exponent));
}

/**
 * Snaps a value to the nearest step increment
 * @param value - The raw value
 * @param min - Minimum value of the range
 * @param max - Maximum value of the range
 * @param step - Step increment
 * @returns The snapped value
 */
export function snapToStep(
  value: number,
  min: number,
  max: number,
  step: number
): number {
  'worklet';
  const snapped = Math.round((value - min) / step) * step + min;
  // Round to the precision of `step` and `min` to drop floating point noise
  // (e.g. 3 * 0.1 = 0.30000000000000004)
  const precision = Math.max(getDecimalPlaces(step), getDecimalPlaces(min));
  return clamp(Number(snapped.toFixed(precision)), min, max);
}

/**
 * Converts a slider value to a ratio (0 to 1)
 * @param value - The slider value
 * @param min - Minimum slider value
 * @param max - Maximum slider value
 * @returns The ratio (0 to 1)
 */
export function valueToPercent(
  value: number,
  min: number,
  max: number
): number {
  'worklet';
  if (max === min) {
    return 0;
  }
  return (value - min) / (max - min);
}

/**
 * Formats a slider value using Intl.NumberFormat.
 * Values are passed directly to the formatter — consumers are responsible
 * for providing values in the scale the formatter expects (e.g. 0–1 for
 * `style: 'percent'`).
 * @param value - The numeric value
 * @param formatOptions - Intl.NumberFormat options
 * @returns The formatted string
 */
export function formatValue(
  value: number,
  formatOptions?: Intl.NumberFormatOptions
): string {
  if (formatOptions) {
    return new Intl.NumberFormat(undefined, formatOptions).format(value);
  }
  return String(value);
}

/**
 * Normalizes a SliderValue to always be an array of numbers
 * @param value - Single number or array
 * @returns Array of numbers
 */
export function normalizeValue(value: number | number[]): number[] {
  return Array.isArray(value) ? value : [value];
}

/**
 * Denormalizes an array back to a SliderValue
 * @param values - Array of numbers
 * @param wasArray - Whether the original value was an array
 * @returns Single number or array
 */
export function denormalizeValue(
  values: number[],
  wasArray: boolean
): number | number[] {
  if (wasArray) {
    return values;
  }
  return values[0] ?? 0;
}
