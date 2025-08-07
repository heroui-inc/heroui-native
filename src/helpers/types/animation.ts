import type {
  EasingFunction,
  EasingFunctionFactory,
} from 'react-native-reanimated';

/**
 * Configuration for timing-based animations
 */
export interface TimingConfig {
  /**
   * Duration of the animation in milliseconds
   * @default 300
   */
  duration?: number;
  /**
   * Easing function to control the animation curve
   * @example Easing.inOut(Easing.ease)
   */
  easing?: EasingFunction | EasingFunctionFactory;
}

/**
 * Configuration for spring-based animations
 */
export interface SpringConfig {
  /**
   * Controls how quickly the animation comes to rest
   * Higher values make the animation more damped (less bouncy)
   * @default 10
   */
  damping?: number;
  /**
   * Controls the speed of the animation
   * Higher values make the animation faster
   * @default 100
   */
  stiffness?: number;
  /**
   * Mass of the animated value
   * Higher values make the animation slower
   * @default 1
   */
  mass?: number;
}
