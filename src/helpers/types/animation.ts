import type {
  BaseAnimationBuilder,
  LayoutAnimationFunction,
  WithSpringConfig,
  WithTimingConfig,
} from 'react-native-reanimated';

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

export type AnimationRootDisableAll = Extract<AnimationRoot, 'disable-all'>;

/**
 * Animation value that can be a custom config
 * Used for granular animation control within a component
 */
export type AnimationValue<
  TConfig extends Record<string, any> = Record<string, any>,
> = TConfig;

export type LayoutTransition =
  | BaseAnimationBuilder
  | LayoutAnimationFunction
  | typeof BaseAnimationBuilder
  | undefined;

/**
 * Spring animation configuration
 */
interface SpringAnimationConfig {
  type: 'spring';
  config?: WithSpringConfig;
}

/**
 * Timing animation configuration
 */
interface TimingAnimationConfig {
  type: 'timing';
  config?: WithTimingConfig;
}

/**
 * Animation configuration for popup root components (Dialog, Select, etc.)
 * Supports entering and exiting animations with spring or timing types
 */
export type PopupRootAnimationConfig = {
  /**
   * Animation configuration for entering (opening)
   */
  entering?: AnimationValue<SpringAnimationConfig | TimingAnimationConfig>;
  /**
   * Animation configuration for exiting (closing)
   */
  exiting?: AnimationValue<SpringAnimationConfig | TimingAnimationConfig>;
};

/**
 * Animation configuration for popup overlay components (Dialog, Select, etc.)
 * Supports opacity animation configuration
 */
export type PopupOverlayAnimation = Animation<{
  /**
   * Opacity animation configuration
   */
  opacity?: AnimationValue<{
    /**
     * Opacity values [idle, open, close]
     * @default [0, 1, 0]
     */
    value?: [number, number, number];
  }>;
}>;
