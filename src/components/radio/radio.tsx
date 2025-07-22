import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import {
  createContext,
  getChildElementOrDefault,
  getElementByDisplayName,
} from '@/helpers/utils';
import * as LabelPrimitives from '@/primitives/label';
import * as RadioGroupPrimitives from '@/primitives/radio-group';
import { useTheme } from '@/theme';

import { DISPLAY_NAME } from './radio.constants';
import radioStyles from './radio.styles';
import type {
  RadioBackgroundProps,
  RadioColor,
  RadioContentProps,
  RadioContextValue,
  RadioDescriptionProps,
  RadioGroupProps,
  RadioIndicatorProps,
  RadioLabelProps,
  RadioProps,
  RadioSize,
  RadioThumbProps,
} from './radio.types';

const AnimatedRadioItem = Animated.createAnimatedComponent(
  RadioGroupPrimitives.Item
);

const DURATION = 175;
const EASING = Easing.out(Easing.ease);

export const [RadioProvider, useRadioContext] =
  createContext<RadioContextValue>({
    name: 'RadioContext',
  });

// --------------------------------------------------

// RadioGroup root component
const RadioGroup = (props: RadioGroupProps) => {
  const { className, orientation, ...restProps } = props;

  const tvStyles = radioStyles.groupRoot({
    orientation,
    className,
  });

  return <RadioGroupPrimitives.Root className={tvStyles} {...restProps} />;
};

// --------------------------------------------------

function Radio(props: RadioProps) {
  const {
    children,
    size = 'md',
    color = 'default',
    alignIndicator = 'end',
    isDisabled = false,
    isReadOnly = false,
    className,
    style,
    value,
    ...restProps
  } = props;

  const { value: groupValue, orientation } =
    RadioGroupPrimitives.useRadioGroupContext();
  const isSelected = groupValue === value;
  const isDisabledValue = isDisabled;

  const indicatorElement = useMemo(
    () =>
      getChildElementOrDefault(
        children,
        DISPLAY_NAME.RADIO_INDICATOR,
        <RadioIndicator />
      ),
    [children]
  );

  const contentElement = useMemo(() => {
    return getElementByDisplayName(children, DISPLAY_NAME.RADIO_CONTENT);
  }, [children]);

  const hitSlopMap: Record<RadioSize, number> = {
    sm: 8,
    md: 6,
    lg: 4,
  };

  const tvStyles = radioStyles.radioRoot({
    size,
    alignIndicator,
    orientation,
    isDisabled: isDisabledValue,
    isReadOnly,
    className,
  });

  const contextValue = useMemo(
    () => ({
      size,
      color,
      isSelected,
      isDisabled: isDisabledValue,
      isReadOnly,
    }),
    [size, color, isSelected, isDisabledValue, isReadOnly]
  );

  return (
    <RadioProvider value={contextValue}>
      <AnimatedRadioItem
        className={tvStyles}
        style={style}
        value={value}
        isDisabled={isDisabledValue || isReadOnly}
        hitSlop={props.hitSlop ?? hitSlopMap[size]}
        {...restProps}
      >
        {alignIndicator === 'start' && indicatorElement}
        {contentElement}
        {alignIndicator === 'end' && indicatorElement}
      </AnimatedRadioItem>
    </RadioProvider>
  );
}

// --------------------------------------------------

function RadioIndicator(props: RadioIndicatorProps) {
  const { children, colors, animationConfig, className, style, ...restProps } =
    props;

  const { size, color, isSelected } = useRadioContext();
  const { colors: themeColors } = useTheme();

  const backgroundElement = useMemo(
    () =>
      getChildElementOrDefault(
        children,
        DISPLAY_NAME.RADIO_INDICATOR_BACKGROUND,
        <RadioIndicatorBackground />
      ),
    [children]
  );

  const thumbElement = useMemo(
    () =>
      getChildElementOrDefault(
        children,
        DISPLAY_NAME.RADIO_INDICATOR_THUMB,
        <RadioIndicatorThumb />
      ),
    [children]
  );

  const tvStyles = radioStyles.indicator({
    size,
    className,
  });

  const borderColorMap: Record<RadioColor, string> = {
    default: isSelected ? themeColors.accent : themeColors.border,
    success: themeColors.success,
    warning: themeColors.warning,
    danger: themeColors.danger,
  };

  const timingConfig = animationConfig ?? {
    duration: DURATION,
    easing: EASING,
  };

  const indicatorAnimatedStyle = useAnimatedStyle(() => {
    return {
      borderColor: withTiming(
        isSelected
          ? (colors?.selectedBorder ?? borderColorMap[color])
          : (colors?.defaultBorder ?? borderColorMap[color]),
        timingConfig
      ),
    };
  });

  return (
    <Animated.View
      className={tvStyles}
      style={[indicatorAnimatedStyle, styles.indicatorRoot, style]}
      {...restProps}
    >
      {backgroundElement}
      {thumbElement}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  indicatorRoot: {
    borderCurve: 'continuous',
  },
});

