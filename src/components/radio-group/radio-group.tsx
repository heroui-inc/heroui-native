import { forwardRef, useMemo } from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';

import { useIsOnSurface } from '../../helpers/external/hooks';
import {
  AnimationSettingsProvider,
  FormItemStateProvider,
} from '../../helpers/internal/contexts';
import { childrenToString } from '../../helpers/internal/utils';
import * as RadioGroupPrimitives from '../../primitives/radio-group';
import Label from '../label/label';
import {
  useRadioGroupIndicatorThumbAnimation,
  useRadioGroupRootAnimation,
} from './radio-group.animation';
import { DEFAULT_HIT_SLOP, DISPLAY_NAME } from './radio-group.constants';
import {
  RadioGroupItemProvider,
  useRadioGroupItem,
} from './radio-group.context';
import radioGroupStyles, { styleSheet } from './radio-group.styles';
import type {
  RadioGroupIndicatorProps,
  RadioGroupIndicatorThumbProps,
  RadioGroupItemProps,
  RadioGroupItemRenderProps,
  RadioGroupProps,
} from './radio-group.types';

const AnimatedRadioItem = Animated.createAnimatedComponent(
  RadioGroupPrimitives.Item
);

const AnimatedRadioIndicator = Animated.createAnimatedComponent(
  RadioGroupPrimitives.Indicator
);

const useRadioGroup = RadioGroupPrimitives.useRadioGroupContext;

// --------------------------------------------------

const RadioGroupRoot = forwardRef<
  RadioGroupPrimitives.RootRef,
  RadioGroupProps
>((props, ref) => {
  const { className, isInvalid = false, animation, ...restProps } = props;

  const tvStyles = radioGroupStyles.root({
    className,
  });

  const { isAllAnimationsDisabled } = useRadioGroupRootAnimation({
    animation,
  });

  const animationSettingsContextValue = useMemo(
    () => ({
      isAllAnimationsDisabled,
    }),
    [isAllAnimationsDisabled]
  );

  return (
    <AnimationSettingsProvider value={animationSettingsContextValue}>
      <RadioGroupPrimitives.Root
        ref={ref}
        className={tvStyles}
        isInvalid={isInvalid}
        {...restProps}
      />
    </AnimationSettingsProvider>
  );
});

// --------------------------------------------------

const RadioGroupItem = forwardRef<
  RadioGroupPrimitives.ItemRef,
  RadioGroupItemProps
>((props, ref) => {
  const {
    children,
    value,
    isDisabled,
    isInvalid,
    variant,
    className,
    ...restProps
  } = props;

  const stringifiedChildren =
    typeof children === 'function'
      ? null
      : childrenToString(children as React.ReactNode);

  const {
    value: groupValue,
    isInvalid: groupIsInvalid,
    isDisabled: groupIsDisabled,
    variant: groupVariant,
  } = useRadioGroup();

  const isSelected = groupValue === value;

  const isDisabledValue = isDisabled ?? groupIsDisabled ?? false;

  const effectiveIsInvalid = isInvalid ?? groupIsInvalid ?? false;

  const isOnSurfaceAutoDetected = useIsOnSurface();

  const finalVariant =
    variant !== undefined
      ? variant
      : groupVariant !== undefined
        ? groupVariant
        : isOnSurfaceAutoDetected
          ? 'secondary'
          : 'primary';

  const tvStyles = radioGroupStyles.item({
    className,
  });

  const renderProps: RadioGroupItemRenderProps = {
    isSelected,
    isDisabled: isDisabledValue,
    isInvalid: effectiveIsInvalid,
  };

  const content = stringifiedChildren ? (
    <>
      <Label>{stringifiedChildren}</Label>
      <RadioGroupIndicator />
    </>
  ) : typeof children === 'function' ? (
    children(renderProps)
  ) : (
    children
  );

  const contextValue = useMemo(
    () => ({
      isSelected,
      isDisabled: isDisabledValue,
      isInvalid: effectiveIsInvalid,
      variant: finalVariant,
    }),
    [isSelected, isDisabledValue, effectiveIsInvalid, finalVariant]
  );

  const formItemStateContextValue = useMemo(
    () => ({
      isDisabled: isDisabledValue,
      isInvalid: effectiveIsInvalid,
      isRequired: false,
    }),
    [isDisabledValue, effectiveIsInvalid]
  );

  return (
    <FormItemStateProvider value={formItemStateContextValue}>
      <RadioGroupItemProvider value={contextValue}>
        <AnimatedRadioItem
          ref={ref}
          value={value}
          className={tvStyles}
          isDisabled={isDisabledValue}
          hitSlop={props.hitSlop ?? DEFAULT_HIT_SLOP}
          {...restProps}
        >
          {content}
        </AnimatedRadioItem>
      </RadioGroupItemProvider>
    </FormItemStateProvider>
  );
});

