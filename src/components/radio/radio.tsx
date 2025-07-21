import React, { useContext, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
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

const AnimatedRadioGroupItem = Animated.createAnimatedComponent(
  RadioGroupPrimitives.Item
);

const DURATION = 175;
const EASING = Easing.bezier(0.25, 0.1, 0.25, 1);

// Internal context to get RadioGroup state
const RadioGroupContext = React.createContext<{
  value: string | undefined;
  onValueChange: (value: string) => void;
  isDisabled?: boolean;
} | null>(null);

export const [RadioProvider, useRadioContext] =
  createContext<RadioContextValue>({
    name: 'RadioContext',
  });

// --------------------------------------------------

// Custom RadioGroup root that provides context
const RadioGroup = (props: RadioGroupProps) => {
  const { value, onValueChange, isDisabled, className, ...restProps } = props;

  const tvStyles = radioStyles.groupRoot({
    className,
  });

  return (
    <RadioGroupContext.Provider value={{ value, onValueChange, isDisabled }}>
      <RadioGroupPrimitives.Root
        value={value}
        onValueChange={onValueChange}
        isDisabled={isDisabled}
        className={tvStyles}
        {...restProps}
      />
    </RadioGroupContext.Provider>
  );
};

// --------------------------------------------------

function Radio(props: RadioProps) {
  const {
    children,
    size = 'md',
    color = 'default',
    isDisabled = false,
    isReadOnly = false,
    className,
    style,
    value,
    ...restProps
  } = props;

  const radioGroupContext = useContext(RadioGroupContext);
  const isSelected = radioGroupContext?.value === value;

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
    sm: 10,
    md: 6,
    lg: 4,
  };

  const tvStyles = radioStyles.radioRoot({
    size,
    isDisabled: isDisabled || radioGroupContext?.isDisabled,
    isReadOnly,
    className,
  });

  const contextValue = useMemo(
    () => ({
      size,
      color,
      isSelected,
      isDisabled: isDisabled || radioGroupContext?.isDisabled,
      isReadOnly,
    }),
    [
      size,
      color,
      isSelected,
      isDisabled,
      radioGroupContext?.isDisabled,
      isReadOnly,
    ]
  );

  return (
    <RadioProvider value={contextValue}>
      <AnimatedRadioGroupItem
        className={tvStyles}
        style={style}
        value={value}
        isDisabled={isDisabled || isReadOnly}
        hitSlop={props.hitSlop ?? hitSlopMap[size]}
        {...restProps}
      >
        {indicatorElement}
        {contentElement}
      </AnimatedRadioGroupItem>
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
  const { children, colors, animationConfig, className, style, ...restProps } =
    props;

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

function RadioIndicatorThumb(props: RadioThumbProps) {
  const { children, colors, animationConfig, className, style, ...restProps } =
    props;

  const { size, isSelected } = useRadioContext();
  const { colors: themeColors } = useTheme();

  const tvStyles = radioStyles.thumb({
    size,
    className,
  });

  const timingConfig = animationConfig ?? {
    duration: DURATION,
    easing: EASING,
  };

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withTiming(isSelected ? 1 : 0, timingConfig) }],
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
