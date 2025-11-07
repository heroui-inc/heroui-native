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
  DEFAULT_CHECK_ICON_SIZE,
  DEFAULT_HIT_SLOP,
  DEFAULT_TIMING_CONFIG,
  DISPLAY_NAME,
} from './checkbox.constants';
import checkboxStyles from './checkbox.styles';
import type {
  CheckboxIndicatorProps,
  CheckboxProps,
  CheckboxRenderProps,
} from './checkbox.types';

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
      className,
      ...restProps
    } = props;

    const tvStyles = checkboxStyles.root({
      isDisabled,
      className,
    });

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
      <CheckboxPrimitives.Root
        ref={ref}
        className={tvStyles}
        isSelected={isSelected}
        onSelectedChange={onSelectedChange}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        hitSlop={props.hitSlop ?? DEFAULT_HIT_SLOP}
        {...restProps}
      >
        {content}
      </CheckboxPrimitives.Root>
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
    isSelected,
    isInvalid,
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
