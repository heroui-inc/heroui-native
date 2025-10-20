import { useResolveClassNames } from 'uniwind';
import type { ThemeColor } from './types';

export const useThemeColor = (color: ThemeColor): string => {
  const targetColor = `text-${color}`;

  const styles = useResolveClassNames(targetColor);

  const colorValue = styles.color ?? 'red';

  return colorValue as string;
};
