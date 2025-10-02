import { tv } from 'tailwind-variants';
import { combineStyles } from '../../providers/theme/helpers';

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

const title = tv({
  base: 'text-foreground font-medium text-lg',
});

const description = tv({
  base: 'text-base font-normal',
  variants: {
    isDark: {
      true: 'text-muted-foreground',
      false: 'text-muted',
    },
  },
});

const cardStyles = combineStyles({
  root,
  header,
  body,
  footer,
  title,
  description,
});

export default cardStyles;
