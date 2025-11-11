import { useMemo } from 'react';
import type { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { useResolveClassNames } from 'uniwind';

/**
 * Combined style type from React Native
 */
type Style = ViewStyle | TextStyle | ImageStyle;

/**
 * Parameters for the useResolvedStyleProperty hook
 */
interface UseResolvedStylePropertyParams<K extends keyof Style = keyof Style> {
  /** The className string to resolve styles from */
  className?: string;
  /** The style prop (can be object, array, or null) */
  style?: StyleProp<ViewStyle> | StyleProp<TextStyle> | StyleProp<ImageStyle>;
  /** The name of the style property to resolve */
  propertyName: K;
}

/**
 * A hook that resolves a specific style property from both className and style props.
 * The style prop takes precedence over className.
 *
 * This is useful when you need to extract specific style values (like width, height)
 * that might come from either Tailwind classes or inline styles.
 *
 * @param params - Configuration object with className, style, and propertyName
 * @returns The resolved style property value or undefined if not found
 *
 * @example
 * ```tsx
 * const width = useResolvedStyleProperty({
 *   className: 'w-10 h-8',
 *   style: { width: 50 },
 *   propertyName: 'width',
 * });
 * // Returns: 50 (from style, takes precedence)
 * ```
 *
 * @example
 * ```tsx
 * const height = useResolvedStyleProperty({
 *   className: 'w-10 h-8',
 *   propertyName: 'height',
 * });
 * // Returns: 32 (from className 'h-8')
 * ```
 */
function useResolvedStyleProperty<K extends keyof Style>({
  className,
  style,
  propertyName,
}: UseResolvedStylePropertyParams<K>): Style[K] | undefined {
  const resolvedClassName = useResolveClassNames(className ?? '');
  const resolvedStyle = useMemo(
    () => (style ? StyleSheet.flatten(style) : undefined),
    [style]
  );

  return useMemo(() => {
    // Style prop takes precedence over className
    if (resolvedStyle && propertyName in resolvedStyle) {
      return resolvedStyle[propertyName];
    }

    // Fall back to className-resolved styles
    if (resolvedClassName && propertyName in resolvedClassName) {
      return resolvedClassName[propertyName];
    }

    return undefined;
  }, [resolvedStyle, resolvedClassName, propertyName]);
}

export { useResolvedStyleProperty };
