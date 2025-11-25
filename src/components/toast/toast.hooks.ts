import { useEffect, useRef } from 'react';

/**
 * Hook to handle automatic toast dismissal based on duration
 *
 * @param duration - Duration in milliseconds before the toast automatically disappears, or 'persistent' to prevent auto-hide
 * @param id - The unique ID of the toast
 * @param hide - Function to hide the toast
 *
 * @example
 * ```tsx
 * useToastDuration(4000, toastId, hide);
 * useToastDuration('persistent', toastId, hide);
 * ```
 */
export function useToastDuration(
  duration: number | 'persistent' | undefined,
  id: string | undefined,
  hide: ((ids?: string | string[]) => void) | undefined
): void {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Handle immediate dismissal
    if (duration === 0 && id && hide) {
      hide(id);
      return;
    }

    // Only set timeout if duration is a valid positive number and id/hide are available
    // Skip timeout if duration is 'persistent', undefined, or invalid (treats as persistent)
    if (
      typeof duration === 'number' &&
      !isNaN(duration) &&
      duration > 0 &&
      duration !== Infinity &&
      id &&
      hide
    ) {
      timeoutRef.current = setTimeout(() => {
        hide(id);
      }, duration);
    }

    // Cleanup timeout on unmount or when duration/id/hide changes
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [duration, id, hide]);
}
