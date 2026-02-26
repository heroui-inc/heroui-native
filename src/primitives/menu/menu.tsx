import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
} from 'react';
import {
  BackHandler,
  Pressable,
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
  ContentProps,
  ContentRef,
  GroupContextValue,
  GroupProps,
  GroupRef,
  IItemContext,
  IRootContext,
  ItemDescriptionProps,
  ItemDescriptionRef,
  ItemIndicatorProps,
  ItemIndicatorRef,
  ItemProps,
  ItemRef,
  ItemTitleProps,
  ItemTitleRef,
  LabelProps,
  LabelRef,
  MenuKey,
  OverlayProps,
  OverlayRef,
  PortalProps,
  RootProps,
  RootRef,
  TriggerProps,
  TriggerRef,
} from './menu.types';

const RootContext = React.createContext<IRootContext | null>(null);

const useRootContext = () => {
  const context = useContext(RootContext);
  if (!context) {
    throw new Error(
      'Menu compound components cannot be rendered outside the Menu component'
    );
  }
  return context;
};

const Root = forwardRef<RootRef, RootProps>(
  (
    {
      asChild,
      isOpen: isOpenProp,
      isDefaultOpen,
      onOpenChange: onOpenChangeProp,
      isDisabled,
      presentation = 'popover',
      ...viewProps
    },
    ref
  ) => {
    const [isOpen = false, onOpenChange] = useControllableState({
      prop: isOpenProp,
      defaultProp: isDefaultOpen,
      onChange: onOpenChangeProp,
    });
    const [triggerPosition, setTriggerPosition] =
      useState<LayoutPosition | null>(null);
    const [contentLayout, setContentLayout] = useState<LayoutRectangle | null>(
      null
    );

    const nativeID = useId();

    const Component = asChild ? Slot.View : View;
    return (
      <RootContext.Provider
        value={{
          isOpen,
          onOpenChange,
          isDisabled,
          contentLayout,
          nativeID,
          setContentLayout,
          setTriggerPosition,
          triggerPosition,
          isDefaultOpen,
          presentation,
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
      setContentLayout,
      isDefaultOpen,
      triggerPosition,
    } = useRootContext();

    const isDisabledValue = isDisabled ?? isDisabledRoot ?? undefined;

    const augmentedRef = useAugmentedRef({
      ref,
      methods: {
        open: () => {
          augmentedRef.current?.measure(
            (_x, _y, width, height, pageX, pageY) => {
              setTriggerPosition({ width, pageX, pageY: pageY, height });
            }
          );
          onOpenChange(true);
        },
        close: () => {
          onOpenChange(false);
          setTriggerPosition(null);
          setContentLayout(null);
        },
      },
      deps: [isOpen],
    });

    // Open menu on mount if isDefaultOpen is true
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
      augmentedRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
        setTriggerPosition({ width, pageX, pageY, height });
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

  const isBottomSheet = value.presentation === 'bottom-sheet';

  if (!value.triggerPosition && !isBottomSheet) {
    return null;
  }

  if (!forceMount && !isBottomSheet) {
    if (!value.isOpen) {
      return null;
    }
  }

  return (
    <PrimitivePortal hostName={hostName} name={`${value.nativeID}_menu_portal`}>
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
        onOpenChange(false);
        setTriggerPosition(null);
        setContentLayout(null);
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
        role="menu"
        nativeID={nativeID}
        aria-modal={true}
        style={[positionStyle, widthStyle, style]}
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
// Group Context
// --------------------------------------------------

const GroupContext = createContext<GroupContextValue | null>(null);

/**
 * Hook to access Menu Group context.
 * Provides selection state, disabled state, and selection mode.
 *
 * @throws Error if used outside a Menu Group component
 */
function useGroupContext() {
  const context = useContext(GroupContext);

  if (!context) {
    throw new Error(
      'Menu.Group compound components cannot be rendered outside Menu.Group'
    );
  }

  return context;
}

/**
 * Reads the Group context without throwing if absent.
 * Returns `null` when Item is used outside a Group (standalone mode).
 */
function useOptionalGroupContext() {
  return useContext(GroupContext);
}

// --------------------------------------------------
// Item Context
// --------------------------------------------------

const ItemContext = createContext<IItemContext | null>(null);

/**
 * Hook to access Menu Item context.
 * Provides the item's id, selected state, and disabled state.
 *
 * @throws Error if used outside a Menu Item component
 */
function useItemContext() {
  const context = useContext(ItemContext);

  if (!context) {
    throw new Error(
      'Menu.Item compound components cannot be rendered outside Menu.Item'
    );
  }

  return context;
}

// --------------------------------------------------
// Group
// --------------------------------------------------

const Group = forwardRef<GroupRef, GroupProps>(
  (
    {
      asChild,
      selectionMode = 'none',
      selectedKeys: selectedKeysProp,
      defaultSelectedKeys,
      onSelectionChange: onSelectionChangeProp,
      disabledKeys: disabledKeysProp,
      isDisabled = false,
      shouldCloseOnSelect,
      ...viewProps
    },
    ref
  ) => {
    const isControlled = selectedKeysProp !== undefined;

    const [internalSelectedKeys, setInternalSelectedKeys] = useState<
      Set<MenuKey>
    >(() => new Set(defaultSelectedKeys ?? []));

    const selectedKeys = useMemo(
      () =>
        isControlled ? new Set(selectedKeysProp ?? []) : internalSelectedKeys,
      [isControlled, selectedKeysProp, internalSelectedKeys]
    );

    const disabledKeys = useMemo(
      () => new Set(disabledKeysProp ?? []),
      [disabledKeysProp]
    );

    const onSelectionChange = useCallback(
      (keys: Set<MenuKey>) => {
        if (!isControlled) {
          setInternalSelectedKeys(keys);
        }
        onSelectionChangeProp?.(keys);
      },
      [isControlled, onSelectionChangeProp]
    );

    const contextValue = useMemo<GroupContextValue>(
      () => ({
        selectionMode,
        selectedKeys,
        onSelectionChange,
        disabledKeys,
        isDisabled,
        shouldCloseOnSelect,
      }),
      [
        selectionMode,
        selectedKeys,
        onSelectionChange,
        disabledKeys,
        isDisabled,
        shouldCloseOnSelect,
      ]
    );

    const Component = asChild ? Slot.View : View;

    return (
      <GroupContext.Provider value={contextValue}>
        <Component ref={ref} role="group" {...viewProps} />
      </GroupContext.Provider>
    );
  }
);

// --------------------------------------------------
// Item
// --------------------------------------------------

const Item = forwardRef<ItemRef, ItemProps>(
  (
    {
      asChild,
      id: itemId,
      isDisabled: isDisabledProp = false,
      shouldCloseOnSelect: shouldCloseOnSelectProp,
      isSelected: isSelectedProp,
      onSelectedChange,
      onPress: onPressProp,
      variant = 'default',
      ...props
    },
    ref
  ) => {
    const { onOpenChange, setTriggerPosition, setContentLayout } =
      useRootContext();

    const groupContext = useOptionalGroupContext();
    const isInsideGroup = groupContext !== null;

    if (isInsideGroup && itemId === undefined) {
      throw new Error(
        'Menu.Item requires an `id` prop when used inside Menu.Group'
      );
    }

    // -- Resolve disabled state --
    const effectiveDisabled = isInsideGroup
      ? groupContext.isDisabled ||
        isDisabledProp ||
        (itemId !== undefined && groupContext.disabledKeys.has(itemId))
      : isDisabledProp;

    // -- Resolve selected state --
    const isSelected = isInsideGroup
      ? itemId !== undefined && groupContext.selectedKeys.has(itemId)
      : (isSelectedProp ?? false);

    // -- Resolve shouldCloseOnSelect --
    // Priority: item prop > group prop > selectionMode default
    const defaultCloseOnSelect = isInsideGroup
      ? groupContext.selectionMode !== 'multiple'
      : true;

    const effectiveCloseOnSelect = isInsideGroup
      ? (shouldCloseOnSelectProp ??
        groupContext.shouldCloseOnSelect ??
        defaultCloseOnSelect)
      : (shouldCloseOnSelectProp ?? true);

    // -- Resolve ARIA role --
    // RN's Role type only supports "menuitem"; selection semantics are
    // conveyed via aria-checked and accessibilityState.checked instead.
    const role = 'menuitem' as const;

    const closeMenu = useCallback(() => {
      onOpenChange(false);
      setTriggerPosition(null);
      setContentLayout(null);
    }, [onOpenChange, setTriggerPosition, setContentLayout]);

    const onPress = useCallback(
      (ev: GestureResponderEvent) => {
        if (effectiveDisabled) return;

        if (isInsideGroup && itemId !== undefined) {
          const { selectionMode, selectedKeys, onSelectionChange } =
            groupContext;

          if (selectionMode === 'single') {
            const newKeys = isSelected
              ? new Set<MenuKey>()
              : new Set<MenuKey>([itemId]);
            onSelectionChange(newKeys);
          } else if (selectionMode === 'multiple') {
            const newKeys = new Set(selectedKeys);
            if (isSelected) {
              newKeys.delete(itemId);
            } else {
              newKeys.add(itemId);
            }
            onSelectionChange(newKeys);
          }
        } else {
          // Standalone: toggle via callback if provided
          onSelectedChange?.(!isSelected);
        }

        onPressProp?.(ev);

        if (effectiveCloseOnSelect) {
          closeMenu();
        }
      },
      [
        effectiveDisabled,
        isInsideGroup,
        itemId,
        groupContext,
        isSelected,
        onSelectedChange,
        onPressProp,
        effectiveCloseOnSelect,
        closeMenu,
      ]
    );

    const itemContextValue = useMemo<IItemContext>(
      () => ({
        id: itemId,
        isSelected,
        isDisabled: effectiveDisabled,
        variant,
      }),
      [itemId, isSelected, effectiveDisabled, variant]
    );

    const isCheckable = isInsideGroup
      ? groupContext.selectionMode !== 'none'
      : isSelectedProp !== undefined || onSelectedChange !== undefined;

    const Component = asChild ? Slot.Pressable : Pressable;

    return (
      <ItemContext.Provider value={itemContextValue}>
        <Component
          ref={ref}
          role={role}
          aria-checked={isCheckable ? isSelected : undefined}
          aria-disabled={effectiveDisabled}
          disabled={effectiveDisabled}
          accessibilityState={{
            disabled: effectiveDisabled,
            ...(isCheckable ? { checked: isSelected } : {}),
          }}
          onPress={onPress}
          {...props}
        />
      </ItemContext.Provider>
    );
  }
);

// --------------------------------------------------
// ItemTitle
// --------------------------------------------------

const ItemTitle = forwardRef<ItemTitleRef, ItemTitleProps>(
  ({ asChild, ...props }, ref) => {
    useItemContext();

    const Component = asChild ? Slot.Text : Text;

    return <Component ref={ref} {...props} />;
  }
);

// --------------------------------------------------
// ItemDescription
// --------------------------------------------------

const ItemDescription = forwardRef<ItemDescriptionRef, ItemDescriptionProps>(
  ({ asChild, ...props }, ref) => {
    useItemContext();

    const Component = asChild ? Slot.Text : Text;

    return <Component ref={ref} {...props} />;
  }
);

// --------------------------------------------------
// ItemIndicator
// --------------------------------------------------

const ItemIndicator = forwardRef<ItemIndicatorRef, ItemIndicatorProps>(
  ({ asChild, forceMount, ...props }, ref) => {
    const { isSelected } = useItemContext();

    if (!forceMount && !isSelected) {
      return null;
    }

    const Component = asChild ? Slot.View : View;

    return (
      <Component
        ref={ref}
        role="presentation"
        aria-hidden={!isSelected}
        {...props}
      />
    );
  }
);

// --------------------------------------------------
// Label
// --------------------------------------------------

const Label = forwardRef<LabelRef, LabelProps>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.Text : Text;

  return <Component ref={ref} accessibilityRole="header" {...props} />;
});

// --------------------------------------------------

Root.displayName = 'HeroUINative.Menu.Root';
Trigger.displayName = 'HeroUINative.Menu.Trigger';
Overlay.displayName = 'HeroUINative.Menu.Overlay';
Content.displayName = 'HeroUINative.Menu.Content';
Close.displayName = 'HeroUINative.Menu.Close';
Group.displayName = 'HeroUINative.Menu.Group';
Item.displayName = 'HeroUINative.Menu.Item';
ItemTitle.displayName = 'HeroUINative.Menu.ItemTitle';
ItemDescription.displayName = 'HeroUINative.Menu.ItemDescription';
ItemIndicator.displayName = 'HeroUINative.Menu.ItemIndicator';
Label.displayName = 'HeroUINative.Menu.Label';

export {
  Close,
  Content,
  Group,
  Item,
  ItemDescription,
  ItemIndicator,
  ItemTitle,
  Label,
  Overlay,
  Portal,
  Root,
  Trigger,
  useGroupContext,
  useItemContext,
  useRootContext,
};
