import * as React from 'react';
import {
  Platform,
  type LayoutRectangle,
  type ViewStyle,
} from 'react-native';
import type { ViewRef } from '../types';

interface UseWebContentLayoutSyncArgs {
  contentLayout: LayoutRectangle | null;
  contentRef: React.RefObject<ViewRef | null>;
  positionStyle: Pick<ViewStyle, 'left' | 'top'>;
  setContentLayout: (contentLayout: LayoutRectangle | null) => void;
}

export function useWebContentLayoutSync({
  contentLayout,
  contentRef,
  positionStyle,
  setContentLayout,
}: UseWebContentLayoutSyncArgs) {
  React.useEffect(() => {
    if (Platform.OS !== 'web') return;

    const content = contentRef.current;
    if (!content) return;

    content.measureInWindow((x, y, width, height) => {
      if (contentLayout?.x === x && contentLayout.y === y) return;

      setContentLayout({ x, y, width, height });
    });
  }, [
    contentLayout?.x,
    contentLayout?.y,
    contentRef,
    positionStyle.left,
    positionStyle.top,
    setContentLayout,
  ]);
}
