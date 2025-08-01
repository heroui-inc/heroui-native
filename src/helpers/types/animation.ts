import type {
  AnimatedProps,
  EasingFunction,
  EasingFunctionFactory,
  EntryExitAnimationFunction,
  LayoutAnimationFunction,
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

/**
 * Universal animation properties for React Native Reanimated components
 * This interface provides a consistent API for all animated components
 */
export interface ReanimatedAnimationProps {
  /**
   * Animation to run when the component mounts or becomes visible
   * @example FadeIn.duration(300).easing(Easing.ease)
   */
  entering?: EntryExitAnimationFunction;
  /**
   * Animation to run when the component unmounts or becomes hidden
   * @example FadeOut.duration(200).easing(Easing.ease)
   */
  exiting?: EntryExitAnimationFunction;
  /**
   * Animation to run when the component's layout changes
   * @example LinearTransition.springify()
   */
  layout?: LayoutAnimationFunction;
  /**
   * Animated properties that can be passed to the underlying animated component
   * Used for custom animated props that are not styles
   * @example { opacity: animatedValue }
   */
  animatedProps?: Partial<AnimatedProps<any>>;
}
