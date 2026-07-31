import { StyleSheet } from 'react-native';
import { tv } from '../../helpers/external/utils/cn';
import { combineStyles } from '../../helpers/internal/utils';

const root = tv({
  base: 'list-group__root',
});

const item = tv({
  base: 'list-group__item',
});

const itemContent = tv({
  base: 'list-group__item-content',
});

const itemTitle = tv({
  base: 'list-group__item-title',
});

const itemDescription = tv({
  base: 'list-group__item-description',
});

/**
 * @note `rtl:-scale-x-100` mirrors the default chevron so it points toward
 * the reading direction in RTL. It lives here because the uniwind CSS
 * parser has no rtl variant for custom CSS classes. Only applied to the
 * default icon — custom `ItemSuffix` children are left untouched.
 */
const itemSuffixIcon = tv({
  base: 'rtl:-scale-x-100',
});

const listGroupClassNames = combineStyles({
  root,
  item,
  itemContent,
  itemTitle,
  itemDescription,
  itemSuffixIcon,
});

export const styleSheet = StyleSheet.create({
  root: {
    borderCurve: 'continuous',
  },
});

export { listGroupClassNames };
export default listGroupClassNames;
