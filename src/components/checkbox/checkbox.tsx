import { createContext } from '@/helpers/utils';
import { getChildElement } from '@/helpers/utils/get-child-element';
import * as CheckboxPrimitives from '@/primitives/checkbox';
import { useTheme } from '@/theme';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import checkboxStyles from './checkbox.styles';
import type {
  CheckboxBackgroundProps,
  CheckboxColor,
  CheckboxContextValue,
  CheckboxIndicatorIconProps,
  CheckboxIndicatorProps,
  CheckboxProps,
  CheckboxSize,
} from './checkbox.types';

const AnimatedCheckboxRoot = Animated.createAnimatedComponent(
  CheckboxPrimitives.Root
);

const DURATION = 175;
const EASING = Easing.bezier(0.25, 0.1, 0.25, 1);

export const [CheckboxProvider, useCheckboxContext] =
  createContext<CheckboxContextValue>({
    name: 'CheckboxContext',
  });

// --------------------------------------------------

function Checkbox(props: CheckboxProps) {
  const {
    children,
    size = 'md',
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

  const hitSlopMap: Record<CheckboxSize, number> = {
    sm: 10,
    md: 6,
    lg: 4,
  };

  const { colors: themeColors } = useTheme();

  const tvStyles = checkboxStyles.root({
    size,
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

  const timingConfig = animationConfig ?? {
    duration: DURATION,
    easing: EASING,
  };

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

  const backgroundElement = useMemo(
    () =>
      getChildElement(
        children,
        'HeroUINative.Checkbox.Background',
        <CheckboxBackground />
      ),
    [children]
  );

  const indicatorElement = useMemo(
    () =>
      getChildElement(
        children,
        'HeroUINative.Checkbox.Indicator',
        <CheckboxIndicator />
      ),
    [children]
  );

  const contextValue = useMemo(
    () => ({
      size,
      color,
      isSelected,
    }),
    [size, color, isSelected]
  );

  return (
    <CheckboxProvider value={contextValue}>
      <AnimatedCheckboxRoot
        className={tvStyles}
        style={[containerAnimatedStyle, styles.checkboxRoot, style]}
        isSelected={isSelected}
        onSelectedChange={onSelectedChange}
        isDisabled={isDisabled}
        hitSlop={props.hitSlop ?? hitSlopMap[size]}
        {...restProps}
      >
        {backgroundElement}
        {indicatorElement}
      </AnimatedCheckboxRoot>
    </CheckboxProvider>
  );
}

const styles = StyleSheet.create({
  checkboxRoot: {
    borderCurve: 'continuous',
  },
});

// --------------------------------------------------

function CheckboxBackground(props: CheckboxBackgroundProps) {
  const { children, colors, animationConfig, className, style, ...restProps } =
    props;

  const { size, color, isSelected } = useCheckboxContext();

  const { colors: themeColors } = useTheme();

  const tvStyles = checkboxStyles.background({
    size,
    className,
  });

  const backgroundColorMap: Record<CheckboxColor, string> = {
    default: themeColors.accent,
    success: themeColors.success,
    warning: themeColors.warning,
    danger: themeColors.danger,
  };

  const timingConfig = animationConfig ?? {
    duration: DURATION,
    easing: EASING,
  };

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
  const { size } = useCheckboxContext();
  const { theme, colors } = useTheme();

  const sizeMap = {
    sm: 10,
    md: 12,
    lg: 14,
  };

  const iconSize = sizeMap[size];

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

CheckIcon.displayName = 'HeroUINative.Checkbox.CheckIcon';

// --------------------------------------------------

function CheckboxIndicator(props: CheckboxIndicatorProps) {
  const {
    children,
    animationConfig,
    iconProps,
    className,
    style,
    ...restProps
  } = props;

  const { size, isSelected } = useCheckboxContext();

  const tvStyles = checkboxStyles.indicator({
    size,
    className,
  });

  const timingConfig = animationConfig ?? {
    duration: DURATION,
    easing: EASING,
  };

  const indicatorAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withTiming(isSelected ? 1 : 0, timingConfig) }],
    };
  });

  return (
    <CheckboxPrimitives.Indicator
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
}

// --------------------------------------------------

Checkbox.displayName = 'HeroUINative.Checkbox.Root';
CheckboxBackground.displayName = 'HeroUINative.Checkbox.Background';
CheckboxIndicator.displayName = 'HeroUINative.Checkbox.Indicator';

const CompoundCheckbox = Object.assign(Checkbox, {
  Background: CheckboxBackground,
  Indicator: CheckboxIndicator,
});

export default CompoundCheckbox;
