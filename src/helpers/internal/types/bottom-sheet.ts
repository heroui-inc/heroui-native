import type { SharedValue } from 'react-native-reanimated';
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

/**
 * Props for the sheet behind `presentation="bottom-sheet"` content.
 */
export interface PopupSheetContentProps extends BottomSheetProps {
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
  /**
   * Root animation progress of the popup (0=idle, 1=open, 2=close), kept in
   * sync with the sheet position.
   */
  progress: SharedValue<number>;
}

/**
 * Props for the helper that mirrors the sheet position into a popup's
 * `progress`.
 */
export interface PopupSheetProgressSyncProps {
  /**
   * Whether the owning popup is open
   */
  isOpen: boolean;
  /**
   * Root animation progress of the popup (0=idle, 1=open, 2=close)
   */
  progress: SharedValue<number>;
}
