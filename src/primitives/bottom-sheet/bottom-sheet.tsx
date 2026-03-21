import { createContext, forwardRef, useContext, useId } from 'react';
import {
  type GestureResponderEvent,
  Pressable,
  Text,
  View,
} from 'react-native';
import { useControllableState } from '../../helpers/internal/hooks';
import { Portal as PortalPrimitive } from '../portal';
import * as Slot from '../slot';
import type {
  CloseProps,
  CloseRef,
  ContentProps,
  ContentRef,
  DescriptionProps,
  DescriptionRef,
  OverlayProps,
  OverlayRef,
  PortalProps,
  RootContext,
  RootProps,
  RootRef,
  TitleProps,
  TitleRef,
  TriggerProps,
  TriggerRef,
} from './bottom-sheet.types';

const BottomSheetContext = createContext<
  (RootContext & { nativeID: string }) | null
>(null);

const Root = forwardRef<RootRef, RootProps>(
  (
    {
      asChild,
      isOpen: isOpenProp,
      isDefaultOpen,
      onOpenChange: onOpenChangeProp,
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
      <BottomSheetContext.Provider
        value={{
          isOpen,
          onOpenChange,
          nativeID,
        }}
      >
        <Component ref={ref} {...viewProps} />
      </BottomSheetContext.Provider>
    );
  }
);

function useRootContext() {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error(
      'BottomSheet compound components cannot be rendered outside the BottomSheet component'
    );
  }
  return context;
}

Root.displayName = 'HeroUINative.Primitive.BottomSheet.Root';

// --------------------------------------------------

const Trigger = forwardRef<TriggerRef, TriggerProps>(
  ({ asChild, onPress: onPressProp, disabled = false, ...props }, ref) => {
    const { isOpen, onOpenChange } = useRootContext();

    function onPress(ev: GestureResponderEvent) {
      if (disabled) return;
      const newValue = !isOpen;
      onOpenChange(newValue);
      onPressProp?.(ev);
    }

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <Component
        ref={ref}
        aria-disabled={disabled ?? undefined}
        role="button"
        onPress={onPress}
        disabled={disabled ?? undefined}
        {...props}
      />
    );
  }
);

Trigger.displayName = 'HeroUINative.Primitive.BottomSheet.Trigger';

// --------------------------------------------------

/**
 * @warning when using a custom `<PortalHost />`, you might have to adjust the Content's offset to account for nav elements like headers.
 */
function Portal({ hostName, children }: PortalProps) {
  const value = useRootContext();

  return (
    <PortalPrimitive hostName={hostName} name={`${value.nativeID}_portal`}>
      <BottomSheetContext.Provider value={value}>
        {children}
      </BottomSheetContext.Provider>
    </PortalPrimitive>
  );
}

// --------------------------------------------------

const Overlay = forwardRef<OverlayRef, OverlayProps>(
  ({ asChild, isCloseOnPress = true, onPress: OnPressProp, ...props }, ref) => {
    const { isOpen, onOpenChange } = useRootContext();

    function onPress(ev: GestureResponderEvent) {
      if (isCloseOnPress) {
        onOpenChange(!isOpen);
      }
      OnPressProp?.(ev);
    }

    const Component = asChild ? Slot.Pressable : Pressable;

    return <Component ref={ref} onPress={onPress} {...props} />;
  }
);

Overlay.displayName = 'HeroUINative.Primitive.BottomSheet.Overlay';

// --------------------------------------------------

const Content = forwardRef<ContentRef, ContentProps>(
  ({ asChild, ...props }, ref) => {
    const { nativeID } = useRootContext();

    const Component = asChild ? Slot.View : View;

    return (
      <Component
        ref={ref}
        role="dialog"
        nativeID={nativeID}
        aria-labelledby={`${nativeID}_label`}
        aria-describedby={`${nativeID}_desc`}
        aria-modal={true}
        {...props}
      />
    );
  }
);

Content.displayName = 'HeroUINative.Primitive.BottomSheet.Content';

// --------------------------------------------------

const Close = forwardRef<CloseRef, CloseProps>(
  ({ asChild, onPress: onPressProp, disabled = false, ...props }, ref) => {
    const { onOpenChange } = useRootContext();

    function onPress(ev: GestureResponderEvent) {
      if (disabled) return;
      onOpenChange(false);
      onPressProp?.(ev);
    }

    const Component = asChild ? Slot.Pressable : Pressable;

    return (
      <Component
        ref={ref}
        aria-disabled={disabled ?? undefined}
        role="button"
        onPress={onPress}
        disabled={disabled ?? undefined}
        {...props}
      />
    );
  }
);

Close.displayName = 'HeroUINative.Primitive.BottomSheet.Close';

// --------------------------------------------------

const Title = forwardRef<TitleRef, TitleProps>((props, ref) => {
  const { nativeID } = useRootContext();
  return (
    <Text ref={ref} role="heading" nativeID={`${nativeID}_label`} {...props} />
  );
});

Title.displayName = 'HeroUINative.Primitive.BottomSheet.Title';

// --------------------------------------------------

const Description = forwardRef<DescriptionRef, DescriptionProps>(
  (props, ref) => {
    const { nativeID } = useRootContext();
    return <Text ref={ref} nativeID={`${nativeID}_desc`} {...props} />;
  }
);

Description.displayName = 'HeroUINative.Primitive.BottomSheet.Description';

// --------------------------------------------------

export {
  Close,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
  useRootContext,
};
