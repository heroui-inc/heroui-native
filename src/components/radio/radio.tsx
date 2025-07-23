import { forwardRef, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import {
  createContext,
  getElementByDisplayName,
  getElementWithDefault,
} from '@/helpers/utils';
import * as LabelPrimitives from '@/primitives/label';
import * as RadioGroupPrimitives from '@/primitives/radio-group';
import { useTheme } from '@/theme';

import {
  DEFAULT_SPRING_CONFIG,
  DEFAULT_TIMING_CONFIG,
  DISPLAY_NAME,
  HIT_SLOP_MAP,
} from './radio.constants';
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
  RadioThumbProps,
} from './radio.types';

const AnimatedRadioItem = Animated.createAnimatedComponent(
  RadioGroupPrimitives.Item
);

const AnimatedRadioIndicator = Animated.createAnimatedComponent(
  RadioGroupPrimitives.Indicator
);

const [RadioProvider, useRadioContext] = createContext<RadioContextValue>({
  name: 'RadioContext',
});

// --------------------------------------------------

// RadioGroup root component
const RadioGroup = forwardRef<RadioGroupPrimitives.RootRef, RadioGroupProps>(
  (props, ref) => {
    const { className, orientation = 'vertical', ...restProps } = props;

    const tvStyles = radioStyles.groupRoot({
      orientation,
      className,
    });

    return (
      <RadioGroupPrimitives.Root
        ref={ref}
        className={tvStyles}
        orientation={orientation}
        {...restProps}
      />
    );
  }
);

// --------------------------------------------------

const Radio = forwardRef<RadioGroupPrimitives.ItemRef, RadioProps>(
  (props, ref) => {
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

    const { value: groupValue } = RadioGroupPrimitives.useRadioGroupContext();
    const isSelected = groupValue === value;
    const isDisabledValue = isDisabled;

    const indicatorElement = useMemo(
      () =>
        getElementWithDefault(
          children,
          DISPLAY_NAME.RADIO_INDICATOR,
          <RadioIndicator />
        ),
      [children]
    );

    const contentElement = useMemo(() => {
      return getElementByDisplayName(children, DISPLAY_NAME.RADIO_CONTENT);
    }, [children]);

    const tvStyles = radioStyles.radioRoot({
      size,
      alignIndicator,
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
          ref={ref}
          className={tvStyles}
          style={style}
          value={value}
          isDisabled={isDisabledValue || isReadOnly}
          hitSlop={props.hitSlop ?? HIT_SLOP_MAP[size]}
          {...restProps}
        >
          {alignIndicator === 'start' && indicatorElement}
          {contentElement}
          {alignIndicator === 'end' && indicatorElement}
        </AnimatedRadioItem>
      </RadioProvider>
    );
  }
);

// --------------------------------------------------

const RadioIndicator = forwardRef<Animated.View, RadioIndicatorProps>(
  (props, ref) => {
    const {
      children,
      colors,
      animationConfig,
      className,
      style,
      ...restProps
    } = props;

    const { size, color, isSelected } = useRadioContext();
    const { colors: themeColors } = useTheme();

    const backgroundElement = useMemo(
      () =>
        getElementWithDefault(
          children,
          DISPLAY_NAME.RADIO_INDICATOR_BACKGROUND,
          <RadioIndicatorBackground />
        ),
      [children]
    );

    const thumbElement = useMemo(
      () =>
        getElementWithDefault(
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

    const timingConfig = animationConfig ?? DEFAULT_TIMING_CONFIG;

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
      <AnimatedRadioIndicator
        ref={ref}
        className={tvStyles}
        style={[indicatorAnimatedStyle, styles.indicatorRoot, style]}
        {...restProps}
      >
        {backgroundElement}
        {thumbElement}
      </AnimatedRadioIndicator>
    );
  }
);

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

  const springConfig = animationConfig ?? DEFAULT_SPRING_CONFIG;

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(isSelected ? 1 : 0, springConfig),
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

  const { orientation } = RadioGroupPrimitives.useRadioGroupContext();

  const labelElement = useMemo(() => {
    return getElementByDisplayName(children, DISPLAY_NAME.RADIO_LABEL);
  }, [children]);

  const descriptionElement = useMemo(() => {
    return getElementByDisplayName(children, DISPLAY_NAME.RADIO_DESCRIPTION);
  }, [children]);

  const tvStyles = radioStyles.content({
    orientation,
    className,
  });

  if (labelElement || descriptionElement) {
    return (
      <View className={tvStyles} {...restProps}>
        {labelElement}
        {descriptionElement}
      </View>
    );
  }

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

/**
 * Compound Radio component with sub-components
 *
 * @component Radio - Individual radio option within a RadioGroup. Must be used inside RadioGroup.
 * Handles selection state and renders default indicator if no children provided. Animates border
 * color based on selection state.
 *
 * @component Radio.Indicator - Optional container for the radio circle. Renders default background
 * and thumb if no children provided. Manages the visual selection state.
 *
 * @component Radio.IndicatorBackground - Optional background of the radio circle. Animates background
 * color based on selection state. Can be customized with different colors and animations.
 *
 * @component Radio.IndicatorThumb - Optional inner circle that appears when selected. Animates
 * scale based on selection. Can be replaced with custom content.
 *
 * @component Radio.Content - Optional container for label and description. Provides consistent
 * layout and spacing. Only renders if label or description exist.
 *
 * @component Radio.Label - Optional text label for the radio option. Clickable by default and
 * linked to the radio for accessibility.
 *
 * @component Radio.Description - Optional secondary text below the label. Provides additional
 * context about the radio option.
 *
 * Props flow from Radio to sub-components via context (size, color, value, isSelected).
 * RadioGroup manages the overall selection state and orientation.
 *
 * @see Full documentation: https://heroui.com/components/radio
 */
const CompoundRadioGroup = Object.assign(Radio, {
  /** @optional Custom radio indicator container */
  Indicator: RadioIndicator,
  /** @optional Custom indicator background with border animations */
  IndicatorBackground: RadioIndicatorBackground,
  /** @optional Custom indicator thumb that appears when selected */
  IndicatorThumb: RadioIndicatorThumb,
  /** @optional Container for label and description */
  Content: RadioContent,
  /** @optional Clickable text label */
  Label: RadioLabel,
  /** @optional Secondary descriptive text */
  Description: RadioDescription,
});

export { Radio, RadioGroup, useRadioContext };
export default CompoundRadioGroup;
