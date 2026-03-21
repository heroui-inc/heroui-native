import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/internal/utils';

const root = tv({
  base: 'h-8',
});

const closeButtonClassNames = combineStyles({
  root,
});

export { closeButtonClassNames };
export default closeButtonClassNames;
