import React, {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
} from 'react';
import {
  BackHandler,
  Pressable,
  StyleSheet,
  Text,
  View,
  type GestureResponderEvent,
  type LayoutChangeEvent,
  type LayoutRectangle,
} from 'react-native';
import {
  useAugmentedRef,
  useControllableState,
  useRelativePosition,
  type LayoutPosition,
} from '../../helpers/internal/hooks';
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
  SelectionMode,
  SelectValue,
  TriggerIndicatorProps,
  TriggerIndicatorRef,
  TriggerProps,
  TriggerRef,
  ValueProps,
  ValueRef,
} from './select.types';
import { formatSelectedLabels, isItemSelected } from './select.utils';

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

function Root<M extends SelectionMode = 'single'>({
  asChild,
  ref,
  value: valueProp,
  defaultValue,
  onValueChange: onValueChangeProp,
  isOpen: isOpenProp,
  isDefaultOpen,
  onOpenChange: onOpenChangeProp,
  isDisabled,
  selectionMode = 'single' as M,
  presentation = 'popover',
  ...viewProps
}: RootProps<M> & { ref?: React.Ref<RootRef> }) {
  const nativeID = useId();

  // Widen to SelectValue internally so the context can serve both modes.
  const [value, onValueChange] = useControllableState<SelectValue>({
    prop: valueProp as SelectValue,
    defaultProp: defaultValue as SelectValue,
    onChange: onValueChangeProp as ((value: SelectValue) => void) | undefined,
  });

  const [isOpen = false, onOpenChange] = useControllableState({
    prop: isOpenProp,
    defaultProp: isDefaultOpen,
    onChange: onOpenChangeProp,
  });

  const [triggerPosition, setTriggerPosition] = useState<LayoutPosition | null>(
    null
  );
  const [contentLayout, setContentLayout] = useState<LayoutRectangle | null>(
    null
  );

  const Component = asChild ? Slot.View : View;
  return (
    <RootContext.Provider
      value={{
        value,
        onValueChange,
        isOpen,
        onOpenChange,
        isDefaultOpen,
        isDisabled,
        contentLayout,
        nativeID,
        selectionMode,
        setContentLayout,
        setTriggerPosition,
        triggerPosition,
        presentation,
      }}
    >
      <Component ref={ref} {...viewProps} />
    </RootContext.Provider>
  );
}

// --------------------------------------------------

const Trigger = forwardRef<TriggerRef, TriggerProps>(
  (
    {
      asChild,
      onPress: onPressProp,
      onLayout: onLayoutProp,
      isDisabled = false,
      ...props
    },
    ref
  ) => {
    const {
      onOpenChange,
      isOpen,
      isDisabled: isDisabledRoot,
      setTriggerPosition,
      setContentLayout,
      isDefaultOpen,
      triggerPosition,
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
          setTriggerPosition(null);
          setContentLayout(null);
        },
      },
      deps: [isOpen],
    });

    // Open popover on mount if isDefaultOpen is true or isOpen is true initially
    useEffect(() => {
      if ((isDefaultOpen || isOpen) && !triggerPosition) {
        // Use setTimeout to ensure the component is mounted and can be measured
        const timeoutId = setTimeout(() => {
          augmentedRef.current?.measure(
            (_x, _y, width, height, pageX, pageY) => {
              setTriggerPosition({ width, pageX, pageY: pageY, height });
              if (isDefaultOpen) {
                onOpenChange(true);
              }
            }
          );
        }, 0);
        return () => clearTimeout(timeoutId);
      }
      return undefined;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function onPress(ev: GestureResponderEvent) {
      if (isDisabledValue) return;
      augmentedRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
        setTriggerPosition({ width, pageX, pageY: pageY, height });
      });
      onOpenChange(!isOpen);
      onPressProp?.(ev);
    }

    function onLayout(event: LayoutChangeEvent) {
      augmentedRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
        setTriggerPosition({ width, pageX, pageY: pageY, height });
        if (isDefaultOpen) {
          onOpenChange(true);
        }
      });
      onLayoutProp?.(event);
    }

    const Component = asChild ? Slot.Pressable : Pressable;

    return (
      <Component
        ref={augmentedRef}
        aria-disabled={isDisabledValue}
        role="combobox"
        onPress={onPress}
        disabled={isDisabledValue}
        onLayout={onLayout}
        {...props}
      />
    );
  }
);

