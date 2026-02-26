import type { TextProps, ViewProps } from 'react-native';
import type { AnimationRootDisableAll } from '../../helpers/internal/types';
import type * as TagGroupPrimitivesTypes from '../../primitives/tag-group/tag-group.types';

/**
 * Size variants for TagGroup tags
 */
export type TagGroupSize = 'sm' | 'md' | 'lg';

/**
 * Visual variant for TagGroup tags
 */
export type TagGroupVariant = 'default' | 'surface';

/**
 * Render props passed to TagGroup.Item's render function children
 */
export interface TagRenderProps {
  /** Whether the tag is currently selected */
  isSelected: boolean;
  /** Whether the tag is disabled (merged from root, disabledKeys, and item prop) */
  isDisabled: boolean;
}

/**
 * Props for the TagGroup root component.
 * Wraps the primitive Root with size, variant, and animation support.
 */
export interface TagGroupProps
  extends Omit<TagGroupPrimitivesTypes.RootProps, 'asChild'> {
  /** Size of all tags in the group @default "md" */
  size?: TagGroupSize;

  /** Visual variant of all tags in the group @default "default" */
  variant?: TagGroupVariant;

  /** Additional CSS classes for the tag group container */
  className?: string;

  /**
   * Animation configuration for tag group
   * - `"disable-all"`: Disable all animations including children
   * - `undefined`: Use default animations
   */
  animation?: AnimationRootDisableAll;
}

/**
 * Props for the TagGroup.List component.
 * Container that renders the list of tags with optional empty state.
 */
export interface TagGroupListProps extends ViewProps {
  /** Child elements to render inside the list */
  children?: React.ReactNode;

  /** Additional CSS classes for the list container */
  className?: string;

  /** Function to render when the list has no tags */
  renderEmptyState?: () => React.ReactNode;
}

/**
 * Props for the TagGroup.Item component.
 * Represents an individual tag within a TagGroup.
 */
export interface TagGroupItemProps
  extends Omit<TagGroupPrimitivesTypes.ItemProps, 'asChild' | 'children'> {
  /** Tag content: string, elements, or a render function receiving TagRenderProps */
  children?:
    | React.ReactNode
    | ((renderProps: TagRenderProps) => React.ReactNode);

  /** Additional CSS classes for the tag */
  className?: string;
}

/**
 * Props for the TagGroup.ItemLabel component.
 * Renders the text label of a tag.
 */
export interface TagGroupItemLabelProps extends TextProps {
  /** Text content to render */
  children?: React.ReactNode;

  /** Additional CSS classes for the label */
  className?: string;
}

/**
 * Props for customizing the default remove icon
 */
export interface TagRemoveButtonIconProps {
  /** Size of the icon @default 12 */
  size?: number;
  /** Color of the icon */
  color?: string;
}

/**
 * Props for the TagGroup.ItemRemoveButton component.
 * Renders a button to remove the tag from the group.
 */
export interface TagGroupItemRemoveButtonProps
  extends Omit<TagGroupPrimitivesTypes.RemoveButtonProps, 'asChild'> {
  /** Custom icon or content for the remove button */
  children?: React.ReactNode;

  /** Additional CSS classes for the remove button */
  className?: string;

  /** Props for customizing the default close icon. Only applies when no children are provided */
  iconProps?: TagRemoveButtonIconProps;
}

/**
 * Context value shared between TagGroup and its child components
 */
export interface TagGroupContextValue {
  /** Size of the tags */
  size: TagGroupSize;

  /** Visual variant of the tags */
  variant: TagGroupVariant;
}
