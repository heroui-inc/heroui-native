import type { PressableProps, TextProps, ViewProps } from 'react-native';
import type { SurfaceVariant } from '../surface/surface.types';

/**
 * Props for the ListGroup.Root component.
 * Renders a Surface-based container for grouped list items.
 */
export interface ListGroupRootProps extends ViewProps {
  /**
   * Children elements to be rendered inside the list group
   */
  children?: React.ReactNode;
  /**
   * Visual variant of the underlying Surface
   * @default "default"
   */
  variant?: SurfaceVariant;
  /**
   * Additional CSS classes for the root container
   */
  className?: string;
}

/**
 * Props for the ListGroup.Item component.
 * Renders a single pressable row inside the list group.
 */
export interface ListGroupItemProps extends PressableProps {
  /**
   * Children elements to be rendered inside the item
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes for the item
   */
  className?: string;
}

/**
 * Props for icon elements used by ListGroup sub-components
 */
export interface ListGroupIconProps {
  /**
   * Size of the icon in pixels
   * @default 16
   */
  size?: number;
  /**
   * Color of the icon
   */
  color?: string;
}

/**
 * Props for the ListGroup.ItemPrefix component.
 * Renders content before the item content area (e.g. an icon or avatar).
 */
export interface ListGroupItemPrefixProps extends ViewProps {
  /**
   * Children elements to be rendered inside the prefix slot
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes for the prefix
   */
  className?: string;
}

/**
 * Props for the ListGroup.ItemContent component.
 * Renders the main content area of an item, typically containing title and description.
 */
export interface ListGroupItemContentProps extends ViewProps {
  /**
   * Children elements to be rendered inside the content area
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes for the content area
   */
  className?: string;
}

/**
 * Props for the ListGroup.ItemTitle component.
 * Renders the primary text label for an item.
 */
export interface ListGroupItemTitleProps extends TextProps {
  /**
   * Title text or custom content
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes for the title
   */
  className?: string;
}

/**
 * Props for the ListGroup.ItemDescription component.
 * Renders secondary descriptive text below the title.
 */
export interface ListGroupItemDescriptionProps extends TextProps {
  /**
   * Description text or custom content
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes for the description
   */
  className?: string;
}

/**
 * Props for the ListGroup.ItemSuffix component.
 * Renders trailing content for an item, with a default chevron-right icon.
 */
export interface ListGroupItemSuffixProps extends ViewProps {
  /**
   * Children elements to override the default chevron-right icon
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes for the suffix
   */
  className?: string;
  /**
   * Props to customise the default chevron-right icon.
   * Only takes effect when no children are provided.
   */
  iconProps?: ListGroupIconProps;
}
