import { useMemo } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { useResolveClassNames } from 'uniwind';

interface UseVerticalPlaceholderStylesParams {
  rootClassName?: string;
  style?: StyleProp<ViewStyle>;
}

export function useVerticalPlaceholderStyles({
  rootClassName,
  style,
}: UseVerticalPlaceholderStylesParams) {
  const resolvedRootClassName = useResolveClassNames(rootClassName ?? '');

  return useMemo(() => {
    const resolvedStyle = style ? StyleSheet.flatten(style) : undefined;

    const stylePaddingTop =
      resolvedStyle?.paddingTop ??
      resolvedStyle?.paddingVertical ??
      resolvedStyle?.padding;
    const stylePaddingBottom =
      resolvedStyle?.paddingBottom ??
      resolvedStyle?.paddingVertical ??
      resolvedStyle?.padding;

    const classNamePaddingTop =
      resolvedRootClassName?.paddingTop ??
      resolvedRootClassName?.paddingVertical ??
      resolvedRootClassName?.padding;
    const classNamePaddingBottom =
      resolvedRootClassName?.paddingBottom ??
      resolvedRootClassName?.paddingVertical ??
      resolvedRootClassName?.padding;

    const paddingTopValue = stylePaddingTop ?? classNamePaddingTop;
    const paddingBottomValue = stylePaddingBottom ?? classNamePaddingBottom;

    const topHeight =
      typeof paddingTopValue === 'number' && paddingTopValue >= 0
        ? paddingTopValue
        : 0;
    const bottomHeight =
      typeof paddingBottomValue === 'number' && paddingBottomValue >= 0
        ? paddingBottomValue
        : 0;

    const styleBackgroundColor = resolvedStyle?.backgroundColor;
    const classNameBackgroundColor = resolvedRootClassName?.backgroundColor;
    const backgroundColor =
      styleBackgroundColor ?? classNameBackgroundColor ?? undefined;

    const backgroundStyle: ViewStyle | undefined =
      backgroundColor !== undefined ? { backgroundColor } : undefined;

    const topStyle: ViewStyle = {
      height: topHeight,
      ...backgroundStyle,
    };

    const bottomStyle: ViewStyle = {
      height: bottomHeight,
      ...backgroundStyle,
    };

    return {
      topStyle,
      bottomStyle,
    };
  }, [resolvedRootClassName, style]);
}
