import type {
  BaseAnimationBuilder,
  EntryOrExitLayoutType,
  LayoutAnimationFunction,
  WithSpringConfig,
  WithTimingConfig,
} from 'react-native-reanimated';

/**
 * Universal animation prop type
 * - `true` or `undefined`: Use default animations
 * - `false` or `"disabled"`: Disable all animations
 * - `object`: Custom animation configuration
 *   - Can include `state?: 'disabled' | boolean | undefined` to disable animations while customizing properties
 */
export type Animation<
  TConfig extends Record<string, any> = Record<string, any>,
> = boolean | 'disabled' | (TConfig & { state?: 'disabled' | boolean });

export type AnimationDisabled = 'disabled' | false;

/**
 * Root-level animation prop type with cascading control
 * - `true` or `undefined`: Use default animations
 * - `false` or `"disabled"`: Disable only root animations (children can still animate)
 * - `"disable-all"`: Disable all animations including children (cascades down)
 * - `object`: Custom animation configuration
 *   - Can include `state?: 'disabled' | 'disable-all' | boolean` to disable animations while customizing properties
 */
export type AnimationRoot<
  TConfig extends Record<string, any> = Record<string, any>,
> =
  | boolean
  | 'disabled'
  | 'disable-all'
  | (TConfig & { state?: 'disabled' | 'disable-all' | boolean });

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
export interface SpringAnimationConfig {
  type: 'spring';
  config?: WithSpringConfig;
}

/**
 * Timing animation configuration
 */
export interface TimingAnimationConfig {
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

/**
 * Animation configuration for popup dialog content components (Dialog, Select dialog presentation)
 * Supports opacity and scale animations
 */
export type PopupDialogContentAnimation = Animation<{
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
  /**
   * Scale animation configuration
   */
  scale?: AnimationValue<{
    /**
     * Scale values [idle, open, close]
     * @default [0.97, 1, 0.97]
     */
    value?: [number, number, number];
  }>;
}>;

/**
 * Animation configuration for popup popover content components (Popover, Select popover presentation)
 * Supports custom Keyframe animations for entering and exiting transitions
 */
export type PopupPopoverContentAnimation = Animation<{
  /**
   * Custom Keyframe animation for entering transition
   * @default Keyframe with translateY/translateX, scale, and opacity (200ms)
   */
  entering?: EntryOrExitLayoutType;
  /**
   * Custom Keyframe animation for exiting transition
   * @default Keyframe mirroring entering animation (150ms)
   */
  exiting?: EntryOrExitLayoutType;
}>;
