import React, {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useId,
  useState,
} from 'react';
import {
  BackHandler,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  View,
  type GestureResponderEvent,
  type LayoutChangeEvent,
  type LayoutRectangle,
} from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import {
  useAugmentedRef,
  useControllableState,
  useRelativePosition,
  type LayoutPosition,
} from '../../helpers/hooks';
import { Portal as PrimitivePortal } from '../portal';
import * as Slot from '../slot';
import type {
  CloseProps,
  CloseRef,
  ContentRef,
  DialogContentProps,
  GroupLabelProps,
  GroupLabelRef,
  GroupProps,
  GroupRef,
  IRootContext,
  ItemIndicatorProps,
  ItemIndicatorRef,
  ItemLabelProps,
  ItemLabelRef,
  ItemProps,
  ItemRef,
  OverlayProps,
  OverlayRef,
  PopoverContentProps,
  PortalProps,
  RootProps,
  RootRef,
  SelectState,
  TriggerProps,
  TriggerRef,
  ValueProps,
  ValueRef,
} from './select.types';

const RootContext = createContext<IRootContext | null>(null);

const useRootContext = () => {
  const context = useContext(RootContext);
  if (!context) {
    throw new Error(
      'Select compound components cannot be rendered outside the Select component'
    );
  }
  return context;
};

