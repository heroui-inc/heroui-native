import { tv } from '../../helpers/external/utils/cn';
import { combineStyles } from '../../helpers/internal/utils';

const root = tv({
  base: 'link-button__root rounded-none',
});

const linkButtonClassNames = combineStyles({
  root,
});

export { linkButtonClassNames };
export default linkButtonClassNames;
