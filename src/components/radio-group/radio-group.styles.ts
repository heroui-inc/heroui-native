import { tv } from '../../helpers/external/utils/cn';
import { combineStyles } from '../../helpers/internal/utils';

const root = tv({
  base: 'radio-group__root',
});

const item = tv({
  base: 'radio-group__item',
});

export const radioGroupClassNames = combineStyles({
  root,
  item,
});
