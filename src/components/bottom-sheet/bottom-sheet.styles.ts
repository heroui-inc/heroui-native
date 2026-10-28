import { tv } from '../../helpers/external/utils/cn';
import { combineStyles } from '../../helpers/internal/utils';

/**
 * Wraps the sheet children. No `flex: 1`: the `auto` detent measures the
 * wrapper's content height.
 *
 * The bottom padding is a fixed inset only. The sheet already reserves the
 * bottom safe area below the content (UIKit on iOS, the detent height on
 * Android), so adding it here would count the home indicator twice.
 *
 * The grabber is drawn over the content, not above it. On iOS it ends 10pt
 * from the top, so the default inset clears it. Android draws it 16dp down
 * and it ends at 20dp, so `grabber` adds room for a similar gap below it.
 */
const contentContainer = tv({
  base: 'px-5 pb-5',
  variants: {
    topInset: {
      default: 'pt-5',
      grabber: 'pt-8',
    },
  },
  defaultVariants: {
    topInset: 'default',
  },
});

const label = tv({
  base: 'bottom-sheet__label',
});

const description = tv({
  base: 'bottom-sheet__description',
});

export const bottomSheetClassNames = combineStyles({
  contentContainer,
  label,
  description,
});
