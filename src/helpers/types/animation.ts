/**
 * Universal animation prop type
 * - `true` or `undefined`: Use default animations
 * - `false` or `"disabled"`: Disable all animations
 * - `object`: Custom animation configuration
 */
export type Animation<
  TConfig extends Record<string, any> = Record<string, any>,
> = boolean | 'disabled' | TConfig;

/**
 * Root-level animation prop type with cascading control
 * - `true` or `undefined`: Use default animations
 * - `false` or `"disabled"`: Disable only root animations (children can still animate)
 * - `"disable-all"`: Disable all animations including children (cascades down)
 * - `object`: Custom animation configuration
 */
export type AnimationRoot<
  TConfig extends Record<string, any> = Record<string, any>,
> = boolean | 'disabled' | 'disable-all' | TConfig;

/**
 * Animation value that can be a custom config
 * Used for granular animation control within a component
 */
export type AnimationValue<
  TConfig extends Record<string, any> = Record<string, any>,
> = TConfig;
