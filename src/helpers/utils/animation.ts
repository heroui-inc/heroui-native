import type { TransformsStyle } from 'react-native';
import type {
  Animation,
  AnimationRoot,
  AnimationValue,
} from '../types/animation';

/**
 * Extract transform array type from TransformsStyle, excluding string transforms
 * (react-native-reanimated doesn't support string transforms)
 */
type TransformArrayItem = Exclude<
  NonNullable<TransformsStyle['transform']>,
  string
>[number];

type TransformArray = Array<TransformArrayItem>;

/**
 * Check if the entire animation is disabled
 * @param animation - Animation configuration
 * @returns true if animation is disabled
 */
export function isAnimationDisabled<TConfig extends Record<string, any>>(
  animation: Animation<TConfig> | AnimationRoot<TConfig> | undefined
): boolean {
  return animation === false || animation === 'disabled';
}

/**
 * Check if root animation should cascade disable to all children
 * @param animation - Root animation configuration
 * @returns true if all animations should be disabled (including children)
 */
export function shouldDisableAll<TConfig extends Record<string, any>>(
  animation: AnimationRoot<TConfig> | undefined
): boolean {
  return animation === 'disable-all';
}

/**
 * Get animation state including config and disabled status
 * @param animation - Animation configuration
 * @returns Object with animationConfig and isAnimationDisabled
 */
export function getAnimationState<TConfig extends Record<string, any>>(
  animation: Animation<TConfig> | undefined
): {
  animationConfig: TConfig | undefined;
  isAnimationDisabled: boolean;
} {
  const isDisabled = isAnimationDisabled(animation);
  const config =
    !isDisabled && typeof animation === 'object' ? animation : undefined;

  return {
    animationConfig: config,
    isAnimationDisabled: isDisabled,
  };
}

/**
 * Get root animation state including config, disabled status, and cascade flag
 * @param animation - Root animation configuration
 * @returns Object with animationConfig, isAnimationDisabled, and isAllAnimationsDisabled
 */
export function getRootAnimationState<TConfig extends Record<string, any>>(
  animation: AnimationRoot<TConfig> | undefined
): {
  animationConfig: TConfig | undefined;
  isAnimationDisabled: boolean;
  isAllAnimationsDisabled: boolean;
} {
  const shouldCascade = shouldDisableAll(animation);
  const isDisabled = isAnimationDisabled(animation) || shouldCascade;
  const config =
    !isDisabled && typeof animation === 'object' ? animation : undefined;

  return {
    animationConfig: config,
    isAnimationDisabled: isDisabled,
    isAllAnimationsDisabled: shouldCascade,
  };
}

/**
 * Get animation value property or return default
 * Extracts a property from the animation value config object
 *
 * @param options - Object containing animationValue, property, and defaultValue
 * @param options.animationValue - The animation value configuration
 * @param options.property - Property name to extract
 * @param options.defaultValue - Default value if property is not found
 * @returns The property value or default (never undefined)
 *
 * @example
 * const scaleValue = getAnimationValueProperty({
 *   animationValue: animation?.scale,
 *   property: 'value',
 *   defaultValue: 0.95
 * });
 */
export function getAnimationValueProperty<
  TConfig extends Record<string, any>,
  K extends keyof TConfig,
  D extends NonNullable<TConfig[K]>,
>(options: {
  animationValue: AnimationValue<TConfig> | undefined;
  property: K;
  defaultValue: D;
}): NonNullable<TConfig[K]> {
  // If animation value is undefined, return default
  if (options.animationValue === undefined) {
    return options.defaultValue;
  }

  // Return the property value if it exists, otherwise return default
  return (options.animationValue[options.property] ??
    options.defaultValue) as NonNullable<TConfig[K]>;
}

/**
 * Get animation value merged config or return default
 * Merges the animation value config with defaults, useful when you need multiple properties
 *
 * @param options - Object containing animationValue, property, and defaultValue
 * @param options.animationValue - The animation value configuration
 * @param options.property - Property name to extract from the config
 * @param options.defaultValue - Default configuration object
 * @returns The merged config object or default
 *
 * @example
 * const scaleConfig = getAnimationValueMergedConfig({
 *   animationValue: animation?.scale,
 *   property: 'timingConfig',
 *   defaultValue: { duration: 150 }
 * });
 */
export function getAnimationValueMergedConfig<
  TConfig extends Record<string, any>,
  K extends keyof TConfig,
>(options: {
  animationValue: AnimationValue<TConfig> | undefined;
  property: K;
  defaultValue: TConfig[K];
}): TConfig[K] {
  // If animation value is undefined, return default
  if (options.animationValue === undefined) {
    return options.defaultValue;
  }

  const value = options.animationValue[options.property];

  // If the specific property value is undefined or not an object, return default
  if (value === undefined || typeof value !== 'object') {
    return options.defaultValue;
  }

  // Merge with defaults to ensure all properties exist
  return { ...options.defaultValue, ...value };
}

/**
 * Extract transform array from style
 * Returns empty array if transform is not an array
 * Filters out string transforms as react-native-reanimated doesn't support them
 *
 * @param style - Style object
 * @returns Transform array or empty array (compatible with react-native-reanimated)
 *
 * @example
 * const styleTransform = getStyleTransform(style);
 * // Use in animated style:
 * transform: [...myTransforms, ...styleTransform]
 */
export function getStyleTransform<T extends Record<string, any>>(
  style?: T
): TransformArray {
  'worklet';
  if (!Array.isArray(style?.transform)) {
    return [];
  }
  // Filter out string transforms (react-native-reanimated doesn't support them)
  return style.transform.filter(
    (item): item is TransformArrayItem =>
      typeof item === 'object' && item !== null
  );
}

/**
 * Extract specific style properties if they exist
 * Returns object with only the properties that exist in style
 *
 * @param style - Style object
 * @param keys - Array of style property keys to extract
 * @returns Object with existing properties that can be spread
 *
 * @example
 * const styleProps = getStyleProperties(style, ['opacity', 'borderRadius']);
 * // Returns: { opacity: 0.5, borderRadius: 8 } or { opacity: 0.5 } etc.
 * // Use in animated style:
 * return { ...styleProps, opacity: styleProps.opacity ?? animatedOpacity }
 */
export function getStyleProperties<T extends Record<string, any>>(
  style: T | undefined,
  keys: (keyof T)[]
): Partial<T> {
  'worklet';
  if (!style) return {};

  return keys.reduce((acc, key) => {
    if (style[key] !== undefined) {
      acc[key] = style[key];
    }
    return acc;
  }, {} as Partial<T>);
}
