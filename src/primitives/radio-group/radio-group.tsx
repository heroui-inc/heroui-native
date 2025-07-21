import * as React from 'react';
import { Pressable, View, type GestureResponderEvent } from 'react-native';
import * as Slot from '../slot';
import type {
  IndicatorProps,
  IndicatorRef,
  ItemProps,
  ItemRef,
  RootProps,
  RootRef,
} from './radio-group.types';

const RadioGroupContext = React.createContext<RootProps | null>(null);

const Root = React.forwardRef<RootRef, RootProps>(
  (
    { asChild, value, onValueChange, isDisabled = false, ...viewProps },
    ref
  ) => {
    const Component = asChild ? Slot.View : View;

    return (
      <RadioGroupContext.Provider
        value={{
          value,
          isDisabled,
          onValueChange,
        }}
      >
        <Component ref={ref} role="radiogroup" {...viewProps} />
      </RadioGroupContext.Provider>
    );
  }
);

Root.displayName = 'HeroUINative.Primitive.RadioGroup.Root';

function useRadioGroupContext() {
  const context = React.useContext(RadioGroupContext);

  if (!context) {
    throw new Error(
      'RadioGroup compound components cannot be rendered outside the RadioGroup component'
    );
  }

  return context;
}

// --------------------------------------------------

interface RadioItemContext {
  itemValue: string | undefined;
}

const RadioItemContext = React.createContext<RadioItemContext | null>(null);

const Item = React.forwardRef<ItemRef, ItemProps>(
  (
    {
      asChild,
      value: itemValue,
      isDisabled: disabledProp = false,
      onPress: onPressProp,
      ...props
    },
    ref
  ) => {
    const { isDisabled, value, onValueChange } = useRadioGroupContext();

    function onPress(ev: GestureResponderEvent) {
      if (isDisabled || disabledProp) return;
      onValueChange(itemValue);
      onPressProp?.(ev);
    }

    const Component = asChild ? Slot.Pressable : Pressable;

    return (
      <RadioItemContext.Provider
        value={{
          itemValue,
        }}
      >
        <Component
          ref={ref}
          role="radio"
          onPress={onPress}
          aria-checked={value === itemValue}
          disabled={(isDisabled || disabledProp) ?? false}
          accessibilityState={{
            disabled: (isDisabled || disabledProp) ?? false,
            checked: value === itemValue,
          }}
          {...props}
        />
      </RadioItemContext.Provider>
    );
  }
);

Item.displayName = 'HeroUINative.Primitive.RadioGroup.Item';

function useRadioItemContext() {
  const context = React.useContext(RadioItemContext);

  if (!context) {
    throw new Error(
      'RadioItem compound components cannot be rendered outside the RadioItem component'
    );
  }

  return context;
}

// --------------------------------------------------

const Indicator = React.forwardRef<IndicatorRef, IndicatorProps>(
  ({ asChild, forceMount, ...props }, ref) => {
    const { value } = useRadioGroupContext();
    const { itemValue } = useRadioItemContext();

    if (!forceMount) {
      if (value !== itemValue) {
        return null;
      }
    }

    const Component = asChild ? Slot.View : View;

    return <Component ref={ref} role="presentation" {...props} />;
  }
);

Indicator.displayName = 'HeroUINative.Primitive.RadioGroup.Indicator';

export { Indicator, Item, Root, useRadioGroupContext };
