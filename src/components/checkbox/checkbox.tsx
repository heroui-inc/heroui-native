/* eslint-disable react-native/no-inline-styles */
import { forwardRef } from 'react';
import Animated from 'react-native-reanimated';
import { CheckIcon } from '../../helpers/components';
import { useIsOnSurface, useThemeColor } from '../../helpers/theme';
import * as CheckboxPrimitives from '../../primitives/checkbox';
import * as CheckboxPrimitivesTypes from '../../primitives/checkbox/checkbox.types';
import {
  DEFAULT_CHECK_ICON_SIZE,
  DEFAULT_HIT_SLOP,
  DISPLAY_NAME,
} from './checkbox.constants';
import checkboxStyles from './checkbox.styles';
import type {
  CheckboxIndicatorProps,
  CheckboxProps,
  CheckboxRenderProps,
} from './checkbox.types';

const AnimatedIndicatorView = Animated.createAnimatedComponent(
  CheckboxPrimitives.Indicator
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
      isOnSurface: isOnSurfaceProp,
      className,
      ...restProps
    } = props;

    const isOnSurfaceAutoDetected = useIsOnSurface();
    const isOnSurface = isOnSurfaceProp ?? isOnSurfaceAutoDetected;

    const tvStyles = checkboxStyles.root({
      isOnSurface,
      isSelected,
      isDisabled,
      isInvalid,
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
        isOnSurface={isOnSurface}
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
  const { children, iconProps, className, style, ...restProps } = props;

  const { isSelected, isDisabled, isInvalid } = useCheckbox();

  const themeColorAccentForeground = useThemeColor('accent-foreground');

  const iconSize = iconProps?.size ?? DEFAULT_CHECK_ICON_SIZE;
  const iconColor = iconProps?.color ?? themeColorAccentForeground;

  const tvStyles = checkboxStyles.indicator({
    isInvalid,
    className,
  });

  const renderProps: CheckboxRenderProps = {
    isSelected,
    isInvalid: isInvalid ?? false,
    isDisabled: isDisabled ?? false,
  };

  const content =
    typeof children === 'function'
      ? children(renderProps)
      : (children ?? <CheckIcon size={iconSize} color={iconColor} />);

  return (
    <AnimatedIndicatorView
      ref={ref}
      className={tvStyles}
      style={[
        {
          transitionProperty: ['transform', 'opacity'],
          transitionDuration: 150,
          transform: [{ scale: isSelected ? 1 : 0.75 }],
          opacity: isSelected ? 1 : 0,
        },
        style,
      ]}
      {...restProps}
    >
      {content}
    </AnimatedIndicatorView>
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
