import type {
  Animation,
  AnimationRoot,
  AnimationValue,
} from '../types/animation';

/**
 * Check if the entire animation is disabled
 * @param animation - Animation configuration
 * @returns true if animation is disabled
 */
export function isAnimationDisabled<TConfig extends Record<string, any>>(
  animation: Animation<TConfig> | AnimationRoot<TConfig> | undefined
): boolean {
  // Check top-level disabled values
  if (animation === false || animation === 'disabled') {
    return true;
  }

  // Check state property in config objects
  if (
    typeof animation === 'object' &&
    animation !== null &&
    'state' in animation
  ) {
    const state = animation.state;
    return state === false || state === 'disabled';
  }

  return false;
}

/**
 * Check if root animation should cascade disable to all children
 * @param animation - Root animation configuration
 * @returns true if all animations should be disabled (including children)
 */
export function shouldDisableAll<TConfig extends Record<string, any>>(
  animation: AnimationRoot<TConfig> | undefined
): boolean {
  // Check top-level disable-all value
  if (animation === 'disable-all') {
    return true;
  }

  // Check state property in config objects
  if (
    typeof animation === 'object' &&
    animation !== null &&
    'state' in animation
  ) {
    const state = animation.state;
    return state === 'disable-all';
  }

  return false;
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
  // Always extract config when it's an object, regardless of disabled state
  // This allows users to customize colors/properties even when animations are disabled
  const config =
    typeof animation === 'object' && animation !== null
      ? (animation as TConfig)
      : undefined;

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
  // Always extract config when it's an object, regardless of disabled state
  // This allows users to customize colors/properties even when animations are disabled
  const config =
    typeof animation === 'object' && animation !== null
      ? (animation as TConfig)
      : undefined;

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
 * Determine if animations should be disabled based on disabled flags
 * Priority: isAllAnimationsDisabled > isAnimationDisabled
 *
 * @param options - Object containing isAnimationDisabled and isAllAnimationsDisabled
 * @param options.isAnimationDisabled - Whether animation is explicitly disabled
 * @param options.isAllAnimationsDisabled - Whether all animations should be disabled (cascading from root/global)
 * @returns true if animations should be disabled, false otherwise
 *
 * @example
 * const isDisabled = getIsAnimationDisabledValue({
 *   isAnimationDisabled: false,
 *   isAllAnimationsDisabled: true
 * });
 * // Returns: true (all animations disabled takes priority)
 */
export function getIsAnimationDisabledValue(options: {
  isAnimationDisabled: boolean;
  isAllAnimationsDisabled: boolean | undefined;
}): boolean {
  const { isAnimationDisabled: isDisabled, isAllAnimationsDisabled } = options;

  // First priority: if all animations are disabled, return true
  if (isAllAnimationsDisabled === true) {
    return true;
  }

  // Second priority: if this animation is disabled, return true
  if (isDisabled) {
    return true;
  }

  // Default: animations are enabled
  return false;
}

/**
 * Combine global, parent, and own animation disabled states
 * Priority: Global > Parent > Own (global wins if enabled)
 *
 * @param options - Object containing globalIsAllAnimationsDisabled, parentIsAllAnimationsDisabled, and ownIsAllAnimationsDisabled
 * @param options.globalIsAllAnimationsDisabled - Whether global provider has disable-all (from GlobalAnimationSettingsProvider)
 * @param options.parentIsAllAnimationsDisabled - Whether parent context has disable-all (from AnimationSettingsContext)
 * @param options.ownIsAllAnimationsDisabled - Whether own animation prop has disable-all
 * @returns Combined isAllAnimationsDisabled value (global || parent || own)
 *
 * @example
 * const combined = getCombinedAnimationDisabledState({
 *   globalIsAllAnimationsDisabled: true,
 *   parentIsAllAnimationsDisabled: false,
 *   ownIsAllAnimationsDisabled: false
 * });
 * // Returns: true (global wins)
 */
export function getCombinedAnimationDisabledState(options: {
  globalIsAllAnimationsDisabled?: boolean;
  parentIsAllAnimationsDisabled: boolean | undefined;
  ownIsAllAnimationsDisabled: boolean;
}): boolean {
  const {
    globalIsAllAnimationsDisabled,
    parentIsAllAnimationsDisabled,
    ownIsAllAnimationsDisabled,
  } = options;

  // Global always wins if it has disable-all
  if (globalIsAllAnimationsDisabled === true) {
    return true;
  }

  // Parent wins if it has disable-all
  if (parentIsAllAnimationsDisabled === true) {
    return true;
  }

  // Otherwise use own value
  return ownIsAllAnimationsDisabled;
}
