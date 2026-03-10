import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/internal/utils';

const root = tv({
  base: 'h-auto p-0',
});

const linkButtonClassNames = combineStyles({
  root,
});

export { linkButtonClassNames };
export default linkButtonClassNames;
