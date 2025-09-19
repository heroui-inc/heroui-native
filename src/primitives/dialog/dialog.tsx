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
  Keyboard,
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
  DialogState,
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
  (RootContext & { nativeID: string }) | null
>(null);

const Root = forwardRef<RootRef, RootProps>(
  (
    {
      asChild,
      open: openProp,
      defaultOpen,
      onOpenChange: onOpenChangeProp,
      closeDelay = 0,
      dismissKeyboardOnClose = true,
      ...viewProps
    },
    ref
  ) => {
    const nativeID = useId();
    const [dialogState, setDialogState] = useState<DialogState>(() =>
      openProp || defaultOpen ? 'open' : 'idle'
    );
    const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

    const [open = false, onOpenChangeBase] = useControllableState({
      prop: openProp,
      defaultProp: defaultOpen,
      onChange: onOpenChangeProp,
    });

    const progressValue: Record<DialogState, number> = {
      idle: 0,
      open: 1,
      close: 2,
    };

    const progress = useSharedValue(progressValue[dialogState]);

    const onOpenChange = useCallback(
      (value: boolean) => {
        if (value) {
          onOpenChangeBase(value);
          setDialogState('open');
        } else {
          setDialogState('close');
          if (dismissKeyboardOnClose) {
            Keyboard.dismiss();
          }
          // Wait until the close animation is finished
          if (closeDelay > 0) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
              onOpenChangeBase(value);
              setDialogState('idle');
              progress.set(0);
            }, closeDelay);
            // or if closeDelay is 0, close immediately
          } else {
            onOpenChangeBase(value);
            setDialogState('idle');
            progress.set(0);
          }
        }
      },
      [onOpenChangeBase, closeDelay, progress, dismissKeyboardOnClose]
    );

    useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    const Component = asChild ? Slot.View : View;
    return (
      <DialogContext.Provider
        value={{
          open,
          onOpenChange,
          nativeID,
          progress,
          closeDelay,
          dialogState,
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
    if (value.dialogState === 'idle') {
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
    const { open, onOpenChange, dialogState } = useRootContext();

    function onPress(ev: GestureResponderEvent) {
      if (closeOnPress) {
        onOpenChange(!open);
      }
      OnPressProp?.(ev);
    }

    if (!forceMount) {
      if (dialogState === 'idle') {
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
    const { dialogState, nativeID, onOpenChange } = useRootContext();

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
      if (dialogState === 'idle') {
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
