import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/internal/utils';

const root = tv({
  base: '',
});

const header = tv({
  base: '',
});

const body = tv({
  base: '',
});

const footer = tv({
  base: '',
});

const label = tv({
  base: 'text-lg text-foreground font-medium',
});

const description = tv({
  base: 'text-base text-muted',
});

const cardStyles = combineStyles({
  root,
  header,
  body,
  footer,
  label,
  description,
});

export default cardStyles;
