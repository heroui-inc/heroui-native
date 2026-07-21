import { tv } from '../../helpers/external/utils/cn';
import { combineStyles } from '../../helpers/internal/utils';

const root = tv({
  base: 'control-field__root',
});

const indicator = tv({
  base: '',
});

export const controlFieldClassNames = combineStyles({
  root,
  indicator,
});
