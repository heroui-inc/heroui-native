import type { ToastAction, ToastItem } from './types';

/**
 * Reducer for managing toast state
 */
export function toastReducer(
  state: ToastItem[],
  action: ToastAction
): ToastItem[] {
  switch (action.type) {
    case 'SHOW': {
      // Remove existing toast with same ID if it exists
      const filtered = state.filter((toast) => toast.id !== action.payload.id);
      // Add new toast
      return [...filtered, action.payload];
    }

    case 'HIDE': {
      // Hide specific toasts by ID
      return state.filter((toast) => !action.payload.ids.includes(toast.id));
    }

    case 'HIDE_ALL':
      // Hide all toasts
      return [];

    default:
      return state;
  }
}
