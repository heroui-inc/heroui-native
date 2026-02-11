import { useThemeColor } from '../../helpers/external/hooks';
import type { AlertStatus } from '../../primitives/alert/alert.types';

/**
 * Resolves the default icon color based on the current alert status.
 */
export function useStatusColor(status: AlertStatus): string {
  const [foreground, accent, success, warning, danger] = useThemeColor([
    'foreground',
    'accent',
    'success',
    'warning',
    'danger',
  ]);

  switch (status) {
    case 'accent':
      return accent;
    case 'success':
      return success;
    case 'warning':
      return warning;
    case 'danger':
      return danger;
    default:
      return foreground;
  }
}
