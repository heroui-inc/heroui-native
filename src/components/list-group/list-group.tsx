import React, { forwardRef } from 'react';
import { Pressable, View } from 'react-native';
import { useThemeColor } from '../../helpers/external/hooks';
import { ChevronRightIcon, HeroText } from '../../helpers/internal/components';
import type { PressableRef, ViewRef } from '../../helpers/internal/types';
import Surface from '../surface/surface';
import { DEFAULT_ICON_SIZE, DISPLAY_NAME } from './list-group.constants';
import listGroupClassNames, { styleSheet } from './list-group.styles';
import type {
  ListGroupIconProps,
  ListGroupItemContentProps,
  ListGroupItemDescriptionProps,
  ListGroupItemPrefixProps,
  ListGroupItemProps,
  ListGroupItemSuffixProps,
  ListGroupItemTitleProps,
  ListGroupRootProps,
} from './list-group.types';

// --------------------------------------------------

const ListGroupRoot = forwardRef<ViewRef, ListGroupRootProps>((props, ref) => {
  const {
    children,
    variant = 'default',
    className,
    style,
    ...restProps
  } = props;

  const rootClassName = listGroupClassNames.root({ className });

  return (
    <Surface
      ref={ref}
      variant={variant}
      className={rootClassName}
      style={[styleSheet.root, style]}
      {...restProps}
    >
      {children}
    </Surface>
  );
});

// --------------------------------------------------

const ListGroupItem = forwardRef<PressableRef, ListGroupItemProps>(
  (props, ref) => {
    const { children, className, ...restProps } = props;

    const itemClassName = listGroupClassNames.item({ className });

    return (
      <Pressable ref={ref} className={itemClassName} {...restProps}>
        {children}
      </Pressable>
    );
  }
);

// --------------------------------------------------

const ListGroupItemPrefix = forwardRef<ViewRef, ListGroupItemPrefixProps>(
  (props, ref) => {
    const { children, ...restProps } = props;

    return (
      <View ref={ref} {...restProps}>
        {children}
      </View>
    );
  }
);

// --------------------------------------------------

const ListGroupItemContent = forwardRef<ViewRef, ListGroupItemContentProps>(
  (props, ref) => {
    const { children, className, style, ...restProps } = props;

    const contentClassName = listGroupClassNames.itemContent({ className });

    return (
      <View ref={ref} className={contentClassName} style={style} {...restProps}>
        {children}
      </View>
    );
  }
);

// --------------------------------------------------

const ListGroupItemTitle = forwardRef<
  React.ComponentRef<typeof HeroText>,
  ListGroupItemTitleProps
>((props, ref) => {
  const { children, className, ...restProps } = props;

  const titleClassName = listGroupClassNames.itemTitle({ className });

  return (
    <HeroText ref={ref} className={titleClassName} {...restProps}>
      {children}
    </HeroText>
  );
});

// --------------------------------------------------

const ListGroupItemDescription = forwardRef<
  React.ComponentRef<typeof HeroText>,
  ListGroupItemDescriptionProps
>((props, ref) => {
  const { children, className, ...restProps } = props;

  const descriptionClassName = listGroupClassNames.itemDescription({
    className,
  });

  return (
    <HeroText ref={ref} className={descriptionClassName} {...restProps}>
      {children}
    </HeroText>
  );
});

// --------------------------------------------------

const ListGroupItemSuffix = forwardRef<ViewRef, ListGroupItemSuffixProps>(
  (props, ref) => {
    const { children, iconProps, ...restProps } = props;

    const themeColorMuted = useThemeColor('muted');

    const resolvedIconProps: ListGroupIconProps = {
      size: iconProps?.size ?? DEFAULT_ICON_SIZE,
      color: iconProps?.color ?? themeColorMuted,
    };

    return (
      <View ref={ref} {...restProps}>
        {children ?? (
          <ChevronRightIcon
            size={resolvedIconProps.size}
            color={resolvedIconProps.color}
          />
        )}
      </View>
    );
  }
);

// --------------------------------------------------

ListGroupRoot.displayName = DISPLAY_NAME.ROOT;
ListGroupItem.displayName = DISPLAY_NAME.ITEM;
ListGroupItemPrefix.displayName = DISPLAY_NAME.ITEM_PREFIX;
ListGroupItemContent.displayName = DISPLAY_NAME.ITEM_CONTENT;
ListGroupItemTitle.displayName = DISPLAY_NAME.ITEM_TITLE;
ListGroupItemDescription.displayName = DISPLAY_NAME.ITEM_DESCRIPTION;
ListGroupItemSuffix.displayName = DISPLAY_NAME.ITEM_SUFFIX;

/**
 * Compound ListGroup component with sub-components
 *
 * @component ListGroup - Surface-based container that groups related list items.
 * Supports all Surface variants (default, secondary, tertiary, transparent).
 *
 * @component ListGroup.Item - Horizontal flex-row container for a single item,
 * providing consistent spacing and alignment.
 *
 * @component ListGroup.ItemPrefix - Optional leading content slot for icons,
 * avatars, or other visual elements.
 *
 * @component ListGroup.ItemContent - Flex-1 wrapper for title and description,
 * occupying the remaining horizontal space.
 *
 * @component ListGroup.ItemTitle - Primary text label styled with foreground color
 * and medium font weight.
 *
 * @component ListGroup.ItemDescription - Secondary text styled with muted color
 * and smaller font size.
 *
 * @component ListGroup.ItemSuffix - Optional trailing content slot. Renders a
 * chevron-right icon by default; accepts children to override the default icon.
 * Supports iconProps (size, color) for customising the default chevron.
 *
 * @see Full documentation: https://v3.heroui.com/docs/native/components/list-group
 */
const CompoundListGroup = Object.assign(ListGroupRoot, {
  /** @optional Single item row with flex-row layout */
  Item: ListGroupItem,
  /** @optional Leading visual element (icon / avatar) */
  ItemPrefix: ListGroupItemPrefix,
  /** @optional Flex-1 content wrapper for title and description */
  ItemContent: ListGroupItemContent,
  /** @optional Primary text label */
  ItemTitle: ListGroupItemTitle,
  /** @optional Secondary descriptive text */
  ItemDescription: ListGroupItemDescription,
  /** @optional Trailing element, defaults to chevron-right icon */
  ItemSuffix: ListGroupItemSuffix,
});

export default CompoundListGroup;
