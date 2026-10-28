import type {
  TrueSheetMethods,
  TrueSheetProps,
} from '@lodev09/react-native-true-sheet';
import type { ReanimatedTrueSheetContextValue } from '@lodev09/react-native-true-sheet/reanimated';
import type { ReactNode } from 'react';
import type { TextProps } from 'react-native';
import type { DerivedValue } from 'react-native-reanimated';
import type { CloseButtonProps } from '../close-button/close-button.types';

/**
 * Imperative handle of `BottomSheet`. The sheet is opened, moved, and
 * closed through these methods.
 *
 * - `present(index?, animated?)`: presents the sheet at the detent at
 *   `index` (default `0`)
 * - `resize(index)`: moves the presented sheet to the detent at `index`
 * - `dismiss(animated?)`: dismisses the sheet and every sheet stacked on it
 * - `dismissStack(animated?)`: dismisses only the sheets stacked on it
 *
 * @see {@linkcode BottomSheetProps}
 */
export type BottomSheetRef = TrueSheetMethods;

/**
 * Props for `BottomSheet`, a sheet presented natively above the app
 * (including native modals). It renders nothing until presented through
 * {@linkcode BottomSheetRef.present}; its content mounts on the first
 * presentation.
 *
 * Sheet options such as `detents`, `dimmed`, `background`, `backgroundBlur`,
 * `grabber`, `header`, `footer`, `scrollableRef`, and the presentation events
 * are forwarded to the native sheet.
 *
 * @see {@linkcode BottomSheetRef}
 */
export interface BottomSheetProps
  extends Omit<TrueSheetProps, 'children' | 'onPositionChange'> {
  /**
   * The sheet content.
   */
  children?: ReactNode;
  /**
   * Sizes the sheet can rest at, smallest first, up to 3. `'auto'` sizes the
   * sheet to its content, `'peek'` to its header and footer, and a number is
   * a fraction (`0`-`1`) of the available height.
   *
   * @default ['auto']
   */
  detents?: TrueSheetProps['detents'];
  /**
   * Additional CSS class for the view that wraps `children`.
   */
  contentContainerClassName?: string;
}

/**
 * Props for `BottomSheet.Close`, a close button that dismisses the
 * enclosing sheet.
 */
export type BottomSheetCloseProps = CloseButtonProps;

/**
 * Props for `BottomSheet.Title`, linked to the sheet for accessibility.
 */
export interface BottomSheetTitleProps extends TextProps {
  /**
   * Additional CSS class for the title
   */
  className?: string;
}

/**
 * Props for `BottomSheet.Description`, linked to the sheet for
 * accessibility.
 */
export interface BottomSheetDescriptionProps extends TextProps {
  /**
   * Additional CSS class for the description
   */
  className?: string;
}

/**
 * Live sheet values returned by `useBottomSheetAnimation`, updated on
 * the UI thread while the sheet is presented, dragged, resized, or
 * dismissed. Use them to drive custom Reanimated animations from the sheet.
 *
 * `animatedPosition` is the Y offset of the sheet's top edge from the top of
 * the screen, `animatedIndex` is the detent index as a continuous value
 * (`-1` while off screen), and `animatedDetent` is the current detent as a
 * fraction (`0`-`1`) of the available height.
 */
export interface UseBottomSheetAnimationReturn
  extends ReanimatedTrueSheetContextValue {
  /**
   * How far the sheet is presented: `0` while off screen, `1` once it rests
   * at a detent, in between while it moves in or is dragged out.
   */
  progress: DerivedValue<number>;
}
