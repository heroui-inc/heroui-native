import { StyleSheet } from 'react-native';
import { tv } from '../../helpers/external/utils/cn';
import { combineStyles } from '../../helpers/internal/utils';

const root = tv({
  base: 'tag-group__root',
});

const list = tv({
  base: 'tag-group__list',
});

const tag = tv({
  base: 'tag-group__tag',
  variants: {
    variant: {
      default: 'tag-group__tag--variant-default',
      surface: 'tag-group__tag--variant-surface',
    },
    size: {
      sm: 'tag-group__tag--size-sm',
      md: 'tag-group__tag--size-md',
      lg: 'tag-group__tag--size-lg',
    },
    isSelected: {
      true: 'tag-group__tag--is-selected',
    },
    isDisabled: {
      true: 'disabled:element-disabled',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
    isSelected: false,
    isDisabled: false,
  },
});

/**
 * Tag background style definition — absolute-fill container behind the
 * surface variant's tag, hosting theme-specific layers (e.g. glass blur)
 * or custom content (gradients, images). Radius follows the tag size.
 */
const tagBackground = tv({
  base: 'tag-group__tag-background',
  variants: {
    size: {
      sm: 'tag-group__tag-background--size-sm',
      md: 'tag-group__tag-background--size-md',
      lg: 'tag-group__tag-background--size-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const tagLabel = tv({
  base: 'tag-group__tag-label',
  variants: {
    size: {
      sm: 'tag-group__tag-label--size-sm',
      md: 'tag-group__tag-label--size-md',
      lg: 'tag-group__tag-label--size-lg',
    },
    isSelected: {
      true: 'tag-group__tag-label--is-selected',
    },
  },
  defaultVariants: {
    size: 'md',
    isSelected: false,
  },
});

const removeButton = tv({
  base: 'tag-group__remove-button',
});

export const tagGroupClassNames = combineStyles({
  root,
  list,
  tag,
  tagBackground,
  tagLabel,
  removeButton,
});

export const tagGroupStyleSheet = StyleSheet.create({
  /**
   * Yoga mis-measures `flexWrap` when the list is intrinsically sized
   * (e.g. a shrink-wrapped child of `items-center`). Forcing 100% width
   * gives wrap math a definite main-axis size; pair with `justify-center`
   * when the tags themselves should sit centered in that width.
   */
  list: {
    width: '100%',
    alignItems: 'flex-start',
  },
  tag: {
    borderCurve: 'continuous',
  },
});
