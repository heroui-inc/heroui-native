import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import {
  Pressable,
  Text,
  View,
  type GestureResponderEvent,
} from 'react-native';
import * as Slot from '../slot';
import type {
  ItemLabelProps,
  ItemLabelRef,
  ItemProps,
  ItemRef,
  ListProps,
  ListRef,
  RemoveButtonProps,
  RemoveButtonRef,
  RootContextValue,
  RootProps,
  RootRef,
  TagKey,
} from './tag-group.types';

// --------------------------------------------------
// Root Context
// --------------------------------------------------

const RootContext = createContext<RootContextValue | null>(null);

/**
 * Hook to access TagGroup root context.
 * Provides selection state, disabled state, and remove handler.
 *
 * @throws Error if used outside a TagGroup Root component
 */
export function useRootContext() {
  const context = useContext(RootContext);

  if (!context) {
    throw new Error(
      'TagGroup compound components cannot be rendered outside the TagGroup component'
    );
  }

  return context;
}

// --------------------------------------------------
// Item Context
// --------------------------------------------------

interface IItemContext {
  id: TagKey;
  isSelected: boolean;
  isDisabled: boolean;
  allowsRemoving: boolean;
}

const ItemContext = createContext<IItemContext | null>(null);

/**
 * Hook to access TagGroup Item context.
 * Provides the item's id, selected state, disabled state, and remove capability.
 *
 * @throws Error if used outside a TagGroup Item component
 */
export function useItemContext() {
  const context = useContext(ItemContext);

  if (!context) {
    throw new Error(
      'TagGroup.Item compound components cannot be rendered outside TagGroup.Item'
    );
  }

  return context;
}

// --------------------------------------------------
// Root
// --------------------------------------------------

const Root = forwardRef<RootRef, RootProps>(
  (
    {
      asChild,
      selectionMode = 'none',
      selectedKeys: selectedKeysProp,
      defaultSelectedKeys,
      onSelectionChange: onSelectionChangeProp,
      disabledKeys: disabledKeysProp,
      isDisabled = false,
      isInvalid = false,
      isRequired = false,
      onRemove,
      ...viewProps
    },
    ref
  ) => {
    const isControlled = selectedKeysProp !== undefined;

    const [internalSelectedKeys, setInternalSelectedKeys] = useState<
      Set<TagKey>
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
      (keys: Set<TagKey>) => {
        if (!isControlled) {
          setInternalSelectedKeys(keys);
        }
        onSelectionChangeProp?.(keys);
      },
      [isControlled, onSelectionChangeProp]
    );

    const contextValue = useMemo<RootContextValue>(
      () => ({
        selectionMode,
        selectedKeys,
        onSelectionChange,
        disabledKeys,
        isDisabled,
        isInvalid,
        isRequired,
        onRemove,
      }),
      [
        selectionMode,
        selectedKeys,
        onSelectionChange,
        disabledKeys,
        isDisabled,
        isInvalid,
        isRequired,
        onRemove,
      ]
    );

    const Component = asChild ? Slot.View : View;

    return (
      <RootContext.Provider value={contextValue}>
        <Component ref={ref} {...viewProps} />
      </RootContext.Provider>
    );
  }
);

Root.displayName = 'HeroUINative.Primitive.TagGroup.Root';

// --------------------------------------------------
// List
// --------------------------------------------------

const List = forwardRef<ListRef, ListProps>(({ asChild, ...props }, ref) => {
  const Component = asChild ? Slot.View : View;

  return <Component ref={ref} role="list" {...props} />;
});

List.displayName = 'HeroUINative.Primitive.TagGroup.List';

// --------------------------------------------------
// Item
// --------------------------------------------------

const Item = forwardRef<ItemRef, ItemProps>(
  (
    {
      asChild,
      id: itemId,
      isDisabled: isDisabledProp = false,
      onPress: onPressProp,
      ...props
    },
    ref
  ) => {
    const {
      selectionMode,
      selectedKeys,
      onSelectionChange,
      disabledKeys,
      isDisabled: isGroupDisabled,
      onRemove,
    } = useRootContext();

    const effectiveDisabled =
      isGroupDisabled || isDisabledProp || disabledKeys.has(itemId);
    const isSelected = selectedKeys.has(itemId);
    const allowsRemoving = onRemove !== undefined;

    const onPress = useCallback(
      (ev: GestureResponderEvent) => {
        if (effectiveDisabled) return;

        if (selectionMode === 'single') {
          const newKeys = isSelected
            ? new Set<TagKey>()
            : new Set<TagKey>([itemId]);
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

        onPressProp?.(ev);
      },
      [
        effectiveDisabled,
        selectionMode,
        isSelected,
        itemId,
        selectedKeys,
        onSelectionChange,
        onPressProp,
      ]
    );

    const itemContextValue = useMemo<IItemContext>(
      () => ({
        id: itemId,
        isSelected,
        isDisabled: effectiveDisabled,
        allowsRemoving,
      }),
      [itemId, isSelected, effectiveDisabled, allowsRemoving]
    );

    const Component = asChild ? Slot.Pressable : Pressable;

    return (
      <ItemContext.Provider value={itemContextValue}>
        <Component
          ref={ref}
          role="listitem"
          aria-selected={isSelected}
          disabled={effectiveDisabled}
          accessibilityState={{
            selected: isSelected,
            disabled: effectiveDisabled,
          }}
          onPress={onPress}
          {...props}
        />
      </ItemContext.Provider>
    );
  }
);

Item.displayName = 'HeroUINative.Primitive.TagGroup.Item';

// --------------------------------------------------
// ItemLabel
// --------------------------------------------------

const ItemLabel = forwardRef<ItemLabelRef, ItemLabelProps>(
  ({ asChild, ...props }, ref) => {
    const Component = asChild ? Slot.Text : Text;

    return <Component ref={ref} {...props} />;
  }
);

ItemLabel.displayName = 'HeroUINative.Primitive.TagGroup.ItemLabel';

// --------------------------------------------------
// RemoveButton
// --------------------------------------------------

const RemoveButton = forwardRef<RemoveButtonRef, RemoveButtonProps>(
  ({ asChild, onPress: onPressProp, ...props }, ref) => {
    const { onRemove } = useRootContext();
    const { id, isDisabled } = useItemContext();

    const onPress = useCallback(
      (ev: GestureResponderEvent) => {
        if (isDisabled) return;
        onRemove?.(new Set([id]));
        onPressProp?.(ev);
      },
      [isDisabled, onRemove, id, onPressProp]
    );

    const Component = asChild ? Slot.Pressable : Pressable;

    return (
      <Component
        ref={ref}
        role="button"
        aria-label="Remove"
        disabled={isDisabled}
        onPress={onPress}
        {...props}
      />
    );
  }
);

RemoveButton.displayName = 'HeroUINative.Primitive.TagGroup.RemoveButton';

export { Item, ItemLabel, List, RemoveButton, Root };
