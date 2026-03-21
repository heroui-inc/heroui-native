import type { ViewStyle } from 'react-native';
import type { WithSpringConfig } from 'react-native-reanimated';
import type { HeroTextProps } from '../../helpers/internal/components/hero-text';
import type {
  Animation,
  AnimationRootDisableAll,
  AnimationValue,
} from '../../helpers/internal/types';
import type { ElementSlots } from '../../helpers/internal/types/theme';
import type {
  FillProps as PrimitiveFillProps,
  OutputProps as PrimitiveOutputProps,
  RootProps as PrimitiveRootProps,
  ThumbProps as PrimitiveThumbProps,
  TrackProps as PrimitiveTrackProps,
} from '../../primitives/slider/slider.types';
import type { OutputSlots, ThumbSlots } from './slider.styles';

/**
 * Props for the Slider root component.
 * Extends the primitive Root props with visual styling.
 *
 * Value-related props (value, defaultValue, onChange, onChangeEnd, minValue,
 * maxValue, step, formatOptions, orientation, isDisabled, aria-label) are
 * inherited from the primitive and do not need to be redeclared.
 */
interface SliderProps extends PrimitiveRootProps {
  /** Additional CSS classes */
  className?: string;

  /**
   * Animation configuration for slider
   * - `"disable-all"`: Disable all animations including children
   * - `undefined`: Use default animations
   */
  animation?: AnimationRootDisableAll;
}

/**
 * Props for the Slider.Output sub-component.
 * Displays the current slider value as formatted text.
 */
interface SliderOutputProps extends PrimitiveOutputProps {
  /** Additional CSS classes for the output container */
  className?: string;

  /** Additional CSS classes for output slots (container, text) */
  classNames?: ElementSlots<OutputSlots>;

  /** Props forwarded to the inner Text component when using the default text content */
  textProps?: Omit<HeroTextProps, 'children'>;
}

/**
 * Props for the Slider.Track sub-component.
 * Container for Fill and Thumb elements.
 */
interface SliderTrackProps extends PrimitiveTrackProps {
  /** Additional CSS classes */
  className?: string;
}

/**
 * Props for the Slider.Fill sub-component.
 * Visual representation of the selected range.
 */
interface SliderFillProps extends PrimitiveFillProps {
  /** Additional CSS classes */
  className?: string;
}

/**
 * Animation configuration for the Slider.Thumb knob scale effect.
 * Animates between idle and dragging states using spring physics.
 */
type SliderThumbAnimation = Animation<{
  scale?: AnimationValue<{
    /**
     * Scale values [idle, dragging]
     * @default [1, 0.9]
     */
    value?: [number, number];
    /**
     * Spring animation configuration
     * @default { damping: 15, stiffness: 200, mass: 0.5 }
     */
    springConfig?: WithSpringConfig;
  }>;
}>;

/**
 * Props for the Slider.Thumb sub-component.
 * Two-slot thumb: outer container (positioning + accent bg) wrapping
 * an inner knob (foreground + shadow + scale animation).
 */
interface SliderThumbProps extends PrimitiveThumbProps {
  /**
   * Whether this individual thumb is disabled
   */
  isDisabled?: boolean;

  /**
   * Animation configuration for the thumb knob
   * - `false` or `"disabled"`: Disable thumb animation
   * - `object`: Custom scale animation configuration
   * - `undefined`: Use default animations
   */
  animation?: SliderThumbAnimation;

  /** Additional CSS classes for the thumb container */
  className?: string;

  /** Additional CSS classes for thumb slots (thumbContainer, thumbKnob) */
  classNames?: ElementSlots<ThumbSlots>;

  /** Inline styles for thumb slots (thumbContainer, thumbKnob) */
  styles?: Partial<Record<ThumbSlots, ViewStyle>>;
}

export type {
  SliderFillProps,
  SliderOutputProps,
  SliderProps,
  SliderThumbAnimation,
  SliderThumbProps,
  SliderTrackProps,
};
