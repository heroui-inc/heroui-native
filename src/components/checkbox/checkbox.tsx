import { createContext } from '@/helpers/utils';
import { getElementWithDefault } from '@/helpers/utils/get-element-with-default';
import * as CheckboxPrimitives from '@/primitives/checkbox';
import * as CheckboxPrimitivesTypes from '@/primitives/checkbox/checkbox.types';
import { useTheme } from '@/theme';
import { forwardRef, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import {
  DEFAULT_CHECK_ICON_SIZE,
  DEFAULT_HIT_SLOP,
  DEFAULT_TIMING_CONFIG,
  DISPLAY_NAME,
} from './checkbox.constants';
import checkboxStyles from './checkbox.styles';
import type {
  CheckboxBackgroundProps,
  CheckboxColor,
  CheckboxContextValue,
  CheckboxIndicatorIconProps,
  CheckboxIndicatorProps,
  CheckboxProps,
} from './checkbox.types';

const AnimatedCheckboxRoot = Animated.createAnimatedComponent(
  CheckboxPrimitives.Root
);

const [CheckboxProvider, useCheckboxContext] =
  createContext<CheckboxContextValue>({
    name: 'CheckboxContext',
  });

// --------------------------------------------------

const Checkbox = forwardRef<CheckboxPrimitivesTypes.RootRef, CheckboxProps>(
  (props, ref) => {
    const {
      children,
      color = 'default',
      isSelected,
      onSelectedChange,
      isDisabled = false,
      isReadOnly = false,
      colors,
      className,
      style,
      animationConfig,
      ...restProps
    } = props;

    const backgroundElement = useMemo(
      () =>
        getElementWithDefault(
          children,
          DISPLAY_NAME.CHECKBOX_BACKGROUND,
          <CheckboxBackground />
        ),
      [children]
    );

    const indicatorElement = useMemo(
      () =>
        getElementWithDefault(
          children,
          DISPLAY_NAME.CHECKBOX_INDICATOR,
          <CheckboxIndicator />
        ),
      [children]
    );

    const { colors: themeColors } = useTheme();

    const tvStyles = checkboxStyles.root({
      isDisabled,
      isReadOnly,
      className,
    });

    const borderColorMap: Record<CheckboxColor, string> = {
      default: isSelected ? themeColors.accent : themeColors.border,
      success: themeColors.success,
      warning: themeColors.warning,
      danger: themeColors.danger,
    };

    const timingConfig = animationConfig ?? DEFAULT_TIMING_CONFIG;

    const containerAnimatedStyle = useAnimatedStyle(() => {
      return {
        borderColor: withTiming(
          isSelected
            ? (colors?.selectedBorder ?? borderColorMap[color])
            : (colors?.defaultBorder ?? borderColorMap[color]),
          timingConfig
        ),
      };
    });

    const contextValue = useMemo(
      () => ({
        color,
        isSelected,
      }),
      [color, isSelected]
    );

    return (
      <CheckboxProvider value={contextValue}>
        <AnimatedCheckboxRoot
          ref={ref}
          className={tvStyles}
          style={[containerAnimatedStyle, styles.checkboxRoot, style]}
          isSelected={isSelected}
          onSelectedChange={onSelectedChange}
          isDisabled={isDisabled}
          hitSlop={props.hitSlop ?? DEFAULT_HIT_SLOP}
          {...restProps}
        >
          {backgroundElement}
          {indicatorElement}
        </AnimatedCheckboxRoot>
      </CheckboxProvider>
    );
  }
);

const styles = StyleSheet.create({
  checkboxRoot: {
    borderCurve: 'continuous',
  },
});

// --------------------------------------------------

function CheckboxBackground(props: CheckboxBackgroundProps) {
  const { children, colors, animationConfig, className, style, ...restProps } =
    props;

  const { color, isSelected } = useCheckboxContext();

  const { colors: themeColors } = useTheme();

  const tvStyles = checkboxStyles.background({
    className,
  });

  const backgroundColorMap: Record<CheckboxColor, string> = {
    default: themeColors.accent,
    success: themeColors.success,
    warning: themeColors.warning,
    danger: themeColors.danger,
  };

  const timingConfig = animationConfig ?? DEFAULT_TIMING_CONFIG;

  const backgroundAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        isSelected
          ? (colors?.selectedBackground ?? backgroundColorMap[color])
          : (colors?.defaultBackground ?? 'transparent'),
        timingConfig
      ),
    };
  });

  if (children) {
    return (
      <View className={tvStyles} style={style} {...restProps}>
        {children}
      </View>
    );
  }

  return (
    <Animated.View
      className={tvStyles}
      style={[backgroundAnimatedStyle, style]}
      {...restProps}
    />
  );
}

