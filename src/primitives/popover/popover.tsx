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
  StyleSheet,
  View,
  type GestureResponderEvent,
  type LayoutChangeEvent,
  type LayoutRectangle,
} from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
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
  IRootContext,
  OverlayProps,
  OverlayRef,
  PopoverState,
  PortalProps,
  RootProps,
  RootRef,
  TriggerProps,
  TriggerRef,
} from './popover.types';

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
  (
    {
      asChild,
      onOpenChange: onOpenChangeProp,
      closeDelay,
      isDisabled,
      ...viewProps
    },
    ref
  ) => {
    const nativeID = useId();
    const [triggerPosition, setTriggerPosition] =
      useState<LayoutPosition | null>(null);
    const [contentLayout, setContentLayout] = useState<LayoutRectangle | null>(
      null
    );
    const [isOpen, setIsOpen] = useState(false);
    const [popoverState, setPopoverState] = useState<PopoverState>('idle');

    const progress = useSharedValue(0);

    function onOpenChange(value: boolean) {
      if (value) {
        setIsOpen(true);
        setPopoverState('open');
      } else {
        setPopoverState('close');
        setTimeout(() => {
          setIsOpen(false);
          setPopoverState('idle');
        }, closeDelay);
      }
      onOpenChangeProp?.(value);
    }

    const Component = asChild ? Slot.View : View;
    return (
      <RootContext.Provider
        value={{
          isOpen,
          onOpenChange,
          popoverState,
          isDisabled,
          contentLayout,
          nativeID,
          setContentLayout,
          setTriggerPosition,
          triggerPosition,
          closeDelay,
          progress,
        }}
      >
        <Component ref={ref} {...viewProps} />
      </RootContext.Provider>
    );
  }
);

// --------------------------------------------------

const Trigger = forwardRef<TriggerRef, TriggerProps>(
  ({ asChild, onPress: onPressProp, isDisabled = false, ...props }, ref) => {
    const {
      onOpenChange,
      isOpen,
      isDisabled: isDisabledRoot,
      setTriggerPosition,
      closeDelay,
    } = useRootContext();

    const isDisabledValue = isDisabled ?? isDisabledRoot ?? undefined;

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
          onOpenChange(false);
          setTimeout(() => {
            setTriggerPosition(null);
          }, closeDelay);
        },
      },
    });

    function onPress(ev: GestureResponderEvent) {
      if (isDisabledValue) return;
      augmentedRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
        setTriggerPosition({ width, pageX, pageY: pageY, height });
      });
      onOpenChange(!isOpen);
      onPressProp?.(ev);
    }

    const Component = asChild ? Slot.Pressable : Pressable;

    return (
      <Component
        ref={augmentedRef}
        aria-disabled={isDisabledValue}
        role="button"
        onPress={onPress}
        disabled={isDisabledValue}
        {...props}
      />
    );
  }
);

// --------------------------------------------------

/**
 * @warning when using a custom `<PortalHost />`, you might have to adjust the Content's offset to account for nav elements like headers.
 */
function Portal({ forceMount, hostName, children }: PortalProps) {
  const value = useRootContext();

  if (!value.triggerPosition) {
    return null;
  }

  if (!forceMount) {
    if (!value.isOpen) {
      return null;
    }
  }

  return (
    <PrimitivePortal hostName={hostName} name={`${value.nativeID}_portal`}>
      <RootContext.Provider value={value}>{children}</RootContext.Provider>
    </PrimitivePortal>
  );
}

// --------------------------------------------------

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
    const {
      isOpen,
      onOpenChange,
      setTriggerPosition,
      setContentLayout,
      closeDelay,
    } = useRootContext();

    function onPress(ev: GestureResponderEvent) {
      if (closeOnPress) {
        setTimeout(() => {
          setTriggerPosition(null);
          setContentLayout(null);
        }, closeDelay);
        onOpenChange(false);
      }
      OnPressProp?.(ev);
    }

    if (!forceMount) {
      if (!isOpen) {
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
      placement = 'bottom',
      offset = 0,
      alignOffset = 0,
      avoidCollisions = true,
      onLayout: onLayoutProp,
      insets,
      style,
      disablePositioningStyle,
      width = 'content-fit',
      ...props
    },
    ref
  ) => {
    const {
      isOpen,
      onOpenChange,
      contentLayout,
      nativeID,
      setContentLayout,
      setTriggerPosition,
      triggerPosition,
      closeDelay,
    } = useRootContext();

    useEffect(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          setTimeout(() => {
            setTriggerPosition(null);
            setContentLayout(null);
          }, closeDelay);
          onOpenChange(false);
          return true;
        }
      );

      return () => {
        setContentLayout(null);
        backHandler.remove();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const positionStyle = useRelativePosition({
      align,
      avoidCollisions,
      triggerPosition,
      contentLayout,
      alignOffset,
      insets,
      offset,
      placement,
      disablePositioningStyle,
    });

    // Calculate content width based on width prop
    const widthStyle: { width?: number | `${number}%` } = {};
    if (width === 'trigger' && triggerPosition) {
      widthStyle.width = triggerPosition.width;
    } else if (width === 'full') {
      widthStyle.width = '100%';
    } else if (typeof width === 'number') {
      widthStyle.width = width;
    }
    // 'content-fit' is default - no explicit width set

    const flatStyle = StyleSheet.flatten([positionStyle, widthStyle, style]);

    function onLayout(event: LayoutChangeEvent) {
      setContentLayout(event.nativeEvent.layout);
      onLayoutProp?.(event);
    }

    if (!forceMount) {
      if (!isOpen) {
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
        style={flatStyle}
        onLayout={onLayout}
        {...props}
      />
    );
  }
);

// --------------------------------------------------

const Close = forwardRef<CloseRef, CloseProps>(
  ({ asChild, onPress: onPressProp, disabled = false, ...props }, ref) => {
    const { onOpenChange, setContentLayout, setTriggerPosition, closeDelay } =
      useRootContext();

    function onPress(ev: GestureResponderEvent) {
      if (disabled) return;
      setTimeout(() => {
        setTriggerPosition(null);
        setContentLayout(null);
      }, closeDelay);
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
