import { tv } from '../../helpers/external/utils/cn';
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
  base: 'card__label',
});

const description = tv({
  base: 'card__description',
});

export const cardClassNames = combineStyles({
  root,
  header,
  body,
  footer,
  label,
  description,
});
