import { Children, forwardRef, useMemo } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { useThemeColor } from '../../helpers/external/hooks';
import { HeroText } from '../../helpers/internal/components';
import { CloseIcon } from '../../helpers/internal/components/close-icon';
import {
  AnimationSettingsProvider,
  FormFieldProvider,
} from '../../helpers/internal/contexts';
import type {
  PressableRef,
  TextRef,
  ViewRef,
} from '../../helpers/internal/types';
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
  TagGroupItemLabelProps,
  TagGroupItemProps,
  TagGroupItemRemoveButtonProps,
  TagGroupListProps,
  TagGroupProps,
  TagRenderProps,
} from './tag-group.types';

/**
 * Internal context for size and variant. Not exported — consumers use useTagGroup or useTagGroupItem.
 */
const [TagGroupProvider, useInnerTagGroupContext] =
  createContext<TagGroupContextValue>({
    name: 'TagGroupContext',
  });

/** Re-exports primitive useRootContext */
const useTagGroup = usePrimitiveRootContext;

/** Re-exports primitive useItemContext */
const useTagGroupItem = usePrimitiveItemContext;

// --------------------------------------------------

const TagGroupRoot = forwardRef<ViewRef, TagGroupProps>((props, ref) => {
  const {
    children,
    size = 'md',
    variant = 'default',
    className,
    style,
    animation,
    isDisabled = false,
    isInvalid = false,
    isRequired = false,
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

  const formFieldContextValue = useMemo(
    () => ({
      isDisabled: isDisabled ?? false,
      isInvalid: isInvalid ?? false,
      isRequired: isRequired ?? false,
      hasFieldPadding: false,
    }),
    [isDisabled, isInvalid, isRequired]
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
      <FormFieldProvider value={formFieldContextValue}>
        <TagGroupProvider value={contextValue}>
          <TagGroupPrimitives.Root
            ref={ref}
            className={rootClassName}
            style={style}
            isDisabled={isDisabled}
            {...restProps}
          >
            {children}
          </TagGroupPrimitives.Root>
        </TagGroupProvider>
      </FormFieldProvider>
    </AnimationSettingsProvider>
  );
});

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

const TagGroupItem = forwardRef<PressableRef, TagGroupItemProps>(
  (props, ref) => {
    const {
      children,
      className,
      style,
      id,
      isDisabled: isDisabledProp,
      ...restProps
    } = props;

    const { variant, size } = useInnerTagGroupContext();

    const {
      selectedKeys,
      disabledKeys,
      isDisabled: isRootDisabled,
    } = usePrimitiveRootContext();

    const isSelected = selectedKeys.has(id);
    const isDisabled =
      isRootDisabled || disabledKeys.has(id) || (isDisabledProp ?? false);

    const tagClassName = tagGroupClassNames.tag({
      variant,
      size,
      isSelected,
      isDisabled,
      className,
    });

    if (typeof children === 'function') {
      const renderProps: TagRenderProps = {
        isSelected,
        isDisabled,
      };

      return (
        <TagGroupPrimitives.Item
          ref={ref}
          id={id}
          isDisabled={isDisabledProp}
          className={tagClassName}
          style={[tagGroupStyleSheet.tag, style] as StyleProp<ViewStyle>}
          {...restProps}
        >
          {children(renderProps)}
        </TagGroupPrimitives.Item>
      );
    }

    const stringifiedChildren = childrenToString(children);

    return (
      <TagGroupPrimitives.Item
        ref={ref}
        id={id}
        isDisabled={isDisabledProp}
        className={tagClassName}
        style={[tagGroupStyleSheet.tag, style] as StyleProp<ViewStyle>}
        {...restProps}
      >
        {stringifiedChildren ? (
          <TagGroupItemLabel>{stringifiedChildren}</TagGroupItemLabel>
        ) : (
          children
        )}
      </TagGroupPrimitives.Item>
    );
  }
);

// --------------------------------------------------

const TagGroupItemLabel = forwardRef<TextRef, TagGroupItemLabelProps>(
  (props, ref) => {
    const { children, className, ...restProps } = props;

    const { isSelected } = usePrimitiveItemContext();
    const { size } = useInnerTagGroupContext();

    const tagLabelClassName = tagGroupClassNames.tagLabel({
      size,
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
  }
);

// --------------------------------------------------
const TagGroupItemRemoveButton = forwardRef<
  PressableRef,
  TagGroupItemRemoveButtonProps
>((props, ref) => {
  const { children, className, iconProps, hitSlop = 8, ...restProps } = props;

  const { isSelected } = usePrimitiveItemContext();

  const [themeColorFieldForeground, themeColorAccentForeground] = useThemeColor(
    ['field-foreground', 'accent-soft-foreground']
  );

  const removeButtonClassName = tagGroupClassNames.removeButton({
    className,
  });

  const defaultIconColor = isSelected
    ? themeColorAccentForeground
    : themeColorFieldForeground;

  const defaultIcon = (
    <CloseIcon
      size={iconProps?.size ?? 12}
      color={iconProps?.color ?? defaultIconColor}
    />
  );

  return (
    <TagGroupPrimitives.RemoveButton
      ref={ref}
      className={removeButtonClassName}
      hitSlop={hitSlop}
      {...restProps}
    >
      {children ?? defaultIcon}
    </TagGroupPrimitives.RemoveButton>
  );
});

// --------------------------------------------------

TagGroupRoot.displayName = DISPLAY_NAME.TAG_GROUP_ROOT;
TagGroupList.displayName = DISPLAY_NAME.TAG_GROUP_LIST;
TagGroupItem.displayName = DISPLAY_NAME.TAG_GROUP_ITEM;
TagGroupItemLabel.displayName = DISPLAY_NAME.TAG_GROUP_ITEM_LABEL;
TagGroupItemRemoveButton.displayName =
  DISPLAY_NAME.TAG_GROUP_ITEM_REMOVE_BUTTON;

// --------------------------------------------------

/**
 * Compound TagGroup component with sub-components
 *
 * @component TagGroup - Main container that manages tag selection state,
 * disabled keys, and remove functionality. Provides size and variant
 * context to all child components.
 *
 * @component TagGroup.List - Container for rendering the list of tags
 * with optional empty state rendering.
 *
 * @component TagGroup.Item - Individual tag within the group. Supports string
 * children (auto-wrapped in TagGroup.ItemLabel), render function children,
 * or custom layouts.
 *
 * @component TagGroup.ItemLabel - Text label for the tag. Automatically
 * rendered when string children are provided, or can be used explicitly.
 *
 * @component TagGroup.ItemRemoveButton - Remove button for the tag. Must be
 * placed explicitly by the consumer when removal is needed.
 *
 * Props flow from TagGroup to sub-components via context (size, variant).
 *
 * @see Full documentation: https://heroui.com/docs/native/components/tag-group
 */
const TagGroup = Object.assign(TagGroupRoot, {
  /** Container for the list of tags */
  List: TagGroupList,
  /** Individual tag item within the group */
  Item: TagGroupItem,
  /** Text label for the tag item */
  ItemLabel: TagGroupItemLabel,
  /** Remove button for the tag item */
  ItemRemoveButton: TagGroupItemRemoveButton,
});

export { TagGroup, useTagGroup, useTagGroupItem };
export default TagGroup;
