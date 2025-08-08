import { forwardRef, useEffect, useMemo } from 'react';
import Animated, {
  cancelAnimation,
  Easing,
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { createContext, getElementWithDefault } from '../../helpers/utils';
import * as ActivityIndicatorPrimitives from '../../primitives/activity-indicator';
import * as ActivityIndicatorPrimitivesTypes from '../../primitives/activity-indicator/activity-indicator.types';
import { useTheme } from '../../theme';
import { SpinnerIcon } from './spinner-icon';
import {
  DEFAULT_ROTATION_DURATION,
  DISPLAY_NAME,
  SPINNER_SIZE_MAP,
} from './spinner.constants';
import spinnerStyles from './spinner.styles';
import type {
  SpinnerContextValue,
  SpinnerIndicatorProps,
  SpinnerProps,
} from './spinner.types';

const AnimatedIndicator = Animated.createAnimatedComponent(
  ActivityIndicatorPrimitives.Indicator
);

const [SpinnerProvider, useSpinnerContext] = createContext<SpinnerContextValue>(
  {
    name: 'SpinnerContext',
  }
);

const SpinnerRoot = forwardRef<
  ActivityIndicatorPrimitivesTypes.RootRef,
  SpinnerProps
>((props, ref) => {
  const {
    children,
    size = 'md',
    color = 'default',
    loading = true,
    className,
    style,
    ...restProps
  } = props;

  const tvStyles = spinnerStyles.root({
    size,
    className,
  });

  const indicatorElement = useMemo(
    () =>
      getElementWithDefault(
        children,
        DISPLAY_NAME.INDICATOR,
        <SpinnerIndicator />
      ),
    [children]
  );

  const contextValue = useMemo(
    () => ({
      size,
      color,
      loading,
    }),
    [size, color, loading]
  );

  return (
    <SpinnerProvider value={contextValue}>
      <ActivityIndicatorPrimitives.Root
        ref={ref}
        loading={loading}
        className={tvStyles}
        style={style}
        {...restProps}
      >
        {children || indicatorElement}
      </ActivityIndicatorPrimitives.Root>
    </SpinnerProvider>
  );
});

// --------------------------------------------------

const SpinnerIndicator = forwardRef<
  ActivityIndicatorPrimitivesTypes.IndicatorRef,
  SpinnerIndicatorProps
>((props, ref) => {
  const {
    children,
    className,
    style,
    speed = 1,
    animationEasing,
    iconProps,
    ...restProps
  } = props;

  const { size, color, loading } = useSpinnerContext();

  const { colors: themeColors } = useTheme();

  const tvStyles = spinnerStyles.indicator({
    className,
  });

  const iconSize = SPINNER_SIZE_MAP[size];

  const colorMap: Record<string, string> = {
    default: themeColors.foreground,
    success: themeColors.success,
    warning: themeColors.warning,
    danger: themeColors.danger,
  };

  const iconColor = colorMap[color] || color;

  const rotation = useSharedValue(0);

  useEffect(() => {
    if (loading) {
      rotation.set(
        withRepeat(
          withSequence(
            withTiming(360, {
              duration: DEFAULT_ROTATION_DURATION / speed,
              easing: animationEasing || Easing.linear,
            })
          ),
          -1,
          false
        )
      );
    } else {
      rotation.set(withTiming(0, { duration: 300 }));
    }

    return () => {
      cancelAnimation(rotation);
    };
  }, [loading, speed, animationEasing, rotation]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.get()}deg` }],
    };
  });

  if (!loading) {
    return null;
  }

  return (
    <AnimatedIndicator
      ref={ref}
      className={tvStyles}
      style={[animatedStyle, style]}
      {...restProps}
    >
      <Animated.View
        entering={FadeIn.easing(Easing.out(Easing.ease))}
        exiting={FadeOut}
      >
        {children || (
          <SpinnerIcon
            width={iconProps?.width ?? iconSize}
            height={iconProps?.height ?? iconSize}
            color={iconProps?.color ?? iconColor}
          />
        )}
      </Animated.View>
    </AnimatedIndicator>
  );
});

// --------------------------------------------------

SpinnerRoot.displayName = DISPLAY_NAME.ROOT;
SpinnerIndicator.displayName = DISPLAY_NAME.INDICATOR;

/**
 * Compound Spinner component with sub-components
 *
 * @component Spinner - Main container that controls loading state, size, and color.
 * Renders a default animated indicator if no children provided.
 *
 * @component Spinner.Indicator - Optional sub-component for customizing animation speed,
 * easing, and icon appearance. Accepts custom children to replace the default icon.
 * When omitted, Spinner uses a default indicator with standard animation settings.
 *
 * Props flow from Spinner to Indicator via context (size, color, loading).
 * The indicator only renders when loading is true.
 *
 * @see Full documentation: https://heroui.com/components/spinner
 */
const CompoundSpinner = Object.assign(SpinnerRoot, {
  /** @optional Customize animation speed, easing, and icon appearance */
  Indicator: SpinnerIndicator,
});

export { useSpinnerContext };
export default CompoundSpinner;
