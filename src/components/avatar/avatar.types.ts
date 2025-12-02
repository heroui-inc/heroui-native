import type { ImageProps, TextProps } from 'react-native';
import type {
  AnimatedProps,
  EntryOrExitLayoutType,
  WithTimingConfig,
} from 'react-native-reanimated';
import type { ElementSlots } from '../../helpers/theme/types';
import type {
  Animation,
  AnimationRootDisableAll,
  AnimationValue,
} from '../../helpers/types/animation';
import type {
  FallbackProps as PrimitiveFallbackProps,
  FallbackRef as PrimitiveFallbackRef,
  ImageProps as PrimitiveImageProps,
  ImageRef as PrimitiveImageRef,
  RootProps as PrimitiveRootProps,
  RootRef as PrimitiveRootRef,
} from '../../primitives/avatar';
import type { AvatarFallbackSlots } from './avatar.styles';
import type { PersonIconProps } from './person-icon';

/**
 * Available sizes for the Avatar component
 */
export type AvatarSize = 'sm' | 'md' | 'lg';

/**
 * Available variants for the Avatar component
 */
export type AvatarVariant = 'default' | 'soft';

/**
 * Available color variants for the Avatar component
 */
export type AvatarColor =
  | 'accent'
  | 'default'
  | 'success'
  | 'warning'
  | 'danger';

/**
 * Props for the Avatar root component
 * Extends primitive root props with styled variants
 */
export interface AvatarRootProps extends PrimitiveRootProps {
  /**
   * Size of the avatar
   * @default 'md'
   */
  size?: AvatarSize;
  /**
   * Visual variant of the avatar
   * @default 'default'
   */
  variant?: AvatarVariant;
  /**
   * Color variant of the avatar
   * @default 'accent'
   */
  color?: AvatarColor;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Animation configuration for avatar
   * - `"disable-all"`: Disable all animations including children
   * - `undefined`: Use default animations
   */
  animation?: AnimationRootDisableAll;
}

/**
 * Animation configuration for avatar image component
 */
export type AvatarImageAnimation = Animation<{
  opacity?: AnimationValue<{
    /**
     * Opacity values [initial, loaded] for image animation
     * @default [0, 1]
     */
    value?: [number, number];
    /**
     * Animation timing configuration
     * @default { duration: 200, easing: Easing.in(Easing.ease) }
     */
    timingConfig?: WithTimingConfig;
  }>;
}>;

/**
 * Props for the Avatar image component
 * Extends primitive image props with styling
 */
export type AvatarImageProps =
  | (AnimatedProps<ImageProps> & {
      /**
       * Additional CSS classes
       */
      className?: string;
      /**
       * Whether to use the default image directly
       */
      asChild?: false;
      /**
       * Animation configuration for image
       * - `false` or `"disabled"`: Disable all animations
       * - `true` or `undefined`: Use default animations
       * - `object`: Custom animation configuration
       */
      animation?: AvatarImageAnimation;
    })
  | (PrimitiveImageProps & {
      /**
       * Additional CSS classes
       */
      className?: string;
      /**
       * Whether to use the default image directly
       */
      asChild: true;
    });

/**
 * Animation configuration for avatar fallback component
 */
export type AvatarFallbackAnimation = Animation<{
  entering?: AnimationValue<{
    /**
     * Custom entering animation for fallback
     */
    value?: EntryOrExitLayoutType;
  }>;
}>;

/**
 * Props for the Avatar fallback component
 * Extends primitive fallback props with styled variants
 */
export interface AvatarFallbackProps
  extends AnimatedProps<PrimitiveFallbackProps> {
  /**
   * Delay in milliseconds before the fallback is shown
   * @default 0
   */
  delayMs?: number;

  /**
   * Color variant of the fallback
   * Inherits from parent if not specified
   */
  color?: AvatarColor;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Additional CSS classes for different parts of the fallback
   */
  classNames?: ElementSlots<AvatarFallbackSlots>;

  /**
   * Props to pass to the Text component when children is a string
   */
  textProps?: TextProps;

  /**
   * Props to pass to the default icon when no children are provided
   */
  iconProps?: PersonIconProps;

  /**
   * Animation configuration for fallback
   * - `false` or `"disabled"`: Disable all animations
   * - `true` or `undefined`: Use default animations
   * - `object`: Custom animation configuration
   */
  animation?: AvatarFallbackAnimation;
}

/**
 * Context value shared between Avatar components
 */
export interface AvatarContextValue {
  /**
   * Current size of the avatar
   */
  size: AvatarSize;

  /**
   * Current color variant of the avatar
   */
  color: AvatarColor;

  /**
   * Whether all animations should be disabled (cascading from root)
   */
  isAllAnimationsDisabled?: boolean;
}

/** Reference type for the Avatar root component */
export type AvatarRootRef = PrimitiveRootRef;

/** Reference type for the Avatar image component */
export type AvatarImageRef = PrimitiveImageRef;

/** Reference type for the Avatar fallback component */
export type AvatarFallbackRef = PrimitiveFallbackRef;
