import { tv } from '../../helpers/external/utils/cn';
import { combineStyles } from '../../helpers/internal/utils';
import { bottomSheetClassNames } from '../bottom-sheet/bottom-sheet.styles';

/**
 * Wraps the sheet children. No `flex: 1`: the `auto` detent measures the
 * wrapper's content height.
 *
 * Bottom padding is a variant. `padding` is a fixed inset. `safe` adds the
 * bottom safe area on top of that (`pb-safe-offset-5` has to stay a Tailwind
 * utility — the CSS parser has no safe-area equivalent). The sheet picks
 * `safe` only when nothing else owns the inset: a footer absorbs it, a
 * plugged scrollable gets it natively, and Android already adds it to the
 * sheet height.
 */
const contentContainer = tv({
  base: 'px-5 pt-5',
  variants: {
    bottomInset: {
      padding: 'pb-5',
      safe: 'pb-safe-offset-5',
    },
  },
  defaultVariants: {
    bottomInset: 'padding',
  },
});

export const nativeBottomSheetClassNames = combineStyles({
  contentContainer,
  label: bottomSheetClassNames.label,
  description: bottomSheetClassNames.description,
});
