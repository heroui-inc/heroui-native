import { Children, forwardRef, useMemo } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { HeroText } from '../../helpers/internal/components';
import { CloseIcon } from '../../helpers/internal/components/close-icon';
import { AnimationSettingsProvider } from '../../helpers/internal/contexts';
import type { PressableRef, ViewRef } from '../../helpers/internal/types';
import { childrenToString, createContext } from '../../helpers/internal/utils';
import * as TagGroupPrimitives from '../../primitives/tag-group';
import {
  useItemContext as usePrimitiveItemContext,
  useRootContext as usePrimitiveRootContext,
} from '../../primitives/tag-group';
import { useTagGroupRootAnimation } from './tag-group.animation';
import { DISPLAY_NAME } from './tag-group.constants';
import { tagGroupClassNames, tagGroupStyleSheet } from './tag-group.styles';
import type {
  TagGroupContextValue,
  TagGroupListProps,
  TagGroupProps,
  TagLabelProps,
  TagProps,
  TagRemoveButtonProps,
  TagRenderProps,
} from './tag-group.types';

/**
 * Internal context for sharing size and variant between TagGroup and child components.
 * Not exported — consumers should use useTagGroup (primitive root) or useTagGroupItem (primitive item).
 */
const [TagGroupProvider, useInnerTagGroupContext] =
  createContext<TagGroupContextValue>({
    name: 'TagGroupContext',
  });

/**
 * Hook to access TagGroup root context (selection state, disabled keys, remove handler).
 * Re-exported from the primitive layer.
 */
const useTagGroup = usePrimitiveRootContext;

/**
 * Hook to access Tag item context (id, isSelected, isDisabled, allowsRemoving).
 * Re-exported from the primitive layer.
 */
const useTagGroupItem = usePrimitiveItemContext;

// --------------------------------------------------
// TagGroup (Root)
// --------------------------------------------------

const TagGroupRoot = forwardRef<ViewRef, TagGroupProps>((props, ref) => {
  const {
    children,
    size = 'md',
    variant = 'default',
    className,
    style,
    animation,
    ...restProps
  } = props;

  const rootClassName = tagGroupClassNames.root({
    className,
  });

  const { isAllAnimationsDisabled } = useTagGroupRootAnimation({
    animation,
  });

  const animationSettingsContextValue = useMemo(
    () => ({
      isAllAnimationsDisabled,
    }),
    [isAllAnimationsDisabled]
  );

  const contextValue = useMemo(
    () => ({
      size,
      variant,
    }),
    [size, variant]
  );

  return (
    <AnimationSettingsProvider value={animationSettingsContextValue}>
      <TagGroupProvider value={contextValue}>
        <TagGroupPrimitives.Root
          ref={ref}
          className={rootClassName}
          style={style}
          {...restProps}
        >
          {children}
        </TagGroupPrimitives.Root>
      </TagGroupProvider>
    </AnimationSettingsProvider>
  );
});

// --------------------------------------------------
// TagGroupList
// --------------------------------------------------

const TagGroupList = forwardRef<ViewRef, TagGroupListProps>((props, ref) => {
  const { children, className, style, renderEmptyState, ...restProps } = props;

  const listClassName = tagGroupClassNames.list({
    className,
  });

  const hasChildren = Children.count(children) > 0;

  return (
    <TagGroupPrimitives.List
      ref={ref}
      className={listClassName}
      style={style}
      {...restProps}
    >
      {hasChildren ? children : renderEmptyState?.()}
    </TagGroupPrimitives.List>
  );
});

// --------------------------------------------------
// TagItem
// --------------------------------------------------

const TagItem = forwardRef<PressableRef, TagProps>((props, ref) => {
  const { children, className, style, ...restProps } = props;

  const { variant } = useInnerTagGroupContext();

  return (
    <TagGroupPrimitives.Item
      ref={ref}
      style={[tagGroupStyleSheet.tag, style] as StyleProp<ViewStyle>}
      {...restProps}
    >
      <TagItemContent variant={variant} className={className}>
        {children}
      </TagItemContent>
    </TagGroupPrimitives.Item>
  );
});

