import { Children, isValidElement, type ReactNode } from 'react';
import { getElementByDisplayName } from '../../helpers/internal/utils';
import { DISPLAY_NAME } from './bottom-sheet.constants';
import type { BottomSheetContentProps } from './bottom-sheet.types';

/**
 * Returns the sticky `BottomSheet.Header` / `BottomSheet.Footer` among the
 * direct children of the sheet's `BottomSheet.Content`, if any.
 */
export function getStickyPart(
  children: ReactNode,
  displayName: typeof DISPLAY_NAME.HEADER | typeof DISPLAY_NAME.FOOTER
) {
  const content = getElementByDisplayName(children, DISPLAY_NAME.CONTENT);

  if (!isValidElement<BottomSheetContentProps>(content)) {
    return undefined;
  }

  return Children.toArray(content.props.children).find(
    (child) => isStickyPart(child) && hasDisplayName(child, displayName)
  );
}

/**
 * Whether `child` is a `BottomSheet.Header` / `BottomSheet.Footer` with
 * `isSticky`, which renders in the sheet's header / footer slot instead of
 * inside `BottomSheet.Content`.
 */
export function isStickyPart(child: ReactNode) {
  return (
    isValidElement<{ isSticky?: boolean }>(child) &&
    child.props.isSticky === true &&
    (hasDisplayName(child, DISPLAY_NAME.HEADER) ||
      hasDisplayName(child, DISPLAY_NAME.FOOTER))
  );
}

function hasDisplayName(child: ReactNode, displayName: string) {
  return (
    isValidElement(child) &&
    (child.type as { displayName?: string }).displayName === displayName
  );
}
