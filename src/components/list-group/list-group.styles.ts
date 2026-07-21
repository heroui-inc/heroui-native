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

const listGroupClassNames = combineStyles({
  root,
  item,
  itemContent,
  itemTitle,
  itemDescription,
});

export const styleSheet = StyleSheet.create({
  root: {
    borderCurve: 'continuous',
  },
});

export { listGroupClassNames };
export default listGroupClassNames;
