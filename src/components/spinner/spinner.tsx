import { forwardRef, useEffect, useMemo } from 'react';
import type { View } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useThemeColor } from '../../helpers/theme';
import { createContext, getElementWithDefault } from '../../helpers/utils';
import * as ActivityIndicatorPrimitives from '../../primitives/activity-indicator';
import { SpinnerIcon } from './spinner-icon';
import {
  DEFAULT_ROTATION_DURATION,
  DEFAULT_SPINNER_INDICATOR_ENTERING,
  DEFAULT_SPINNER_INDICATOR_EXITING,
  DISPLAY_NAME,
  SPINNER_SIZE_MAP,
} from './spinner.constants';
import spinnerStyles from './spinner.styles';
import type {
  SpinnerContextValue,
  SpinnerIndicatorProps,
  SpinnerProps,
} from './spinner.types';

const AnimatedRoot = Animated.createAnimatedComponent(
  ActivityIndicatorPrimitives.Root
);

const AnimatedIndicator = Animated.createAnimatedComponent(
  ActivityIndicatorPrimitives.Indicator
);

const [SpinnerProvider, useSpinnerContext] = createContext<SpinnerContextValue>(
  {
    name: 'SpinnerContext',
  }
);

const SpinnerRoot = forwardRef<View, SpinnerProps>((props, ref) => {
  const {
    children,
    entering = DEFAULT_SPINNER_INDICATOR_ENTERING,
    exiting = DEFAULT_SPINNER_INDICATOR_EXITING,
    size = 'md',
    color = 'default',
    isLoading = true,
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
      isLoading,
    }),
    [size, color, isLoading]
  );

  return (
    <SpinnerProvider value={contextValue}>
      <AnimatedRoot
        ref={ref}
        entering={entering}
        exiting={exiting}
        isLoading={isLoading}
        className={tvStyles}
        style={style}
        {...restProps}
      >
        {children || indicatorElement}
      </AnimatedRoot>
    </SpinnerProvider>
  );
});

// --------------------------------------------------

const SpinnerIndicator = forwardRef<View, SpinnerIndicatorProps>(
  (props, ref) => {
    const {
      children,
      className,
      style,
      speed = 1.1,
      animationEasing,
      iconProps,
      ...restProps
    } = props;

    const { size, color, isLoading } = useSpinnerContext();

    const themeColorAccent = useThemeColor('accent');
    const themeColorSuccess = useThemeColor('success');
    const themeColorWarning = useThemeColor('warning');
    const themeColorDanger = useThemeColor('danger');

    const tvStyles = spinnerStyles.indicator({
      className,
    });

    const iconSize = SPINNER_SIZE_MAP[size];

    const colorMap: Record<string, string> = {
      default: themeColorAccent,
      success: themeColorSuccess,
      warning: themeColorWarning,
      danger: themeColorDanger,
    };

    const iconColor = colorMap[color] || color;

    const rotation = useSharedValue(0);

    useEffect(() => {
      if (isLoading) {
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
    }, [isLoading, speed, animationEasing, rotation]);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ rotate: `${rotation.get()}deg` }],
      };
    });

    if (!isLoading) {
      return null;
    }

    return (
      <AnimatedIndicator
        ref={ref}
        className={tvStyles}
        style={[animatedStyle, style]}
        {...restProps}
      >
        {children || (
          <SpinnerIcon
            width={iconProps?.width ?? iconSize}
            height={iconProps?.height ?? iconSize}
            color={iconProps?.color ?? iconColor}
          />
        )}
      </AnimatedIndicator>
    );
  }
);

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
 * Props flow from Spinner to Indicator via context (size, color, isLoading).
 * The indicator only renders when isLoading is true.
 *
 * @see Full documentation: https://heroui.com/components/spinner
 */
const CompoundSpinner = Object.assign(SpinnerRoot, {
  /** @optional Customize animation speed, easing, and icon appearance */
  Indicator: SpinnerIndicator,
});

export { useSpinnerContext };
export default CompoundSpinner;
