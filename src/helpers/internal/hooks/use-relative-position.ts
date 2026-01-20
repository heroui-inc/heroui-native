import * as React from 'react';
import {
  Dimensions,
  type LayoutRectangle,
  type ScaledSize,
} from 'react-native';
import type { Insets } from '../types';

type UseRelativePositionArgs = Omit<
  GetContentStyleArgs,
  'triggerPosition' | 'contentLayout' | 'dimensions'
> & {
  triggerPosition: LayoutPosition | null;
  contentLayout: LayoutRectangle | null;
  disablePositioningStyle?: boolean;
};

export function useRelativePosition({
  align,
  avoidCollisions,
  triggerPosition,
  contentLayout,
  alignOffset,
  insets,
  offset,
  placement,
  disablePositioningStyle,
}: UseRelativePositionArgs) {
  const dimensions = Dimensions.get('screen');

  return React.useMemo(() => {
    if (disablePositioningStyle) {
      return {};
    }
    if (!triggerPosition || !contentLayout) {
      return {
        position: 'absolute',
        opacity: 0,
        top: dimensions.height,
      } as const;
    }
    return getContentStyle({
      align,
      avoidCollisions,
      contentLayout,
      placement,
      triggerPosition,
      alignOffset,
      insets,
      offset,
      dimensions,
    });
  }, [
    align,
    avoidCollisions,
    placement,
    alignOffset,
    insets,
    triggerPosition,
    contentLayout,
    dimensions,
    disablePositioningStyle,
    offset,
  ]);
}

export interface LayoutPosition {
  pageY: number;
  pageX: number;
  width: number;
  height: number;
}

interface GetPositionArgs {
  dimensions: ScaledSize;
  avoidCollisions: boolean;
  triggerPosition: LayoutPosition;
  contentLayout: LayoutRectangle;
  insets?: Insets;
}

interface GetSidePositionArgs extends GetPositionArgs {
  placement: 'top' | 'bottom' | 'left' | 'right';
  offset: number;
}

function getSidePosition({
  placement,
  triggerPosition,
  contentLayout,
  offset,
  insets,
  avoidCollisions,
  dimensions,
}: GetSidePositionArgs) {
  const insetTop = insets?.top ?? 0;
  const insetBottom = insets?.bottom ?? 0;
  const insetLeft = insets?.left ?? 0;
  const insetRight = insets?.right ?? 0;

  // Handle vertical sides (top/bottom)
  if (placement === 'top' || placement === 'bottom') {
    const positionTop = triggerPosition?.pageY - offset - contentLayout.height;
    const positionBottom =
      triggerPosition.pageY + triggerPosition.height + offset;

    if (!avoidCollisions) {
      return {
        top: placement === 'top' ? positionTop : positionBottom,
      };
    }

    if (placement === 'top') {
      return {
        top: Math.min(
          Math.max(insetTop, positionTop),
          dimensions.height - insetBottom - contentLayout.height
        ),
      };
    }

    return {
      top: Math.min(
        dimensions.height - insetBottom - contentLayout.height,
        positionBottom
      ),
    };
  }

  // Handle horizontal sides (left/right)
  const maxContentWidth = dimensions.width - insetLeft - insetRight;
  const contentWidth = Math.min(contentLayout.width, maxContentWidth);

  const positionLeft = triggerPosition.pageX - offset - contentWidth;
  const positionRight = triggerPosition.pageX + triggerPosition.width + offset;

  if (!avoidCollisions) {
    return {
      left: placement === 'left' ? positionLeft : positionRight,
    };
  }

  if (placement === 'left') {
    return {
      left: Math.min(
        Math.max(insetLeft, positionLeft),
        dimensions.width - insetRight - contentWidth
      ),
    };
  }

  // For right placement, ensure content doesn't go beyond left inset
  return {
    left: Math.max(
      insetLeft,
      Math.min(dimensions.width - insetRight - contentWidth, positionRight)
    ),
  };
}

interface GetAlignPositionArgs extends GetPositionArgs {
  align: 'start' | 'center' | 'end';
  alignOffset: number;
  placement: 'top' | 'bottom' | 'left' | 'right';
}

