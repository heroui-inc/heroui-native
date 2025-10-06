import { forwardRef, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import type { TextRef, ViewRef } from '../../helpers/types';
import { createContext, getElementWithDefault } from '../../helpers/utils';
import * as RadioGroupPrimitives from '../../primitives/radio-group';
import { colorKit, useTheme } from '../../providers/theme';
import { ErrorView } from '../error-view';
import { FormField } from '../form-field';
import {
  DEFAULT_HIT_SLOP,
  DEFAULT_INDICATOR_BORDER_COLOR_TIMING_CONFIG,
  DEFAULT_INDICATOR_THUMB_SPRING_CONFIG,
  DISPLAY_NAME,
} from './radio-group.constants';
import radioGroupStyles from './radio-group.styles';
import type {
  RadioGroupDescriptionProps,
  RadioGroupErrorMessageProps,
  RadioGroupIndicatorBackgroundProps,
  RadioGroupIndicatorProps,
  RadioGroupIndicatorThumbProps,
  RadioGroupItemColor,
  RadioGroupItemContextValue,
  RadioGroupItemProps,
  RadioGroupProps,
  RadioGroupTitleProps,
} from './radio-group.types';

const AnimatedRadioItem = Animated.createAnimatedComponent(
  RadioGroupPrimitives.Item
);

const AnimatedRadioIndicator = Animated.createAnimatedComponent(
  RadioGroupPrimitives.Indicator
);

const [RadioGroupItemProvider, useRadioGroupItemContext] =
  createContext<RadioGroupItemContextValue>({
    name: 'RadioGroupItemContext',
  });

// --------------------------------------------------

const useRadioGroupContext = RadioGroupPrimitives.useRadioGroupContext;

const RadioGroupRoot = forwardRef<
  RadioGroupPrimitives.RootRef,
  RadioGroupProps
>((props, ref) => {
  const { className, isInvalid = false, ...restProps } = props;

  const tvStyles = radioGroupStyles.root({
    className,
  });

  return (
    <RadioGroupPrimitives.Root
      ref={ref}
      className={tvStyles}
      isInvalid={isInvalid}
      {...restProps}
    />
  );
});

// --------------------------------------------------

const RadioGroupItem = forwardRef<
  RadioGroupPrimitives.ItemRef,
  RadioGroupItemProps
>((props, ref) => {
  const {
    children,
    color = 'default',
    isDisabled,
    isInvalid,
    className,
    value,
    ...restProps
  } = props;

  const {
    value: groupValue,
    isInvalid: groupIsInvalid,
    isDisabled: groupIsDisabled,
  } = useRadioGroupContext();

  const isSelected = groupValue === value;

  const isDisabledValue = isDisabled ?? groupIsDisabled ?? false;

  const effectiveIsInvalid = isInvalid ?? groupIsInvalid ?? false;

  const effectiveColor = effectiveIsInvalid ? 'danger' : color;

  const tvStyles = radioGroupStyles.item({
    isDisabled: isDisabledValue,
    className,
  });

  const contextValue = useMemo(
    () => ({
      color: effectiveColor,
      isSelected,
      isDisabled: isDisabledValue,
    }),
    [effectiveColor, isSelected, isDisabledValue]
  );

  return (
    <RadioGroupItemProvider value={contextValue}>
      <AnimatedRadioItem
        ref={ref}
        className={tvStyles}
        value={value}
        isDisabled={isDisabledValue}
        hitSlop={props.hitSlop ?? DEFAULT_HIT_SLOP}
        {...restProps}
      >
        {children}
      </AnimatedRadioItem>
    </RadioGroupItemProvider>
  );
});

// --------------------------------------------------

const RadioGroupIndicator = forwardRef<Animated.View, RadioGroupIndicatorProps>(
  (props, ref) => {
    const {
      children,
      colors,
      animationConfig,
      className,
      style,
      ...restProps
    } = props;

    const { color, isSelected } = useRadioGroupItemContext();

    const { colors: themeColors } = useTheme();

    const backgroundElement = useMemo(
      () =>
        getElementWithDefault(
          children,
          DISPLAY_NAME.RADIO_GROUP_INDICATOR_BACKGROUND,
          <RadioGroupIndicatorBackground />
        ),
      [children]
    );

    const thumbElement = useMemo(
      () =>
        getElementWithDefault(
          children,
          DISPLAY_NAME.RADIO_GROUP_INDICATOR_THUMB,
          <RadioGroupIndicatorThumb />
        ),
      [children]
    );

    const tvStyles = radioGroupStyles.itemIndicator({
      className,
    });

    const borderColorMap: Record<RadioGroupItemColor, string> = {
      default: isSelected ? themeColors.accent : themeColors.border,
      success: isSelected
        ? themeColors.success
        : colorKit.setAlpha(themeColors.success, 0.4).hex(),
      warning: isSelected
        ? themeColors.warning
        : colorKit.setAlpha(themeColors.warning, 0.4).hex(),
      danger: isSelected
        ? themeColors.danger
        : colorKit.setAlpha(themeColors.danger, 0.4).hex(),
    };

    const timingConfig =
      animationConfig ?? DEFAULT_INDICATOR_BORDER_COLOR_TIMING_CONFIG;

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

const RadioGroupIndicatorBackground = forwardRef<
  View,
  RadioGroupIndicatorBackgroundProps
>((props, ref) => {
  const { children, colors, className, style, ...restProps } = props;

  const { color, isSelected } = useRadioGroupItemContext();
  const { colors: themeColors } = useTheme();

  const tvStyles = radioGroupStyles.itemIndicatorBackground({
    className,
  });

  const backgroundColorMap: Record<RadioGroupItemColor, string> = {
    default: themeColors.accent,
    success: themeColors.success,
    warning: themeColors.warning,
    danger: themeColors.danger,
  };

  const selectedBackground =
    colors?.selectedBackground ?? backgroundColorMap[color];
  const defaultBackground = colors?.defaultBackground ?? 'transparent';

  if (children) {
    return (
      <Animated.View ref={ref} className={tvStyles} {...restProps}>
        {children}
      </Animated.View>
    );
  }

  return (
    <Animated.View
      ref={ref}
      className={tvStyles}
      style={[
        {
          backgroundColor: isSelected ? selectedBackground : defaultBackground,
        },
        style,
      ]}
      {...restProps}
    />
  );
});

// --------------------------------------------------

const RadioGroupIndicatorThumb = forwardRef<
  View,
  RadioGroupIndicatorThumbProps
>((props, ref) => {
  const { children, colors, className, style, animationConfig, ...restProps } =
    props;

  const { isSelected } = useRadioGroupItemContext();
  const { theme, colors: themeColors } = useTheme();

  const tvStyles = radioGroupStyles.itemIndicatorThumb({
    isDark: theme === 'dark',
    className,
  });

  const springConfig = animationConfig ?? DEFAULT_INDICATOR_THUMB_SPRING_CONFIG;

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withSpring(isSelected ? 1 : 0, springConfig),
      transform: [
        {
          scale: withSpring(isSelected ? 1 : 0.6, springConfig),
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
      ref={ref}
      className={tvStyles}
      style={[thumbAnimatedStyle, style]}
      {...restProps}
    />
  );
});

// --------------------------------------------------

const RadioGroupTitle = forwardRef<TextRef, RadioGroupTitleProps>(
  (props, ref) => {
    return <FormField.Title ref={ref} {...props} />;
  }
);

// --------------------------------------------------

const RadioGroupDescription = forwardRef<TextRef, RadioGroupDescriptionProps>(
  (props, ref) => {
    return <FormField.Description ref={ref} {...props} />;
  }
);

// --------------------------------------------------

const RadioGroupErrorMessage = forwardRef<ViewRef, RadioGroupErrorMessageProps>(
  (props, ref) => {
    const { isInvalid } = useRadioGroupContext();
    const { className, ...restProps } = props;

    const tvStyles = radioGroupStyles.errorMessage({
      className,
    });

    return (
      <ErrorView
        ref={ref}
        isInvalid={isInvalid}
        className={tvStyles}
        {...restProps}
      />
    );
  }
);

RadioGroupRoot.displayName = DISPLAY_NAME.RADIO_GROUP_ROOT;
RadioGroupItem.displayName = DISPLAY_NAME.RADIO_GROUP_ITEM;
RadioGroupIndicator.displayName = DISPLAY_NAME.RADIO_GROUP_INDICATOR;
RadioGroupIndicatorBackground.displayName =
  DISPLAY_NAME.RADIO_GROUP_INDICATOR_BACKGROUND;
RadioGroupIndicatorThumb.displayName = DISPLAY_NAME.RADIO_GROUP_INDICATOR_THUMB;
RadioGroupTitle.displayName = DISPLAY_NAME.RADIO_GROUP_TITLE;
RadioGroupDescription.displayName = DISPLAY_NAME.RADIO_GROUP_DESCRIPTION;
RadioGroupErrorMessage.displayName = DISPLAY_NAME.RADIO_GROUP_ERROR_MESSAGE;

/**
 * Compound RadioGroup component with sub-components
 *
 * @component RadioGroup - Container that manages the selection state of RadioGroupItem components.
 * Supports both horizontal and vertical orientations.
 *
 * @component RadioGroup.ErrorMessage - Error message displayed when radio group is invalid.
 * Shown with animation below the radio group content. Takes full width when orientation is horizontal.
 *
 * @component RadioGroup.Item - Individual radio option within a RadioGroup. Must be used inside RadioGroup.
 * Handles selection state and renders default indicator if no children provided. Animates border
 * color based on selection state.
 *
 * @component RadioGroup.Indicator - Optional container for the radio circle. Renders default background
 * and thumb if no children provided. Manages the visual selection state.
 *
 * @component RadioGroup.IndicatorBackground - Optional background of the radio circle. Animates background
 * color based on selection state. Can be customized with different colors and animations.
 *
 * @component RadioGroup.IndicatorThumb - Optional inner circle that appears when selected. Animates
 * scale based on selection. Can be replaced with custom content.
 *
 * @component RadioGroup.Title - Optional text title for the radio option. Clickable by default and
 * linked to the radio for accessibility.
 *
 * @component RadioGroup.Description - Optional secondary text below the label. Provides additional
 * context about the radio option.
 *
 * Props flow from RadioGroup to RadioGroupItem to sub-components via context (color, value, isSelected).
 * RadioGroup manages the overall selection state and orientation.
 *
 * @see Full documentation: https://heroui.com/components/radio-group
 */
const CompoundRadioGroup = Object.assign(RadioGroupRoot, {
  /** @optional Error message displayed when radio group is invalid */
  ErrorMessage: RadioGroupErrorMessage,
  /** Individual radio option within a RadioGroup */
  Item: RadioGroupItem,
  /** @optional Custom radio indicator container */
  Indicator: RadioGroupIndicator,
  /** @optional Custom indicator background with border animations */
  IndicatorBackground: RadioGroupIndicatorBackground,
  /** @optional Custom indicator thumb that appears when selected */
  IndicatorThumb: RadioGroupIndicatorThumb,
  /** @optional Clickable text title */
  Title: RadioGroupTitle,
  /** @optional Secondary descriptive text */
  Description: RadioGroupDescription,
});

export default CompoundRadioGroup;
export { useRadioGroupContext, useRadioGroupItemContext };
