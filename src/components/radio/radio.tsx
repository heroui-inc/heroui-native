import React, { useContext, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import { createContext } from '@/helpers/utils';
import { getChildElement } from '@/helpers/utils/get-child-element';
import * as LabelPrimitives from '@/primitives/label';
import * as RadioGroupPrimitives from '@/primitives/radio-group';
import { useTheme } from '@/theme';

import radioStyles from './radio.styles';
import type {
  RadioBackgroundProps,
  RadioColor,
  RadioContextValue,
  RadioDescriptionProps,
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

export const [RadioProvider, useRadioContext] =
  createContext<RadioContextValue>({
    name: 'RadioContext',
  });

// Internal context to get RadioGroup state
const RadioGroupContext = React.createContext<{
  value: string | undefined;
  onValueChange: (value: string) => void;
  isDisabled?: boolean;
} | null>(null);

// --------------------------------------------------

// Custom RadioGroup root that provides context
const RadioGroup = React.forwardRef<
  View,
  React.ComponentProps<typeof RadioGroupPrimitives.Root>
>((props, ref) => {
  const { value, onValueChange, isDisabled, ...restProps } = props;

  return (
    <RadioGroupContext.Provider value={{ value, onValueChange, isDisabled }}>
      <RadioGroupPrimitives.Root
        ref={ref}
        value={value}
        onValueChange={onValueChange}
        isDisabled={isDisabled}
        className="gap-1.5"
        {...restProps}
      />
    </RadioGroupContext.Provider>
  );
});

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

  // Get the RadioGroup context
  const radioGroupContext = useContext(RadioGroupContext);
  const isSelected = radioGroupContext?.value === value;

  const indicatorElement = useMemo(
    () =>
      getChildElement(
        children,
        'HeroUINative.Radio.Indicator',
        <RadioIndicator />
      ),
    [children]
  );

  const labelElement = useMemo(() => {
    const found = React.Children.toArray(children).find(
      (child) =>
        React.isValidElement(child) &&
        (child.type as any)?.displayName === 'HeroUINative.Radio.Label'
    );
    return found || null;
  }, [children]);

  const descriptionElement = useMemo(() => {
    const found = React.Children.toArray(children).find(
      (child) =>
        React.isValidElement(child) &&
        (child.type as any)?.displayName === 'HeroUINative.Radio.Description'
    );
    return found || null;
  }, [children]);

  const hitSlopMap: Record<RadioSize, number> = {
    sm: 10,
    md: 6,
    lg: 4,
  };

  const tvStyles = radioStyles.item({
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

  const labelContent =
    labelElement || descriptionElement ? (
      <View className="flex-col flex-1">
        {labelElement}
        {descriptionElement}
      </View>
    ) : null;

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
        {labelContent}
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
      getChildElement(
        children,
        'HeroUINative.Radio.Background',
        <RadioBackground />
      ),
    [children]
  );

  const thumbElement = useMemo(
    () => getChildElement(children, 'HeroUINative.Radio.Thumb', <RadioThumb />),
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
          : (colors?.defaultBorder ?? borderColorMap.default),
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

function RadioBackground(props: RadioBackgroundProps) {
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

function RadioThumb(props: RadioThumbProps) {
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
    return <Animated.View style={thumbAnimatedStyle}>{children}</Animated.View>;
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

RadioGroup.displayName = 'HeroUINative.RadioGroup.Root';
Radio.displayName = 'HeroUINative.Radio.Root';
RadioIndicator.displayName = 'HeroUINative.Radio.Indicator';
RadioBackground.displayName = 'HeroUINative.Radio.Background';
RadioThumb.displayName = 'HeroUINative.Radio.Thumb';
RadioLabel.displayName = 'HeroUINative.Radio.Label';
RadioDescription.displayName = 'HeroUINative.Radio.Description';

const CompoundRadioGroup = Object.assign(Radio, {
  Indicator: RadioIndicator,
  Background: RadioBackground,
  Thumb: RadioThumb,
  Label: RadioLabel,
  Description: RadioDescription,
});

export { Radio, RadioGroup };
export default CompoundRadioGroup;
