import { tv } from '../../helpers/external/utils/cn';
import { combineStyles } from '../../helpers/internal/utils';

const root = tv({
  base: 'close-button__root',
});

const closeButtonClassNames = combineStyles({
  root,
});

export { closeButtonClassNames };
export default closeButtonClassNames;
