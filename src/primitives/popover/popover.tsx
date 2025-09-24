import React, {
  forwardRef,
  useContext,
  useEffect,
  useId,
  useState,
} from 'react';
import {
  BackHandler,
  Pressable,
  View,
  type GestureResponderEvent,
  type LayoutChangeEvent,
  type LayoutRectangle,
} from 'react-native';
import {
  useAugmentedRef,
  useRelativePosition,
  type LayoutPosition,
} from '../../helpers/hooks';
import { Portal as PrimitivePortal } from '../portal';
import * as Slot from '../slot';
import type {
  CloseProps,
  CloseRef,
  ContentProps,
  ContentRef,
  OverlayProps,
  OverlayRef,
  PortalProps,
  RootProps,
  RootRef,
  TriggerProps,
  TriggerRef,
} from './popover.types';

interface IRootContext {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerPosition: LayoutPosition | null;
  setTriggerPosition: (triggerPosition: LayoutPosition | null) => void;
  contentLayout: LayoutRectangle | null;
  setContentLayout: (contentLayout: LayoutRectangle | null) => void;
  nativeID: string;
}

const RootContext = React.createContext<IRootContext | null>(null);

const useRootContext = () => {
  const context = useContext(RootContext);
  if (!context) {
    throw new Error(
      'Popover compound components cannot be rendered outside the Popover component'
    );
  }
  return context;
};

const Root = forwardRef<RootRef, RootProps>(
  ({ asChild, onOpenChange: onOpenChangeProp, ...viewProps }, ref) => {
    const nativeID = useId();
    const [triggerPosition, setTriggerPosition] =
      useState<LayoutPosition | null>(null);
    const [contentLayout, setContentLayout] = useState<LayoutRectangle | null>(
      null
    );
    const [open, setOpen] = useState(false);

    function onOpenChange(value: boolean) {
      setOpen(value);
      onOpenChangeProp?.(value);
    }

    const Component = asChild ? Slot.View : View;
    return (
      <RootContext.Provider
        value={{
          open,
          onOpenChange,
          contentLayout,
          nativeID,
          setContentLayout,
          setTriggerPosition,
          triggerPosition,
        }}
      >
        <Component ref={ref} {...viewProps} />
      </RootContext.Provider>
    );
  }
);

// --------------------------------------------------

const Trigger = forwardRef<TriggerRef, TriggerProps>(
  ({ asChild, onPress: onPressProp, disabled = false, ...props }, ref) => {
    const { onOpenChange, open, setTriggerPosition } = useRootContext();

    const augmentedRef = useAugmentedRef({
      ref,
      methods: {
        open: () => {
          onOpenChange(true);
          augmentedRef.current?.measure(
            (_x, _y, width, height, pageX, pageY) => {
              setTriggerPosition({ width, pageX, pageY: pageY, height });
            }
          );
        },
        close: () => {
          setTriggerPosition(null);
          onOpenChange(false);
        },
      },
    });

    function onPress(ev: GestureResponderEvent) {
      if (disabled) return;
      augmentedRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
        setTriggerPosition({ width, pageX, pageY: pageY, height });
      });
      onOpenChange(!open);
      onPressProp?.(ev);
    }

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <Component
        ref={augmentedRef}
        aria-disabled={disabled ?? undefined}
        role="button"
        onPress={onPress}
        disabled={disabled ?? undefined}
        {...props}
      />
    );
  }
);

// --------------------------------------------------

/**
 * @warning when using a custom `<PortalHost />`, you might have to adjust the Content's sideOffset to account for nav elements like headers.
 */
function Portal({ forceMount, hostName, children }: PortalProps) {
  const value = useRootContext();

  if (!value.triggerPosition) {
    return null;
  }

  if (!forceMount) {
    if (!value.open) {
      return null;
    }
  }

  return (
    <PrimitivePortal hostName={hostName} name={`${value.nativeID}_portal`}>
      <RootContext.Provider value={value}>{children}</RootContext.Provider>
    </PrimitivePortal>
  );
}

const Overlay = forwardRef<OverlayRef, OverlayProps>(
  (
    {
      asChild,
      forceMount,
      onPress: OnPressProp,
      closeOnPress = true,
      ...props
    },
    ref
  ) => {
    const { open, onOpenChange, setTriggerPosition, setContentLayout } =
      useRootContext();

    function onPress(ev: GestureResponderEvent) {
      if (closeOnPress) {
        setTriggerPosition(null);
        setContentLayout(null);
        onOpenChange(false);
      }
      OnPressProp?.(ev);
    }

    if (!forceMount) {
      if (!open) {
        return null;
      }
    }

    const Component = asChild ? Slot.Pressable : Pressable;
    return <Component ref={ref} onPress={onPress} {...props} />;
  }
);

// --------------------------------------------------

/**
 * @info `position`, `top`, `left`, and `maxWidth` style properties are controlled internally. Opt out of this behavior by setting `disablePositioningStyle` to `true`.
 */
const Content = forwardRef<ContentRef, ContentProps>(
  (
    {
      asChild = false,
      forceMount,
      align = 'start',
      side = 'bottom',
      sideOffset = 0,
      alignOffset = 0,
      avoidCollisions = true,
      onLayout: onLayoutProp,
      insets,
      style,
      disablePositioningStyle,
      ...props
    },
    ref
  ) => {
    const {
      open,
      onOpenChange,
      contentLayout,
      nativeID,
      setContentLayout,
      setTriggerPosition,
      triggerPosition,
    } = useRootContext();

    useEffect(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          setTriggerPosition(null);
          setContentLayout(null);
          onOpenChange(false);
          return true;
        }
      );

      return () => {
        setContentLayout(null);
        backHandler.remove();
      };
    }, [onOpenChange, setContentLayout, setTriggerPosition]);

    const positionStyle = useRelativePosition({
      align,
      avoidCollisions,
      triggerPosition,
      contentLayout,
      alignOffset,
      insets,
      sideOffset,
      side,
      disablePositioningStyle,
    });

    function onLayout(event: LayoutChangeEvent) {
      setContentLayout(event.nativeEvent.layout);
      onLayoutProp?.(event);
    }

    if (!forceMount) {
      if (!open) {
        return null;
      }
    }

    const Component = asChild ? Slot.View : View;
    return (
      <Component
        ref={ref}
        role="dialog"
        nativeID={nativeID}
        aria-modal={true}
        style={[positionStyle, style]}
        onLayout={onLayout}
        {...props}
      />
    );
  }
);

// --------------------------------------------------

const Close = forwardRef<CloseRef, CloseProps>(
  ({ asChild, onPress: onPressProp, disabled = false, ...props }, ref) => {
    const { onOpenChange, setContentLayout, setTriggerPosition } =
      useRootContext();

    function onPress(ev: GestureResponderEvent) {
      if (disabled) return;
      setTriggerPosition(null);
      setContentLayout(null);
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

// --------------------------------------------------

Root.displayName = 'HeroUINative.Popover.Root';
Trigger.displayName = 'HeroUINative.Popover.Trigger';
Overlay.displayName = 'HeroUINative.Popover.Overlay';
Content.displayName = 'HeroUINative.Popover.Content';
Close.displayName = 'HeroUINative.Popover.Close';

export { Close, Content, Overlay, Portal, Root, Trigger, useRootContext };
