import { createContext, forwardRef, useContext } from 'react';
import { type GestureResponderEvent, Pressable, View } from 'react-native';
import type {
  PressableRef,
  SlottablePressableProps,
} from '../../helpers/internal/types';
import * as Slot from '../slot';
import type {
  IndicatorProps,
  IndicatorRef,
  RootContext,
  RootProps,
  RootRef,
} from './radio.types';

const RadioContext = createContext<RootContext | null>(null);

/**
 * Radio Root primitive component.
 * Provides context for child compound components and renders a Trigger.
 */
const Root = forwardRef<RootRef, RootProps>(
  (
    {
      isDisabled = false,
      isSelected,
      onSelectedChange,
      isInvalid = false,
      variant,
      nativeID,
      ...props
    },
    ref
  ) => {
    return (
      <RadioContext.Provider
        value={{
          isDisabled,
          isSelected,
          onSelectedChange,
          isInvalid,
          variant,
          nativeID,
        }}
      >
        <Trigger ref={ref} {...props} />
      </RadioContext.Provider>
    );
  }
);

Root.displayName = 'HeroUINative.Primitive.Radio.Root';

/**
 * Hook to access radio context values within compound components.
 * Throws if used outside of a Radio component.
 */
function useRadioContext() {
  const context = useContext(RadioContext);
  if (!context) {
    throw new Error(
      'Radio compound components cannot be rendered outside the Radio component'
    );
  }
  return context;
}

// --------------------------------------------------

/**
 * Internal Trigger component that handles press events and accessibility.
 */
const Trigger = forwardRef<PressableRef, SlottablePressableProps>(
  ({ asChild, onPress: onPressProp, ...props }, ref) => {
    const { isDisabled, isSelected, onSelectedChange, nativeID } =
      useRadioContext();

    /** Handle press by toggling selected state when not disabled */
    function onPress(ev: GestureResponderEvent) {
      if (isDisabled) return;
      onSelectedChange?.(!isSelected);
      onPressProp?.(ev);
    }

    const Component = asChild ? Slot.Pressable : Pressable;

    return (
      <Component
        ref={ref}
        nativeID={nativeID}
        aria-disabled={isDisabled}
        role="radio"
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

Trigger.displayName = 'HeroUINative.Primitive.Radio.Trigger';

// --------------------------------------------------

/**
 * Radio Indicator primitive component.
 * Renders a visual indicator for the radio selection state.
 */
const Indicator = forwardRef<IndicatorRef, IndicatorProps>(
  ({ asChild, ...props }, ref) => {
    const { isSelected, isDisabled } = useRadioContext();

    const Component = asChild ? Slot.View : View;
    return (
      <Component
        ref={ref}
        aria-disabled={isDisabled}
        aria-hidden={!isSelected}
        role="presentation"
        {...props}
      />
    );
  }
);

Indicator.displayName = 'HeroUINative.Primitive.Radio.Indicator';

export { Indicator, Root, useRadioContext };
