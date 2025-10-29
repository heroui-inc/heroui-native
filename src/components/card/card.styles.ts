import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/theme/utils/combine-styles';

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
  base: 'text-base font-normal text-muted',
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
