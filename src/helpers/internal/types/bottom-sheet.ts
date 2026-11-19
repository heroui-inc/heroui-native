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
export interface BaseBottomSheetContentProps
  extends Omit<BottomSheetProps, 'name' | 'presentation'> {
  /**
   * Additional CSS class for the sheet's content container
   */
  contentContainerClassName?: string;
}

/**
 * Props for the sheet behind `presentation="bottom-sheet"` content.
 */
export interface PopupSheetContentProps extends BottomSheetProps {
  /**
   * Additional CSS class for the sheet's content container
   */
  contentContainerClassName?: string;
  /**
   * Whether the owning popup is open. Presents the sheet when it turns
   * `true` and dismisses it when it turns `false`.
   */
  isOpen: boolean;
  /**
   * Called with `false` when the sheet is dismissed natively (drag down,
   * dimmed area tap, Android back).
   */
  onOpenChange: (open: boolean) => void;
}
