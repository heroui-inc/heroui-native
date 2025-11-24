import { useEffect, useRef } from 'react';

/**
 * Hook to handle automatic toast dismissal based on duration
 *
 * @param duration - Duration in milliseconds before the toast automatically disappears
 * @param id - The unique ID of the toast
 * @param hide - Function to hide the toast
 *
 * @example
 * ```tsx
 * useToastDuration(4000, toastId, hide);
 * ```
 */
export function useToastDuration(
  duration: number | null | undefined,
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

    // Only set timeout if duration is valid and id/hide are available
    if (
      duration !== null &&
      duration !== undefined &&
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