function getAlignPosition({
  align,
  avoidCollisions,
  contentLayout,
  triggerPosition,
  alignOffset,
  insets,
  dimensions,
  placement,
}: GetAlignPositionArgs) {
  const insetLeft = insets?.left ?? 0;
  const insetRight = insets?.right ?? 0;
  const insetTop = insets?.top ?? 0;
  const insetBottom = insets?.bottom ?? 0;

  // For top/bottom sides, align horizontally
  if (placement === 'top' || placement === 'bottom') {
    const maxContentWidth = dimensions.width - insetLeft - insetRight;
    const contentWidth = Math.min(contentLayout.width, maxContentWidth);

    let left = getHorizontalAlignPosition(
      align,
      triggerPosition.pageX,
      triggerPosition.width,
      contentWidth,
      alignOffset,
      insetLeft,
      insetRight,
      dimensions
    );

    if (avoidCollisions) {
      const doesCollide =
        left < insetLeft || left + contentWidth > dimensions.width - insetRight;
      if (doesCollide) {
        const spaceLeft = left - insetLeft;
        const spaceRight =
          dimensions.width - insetRight - (left + contentWidth);

        if (spaceLeft > spaceRight && spaceLeft >= contentWidth) {
          left = insetLeft;
        } else if (spaceRight >= contentWidth) {
          left = dimensions.width - insetRight - contentWidth;
        } else {
          const centeredPosition = Math.max(
            insetLeft,
            (dimensions.width - contentWidth - insetRight) / 2
          );
          left = centeredPosition;
        }
      }
    }

    return { left, maxWidth: maxContentWidth };
  }

  // For left/right sides, align vertically and constrain width
  const maxContentHeight = dimensions.height - insetTop - insetBottom;
  const maxContentWidth = dimensions.width - insetLeft - insetRight;
  const contentHeight = Math.min(contentLayout.height, maxContentHeight);

  let top = getVerticalAlignPosition(
    align,
    triggerPosition.pageY,
    triggerPosition.height,
    contentHeight,
    alignOffset,
    insetTop,
    insetBottom,
    dimensions
  );

  if (avoidCollisions) {
    const doesCollide =
      top < insetTop || top + contentHeight > dimensions.height - insetBottom;
    if (doesCollide) {
      const spaceTop = top - insetTop;
      const spaceBottom =
        dimensions.height - insetBottom - (top + contentHeight);

      if (spaceTop > spaceBottom && spaceTop >= contentHeight) {
        top = insetTop;
      } else if (spaceBottom >= contentHeight) {
        top = dimensions.height - insetBottom - contentHeight;
      } else {
        const centeredPosition = Math.max(
          insetTop,
          (dimensions.height - contentHeight - insetBottom) / 2
        );
        top = centeredPosition;
      }
    }
  }

  return { top, maxHeight: maxContentHeight, maxWidth: maxContentWidth };
}

function getHorizontalAlignPosition(
  align: 'start' | 'center' | 'end',
  triggerPageX: number,
  triggerWidth: number,
  contentWidth: number,
  alignOffset: number,
  insetLeft: number,
  insetRight: number,
  dimensions: ScaledSize
) {
  let left = 0;
  if (align === 'start') {
    left = triggerPageX;
  }
  if (align === 'center') {
    left = triggerPageX + triggerWidth / 2 - contentWidth / 2;
  }
  if (align === 'end') {
    left = triggerPageX + triggerWidth - contentWidth;
  }
  return Math.max(
    insetLeft,
    Math.min(left + alignOffset, dimensions.width - contentWidth - insetRight)
  );
}

function getVerticalAlignPosition(
  align: 'start' | 'center' | 'end',
  triggerPageY: number,
  triggerHeight: number,
  contentHeight: number,
  alignOffset: number,
  insetTop: number,
  insetBottom: number,
  dimensions: ScaledSize
) {
  let top = 0;
  if (align === 'start') {
    top = triggerPageY;
  }
  if (align === 'center') {
    top = triggerPageY + triggerHeight / 2 - contentHeight / 2;
  }
  if (align === 'end') {
    top = triggerPageY + triggerHeight - contentHeight;
  }
  return Math.max(
    insetTop,
    Math.min(top + alignOffset, dimensions.height - contentHeight - insetBottom)
  );
}

type GetContentStyleArgs = GetPositionArgs &
  GetSidePositionArgs &
  GetAlignPositionArgs;

function getContentStyle({
  align,
  avoidCollisions,
  contentLayout,
  placement,
  triggerPosition,
  alignOffset,
  insets,
  offset,
  dimensions,
}: GetContentStyleArgs) {
  return Object.assign(
    { position: 'absolute' } as const,
    getSidePosition({
      placement,
      triggerPosition,
      contentLayout,
      offset,
      insets,
      avoidCollisions,
      dimensions,
    }),
    getAlignPosition({
      align,
      avoidCollisions,
      triggerPosition,
      contentLayout,
      alignOffset,
      insets,
      dimensions,
      placement,
    })
  );
}