// --------------------------------------------------

function CheckIcon(props: CheckboxIndicatorIconProps) {
  const { theme, colors } = useTheme();

  const iconSize = DEFAULT_CHECK_ICON_SIZE;

  return (
    <Svg
      width={props.size ?? iconSize}
      height={props.size ?? iconSize}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M20 6L9 17L4 12"
        stroke={props.color ?? colors.accentForeground}
        strokeWidth={props.strokeWidth ?? (theme === 'dark' ? 4.5 : 3)}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

CheckIcon.displayName = DISPLAY_NAME.CHECKBOX_CHECK_ICON;

// --------------------------------------------------

const CheckboxIndicator = forwardRef<
  CheckboxPrimitivesTypes.IndicatorRef,
  CheckboxIndicatorProps
>((props, ref) => {
  const {
    children,
    animationConfig,
    iconProps,
    className,
    style,
    ...restProps
  } = props;

  const { isSelected } = useCheckboxContext();

  const tvStyles = checkboxStyles.indicator({
    className,
  });

  const timingConfig = animationConfig ?? DEFAULT_TIMING_CONFIG;

  const indicatorAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withTiming(isSelected ? 1 : 0, timingConfig) }],
    };
  });

  return (
    <CheckboxPrimitives.Indicator
      ref={ref}
      className={tvStyles}
      style={style}
      {...restProps}
    >
      {children ?? (
        <Animated.View style={indicatorAnimatedStyle}>
          <CheckIcon {...iconProps} />
        </Animated.View>
      )}
    </CheckboxPrimitives.Indicator>
  );
});

// --------------------------------------------------

Checkbox.displayName = DISPLAY_NAME.CHECKBOX_ROOT;
CheckboxBackground.displayName = DISPLAY_NAME.CHECKBOX_BACKGROUND;
CheckboxIndicator.displayName = DISPLAY_NAME.CHECKBOX_INDICATOR;

/**
 * Compound Checkbox component with sub-components
 *
 * @component Checkbox - Main container that handles selection state and user interaction.
 * Renders default background and indicator with checkmark if no children provided.
 * Animates border color based on selection state.
 *
 * @component Checkbox.Background - Optional background layer that fills when selected.
 * Animates background color transitions. Can be customized with different colors
 * or replaced with custom content.
 *
 * @component Checkbox.Indicator - Optional checkmark container that scales in when selected.
 * Renders default check icon if no children provided. Handles enter/exit animations
 * and can be replaced with custom indicators.
 *
 * Props flow from Checkbox to sub-components via context (color, isSelected).
 * The checkbox supports controlled and uncontrolled modes through isSelected/onSelectedChange.
 *
 * @see Full documentation: https://heroui.com/components/checkbox
 */
const CompoundCheckbox = Object.assign(Checkbox, {
  /** @optional Custom background layer with color animations */
  Background: CheckboxBackground,
  /** @optional Custom indicator with scale animations */
  Indicator: CheckboxIndicator,
});

export { useCheckboxContext };
export default CompoundCheckbox;
