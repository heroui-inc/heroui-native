import { createContext, forwardRef, useContext, useId } from 'react';
import { Pressable, View, type GestureResponderEvent } from 'react-native';
import { useControllableState } from '../../helpers/hooks';
import * as Slot from '../slot';
import type {
  ContentProps,
  ContentRef,
  HeaderProps,
  HeaderRef,
  IndicatorProps,
  IndicatorRef,
  ItemProps,
  ItemRef,
  RootContext,
  RootProps,
  RootRef,
  TriggerProps,
  TriggerRef,
} from './accordion.types';
import { isItemExpanded, toStringArray } from './accordion.utils';

const AccordionContext = createContext<RootContext | null>(null);

const Root = forwardRef<RootRef, RootProps>(
  (
    {
      asChild,
      selectionMode,
      isDisabled,
      isCollapsible = true,
      value: valueProp,
      onValueChange: onValueChangeProps,
      defaultValue,
      ...viewProps
    },
    ref
  ) => {
    const [
      value = selectionMode === 'multiple' ? [] : undefined,
      onValueChange,
    ] = useControllableState<(string | undefined) | string[]>({
      prop: valueProp,
      defaultProp: defaultValue,
      onChange: onValueChangeProps as (
        state: string | string[] | undefined
      ) => void,
    });

    const Component = asChild ? Slot.View : View;

    return (
      <AccordionContext.Provider
        value={{
          selectionMode,
          isDisabled,
          isCollapsible,
          value,
          onValueChange,
        }}
      >
        <Component ref={ref} {...viewProps} />
      </AccordionContext.Provider>
    );
  }
);

Root.displayName = 'HeroUINative.Primitive.Accordion.Root';

function useRootContext() {
  const context = useContext(AccordionContext);

  if (!context) {
    throw new Error(
      'Accordion compound components cannot be rendered outside the Accordion component'
    );
  }

  return context;
}

// --------------------------------------------------

type AccordionItemContext = ItemProps & {
  nativeID: string;
  isExpanded: boolean;
};

const AccordionItemContext = createContext<AccordionItemContext | null>(null);

const Item = forwardRef<ItemRef, ItemProps>(
  ({ asChild, value, isDisabled, ...viewProps }, ref) => {
    const { value: rootValue } = useRootContext();
    const nativeID = useId();

    const Component = asChild ? Slot.View : View;

    return (
      <AccordionItemContext.Provider
        value={{
          value,
          isDisabled,
          nativeID,
          isExpanded: isItemExpanded(rootValue, value),
        }}
      >
        <Component ref={ref} {...viewProps} />
      </AccordionItemContext.Provider>
    );
  }
);

Item.displayName = 'HeroUINative.Primitive.Accordion.Item';

function useItemContext() {
  const context = useContext(AccordionItemContext);

  if (!context) {
    throw new Error(
      'AccordionItem compound components cannot be rendered outside the AccordionItem component'
    );
  }

  return context;
}

// --------------------------------------------------

const Header = forwardRef<HeaderRef, HeaderProps>(
  ({ asChild, ...props }, ref) => {
    const { isDisabled: rootDisabled } = useRootContext();
    const { isDisabled: itemDisabled, isExpanded } = useItemContext();

    const Component = asChild ? Slot.View : View;
    return (
      <Component
        ref={ref}
        role="heading"
        aria-expanded={isExpanded}
        aria-disabled={rootDisabled ?? itemDisabled}
        {...props}
      />
    );
  }
);

Header.displayName = 'HeroUINative.Primitive.Accordion.Header';

// --------------------------------------------------

const Trigger = forwardRef<TriggerRef, TriggerProps>(
  (
    { asChild, onPress: onPressProp, isDisabled: disabledProp, ...props },
    ref
  ) => {
    const {
      isDisabled: rootDisabled,
      selectionMode,
      onValueChange,
      value: rootValue,
      isCollapsible,
    } = useRootContext();

    const {
      nativeID,
      isDisabled: itemDisabled,
      value,
      isExpanded,
    } = useItemContext();

    function onPress(ev: GestureResponderEvent) {
      if (rootDisabled || itemDisabled) return;

      if (selectionMode === 'single') {
        const newValue = isCollapsible
          ? value === rootValue
            ? undefined
            : value
          : value;
        onValueChange(newValue);
      }

      if (selectionMode === 'multiple') {
        const rootToArray = toStringArray(rootValue);
        const newValue = isCollapsible
          ? rootToArray.includes(value)
            ? rootToArray.filter((val) => val !== value)
            : rootToArray.concat(value)
          : [...new Set(rootToArray.concat(value))];
        // @ts-ignore - `newValue` is of type `string[]` which is OK
        onValueChange(newValue);
      }

      onPressProp?.(ev);
    }

    const isTriggerDisabled = disabledProp || rootDisabled || itemDisabled;
    const Component = asChild ? Slot.Pressable : Pressable;

    return (
      <Component
        ref={ref}
        nativeID={nativeID}
        aria-disabled={isTriggerDisabled}
        role="button"
        onPress={onPress}
        accessibilityState={{
          expanded: isExpanded,
          disabled: isTriggerDisabled,
        }}
        disabled={isTriggerDisabled}
        {...props}
      />
    );
  }
);

Trigger.displayName = 'HeroUINative.Primitive.Accordion.Trigger';

// --------------------------------------------------

const Indicator = forwardRef<IndicatorRef, IndicatorProps>(
  ({ asChild, ...props }, ref) => {
    const Component = asChild ? Slot.View : View;

    return (
      <Component ref={ref} role="presentation" aria-hidden={true} {...props} />
    );
  }
);

Indicator.displayName = 'HeroUINative.Primitive.Accordion.Indicator';

// --------------------------------------------------

const Content = forwardRef<ContentRef, ContentProps>(
  ({ asChild, forceMount, ...props }, ref) => {
    const { selectionMode } = useRootContext();
    const { nativeID, isExpanded } = useItemContext();

    if (!forceMount) {
      if (!isExpanded) {
        return null;
      }
    }

    const Component = asChild ? Slot.View : View;
    return (
      <Component
        ref={ref}
        aria-hidden={!(forceMount || isExpanded)}
        aria-labelledby={nativeID}
        role={selectionMode === 'single' ? 'region' : 'summary'}
        {...props}
      />
    );
  }
);

Content.displayName = 'HeroUINative.Primitive.Accordion.Content';

export { Content, Header, Indicator, Item, Root, Trigger, useItemContext };
