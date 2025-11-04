/* eslint-disable react-native/no-inline-styles */
import { forwardRef } from 'react';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { CheckIcon } from '../../helpers/components';
import { useThemeColor } from '../../helpers/theme';
import * as CheckboxPrimitives from '../../primitives/checkbox';
import * as CheckboxPrimitivesTypes from '../../primitives/checkbox/checkbox.types';
import {
  ANIMATION_DURATION,
  DEFAULT_CHECK_ICON_SIZE,
  DEFAULT_HIT_SLOP,
  DEFAULT_TIMING_CONFIG,
  DISPLAY_NAME,
} from './checkbox.constants';
import checkboxStyles, { styleSheet } from './checkbox.styles';
import type {
  CheckboxIndicatorProps,
  CheckboxProps,
  CheckboxRenderProps,
} from './checkbox.types';

const AnimatedCheckboxRoot = Animated.createAnimatedComponent(
  CheckboxPrimitives.Root
);

const useCheckbox = CheckboxPrimitives.useCheckboxContext;

// --------------------------------------------------

const Checkbox = forwardRef<CheckboxPrimitivesTypes.RootRef, CheckboxProps>(
  (props, ref) => {
    const {
      children,
      isSelected,
      onSelectedChange,
      isDisabled = false,
      isInvalid = false,
      animatedColors,
      className,
      style,
      ...restProps
    } = props;

    const tvStyles = checkboxStyles.root({
      isDisabled,
      className,
    });

    const themeColorFieldBackground = useThemeColor('field');
    const themeColorFieldBorder = useThemeColor('field-border');
    const themeColorAccent = useThemeColor('accent');
    const themeColorAccentHover = useThemeColor('accent-hover');
    const themeColorDanger = useThemeColor('danger');

    const backgroundColorDefault =
      animatedColors?.backgroundColor?.default ?? themeColorFieldBackground;
    const backgroundColorSelected =
      animatedColors?.backgroundColor?.selected ?? themeColorAccent;
    const backgroundColorDefaultInvalid =
      animatedColors?.backgroundColor?.defaultInvalid ?? 'transparent';
    const backgroundColorSelectedInvalid =
      animatedColors?.backgroundColor?.selectedInvalid ?? themeColorDanger;

    const borderColorDefault =
      animatedColors?.borderColor?.default ??
      animatedColors?.backgroundColor?.default ??
      themeColorFieldBorder;
    const borderColorSelected =
      animatedColors?.borderColor?.selected ??
      animatedColors?.backgroundColor?.selected ??
      themeColorAccentHover;
    const borderColorDefaultInvalid =
      animatedColors?.borderColor?.defaultInvalid ?? themeColorDanger;
    const borderColorSelectedInvalid =
      animatedColors?.borderColor?.selectedInvalid ?? themeColorDanger;

    const backgroundColor = isInvalid
      ? isSelected
        ? backgroundColorSelectedInvalid
        : backgroundColorDefaultInvalid
      : isSelected
        ? backgroundColorSelected
        : backgroundColorDefault;

    const borderColor = isInvalid
      ? isSelected
        ? borderColorSelectedInvalid
        : borderColorDefaultInvalid
      : isSelected
        ? borderColorSelected
        : borderColorDefault;

    const renderProps: CheckboxRenderProps = {
      isSelected,
      isInvalid,
      isDisabled,
    };

    const content =
      typeof children === 'function'
        ? children(renderProps)
        : (children ?? <CheckboxIndicator />);

    return (
      <AnimatedCheckboxRoot
        ref={ref}
        className={tvStyles}
        style={[
          {
            transitionProperty: ['backgroundColor', 'borderColor'],
            transitionDuration: ANIMATION_DURATION,
            transitionTimingFunction: 'ease-out',
            backgroundColor,
            borderColor,
          },
          styleSheet.root,
          style,
        ]}
        isSelected={isSelected}
        onSelectedChange={onSelectedChange}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        hitSlop={props.hitSlop ?? DEFAULT_HIT_SLOP}
        {...restProps}
      >
        {content}
      </AnimatedCheckboxRoot>
    );
  }
);

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

  const { isSelected, isDisabled, isInvalid } = useCheckbox();

  const themeColorAccentForeground = useThemeColor('accent-foreground');

  const iconSize = iconProps?.size ?? DEFAULT_CHECK_ICON_SIZE;
  const iconColor = iconProps?.color ?? themeColorAccentForeground;

  const tvStyles = checkboxStyles.indicator({
    className,
  });

  const timingConfig = animationConfig ?? DEFAULT_TIMING_CONFIG;

  const indicatorAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: 0.5 },
        { scale: withTiming(isSelected ? 1 : 0, timingConfig) },
      ],
    };
  });

  const renderProps: CheckboxRenderProps = {
    isSelected,
    isInvalid: isInvalid ?? false,
    isDisabled: isDisabled ?? false,
  };

  const content =
    typeof children === 'function'
      ? children(renderProps)
      : (children ?? (
          <Animated.View style={indicatorAnimatedStyle}>
            <CheckIcon size={iconSize} color={iconColor} />
          </Animated.View>
        ));

  return (
    <CheckboxPrimitives.Indicator
      ref={ref}
      className={tvStyles}
      style={style}
      {...restProps}
    >
      {content}
    </CheckboxPrimitives.Indicator>
  );
});

// --------------------------------------------------

Checkbox.displayName = DISPLAY_NAME.CHECKBOX_ROOT;
CheckboxIndicator.displayName = DISPLAY_NAME.CHECKBOX_INDICATOR;

/**
 * Compound Checkbox component with sub-components
 *
 * @component Checkbox - Main container that handles selection state and user interaction.
 * Renders default indicator with checkmark if no children provided.
 * Animates background and border color based on selection state.
 *
 * @component Checkbox.Indicator - Optional checkmark container that scales in when selected.
 * Renders default check icon if no children provided. Handles enter/exit animations
 * and can be replaced with custom indicators.
 *
 * Props flow from Checkbox to sub-components via context (isSelected).
 * The checkbox supports controlled and uncontrolled modes through isSelected/onSelectedChange.
 *
 * @see Full documentation: https://heroui.com/components/checkbox
 */
const CompoundCheckbox = Object.assign(Checkbox, {
  /** @optional Custom indicator with scale animations */
  Indicator: CheckboxIndicator,
});

export { useCheckbox };
export default CompoundCheckbox;
