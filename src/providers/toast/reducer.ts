import type { ToastAction, ToastItem } from './types';

export function toastReducer(
  state: ToastItem[],
  action: ToastAction
): ToastItem[] {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload];

    case 'UPDATE': {
      const index = state.findIndex((toast) => toast.id === action.payload.id);
      if (index === -1) return state;

      const newState = [...state];
      const existingToast = newState[index];
      if (existingToast) {
        newState[index] = {
          ...existingToast,
          visible: action.payload.visible,
        };
      }
      return newState;
    }

    case 'REMOVE':
      return state.filter((toast) => toast.id !== action.payload.id);

    default:
      return state;
  }
}
