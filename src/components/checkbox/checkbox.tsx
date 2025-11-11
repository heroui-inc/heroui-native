import { forwardRef, useCallback, useMemo } from 'react';
import { View, type GestureResponderEvent, type ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { CheckIcon } from '../../helpers/components';
import { AnimatedCheckIcon } from '../../helpers/components/animated-check-icon';
import { useIsOnSurface, useThemeColor } from '../../helpers/theme';
import * as CheckboxPrimitives from '../../primitives/checkbox';
import * as CheckboxPrimitivesTypes from '../../primitives/checkbox/checkbox.types';
import {
  CheckboxAnimationProvider,
  useCheckboxIndicatorAnimation,
  useCheckboxRootAnimation,
} from './checkbox.animation';
import { DEFAULT_HIT_SLOP, DISPLAY_NAME } from './checkbox.constants';
import checkboxStyles, { styleSheet } from './checkbox.styles';
import type {
  CheckboxIndicatorProps,
  CheckboxProps,
  CheckboxRenderProps,
} from './checkbox.types';

const AnimatedRootView = Animated.createAnimatedComponent(
  CheckboxPrimitives.Root
);

const AnimatedIndicatorView = Animated.createAnimatedComponent(
  CheckboxPrimitives.Indicator
);

const useCheckbox = CheckboxPrimitives.useCheckboxContext;

// --------------------------------------------------

const CheckboxRoot = forwardRef<CheckboxPrimitivesTypes.RootRef, CheckboxProps>(
  (props, ref) => {
    const {
      children,
      isSelected,
      onSelectedChange,
      isDisabled = false,
      isInvalid = false,
      isOnSurface: isOnSurfaceProp,
      hitSlop = DEFAULT_HIT_SLOP,
      className,
      style,
      onPressIn,
      onPressOut,
      animation,
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

    const { rContainerStyle, isCheckboxPressed, isAllAnimationsDisabled } =
      useCheckboxRootAnimation({
        animation,
        style: style as ViewStyle | undefined,
      });

    const animationContextValue = useMemo(
      () => ({
        isAllAnimationsDisabled,
        isCheckboxPressed,
      }),
      [isAllAnimationsDisabled, isCheckboxPressed]
    );

    const handlePressIn = useCallback(
      (event: GestureResponderEvent) => {
        isCheckboxPressed.set(true);
        onPressIn?.(event);
      },
      [isCheckboxPressed, onPressIn]
    );

    const handlePressOut = useCallback(
      (event: GestureResponderEvent) => {
        isCheckboxPressed.set(false);
        onPressOut?.(event);
      },
      [isCheckboxPressed, onPressOut]
    );

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
      <CheckboxAnimationProvider value={animationContextValue}>
        <AnimatedRootView
          ref={ref}
          className={tvStyles}
          isSelected={isSelected}
          onSelectedChange={onSelectedChange}
          isDisabled={isDisabled}
          isInvalid={isInvalid}
          isOnSurface={isOnSurface}
          hitSlop={hitSlop}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={[rContainerStyle, styleSheet.root, style]}
          {...restProps}
        >
          {content}
        </AnimatedRootView>
      </CheckboxAnimationProvider>
    );
  }
);

// --------------------------------------------------

const CheckboxIndicator = forwardRef<
  CheckboxPrimitivesTypes.IndicatorRef,
  CheckboxIndicatorProps
>((props, ref) => {
  const { children, iconProps, className, style, animation, ...restProps } =
    props;

  const { isSelected, isDisabled, isInvalid } = useCheckbox();

  const themeColorAccentForeground = useThemeColor('accent-foreground');

  const iconSize = iconProps?.size;
  const iconStrokeWidth = iconProps?.strokeWidth;
  const iconColor = iconProps?.color ?? themeColorAccentForeground;
  const iconEnterDuration = iconProps?.enterDuration;
  const iconExitDuration = iconProps?.exitDuration;

  const tvStyles = checkboxStyles.indicator({
    isInvalid,
    className,
  });

  const { rContainerStyle, isAnimationDisabled } =
    useCheckboxIndicatorAnimation({
      animation,
      isSelected,
      style: style as ViewStyle | undefined,
    });

  const renderProps: CheckboxRenderProps = {
    isSelected,
    isInvalid: isInvalid ?? false,
    isDisabled: isDisabled ?? false,
  };

  const content =
    typeof children === 'function'
      ? children(renderProps)
      : (children ??
        (isAnimationDisabled ? (
          <View className="translate-y-[1px]">
            <CheckIcon size={iconSize} color={iconColor} />
          </View>
        ) : (
          <AnimatedCheckIcon
            size={iconSize}
            strokeWidth={iconStrokeWidth}
            color={iconColor}
            isSelected={isSelected}
            enterDuration={iconEnterDuration}
            exitDuration={iconExitDuration}
          />
        )));

  return (
    <AnimatedIndicatorView
      ref={ref}
      className={tvStyles}
      style={[rContainerStyle, style]}
      {...restProps}
    >
      {content}
    </AnimatedIndicatorView>
  );
});

// --------------------------------------------------

CheckboxRoot.displayName = DISPLAY_NAME.CHECKBOX_ROOT;
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
const CompoundCheckbox = Object.assign(CheckboxRoot, {
  /** @optional Custom indicator with scale animations */
  Indicator: CheckboxIndicator,
});

export { useCheckbox };
export default CompoundCheckbox;
