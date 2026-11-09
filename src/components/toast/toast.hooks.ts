import { useMemo } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { useResolveClassNames } from 'uniwind';

interface UseCoverBackgroundStyleParams {
  rootClassName?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Background color for the covers that hide the content of stacked toasts.
 * Follows a background color set on the toast root through `style` or
 * `className`, so the covers match custom toast surfaces; `undefined` keeps
 * the default color of the `toast__cover` / `toast__cover-edge` classes.
 */
export function useCoverBackgroundStyle({
  rootClassName,
  style,
}: UseCoverBackgroundStyleParams): ViewStyle | undefined {
  const resolvedRootClassName = useResolveClassNames(rootClassName ?? '');

  return useMemo(() => {
    const resolvedStyle = style ? StyleSheet.flatten(style) : undefined;
    const backgroundColor =
      resolvedStyle?.backgroundColor ?? resolvedRootClassName?.backgroundColor;

    return backgroundColor !== undefined ? { backgroundColor } : undefined;
  }, [resolvedRootClassName, style]);
}
