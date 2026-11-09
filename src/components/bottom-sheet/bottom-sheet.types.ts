import type {
  TrueSheetMethods,
  TrueSheetProps,
} from '@lodev09/react-native-true-sheet';
import type { ReanimatedTrueSheetContextValue } from '@lodev09/react-native-true-sheet/reanimated';
import type { ReactNode } from 'react';
import type { TextProps, ViewProps } from 'react-native';
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
 * `grabber`, `scrollableRef`, and the presentation events are forwarded to
 * the native sheet. A sticky `BottomSheet.Header` / `BottomSheet.Footer`
 * fills the sheet's `header` / `footer` slot in place of those props.
 *
 * @see {@linkcode BottomSheetRef}
 */
export interface BottomSheetProps
  extends Omit<TrueSheetProps, 'children' | 'onPositionChange'> {
  /**
   * The sheet content, usually a `BottomSheet.Content`.
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
  /**
   * Whether Android draws the grabber over the top of the sheet, which the
   * topmost part clears with a larger top inset
   */
  hasGrabberInset: boolean;
  /**
   * Whether a sticky `BottomSheet.Header` renders above the content
   */
  hasStickyHeader: boolean;
  /**
   * Whether a sticky `BottomSheet.Footer` renders below the content
   */
  hasStickyFooter: boolean;
}

/**
 * Props for `BottomSheet.Content`, the sheet's dialog container. It pads the
 * sheet and hosts `BottomSheet.Header`, `BottomSheet.Body`, and
 * `BottomSheet.Footer`, or any other content.
 */
export interface BottomSheetContentProps extends ViewProps {
  /**
   * Additional CSS class for the content container
   */
  className?: string;
}

/**
 * Props for `BottomSheet.Header`, the top section of the sheet, usually
 * holding `BottomSheet.Title`, `BottomSheet.Description`, and
 * `BottomSheet.Close`.
 */
export interface BottomSheetHeaderProps extends ViewProps {
  /**
   * Pins the header to the top of the sheet while the content below it
   * scrolls. A sticky header must be a direct child of `BottomSheet.Content`.
   *
   * @default false
   */
  isSticky?: boolean;
  /**
   * Additional CSS class for the header
   */
  className?: string;
}

/**
 * Props for `BottomSheet.Body`, the main section of the sheet.
 */
export interface BottomSheetBodyProps extends ViewProps {
  /**
   * Additional CSS class for the body
   */
  className?: string;
}

/**
 * Props for `BottomSheet.Footer`, the bottom section of the sheet, usually
 * holding its actions.
 */
export interface BottomSheetFooterProps extends ViewProps {
  /**
   * Pins the footer to the bottom of the sheet while the content above it
   * scrolls. A sticky footer must be a direct child of `BottomSheet.Content`.
   *
   * @default false
   */
  isSticky?: boolean;
  /**
   * Additional CSS class for the footer
   */
  className?: string;
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
