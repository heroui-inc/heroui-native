import { forwardRef, useMemo } from 'react';
import type { View, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { AnimationSettingsProvider } from '../../helpers/contexts/animation-settings-context';
import { useThemeColor } from '../../helpers/theme';
import { createContext, getElementWithDefault } from '../../helpers/utils';
import * as ActivityIndicatorPrimitives from '../../primitives/activity-indicator';
import { SpinnerIcon } from './spinner-icon';
import {
  useSpinnerIndicatorAnimation,
  useSpinnerRootAnimation,
} from './spinner.animation';
import { DISPLAY_NAME, SPINNER_SIZE_MAP } from './spinner.constants';
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
    size = 'md',
    color = 'default',
    isLoading = true,
    className,
    style,
    animation,
    ...restProps
  } = props;

  const tvStyles = spinnerStyles.root({
    size,
    className,
  });

  const { entering, exiting, isAllAnimationsDisabled } =
    useSpinnerRootAnimation({
      animation,
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

  const animationSettingsContextValue = useMemo(
    () => ({
      isAllAnimationsDisabled,
    }),
    [isAllAnimationsDisabled]
  );

  return (
    <AnimationSettingsProvider value={animationSettingsContextValue}>
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
    </AnimationSettingsProvider>
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
      iconProps,
      animation,
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

    const { rContainerStyle } = useSpinnerIndicatorAnimation({
      animation,
      style: style as ViewStyle | undefined,
      isLoading,
      speed,
    });

    if (!isLoading) {
      return null;
    }

    return (
      <AnimatedIndicator
        ref={ref}
        className={tvStyles}
        style={[rContainerStyle, style]}
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
 * @component Spinner.Indicator - Optional sub-component for customizing animation speed
 * and icon appearance. Accepts custom children to replace the default icon.
 * When omitted, Spinner uses a default indicator with standard animation settings.
 *
 * Props flow from Spinner to Indicator via context (size, color, isLoading).
 * The indicator only renders when isLoading is true.
 *
 * @see Full documentation: https://heroui.com/components/spinner
 */
const CompoundSpinner = Object.assign(SpinnerRoot, {
  /** @optional Customize animation speed and icon appearance */
  Indicator: SpinnerIndicator,
});

export { useSpinnerContext };
export default CompoundSpinner;
