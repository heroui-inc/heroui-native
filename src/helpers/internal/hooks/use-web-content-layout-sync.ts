import { useLayoutEffect, useRef } from 'react';
import { Platform, type LayoutRectangle } from 'react-native';
import type { ViewRef } from '../types';

interface UseWebContentLayoutSyncArgs {
  positionStyle: object;
  contentLayout: LayoutRectangle | null;
  setContentLayout: (contentLayout: LayoutRectangle | null) => void;
}

/**
 * Hook that keeps `contentLayout` in sync with the content position on web.
 *
 * @description
 * `useRelativePosition` renders the content offscreen until it is measured,
 * then moves it to its computed position. On react-native-web, `onLayout`
 * only fires on size changes, so the move is never reported and
 * `contentLayout` keeps the offscreen position. This hook measures the
 * content again each time its position style changes.
 */
export function useWebContentLayoutSync({
  positionStyle,
  contentLayout,
  setContentLayout,
}: UseWebContentLayoutSyncArgs) {
  const contentRef = useRef<ViewRef>(null);

  useLayoutEffect(() => {
    if (Platform.OS !== 'web' || !contentLayout) return;
    contentRef.current?.measure((x, y) => {
      if (x === contentLayout.x && y === contentLayout.y) return;
      setContentLayout({ ...contentLayout, x, y });
    });
  }, [positionStyle, contentLayout, setContentLayout]);

  return contentRef;
}
