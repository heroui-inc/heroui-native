import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/internal/utils';

const root = tv({
  base: 'p-0',
});

const item = tv({
  base: 'flex-row items-center p-4 gap-3',
});

const itemContent = tv({
  base: 'flex-1',
});

const itemTitle = tv({
  base: 'text-base text-foreground font-medium',
});

const itemDescription = tv({
  base: 'text-sm text-muted',
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