const Root = forwardRef<RootRef, RootProps>(
  (
    {
      asChild,
      value: valueProp,
      defaultValue,
      onValueChange: onValueChangeProp,
      onOpenChange: onOpenChangeProp,
      closeDelay,
      isDisabled,
      isDismissKeyboardOnClose = true,
      ...viewProps
    },
    ref
  ) => {
    const nativeID = useId();

    const [value, onValueChange] = useControllableState({
      prop: valueProp,
      defaultProp: defaultValue,
      onChange: onValueChangeProp,
    });
    const [triggerPosition, setTriggerPosition] =
      useState<LayoutPosition | null>(null);
    const [contentLayout, setContentLayout] = useState<LayoutRectangle | null>(
      null
    );
    const [isOpen, setIsOpen] = useState(false);
    const [selectState, setSelectState] = useState<SelectState>('idle');

    const progress = useSharedValue(0);
    const isDragging = useSharedValue(false);

    function onOpenChange(isOpenValue: boolean) {
      if (isOpenValue) {
        setIsOpen(true);
        setSelectState('open');
      } else {
        setSelectState('close');
        if (isDismissKeyboardOnClose) {
          Keyboard.dismiss();
        }
        setTimeout(() => {
          setIsOpen(false);
          setSelectState('idle');
        }, closeDelay);
      }
      onOpenChangeProp?.(isOpenValue);
    }

    const Component = asChild ? Slot.View : View;
    return (
      <RootContext.Provider
        value={{
          value,
          onValueChange,
          isOpen,
          onOpenChange,
          selectState,
          isDisabled,
          contentLayout,
          nativeID,
          setContentLayout,
          setTriggerPosition,
          triggerPosition,
          closeDelay,
          progress,
          isDragging,
          isDismissKeyboardOnClose,
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

    const isDisabledValue = isDisabled || isDisabledRoot;

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
        role="combobox"
        onPress={onPress}
        disabled={isDisabledValue}
        {...props}
      />
    );
  }
);

// --------------------------------------------------

const Value = React.forwardRef<ValueRef, ValueProps>(
  ({ asChild, placeholder, ...props }, ref) => {
    const { value } = useRootContext();

    const Component = asChild ? Slot.Text : Text;

    return (
      <Component ref={ref} {...props}>
        {value?.label ?? placeholder}
      </Component>
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
const PopoverContent = forwardRef<ContentRef, PopoverContentProps>(
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

const DialogContent = forwardRef<ContentRef, DialogContentProps>(
  ({ asChild, forceMount, ...props }, ref) => {
    const { selectState, nativeID, onOpenChange } = useRootContext();

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
      if (selectState === 'idle') {
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

const ItemContext = createContext<{
  itemValue: string;
  label: string;
} | null>(null);

function useItemContext() {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error(
      'Item compound components cannot be rendered outside of an Item component'
    );
  }
  return context;
}

// --------------------------------------------------

const Item = React.forwardRef<ItemRef, ItemProps>(
  (
    {
      asChild,
      value: itemValue,
      label,
      onPress: onPressProp,
      disabled = false,
      closeOnPress = true,
      ...props
    },
    ref
  ) => {
    const {
      onOpenChange,
      value,
      onValueChange,
      setTriggerPosition,
      setContentLayout,
      closeDelay,
    } = useRootContext();

    const baseOnCloseDelay = 150; // This delay is needed to see change of indicator position first

    function onPress(ev: GestureResponderEvent) {
      onValueChange({ value: itemValue, label });

      if (closeOnPress) {
        setTimeout(
          () => {
            setTriggerPosition(null);
            setContentLayout(null);
          },
          baseOnCloseDelay + (closeDelay ?? 0)
        );
        setTimeout(() => {
          onOpenChange(false);
        }, baseOnCloseDelay);
      }

      onPressProp?.(ev);
    }

    const Component = asChild ? Slot.Pressable : Pressable;

    return (
      <ItemContext.Provider value={{ itemValue, label }}>
        <Component
          ref={ref}
          role="option"
          onPress={onPress}
          disabled={disabled}
          aria-checked={value?.value === itemValue}
          aria-valuetext={label}
          aria-disabled={!!disabled}
          accessibilityState={{
            disabled: !!disabled,
            checked: value?.value === itemValue,
          }}
          {...props}
        />
      </ItemContext.Provider>
    );
  }
);

// --------------------------------------------------

const ItemLabel = React.forwardRef<ItemLabelRef, ItemLabelProps>(
  ({ asChild, ...props }, ref) => {
    const { label } = useItemContext();

    const Component = asChild ? Slot.Text : Text;

    return (
      <Component ref={ref} {...props}>
        {label}
      </Component>
    );
  }
);

// --------------------------------------------------

const ItemIndicator = React.forwardRef<ItemIndicatorRef, ItemIndicatorProps>(
  ({ asChild, forceMount, ...props }, ref) => {
    const { itemValue } = useItemContext();
    const { value } = useRootContext();

    if (!forceMount) {
      if (value?.value !== itemValue) {
        return null;
      }
    }
    const Component = asChild ? Slot.View : View;

    return <Component ref={ref} role="presentation" {...props} />;
  }
);

// --------------------------------------------------

const Group = React.forwardRef<GroupRef, GroupProps>(
  ({ asChild, ...props }, ref) => {
    const Component = asChild ? Slot.View : View;

    return <Component ref={ref} role="group" {...props} />;
  }
);

// --------------------------------------------------

const GroupLabel = React.forwardRef<GroupLabelRef, GroupLabelProps>(
  ({ asChild, ...props }, ref) => {
    const Component = asChild ? Slot.Text : Text;

    return <Component ref={ref} {...props} />;
  }
);

// --------------------------------------------------

Root.displayName = 'HeroUINative.Primitive.Select.Root';
Trigger.displayName = 'HeroUINative.Primitive.Select.Trigger';
Value.displayName = 'HeroUINative.Primitive.Select.Value';
Overlay.displayName = 'HeroUINative.Primitive.Select.Overlay';
PopoverContent.displayName = 'HeroUINative.Primitive.Select.PopoverContent';
DialogContent.displayName = 'HeroUINative.Primitive.Select.DialogContent';
Close.displayName = 'HeroUINative.Primitive.Select.Close';
Item.displayName = 'HeroUINative.Primitive.Select.Item';
ItemLabel.displayName = 'HeroUINative.Primitive.Select.ItemLabel';
ItemIndicator.displayName = 'HeroUINative.Primitive.Select.ItemIndicator';
Group.displayName = 'HeroUINative.Primitive.Select.Group';
GroupLabel.displayName = 'HeroUINative.Primitive.Select.GroupLabel';

export {
  Close,
  DialogContent,
  Group,
  GroupLabel,
  Item,
  ItemIndicator,
  ItemLabel,
  Overlay,
  PopoverContent,
  Portal,
  Root,
  Trigger,
  useItemContext,
  useRootContext,
  Value,
};
