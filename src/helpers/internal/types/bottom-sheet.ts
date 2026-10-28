import type { BottomSheetProps } from '../../../components/bottom-sheet/bottom-sheet.types';

/**
 * Base props for the `presentation="bottom-sheet"` content of Popover,
 * Select, and Menu. The content renders inside a `BottomSheet`, so it takes
 * the same sheet options (`detents`, `dimmed`, `dimBlur`, `footer`,
 * `scrollableRef`, …). The sheet is presented and dismissed by the
 * component's own open state.
 *
 * TrueSheet's own `presentation` (`'page' | 'form'`) is left out: the
 * components use `presentation` to pick the content mode.
 */
export type BaseBottomSheetContentProps = Omit<
  BottomSheetProps,
  'name' | 'presentation'
>;
