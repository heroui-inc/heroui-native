import { tv } from 'tailwind-variants';
import { combineStyles } from '../../theme/helpers';

const root = tv({
  base: '',
});

const details = tv({
  base: 'flex-1 gap-4 flex-shrink-0',
});

const header = tv({
  base: '',
});

const body = tv({
  base: 'flex-1',
});

const footer = tv({
  base: '',
});

const title = tv({
  base: 'text-foreground font-medium text-lg',
});

const description = tv({
  base: 'text-muted-foreground text-base',
});

const cardStyles = combineStyles({
  root,
  details,
  header,
  body,
  footer,
  title,
  description,
});

export default cardStyles;
