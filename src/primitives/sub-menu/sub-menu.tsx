import { forwardRef, useId } from 'react';
import { Pressable, View, type GestureResponderEvent } from 'react-native';
import { useControllableState } from '../../helpers/internal/hooks';
import { createContext } from '../../helpers/internal/utils';
import * as Slot from '../../primitives/slot';
import type {
  ContentProps,
  ContentRef,
  ISubMenuContext,
  RootProps,
  RootRef,
  TriggerProps,
  TriggerRef,
} from './sub-menu.types';

const [SubMenuProvider, useSubMenuContext] = createContext<ISubMenuContext>({
  strict: false,
});

// --------------------------------------------------

const Root = forwardRef<RootRef, RootProps>(
  (
    {
      asChild,
      isOpen: isOpenProp,
      isDefaultOpen,
      onOpenChange: onOpenChangeProp,
      isDisabled = false,
      ...viewProps
    },
    ref
  ) => {
    const [isOpen = false, onOpenChange] = useControllableState({
      prop: isOpenProp,
      defaultProp: isDefaultOpen,
      onChange: onOpenChangeProp,
    });

    const nativeID = useId();

    const Component = asChild ? Slot.View : View;

    return (
      <SubMenuProvider
        value={{
          isOpen,
          onOpenChange,
          isDisabled,
          nativeID,
        }}
      >
        <Component ref={ref} {...viewProps} />
      </SubMenuProvider>
    );
  }
);

// --------------------------------------------------

const Trigger = forwardRef<TriggerRef, TriggerProps>(
  (
    {
      asChild,
      textValue,
      onPress: onPressProp,
      isDisabled: isDisabledProp = false,
      ...props
    },
    ref
  ) => {
    const {
      nativeID,
      isOpen,
      onOpenChange,
      isDisabled: isDisabledRoot,
    } = useSubMenuContext();

    const isDisabled = isDisabledProp || isDisabledRoot;

    function onPress(ev: GestureResponderEvent) {
      if (isDisabled) return;
      onOpenChange(!isOpen);
      onPressProp?.(ev);
    }

    const Component = asChild ? Slot.Pressable : Pressable;

    return (
      <Component
        ref={ref}
        aria-valuetext={textValue}
        role="menuitem"
        aria-expanded={isOpen}
        accessibilityState={{ expanded: isOpen, disabled: isDisabled }}
        nativeID={nativeID}
        onPress={onPress}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        {...props}
      />
    );
  }
);

// --------------------------------------------------

const Content = forwardRef<ContentRef, ContentProps>(
  ({ asChild = false, forceMount, ...props }, ref) => {
    const { isOpen, nativeID } = useSubMenuContext();

    if (!forceMount) {
      if (!isOpen) {
        return null;
      }
    }

    const Component = asChild ? Slot.Pressable : Pressable;

    return (
      <Component ref={ref} role="group" aria-labelledby={nativeID} {...props} />
    );
  }
);

// --------------------------------------------------

Root.displayName = 'HeroUINative.SubMenu.Root';
Trigger.displayName = 'HeroUINative.SubMenu.Trigger';
Content.displayName = 'HeroUINative.SubMenu.Content';

export { Content, Root, Trigger, useSubMenuContext };
