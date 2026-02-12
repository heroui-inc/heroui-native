import { forwardRef, useCallback, useMemo } from 'react';

import { useIsOnSurface } from '../../helpers/external/hooks';
import {
  AnimationSettingsProvider,
  FormItemStateProvider,
} from '../../helpers/internal/contexts';
import { childrenToString } from '../../helpers/internal/utils';
import * as RadioGroupPrimitives from '../../primitives/radio-group';
import Label from '../label/label';
import Radio from '../radio/radio';
import { useRadioGroupRootAnimation } from './radio-group.animation';
import { DISPLAY_NAME } from './radio-group.constants';
import { RadioGroupItemProvider } from './radio-group.context';
import { radioGroupClassNames } from './radio-group.styles';
import type {
  RadioGroupItemProps,
  RadioGroupItemRenderProps,
  RadioGroupProps,
} from './radio-group.types';

const useRadioGroup = RadioGroupPrimitives.useRadioGroupContext;

// --------------------------------------------------

const RadioGroupRoot = forwardRef<
  RadioGroupPrimitives.RootRef,
  RadioGroupProps
>((props, ref) => {
  const {
    className,
    isDisabled = false,
    isInvalid = false,
    animation,
    ...restProps
  } = props;

  const rootClassName = radioGroupClassNames.root({
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

  const formItemStateContextValue = useMemo(
    () => ({
      isDisabled,
      isInvalid,
      isRequired: false,
    }),
    [isDisabled, isInvalid]
  );

  return (
    <AnimationSettingsProvider value={animationSettingsContextValue}>
      <FormItemStateProvider value={formItemStateContextValue}>
        <RadioGroupPrimitives.Root
          ref={ref}
          className={rootClassName}
          isDisabled={isDisabled}
          isInvalid={isInvalid}
          {...restProps}
        />
      </FormItemStateProvider>
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
    onValueChange: groupOnValueChange,
    isInvalid: groupIsInvalid,
    isDisabled: groupIsDisabled,
    variant: groupVariant,
  } = useRadioGroup();

  const isSelected = groupValue === value;
  const isDisabledValue = isDisabled ?? groupIsDisabled ?? false;
  const effectiveIsInvalid = isInvalid ?? groupIsInvalid ?? false;

  /** Selects this item in the group (radio behavior: always selects, never deselects) */
  const handleSelectedChange = useCallback(() => {
    groupOnValueChange(value);
  }, [groupOnValueChange, value]);

  const isOnSurfaceAutoDetected = useIsOnSurface();

  const finalVariant =
    variant !== undefined
      ? variant
      : groupVariant !== undefined
        ? groupVariant
        : isOnSurfaceAutoDetected
          ? 'secondary'
          : 'primary';

  const itemClassName = radioGroupClassNames.item({
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
      <Radio />
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
      onSelectedChange: handleSelectedChange,
    }),
    [
      isSelected,
      isDisabledValue,
      effectiveIsInvalid,
      finalVariant,
      handleSelectedChange,
    ]
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
        <RadioGroupPrimitives.Item
          ref={ref}
          value={value}
          className={itemClassName}
          isDisabled={isDisabledValue}
          {...restProps}
        >
          {content}
        </RadioGroupPrimitives.Item>
      </RadioGroupItemProvider>
    </FormItemStateProvider>
  );
});

RadioGroupRoot.displayName = DISPLAY_NAME.RADIO_GROUP_ROOT;
RadioGroupItem.displayName = DISPLAY_NAME.RADIO_GROUP_ITEM;

/**
 * Compound RadioGroup component with sub-components.
 *
 * @component RadioGroup - Container that manages the selection state of RadioGroupItem components.
 * Supports both horizontal and vertical orientations.
 *
 * @component RadioGroup.Item - Individual radio option within a RadioGroup. Must be used inside
 * RadioGroup. Handles selection state and renders a default `<Radio />` indicator if text children
 * are provided. Supports render function children to access state.
 *
 * Use the `Radio` component (and its sub-components `Radio.Indicator`, `Radio.IndicatorThumb`)
 * inside RadioGroup.Item for custom indicator rendering. The Radio component automatically detects
 * the RadioGroupItem context and derives selection state from it.
 *
 * Props flow from RadioGroup to RadioGroupItem to Radio via context (variant, value, isSelected).
 * RadioGroup manages the overall selection state and orientation.
 *
 * @see Full documentation: https://v3.heroui.com/docs/native/components/radio-group
 */
const CompoundRadioGroup = Object.assign(RadioGroupRoot, {
  /** Individual radio option within a RadioGroup */
  Item: RadioGroupItem,
});

export default CompoundRadioGroup;
export { useRadioGroup };