/**
 * Renders tag content inside the Item primitive so it can access ItemContext
 * for isSelected styling and render props.
 */
function TagItemContent({
  children,
  variant,
  className,
}: {
  children: TagProps['children'];
  variant: TagGroupContextValue['variant'];
  className?: string;
}) {
  const { isSelected, isDisabled, allowsRemoving } = usePrimitiveItemContext();

  const tagClassName = tagGroupClassNames.tag({
    variant,
    isSelected,
    isDisabled,
    className,
  });

  if (typeof children === 'function') {
    const renderProps: TagRenderProps = {
      isSelected,
      isDisabled,
      allowsRemoving,
    };

    return <View className={tagClassName}>{children(renderProps)}</View>;
  }

  const stringifiedChildren = childrenToString(children);

  return (
    <View className={tagClassName}>
      {stringifiedChildren ? (
        <TagLabel>{stringifiedChildren}</TagLabel>
      ) : (
        children
      )}
    </View>
  );
}

// --------------------------------------------------
// TagLabel
// --------------------------------------------------

const TagLabel = forwardRef<View, TagLabelProps>((props, ref) => {
  const { children, className, ...restProps } = props;

  const { isSelected } = usePrimitiveItemContext();

  const tagLabelClassName = tagGroupClassNames.tagLabel({
    isSelected,
    className,
  });

  return (
    <TagGroupPrimitives.ItemLabel asChild>
      <HeroText ref={ref} className={tagLabelClassName} {...restProps}>
        {children}
      </HeroText>
    </TagGroupPrimitives.ItemLabel>
  );
});

// --------------------------------------------------
// TagRemoveButton
// --------------------------------------------------

const TagRemoveButton = forwardRef<PressableRef, TagRemoveButtonProps>(
  (props, ref) => {
    const { children, className, ...restProps } = props;

    return (
      <TagGroupPrimitives.RemoveButton
        ref={ref}
        className={className}
        {...restProps}
      >
        {children ?? <CloseIcon size={12} />}
      </TagGroupPrimitives.RemoveButton>
    );
  }
);

// --------------------------------------------------
// Display Names
// --------------------------------------------------

TagGroupRoot.displayName = DISPLAY_NAME.TAG_GROUP_ROOT;
TagGroupList.displayName = DISPLAY_NAME.TAG_GROUP_LIST;
TagItem.displayName = DISPLAY_NAME.TAG_ROOT;
TagLabel.displayName = DISPLAY_NAME.TAG_LABEL;
TagRemoveButton.displayName = DISPLAY_NAME.TAG_REMOVE_BUTTON;

// --------------------------------------------------
// Compound Exports
// --------------------------------------------------

/**
 * Compound TagGroup component with sub-components
 *
 * @component TagGroup - Main container that manages tag selection state,
 * disabled keys, and remove functionality. Provides size and variant
 * context to all child Tag components.
 *
 * @component TagGroup.List - Container for rendering the list of tags
 * with optional empty state rendering.
 *
 * Props flow from TagGroup to sub-components via context (size, variant).
 *
 * @see Full documentation: https://v3.heroui.com/docs/native/components/tag-group
 */
const TagGroup = Object.assign(TagGroupRoot, {
  /** Container for the list of tags */
  List: TagGroupList,
});

/**
 * Compound Tag component with sub-components
 *
 * @component Tag - Individual tag within a TagGroup. Supports string children
 * (auto-wrapped in Tag.Label), render function children, or custom layouts.
 *
 * @component Tag.Label - Text label for the tag. Automatically rendered when
 * string children are provided, or can be used explicitly in custom layouts.
 *
 * @component Tag.RemoveButton - Remove button for the tag. Must be placed
 * explicitly by the consumer when removal is needed.
 *
 * Props flow from TagGroup to Tag via context (size, variant).
 *
 * @see Full documentation: https://v3.heroui.com/docs/native/components/tag-group
 */
const Tag = Object.assign(TagItem, {
  /** Text label for the tag */
  Label: TagLabel,
  /** Remove button for the tag */
  RemoveButton: TagRemoveButton,
});

export { Tag, TagGroup, useTagGroup, useTagGroupItem };
export default TagGroup;
