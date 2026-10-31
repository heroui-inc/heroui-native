import type {
  TrueSheetMethods,
  TrueSheetProps,
} from '@lodev09/react-native-true-sheet';
import type { ReanimatedTrueSheetContextValue } from '@lodev09/react-native-true-sheet/reanimated';
import type { ReactNode } from 'react';
import type { TextProps } from 'react-native';
import type { DerivedValue } from 'react-native-reanimated';
import type { AnimationRootDisableAll } from '../../helpers/internal/types';
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
   * Sheet color. The glass theme keeps the platform's own sheet material
   * (Liquid Glass on iOS 26+), and `background` / `backgroundBlur` leave the
   * slot empty so they show through; otherwise the sheet uses the `overlay`
   * theme color.
   *
   * @default the `overlay` theme color
   */
  backgroundColor?: TrueSheetProps['backgroundColor'];
  /**
   * Additional CSS class for the view that wraps `children`.
   */
  contentContainerClassName?: string;
  /**
   * Animation configuration for the sheet content
   * - `"disable-all"`: Disable all animations including children (cascades down)
   * - `undefined`: Use default animations
   */
  animation?: AnimationRootDisableAll;
}

/**
 * Context shared by `BottomSheet` with its compound parts.
 */
export interface BottomSheetContextValue {
  /**
   * Native ID of the sheet's dialog view, linking the title and description
   */
  nativeID: string;
  /**
   * Dismisses the sheet through its own ref (TrueSheet's static methods are
   * not available on web)
   */
  dismiss: () => void;
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