// --------------------------------------------------

function RadioIndicatorBackground(props: RadioBackgroundProps) {
  const { children, colors, className, style, ...restProps } = props;

  const { color, isSelected } = useRadioContext();
  const { colors: themeColors } = useTheme();

  const tvStyles = radioStyles.background({
    className,
  });

  const backgroundColorMap: Record<RadioColor, string> = {
    default: themeColors.accent,
    success: themeColors.success,
    warning: themeColors.warning,
    danger: themeColors.danger,
  };

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
      style={[
        {
          backgroundColor: isSelected
            ? (colors?.selectedBackground ?? backgroundColorMap[color])
            : (colors?.defaultBackground ?? 'transparent'),
        },
        style,
      ]}
      {...restProps}
    />
  );
}

// --------------------------------------------------

function RadioIndicatorThumb(props: RadioThumbProps) {
  const { children, colors, className, style, animationConfig, ...restProps } =
    props;

  const { size, isSelected } = useRadioContext();
  const { theme, colors: themeColors } = useTheme();

  const tvStyles = radioStyles.thumb({
    size,
    isDark: theme === 'dark',
    className,
  });

  const timingConfig = animationConfig ?? {
    damping: 40,
    stiffness: 600,
    mass: 1.5,
  };

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(isSelected ? 1 : 0, timingConfig),
        },
      ],
      backgroundColor: colors?.selectedThumb ?? themeColors.background,
    };
  });

  if (children) {
    return children;
  }

  return (
    <Animated.View
      className={tvStyles}
      style={[thumbAnimatedStyle, style]}
      {...restProps}
    />
  );
}

// --------------------------------------------------

function RadioContent(props: RadioContentProps) {
  const { children, className, style, ...restProps } = props;

  const labelElement = useMemo(() => {
    return getElementByDisplayName(children, DISPLAY_NAME.RADIO_LABEL);
  }, [children]);

  const descriptionElement = useMemo(() => {
    return getElementByDisplayName(children, DISPLAY_NAME.RADIO_DESCRIPTION);
  }, [children]);

  const tvStyles = radioStyles.content({
    className,
  });

  // If there are label or description elements, wrap them in a flex container
  if (labelElement || descriptionElement) {
    return (
      <View className={tvStyles} style={style} {...restProps}>
        {labelElement}
        {descriptionElement}
      </View>
    );
  }

  // Otherwise, render children directly
  return (
    <View className={tvStyles} style={style} {...restProps}>
      {children}
    </View>
  );
}

// --------------------------------------------------

function RadioLabel(props: RadioLabelProps) {
  const { children, className, ...restProps } = props;

  const { size } = useRadioContext();

  const tvStyles = radioStyles.label({
    size,
    className,
  });

  return (
    <LabelPrimitives.Text className={tvStyles} {...restProps}>
      {children}
    </LabelPrimitives.Text>
  );
}

// --------------------------------------------------

function RadioDescription(props: RadioDescriptionProps) {
  const { children, className, ...restProps } = props;

  const { size } = useRadioContext();

  const tvStyles = radioStyles.description({
    size,
    className,
  });

  return (
    <Text className={tvStyles} {...restProps}>
      {children}
    </Text>
  );
}

// --------------------------------------------------

RadioGroup.displayName = DISPLAY_NAME.RADIO_GROUP;
Radio.displayName = DISPLAY_NAME.RADIO;
RadioIndicator.displayName = DISPLAY_NAME.RADIO_INDICATOR;
RadioIndicatorBackground.displayName = DISPLAY_NAME.RADIO_INDICATOR_BACKGROUND;
RadioIndicatorThumb.displayName = DISPLAY_NAME.RADIO_INDICATOR_THUMB;
RadioContent.displayName = DISPLAY_NAME.RADIO_CONTENT;
RadioLabel.displayName = DISPLAY_NAME.RADIO_LABEL;
RadioDescription.displayName = DISPLAY_NAME.RADIO_DESCRIPTION;

const CompoundRadioGroup = Object.assign(Radio, {
  Indicator: RadioIndicator,
  IndicatorBackground: RadioIndicatorBackground,
  IndicatorThumb: RadioIndicatorThumb,
  Content: RadioContent,
  Label: RadioLabel,
  Description: RadioDescription,
});

export { Radio, RadioGroup };
export default CompoundRadioGroup;
