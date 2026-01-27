import React, { cloneElement, forwardRef, useCallback, useMemo } from 'react';
import { Pressable, View, type GestureResponderEvent } from 'react-native';
import { hasProp } from '../../helpers/internal/utils';

import { useSharedValue } from 'react-native-reanimated';
import {
  AnimationSettingsProvider,
  FormItemStateProvider,
} from '../../helpers/internal/contexts';
import type { PressableRef } from '../../helpers/internal/types';
import { Checkbox } from '../checkbox';
import { Switch } from '../switch';
import { useControlFieldRootAnimation } from './control-field.animation';
import { DISPLAY_NAME } from './control-field.constants';
import { ControlFieldProvider, useControlField } from './control-field.context';
import controlFieldStyles from './control-field.styles';
import type {
  ControlFieldContextValue,
  ControlFieldIndicatorProps,
  ControlFieldProps,
  ControlFieldRenderProps,
} from './control-field.types';

// --------------------------------------------------

const ControlField = forwardRef<PressableRef, ControlFieldProps>(
  (props, ref) => {
    const {
      children,
      className,
      isSelected,
      onSelectedChange,
      isDisabled = false,
      isInvalid = false,
      onPressIn,
      onPressOut,
      animation,
      ...restProps
    } = props;

    const renderProps: ControlFieldRenderProps = useMemo(
      () => ({
        isSelected,
        isDisabled: isDisabled ?? false,
        isInvalid: isInvalid ?? false,
      }),
      [isSelected, isDisabled, isInvalid]
    );

    const content =
      typeof children === 'function' ? children(renderProps) : children;

    const tvStyles = controlFieldStyles.root({
      isDisabled,
      className,
    });

    const { isAllAnimationsDisabled } = useControlFieldRootAnimation({
      animation,
    });

    const animationSettingsContextValue = useMemo(
      () => ({
        isAllAnimationsDisabled,
      }),
      [isAllAnimationsDisabled]
    );

    const isPressed = useSharedValue<boolean>(false);

    const handlePress = (e: GestureResponderEvent) => {
      if (!isDisabled && onSelectedChange && isSelected !== undefined) {
        onSelectedChange(!isSelected);

        if (props.onPress && typeof props.onPress === 'function') {
          props.onPress(e);
        }
      }
    };

    const handlePressIn = useCallback(
      (e: GestureResponderEvent) => {
        isPressed.set(true);
        if (onPressIn && typeof onPressIn === 'function') {
          onPressIn(e);
        }
      },
      [isPressed, onPressIn]
    );

    const handlePressOut = useCallback(
      (e: GestureResponderEvent) => {
        isPressed.set(false);
        if (onPressOut && typeof onPressOut === 'function') {
          onPressOut(e);
        }
      },
      [isPressed, onPressOut]
    );

    const contextValue: ControlFieldContextValue = useMemo(
      () => ({
        isSelected,
        onSelectedChange,
        isDisabled,
        isInvalid,
        isPressed,
      }),
      [isSelected, onSelectedChange, isDisabled, isInvalid, isPressed]
    );

    const formItemStateContextValue = useMemo(
      () => ({
        isDisabled: isDisabled ?? false,
        isInvalid: isInvalid ?? false,
        isRequired: false,
      }),
      [isDisabled, isInvalid]
    );

    return (
      <AnimationSettingsProvider value={animationSettingsContextValue}>
        <FormItemStateProvider value={formItemStateContextValue}>
          <ControlFieldProvider value={contextValue}>
            <Pressable
              ref={ref}
              className={tvStyles}
              onPress={handlePress}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              disabled={isDisabled}
              {...restProps}
            >
              {content}
            </Pressable>
          </ControlFieldProvider>
        </FormItemStateProvider>
      </AnimationSettingsProvider>
    );
  }
);

// --------------------------------------------------

const ControlFieldIndicator = forwardRef<View, ControlFieldIndicatorProps>(
  (props, ref) => {
    const { children, className, variant = 'switch', ...restProps } = props;
    const { isSelected, onSelectedChange, isDisabled, isInvalid } =
      useControlField();

    const tvStyles = controlFieldStyles.indicator({
      className,
    });

    const enhancedChildren = useMemo(() => {
      if (children) {
        if (typeof children !== 'object') return children;

        const child = children as React.ReactElement;

        return cloneElement(child, {
          // Only pass props from context if child doesn't already have them
          ...(isSelected !== undefined &&
            !hasProp(child, 'isSelected') && { isSelected }),
          ...(onSelectedChange &&
            !hasProp(child, 'onSelectedChange') && { onSelectedChange }),
          ...(isDisabled !== undefined &&
            !hasProp(child, 'isDisabled') && { isDisabled }),
          ...(isInvalid !== undefined &&
            !hasProp(child, 'isInvalid') && { isInvalid }),
        });
      }

      // Render default component based on variant when no children provided
      if (variant === 'checkbox') {
        return (
          <Checkbox
            isSelected={isSelected}
            onSelectedChange={onSelectedChange}
            isDisabled={isDisabled}
            isInvalid={isInvalid}
          />
        );
      }

      return (
        <Switch
          isSelected={isSelected}
          onSelectedChange={onSelectedChange}
          isDisabled={isDisabled}
        />
      );
    }, [
      children,
      variant,
      isSelected,
      onSelectedChange,
      isDisabled,
      isInvalid,
    ]);

    return (
      <View ref={ref} className={tvStyles} {...restProps}>
        {enhancedChildren}
      </View>
    );
  }
);

// --------------------------------------------------

ControlField.displayName = DISPLAY_NAME.CONTROL_FIELD;
ControlFieldIndicator.displayName = DISPLAY_NAME.CONTROL_FIELD_INDICATOR;

/**
 * Compound ControlField component with sub-components
 *
 * @component ControlField - Wrapper that provides consistent layout and interaction for form controls.
 * Handles press events to toggle selection state and manages disabled states.
 *
 * @component ControlField.Indicator - Container for the control component (Switch, Checkbox).
 * Automatically passes down isSelected, onSelectedChange, isDisabled, and isInvalid props.
 *
 * Props flow from ControlField to sub-components via context.
 */
const CompoundControlField = Object.assign(ControlField, {
  /** @optional Container for control component */
  Indicator: ControlFieldIndicator,
});

export { useControlField } from './control-field.context';
export default CompoundControlField;
