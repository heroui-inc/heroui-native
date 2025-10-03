import { forwardRef, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import type { TextRef, ViewRef } from '../../helpers/types';
import {
  createContext,
  getElementByDisplayName,
  getElementWithDefault,
} from '../../helpers/utils';
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
  RadioGroupErrorMessageProps,
  RadioGroupItemColor,
  RadioGroupItemContentProps,
  RadioGroupItemContextValue,
  RadioGroupItemDescriptionProps,
  RadioGroupItemIndicatorBackgroundProps,
  RadioGroupItemIndicatorProps,
  RadioGroupItemIndicatorThumbProps,
  RadioGroupItemProps,
  RadioGroupItemTitleProps,
  RadioGroupProps,
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
  const {
    className,
    orientation = 'vertical',
    isInvalid = false,
    ...restProps
  } = props;

  const tvStyles = radioGroupStyles.root({
    orientation,
    className,
  });

  return (
    <RadioGroupPrimitives.Root
      ref={ref}
      className={tvStyles}
      orientation={orientation}
      isInvalid={isInvalid}
      {...restProps}
    />
  );
});

// --------------------------------------------------

const RadioGroupErrorMessage = forwardRef<ViewRef, RadioGroupErrorMessageProps>(
  (props, ref) => {
    const { isInvalid, orientation } = useRadioGroupContext();
    const { className, ...restProps } = props;

    const tvStyles = radioGroupStyles.errorMessage({
      orientation,
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

// --------------------------------------------------

RadioGroupRoot.displayName = DISPLAY_NAME.RADIO_GROUP_ROOT;
RadioGroupErrorMessage.displayName = DISPLAY_NAME.RADIO_GROUP_ERROR_MESSAGE;

// --------------------------------------------------

const RadioGroupItem = forwardRef<
  RadioGroupPrimitives.ItemRef,
  RadioGroupItemProps
>((props, ref) => {
  const {
    children,
    color = 'default',
    alignIndicator = 'end',
    isDisabled,
    isInvalid,
    className,
    style,
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

  const indicatorElement = useMemo(
    () =>
      getElementWithDefault(
        children,
        DISPLAY_NAME.RADIO_GROUP_ITEM_INDICATOR,
        <RadioGroupItemIndicator />
      ),
    [children]
  );

  const contentElement = useMemo(() => {
    return getElementByDisplayName(
      children,
      DISPLAY_NAME.RADIO_GROUP_ITEM_CONTENT
    );
  }, [children]);

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
        style={style}
        value={value}
        isDisabled={isDisabledValue}
        hitSlop={props.hitSlop ?? DEFAULT_HIT_SLOP}
        {...restProps}
      >
        {alignIndicator === 'start' && indicatorElement}
        {contentElement}
        {alignIndicator === 'end' && indicatorElement}
      </AnimatedRadioItem>
    </RadioGroupItemProvider>
  );
});

// --------------------------------------------------

const RadioGroupItemIndicator = forwardRef<
  Animated.View,
  RadioGroupItemIndicatorProps
>((props, ref) => {
  const { children, colors, animationConfig, className, style, ...restProps } =
    props;

  const { color, isSelected } = useRadioGroupItemContext();
  const { colors: themeColors } = useTheme();

  const backgroundElement = useMemo(
    () =>
      getElementWithDefault(
        children,
        DISPLAY_NAME.RADIO_GROUP_ITEM_INDICATOR_BACKGROUND,
        <RadioGroupItemIndicatorBackground />
      ),
    [children]
  );

  const thumbElement = useMemo(
    () =>
      getElementWithDefault(
        children,
        DISPLAY_NAME.RADIO_GROUP_ITEM_INDICATOR_THUMB,
        <RadioGroupItemIndicatorThumb />
      ),
    [children]
  );

  const tvStyles = radioGroupStyles.indicator({
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
});

const styles = StyleSheet.create({
  indicatorRoot: {
    borderCurve: 'continuous',
  },
});

// --------------------------------------------------

const RadioGroupItemIndicatorBackground = forwardRef<
  View,
  RadioGroupItemIndicatorBackgroundProps
>((props, ref) => {
  const { children, colors, className, style, ...restProps } = props;

  const { color, isSelected } = useRadioGroupItemContext();
  const { colors: themeColors } = useTheme();

  const tvStyles = radioGroupStyles.indicatorBackground({
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

const RadioGroupItemIndicatorThumb = forwardRef<
  View,
  RadioGroupItemIndicatorThumbProps
>((props, ref) => {
  const { children, colors, className, style, animationConfig, ...restProps } =
    props;

  const { isSelected } = useRadioGroupItemContext();
  const { theme, colors: themeColors } = useTheme();

  const tvStyles = radioGroupStyles.indicatorThumb({
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

const RadioGroupItemContent = forwardRef<View, RadioGroupItemContentProps>(
  (props, ref) => {
    const { children, className, style, ...restProps } = props;

    const { orientation } = useRadioGroupContext();

    const tvStyles = radioGroupStyles.itemContent({
      orientation,
      className,
    });

    return (
      <View ref={ref} className={tvStyles} style={style} {...restProps}>
        {children}
      </View>
    );
  }
);

// --------------------------------------------------

const RadioGroupItemTitle = forwardRef<TextRef, RadioGroupItemTitleProps>(
  (props, ref) => {
    return <FormField.Title ref={ref} {...props} />;
  }
);

// --------------------------------------------------

const RadioGroupItemDescription = forwardRef<
  TextRef,
  RadioGroupItemDescriptionProps
>((props, ref) => {
  return <FormField.Description ref={ref} {...props} />;
});

// --------------------------------------------------

RadioGroupItem.displayName = DISPLAY_NAME.RADIO_GROUP_ITEM;
RadioGroupItemIndicator.displayName = DISPLAY_NAME.RADIO_GROUP_ITEM_INDICATOR;
RadioGroupItemIndicatorBackground.displayName =
  DISPLAY_NAME.RADIO_GROUP_ITEM_INDICATOR_BACKGROUND;
RadioGroupItemIndicatorThumb.displayName =
  DISPLAY_NAME.RADIO_GROUP_ITEM_INDICATOR_THUMB;
RadioGroupItemContent.displayName = DISPLAY_NAME.RADIO_GROUP_ITEM_CONTENT;
RadioGroupItemTitle.displayName = DISPLAY_NAME.RADIO_GROUP_ITEM_TITLE;
RadioGroupItemDescription.displayName =
  DISPLAY_NAME.RADIO_GROUP_ITEM_DESCRIPTION;

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
 * @component RadioGroup.ItemIndicator - Optional container for the radio circle. Renders default background
 * and thumb if no children provided. Manages the visual selection state.
 *
 * @component RadioGroup.ItemIndicatorBackground - Optional background of the radio circle. Animates background
 * color based on selection state. Can be customized with different colors and animations.
 *
 * @component RadioGroup.ItemIndicatorThumb - Optional inner circle that appears when selected. Animates
 * scale based on selection. Can be replaced with custom content.
 *
 * @component RadioGroup.ItemContent - Optional container for label and description. Provides consistent
 * layout and spacing. Only renders if label or description exist.
 *
 * @component RadioGroup.ItemTitle - Optional text title for the radio option. Clickable by default and
 * linked to the radio for accessibility.
 *
 * @component RadioGroup.ItemDescription - Optional secondary text below the label. Provides additional
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
  ItemIndicator: RadioGroupItemIndicator,
  /** @optional Custom indicator background with border animations */
  ItemIndicatorBackground: RadioGroupItemIndicatorBackground,
  /** @optional Custom indicator thumb that appears when selected */
  ItemIndicatorThumb: RadioGroupItemIndicatorThumb,
  /** @optional Container for label and description */
  ItemContent: RadioGroupItemContent,
  /** @optional Clickable text title */
  ItemTitle: RadioGroupItemTitle,
  /** @optional Secondary descriptive text */
  ItemDescription: RadioGroupItemDescription,
});

export default CompoundRadioGroup;
export { useRadioGroupContext, useRadioGroupItemContext };