// --------------------------------------------------

const RadioGroupIndicator = forwardRef<Animated.View, RadioGroupIndicatorProps>(
  (props, ref) => {
    const { children, className, style, ...restProps } = props;

    const { isSelected, isInvalid, variant } = useRadioGroupItem();

    const tvStyles = radioGroupStyles.itemIndicator({
      variant,
      isSelected,
      isInvalid,
      className,
    });

    return (
      <AnimatedRadioIndicator
        ref={ref}
        className={tvStyles}
        style={[styleSheet.borderCurve, style]}
        {...restProps}
      >
        {children ?? <RadioGroupIndicatorThumb />}
      </AnimatedRadioIndicator>
    );
  }
);

// --------------------------------------------------

const RadioGroupIndicatorThumb = forwardRef<
  View,
  RadioGroupIndicatorThumbProps
>((props, ref) => {
  const {
    className,
    style,
    animation,
    isAnimatedStyleActive = true,
    ...restProps
  } = props;

  const { isSelected } = useRadioGroupItem();

  const thumbClassName = radioGroupStyles.itemIndicatorThumb({
    isSelected,
    className,
  });

  const { rContainerStyle } = useRadioGroupIndicatorThumbAnimation({
    animation,
    isSelected,
  });

  const thumbStyle = isAnimatedStyleActive ? [rContainerStyle, style] : style;

  return (
    <Animated.View
      ref={ref}
      className={thumbClassName}
      style={thumbStyle}
      {...restProps}
    />
  );
});

RadioGroupRoot.displayName = DISPLAY_NAME.RADIO_GROUP_ROOT;
RadioGroupItem.displayName = DISPLAY_NAME.RADIO_GROUP_ITEM;
RadioGroupIndicator.displayName = DISPLAY_NAME.RADIO_GROUP_INDICATOR;
RadioGroupIndicatorThumb.displayName = DISPLAY_NAME.RADIO_GROUP_INDICATOR_THUMB;

/**
 * Compound RadioGroup component with sub-components
 *
 * @component RadioGroup - Container that manages the selection state of RadioGroupItem components.
 * Supports both horizontal and vertical orientations.
 *
 * @component RadioGroup.Item - Individual radio option within a RadioGroup. Must be used inside RadioGroup.
 * Handles selection state and renders default indicator if no children provided. Animates border
 * color based on selection state.
 *
 * @component RadioGroup.Indicator - Optional container for the radio circle. Renders default thumb
 * if no children provided. Manages the visual selection state.
 *
 * @component RadioGroup.IndicatorThumb - Optional inner circle that appears when selected. Animates
 * scale based on selection. Can be replaced with custom content.
 *
 * Props flow from RadioGroup to RadioGroupItem to sub-components via context (color, value, isSelected).
 * RadioGroup manages the overall selection state and orientation.
 *
 * @see Full documentation: https://v3.heroui.com/docs/native/components/radio-group
 */
const CompoundRadioGroup = Object.assign(RadioGroupRoot, {
  /** Individual radio option within a RadioGroup */
  Item: RadioGroupItem,
  /** @optional Custom radio indicator container */
  Indicator: RadioGroupIndicator,
  /** @optional Custom indicator thumb that appears when selected */
  IndicatorThumb: RadioGroupIndicatorThumb,
});

export default CompoundRadioGroup;
export { useRadioGroup };
