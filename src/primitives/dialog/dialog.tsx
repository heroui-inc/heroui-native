import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import {
  BackHandler,
  type GestureResponderEvent,
  Pressable,
  Text,
  View,
} from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { useControllableState } from '../../helpers/hooks';
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
} from './dialog.types';

const DialogContext = createContext<
  (RootContext & { nativeID: string; visibleState?: boolean }) | null
>(null);

const Root = forwardRef<RootRef, RootProps>(
  (
    {
      asChild,
      open: openProp,
      defaultOpen,
      onOpenChange: onOpenChangeProp,
      closeDelay = 0,
      ...viewProps
    },
    ref
  ) => {
    const nativeID = useId();
    const [visibleState, setVisibleState] = useState<boolean>(
      () => openProp || defaultOpen || false
    );
    const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

    const [open = false, onOpenChangeBase] = useControllableState({
      prop: openProp,
      defaultProp: defaultOpen,
      onChange: onOpenChangeProp,
    });

    // Handle delayed close for animations
    const onOpenChange = useCallback(
      (value: boolean) => {
        if (value) {
          // Opening: set visible immediately
          setVisibleState(true);
          onOpenChangeBase(value);
        } else {
          // Closing: delay the actual close
          onOpenChangeBase(value);
          if (closeDelay > 0) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
              setVisibleState(false);
            }, closeDelay);
          } else {
            setVisibleState(false);
          }
        }
      },
      [onOpenChangeBase, closeDelay]
    );

    // Sync visible state when open prop changes
    useEffect(() => {
      if (open) {
        setVisibleState(true);
      } else if (closeDelay > 0) {
        const timeout = setTimeout(() => {
          setVisibleState(false);
        }, closeDelay);
        return () => clearTimeout(timeout);
      } else {
        setVisibleState(false);
      }
      return undefined;
    }, [open, closeDelay]);

    // Cleanup timeout on unmount
    useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    const progress = useSharedValue(0);

    const Component = asChild ? Slot.View : View;
    return (
      <DialogContext.Provider
        value={{
          open,
          onOpenChange,
          nativeID,
          progress,
          closeDelay,
          visibleState,
        }}
      >
        <Component ref={ref} {...viewProps} />
      </DialogContext.Provider>
    );
  }
);

function useRootContext() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error(
      'Dialog compound components cannot be rendered outside the Dialog component'
    );
  }
  return context;
}

Root.displayName = 'HeroUINative.Primitive.Dialog.Root';

// --------------------------------------------------

const Trigger = forwardRef<TriggerRef, TriggerProps>(
  ({ asChild, onPress: onPressProp, disabled = false, ...props }, ref) => {
    const { open, onOpenChange } = useRootContext();

    function onPress(ev: GestureResponderEvent) {
      if (disabled) return;
      const newValue = !open;
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

Trigger.displayName = 'HeroUINative.Primitive.Dialog.Trigger';

// --------------------------------------------------

/**
 * @warning when using a custom `<PortalHost />`, you might have to adjust the Content's sideOffset to account for nav elements like headers.
 */
function Portal({ forceMount, hostName, children }: PortalProps) {
  const value = useRootContext();

  if (!forceMount) {
    if (!value.visibleState) {
      return null;
    }
  }

  return (
    <PortalPrimitive hostName={hostName} name={`${value.nativeID}_portal`}>
      <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
    </PortalPrimitive>
  );
}

// --------------------------------------------------

const Overlay = forwardRef<OverlayRef, OverlayProps>(
  (
    {
      asChild,
      forceMount,
      closeOnPress = true,
      onPress: OnPressProp,
      ...props
    },
    ref
  ) => {
    const { open, onOpenChange, visibleState } = useRootContext();

    function onPress(ev: GestureResponderEvent) {
      if (closeOnPress) {
        onOpenChange(!open);
      }
      OnPressProp?.(ev);
    }

    if (!forceMount) {
      if (!visibleState) {
        return null;
      }
    }

    const Component = asChild ? Slot.Pressable : Pressable;
    return <Component ref={ref} onPress={onPress} {...props} />;
  }
);

Overlay.displayName = 'HeroUINative.Primitive.Dialog.Overlay';

// --------------------------------------------------

const Content = forwardRef<ContentRef, ContentProps>(
  ({ asChild, forceMount, ...props }, ref) => {
    const { visibleState, nativeID, onOpenChange } = useRootContext();

    useEffect(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          onOpenChange(false);
          return true;
        }
      );

      return () => {
        backHandler.remove();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!forceMount) {
      if (!visibleState) {
        return null;
      }
    }

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

Content.displayName = 'HeroUINative.Primitive.Dialog.Content';

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

Close.displayName = 'HeroUINative.Primitive.Dialog.Close';

// --------------------------------------------------

const Title = forwardRef<TitleRef, TitleProps>((props, ref) => {
  const { nativeID } = useRootContext();
  return (
    <Text ref={ref} role="heading" nativeID={`${nativeID}_label`} {...props} />
  );
});

Title.displayName = 'HeroUINative.Primitive.Dialog.Title';

// --------------------------------------------------

const Description = forwardRef<DescriptionRef, DescriptionProps>(
  (props, ref) => {
    const { nativeID } = useRootContext();
    return <Text ref={ref} nativeID={`${nativeID}_desc`} {...props} />;
  }
);

Description.displayName = 'HeroUINative.Primitive.Dialog.Description';

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
