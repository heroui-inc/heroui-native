import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import Animated, {
  interpolate,
  useAnimatedProps,
  useDerivedValue,
} from 'react-native-reanimated';
import { useUniwind } from 'uniwind';
import ExpoBlur from '../../../optional/expo-blur';
import { useAnimationSettings } from '../contexts/animation-settings-context';
import type { PopupOverlayBlurViewProps } from '../types/overlay';

const AnimatedExpoBlurView = ExpoBlur
  ? Animated.createAnimatedComponent(ExpoBlur.BlurView)
  : undefined;

/** Default maximum blur intensity in light color scheme */
const MAX_INTENSITY_LIGHT = 50;

/** Default maximum blur intensity in dark color scheme */
const MAX_INTENSITY_DARK = 75;

/** Default blur tint in light color scheme (darkens the content behind) */
const TINT_LIGHT = 'systemUltraThinMaterialDark';

/** Default blur tint in dark color scheme */
const TINT_DARK = 'dark';

export interface PopupOverlayBlurProps {
  /**
   * Popup animation progress shared value (0=idle, 1=open, 2=close).
   * When omitted, the blur stays at max intensity and the overlay's
   * entering/exiting animations fade the layer instead.
   */
  progress?: SharedValue<number>;
  /** Dragging state shared value */
  isDragging?: SharedValue<boolean>;
  /** Gesture release animation running state shared value */
  isGestureReleaseAnimationRunning?: SharedValue<boolean>;
  /**
   * Props forwarded to the underlying BlurView. `intensity` is treated as the
   * maximum (animated) intensity; `tint` and `style` override the defaults.
   */
  blurViewProps?: PopupOverlayBlurViewProps;
}

/**
 * Blur backdrop layer rendered behind the Dialog and BottomSheet overlays
 * when the overlay `variant` resolves to `blur`.
 *
 * Blur intensity mirrors the overlay's progress-driven opacity animation:
 * it interpolates [0, 1, 2] -> [0, max, 0] and pins to max while a drag or
 * gesture release animation is running. Renders nothing when expo-blur is
 * not installed.
 *
 * @note The layer is never hit-testable: the overlay pressable is rendered
 * above it and owns press handling, including its own `pointerEvents` gating.
 * A hit-testable full-screen blur layer would block the UI behind it.
 */
export const PopupOverlayBlurView: FC<PopupOverlayBlurProps> = ({
  progress,
  isDragging,
  isGestureReleaseAnimationRunning,
  blurViewProps,
}) => {
  const { theme } = useUniwind();
  const { isAllAnimationsDisabled } = useAnimationSettings();

  const isDark = theme.endsWith('dark');

  const { intensity, tint, style, ...restBlurViewProps } = blurViewProps ?? {};

  const maxIntensity =
    intensity ?? (isDark ? MAX_INTENSITY_DARK : MAX_INTENSITY_LIGHT);

  const blurIntensity = useDerivedValue(() => {
    if (progress === undefined) {
      return maxIntensity;
    }

    if (isAllAnimationsDisabled) {
      return progress.get() > 0 ? maxIntensity : 0;
    }

    if (
      (isDragging?.get() || isGestureReleaseAnimationRunning?.get()) &&
      progress.get() <= 1
    ) {
      return maxIntensity;
    }

    return interpolate(progress.get(), [0, 1, 2], [0, maxIntensity, 0]);
  });

  const animatedProps = useAnimatedProps(() => {
    return {
      intensity: blurIntensity.get(),
    };
  });

  if (!AnimatedExpoBlurView) {
    return null;
  }

  return (
    <AnimatedExpoBlurView
      animatedProps={animatedProps}
      tint={tint ?? (isDark ? TINT_DARK : TINT_LIGHT)}
      style={[StyleSheet.absoluteFill, style]}
      pointerEvents="none"
      {...restBlurViewProps}
    />
  );
};
