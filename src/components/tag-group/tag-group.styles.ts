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
  tagLabel,
  removeButton,
});

export const tagGroupStyleSheet = StyleSheet.create({
  tag: {
    borderCurve: 'continuous',
  },
});
