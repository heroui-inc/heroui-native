import type { PressableRef, SlottablePressableProps } from '@/helpers/types';
import * as React from 'react';
import { type GestureResponderEvent, Pressable, View } from 'react-native';
import * as Slot from '../slot';
import type {
  IndicatorProps,
  IndicatorRef,
  RootProps,
  RootRef,
} from './checkbox.types';

interface RootContext extends RootProps {
  nativeID?: string;
}

const CheckboxContext = React.createContext<RootContext | null>(null);

const Root = React.forwardRef<RootRef, RootProps>(
  (
    { isDisabled = false, isSelected, onSelectedChange, nativeID, ...props },
    ref
  ) => {
    return (
      <CheckboxContext.Provider
        value={{
          isDisabled,
          isSelected,
          onSelectedChange,
          nativeID,
        }}
      >
        <Trigger ref={ref} {...props} />
      </CheckboxContext.Provider>
    );
  }
);

Root.displayName = 'HeroUINative.Primitive.Checkbox.Root';

function useCheckboxContext() {
  const context = React.useContext(CheckboxContext);
  if (!context) {
    throw new Error(
      'Checkbox compound components cannot be rendered outside the Checkbox component'
    );
  }
  return context;
}

// --------------------------------------------------

const Trigger = React.forwardRef<PressableRef, SlottablePressableProps>(
  ({ asChild, onPress: onPressProp, ...props }, ref) => {
    const { isDisabled, isSelected, onSelectedChange, nativeID } =
      useCheckboxContext();

    function onPress(ev: GestureResponderEvent) {
      if (isDisabled) return;
      const newValue = !isSelected;
      onSelectedChange(newValue);
      onPressProp?.(ev);
    }

    const Component = asChild ? Slot.Pressable : Pressable;

    return (
      <Component
        ref={ref}
        nativeID={nativeID}
        aria-disabled={isDisabled}
        role="checkbox"
        aria-checked={isSelected}
        onPress={onPress}
        accessibilityState={{
          checked: isSelected,
          disabled: isDisabled,
        }}
        disabled={isDisabled}
        {...props}
      />
    );
  }
);

Trigger.displayName = 'HeroUINative.Primitive.Checkbox.Trigger';

// --------------------------------------------------

const Indicator = React.forwardRef<IndicatorRef, IndicatorProps>(
  ({ asChild, ...props }, ref) => {
    const { isSelected, isDisabled } = useCheckboxContext();

    const Component = asChild ? Slot.View : View;
    return (
      <Component
        ref={ref}
        aria-disabled={isDisabled}
        aria-hidden={!isSelected}
        role={'presentation'}
        {...props}
      />
    );
  }
);

Indicator.displayName = 'HeroUINative.Primitive.Checkbox.Indicator';

export { Indicator, Root };