// --------------------------------------------------

const Value = React.forwardRef<ValueRef, ValueProps>(
  ({ asChild, placeholder, ...props }, ref) => {
    const { value, selectionMode } = useRootContext();

    /** Resolves the display text based on selection mode and current value */
    const displayText = useMemo(() => {
      if (selectionMode === 'multiple') {
        const values = Array.isArray(value) ? value : value ? [value] : [];
        const labels = values
          .map((v) => v?.label)
          .filter((label): label is string => typeof label === 'string');

        return formatSelectedLabels(labels) ?? placeholder;
      }

      // Single mode — preserve backward-compatible behavior
      if (Array.isArray(value)) {
        return value[0]?.label ?? placeholder;
      }

      return value?.label ?? placeholder;
    }, [value, selectionMode, placeholder]);

    const Component = asChild ? Slot.Text : Text;

    return (
      <Component ref={ref} {...props}>
        {displayText}
      </Component>
    );
  }
);

// --------------------------------------------------

const TriggerIndicator = forwardRef<TriggerIndicatorRef, TriggerIndicatorProps>(
  ({ asChild, ...props }, ref) => {
    const Component = asChild ? Slot.View : View;

    return (
      <Component ref={ref} role="presentation" aria-hidden={true} {...props} />
    );
  }
);

// --------------------------------------------------

/**
 * @warning when using a custom `<PortalHost />`, you might have to adjust the Content's offset to account for nav elements like headers.
 */
function Portal({ forceMount, hostName, children }: PortalProps) {
  const value = useRootContext();

  const isBottomSheet = value.presentation === 'bottom-sheet';
  const isDialog = value.presentation === 'dialog';

  // For popover presentation, triggerPosition is required
  // For bottom-sheet and dialog, triggerPosition is not required
  if (!value.triggerPosition && !isBottomSheet && !isDialog) {
    return null;
  }

  if (!forceMount && !isBottomSheet) {
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
    const { isOpen, onOpenChange, setTriggerPosition, setContentLayout } =
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
    } = useRootContext();

    useEffect(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          onOpenChange(false);
          setTriggerPosition(null);
          setContentLayout(null);
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
    const { isOpen, nativeID, onOpenChange } = useRootContext();

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
    const { onOpenChange, setContentLayout, setTriggerPosition } =
      useRootContext();

    function onPress(ev: GestureResponderEvent) {
      if (disabled) return;
      onOpenChange(false);
      setTriggerPosition(null);
      setContentLayout(null);
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
      closeOnPress: closeOnPressProp,
      ...props
    },
    ref
  ) => {
    const {
      onOpenChange,
      value,
      onValueChange,
      selectionMode,
      setTriggerPosition,
      setContentLayout,
    } = useRootContext();

    /** Default closeOnPress to `true` for single mode, `false` for multiple mode */
    const closeOnPress = closeOnPressProp ?? selectionMode === 'single';
    const checked = isItemSelected(value, itemValue);

    function onPress(ev: GestureResponderEvent) {
      if (selectionMode === 'multiple') {
        // Toggle item in the selected values array
        const currentValues = Array.isArray(value)
          ? value
          : value
            ? [value]
            : [];

        const nextValues = checked
          ? currentValues.filter((v) => v?.value !== itemValue)
          : [...currentValues, { value: itemValue, label }];

        onValueChange(nextValues);
      } else {
        onValueChange({ value: itemValue, label });
      }

      if (closeOnPress) {
        onOpenChange(false);
        setTriggerPosition(null);
        setContentLayout(null);
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
          aria-checked={checked}
          aria-valuetext={label}
          aria-disabled={!!disabled}
          accessibilityState={{
            disabled: !!disabled,
            checked,
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
      if (!isItemSelected(value, itemValue)) {
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
TriggerIndicator.displayName = 'HeroUINative.Primitive.Select.TriggerIndicator';
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
  TriggerIndicator,
  useItemContext,
  useRootContext,
  Value,
};
