import { tv } from '../../helpers/external/utils/cn';
import { combineStyles } from '../../helpers/internal/utils';

/**
 * Root style definition — absolute-fill blur layer. Parents supply the
 * clipping class (border radius + overflow) via `className`.
 */
const root = tv({
  base: 'glass-view__root',
});

export const glassViewClassNames = combineStyles({
  root,
});
