import type { ColorValue } from 'react-native';
import { useResolveClassNames } from 'uniwind';
import type { ThemeColor } from './types';

export const useThemeColor = <T extends string | undefined = undefined>(
  color: ThemeColor
): T extends string ? string : ColorValue => {
  const targetColor = `text-${color}`;

  const styles = useResolveClassNames(targetColor);

  const colorValue = styles.color ?? 'red';

  return colorValue as T extends string ? string : ColorValue;
};
