import { createContext, forwardRef, useContext, useId } from 'react';
import {
  Pressable,
  Text,
  View,
  type GestureResponderEvent,
} from 'react-native';
import * as Slot from '../slot';
import type {
  ContentProps,
  ContentRef,
  LabelProps,
  LabelRef,
  ListProps,
  ListRef,
  RootProps,
  RootRef,
  TriggerProps,
  TriggerRef,
} from './tabs.types';

type RootContext = RootProps & {
  nativeID: string;
};

const TabsContext = createContext<RootContext | null>(null);

const Root = forwardRef<RootRef, RootProps>(
  ({ asChild, value, onValueChange, ...viewProps }, ref) => {
    const nativeID = useId();
    const Component = asChild ? Slot.View : View;

    return (
      <TabsContext.Provider
        value={{
          value,
          onValueChange,
          nativeID,
        }}
      >
        <Component ref={ref} {...viewProps} />
      </TabsContext.Provider>
    );
  }
);

Root.displayName = 'HeroUINative.Primitive.Tabs.Root';

function useRootContext() {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error(
      'Tabs compound components cannot be rendered outside the Tabs component'
    );
  }

  return context;
}

// --------------------------------------------------

const List = forwardRef<ListRef, ListProps>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;
  return <Component ref={ref} role="tablist" {...props} />;
});

List.displayName = 'HeroUINative.Primitive.Tabs.List';

// --------------------------------------------------

type TriggerContext = {
  value: string;
  nativeID: string;
};

const TriggerContext = createContext<TriggerContext | null>(null);

const Trigger = forwardRef<TriggerRef, TriggerProps>(
  (
    { asChild, onPress: onPressProp, disabled, value: tabValue, ...props },
    ref
  ) => {
    const { onValueChange, value: rootValue, nativeID } = useRootContext();

    function onPress(ev: GestureResponderEvent) {
      if (disabled) return;
      onValueChange(tabValue);
      onPressProp?.(ev);
    }

    const Component = asChild ? Slot.Pressable : Pressable;
    const tabNativeID = `${nativeID}-tab-${tabValue}`;

    return (
      <TriggerContext.Provider
        value={{ value: tabValue, nativeID: tabNativeID }}
      >
        <Component
          ref={ref}
          nativeID={tabNativeID}
          aria-disabled={!!disabled}
          aria-selected={rootValue === tabValue}
          role="tab"
          onPress={onPress}
          accessibilityState={{
            selected: rootValue === tabValue,
            disabled: !!disabled,
          }}
          disabled={!!disabled}
          {...props}
        />
      </TriggerContext.Provider>
    );
  }
);

Trigger.displayName = 'HeroUINative.Primitive.Tabs.Trigger';

function useTriggerContext() {
  const context = useContext(TriggerContext);

  if (!context) {
    throw new Error(
      'Tabs.Trigger compound components cannot be rendered outside the Tabs.Trigger component'
    );
  }

  return context;
}

// --------------------------------------------------

const Label = forwardRef<LabelRef, LabelProps>(({ asChild, ...props }, ref) => {
  const { nativeID } = useTriggerContext();
  const Component = asChild ? Slot.Text : Text;
  return (
    <Component
      ref={ref}
      nativeID={`${nativeID}-label`}
      aria-labelledby={nativeID}
      {...props}
    />
  );
});

Label.displayName = 'HeroUINative.Primitive.Tabs.Label';

// --------------------------------------------------

const Content = forwardRef<ContentRef, ContentProps>(
  ({ asChild, forceMount, value: tabValue, ...props }, ref) => {
    const { value: rootValue, nativeID } = useRootContext();

    if (!forceMount) {
      if (rootValue !== tabValue) {
        return null;
      }
    }

    const Component = asChild ? Slot.View : View;
    return (
      <Component
        ref={ref}
        aria-hidden={!(forceMount || rootValue === tabValue)}
        aria-labelledby={`${nativeID}-tab-${tabValue}`}
        role="tabpanel"
        {...props}
      />
    );
  }
);

Content.displayName = 'HeroUINative.Primitive.Tabs.Content';

export {
  Content,
  Label,
  List,
  Root,
  Trigger,
  useRootContext,
  useTriggerContext,
};
