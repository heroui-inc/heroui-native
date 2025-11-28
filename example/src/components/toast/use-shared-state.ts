import { useCallback, useEffect, useState } from 'react';

/**
 * Shared state store for toast components
 * Uses a Map to store state by key and listeners for each key
 */
const sharedStateStore = new Map<string, unknown>();
const stateListeners = new Map<string, Set<(value: unknown) => void>>();

/**
 * Generic hook to access and update shared state
 * Can be used in both parent component and toast component
 *
 * Why we need this:
 * - The toast component is rendered via a memoized callback that doesn't depend on state
 * - When parent updates state, the toast component needs to be notified to re-render
 * - We use sharedStateStore to track current value and listeners to notify components
 *
 * When setState is called, all components using this hook with the same key will re-render
 * with the new state, even if they're memoized or rendered separately
 *
 * @param key - Unique key to identify the shared state
 * @param initialValue - Initial value if state doesn't exist yet
 * @returns Object with state value and setState function
 */
export function useSharedState<T>(key: string, initialValue: T) {
  /**
   * Initialize state from shared value (important if component mounts after state was set)
   */
  const [state, setStateValue] = useState<T>(() => {
    const existingValue = sharedStateStore.get(key);
    return (existingValue as T) ?? initialValue;
  });

  useEffect(() => {
    /**
     * Initialize shared state if it doesn't exist
     */
    if (!sharedStateStore.has(key)) {
      sharedStateStore.set(key, initialValue);
    }

    /**
     * Initialize listeners set if it doesn't exist
     */
    if (!stateListeners.has(key)) {
      stateListeners.set(key, new Set());
    }

    /**
     * Subscribe to state changes
     * When setState is called elsewhere, this component will update
     */
    const updateState = (value: unknown) => {
      setStateValue(value as T);
    };

    const listeners = stateListeners.get(key);
    if (!listeners) return;

    /**
     * Sync with current shared state immediately (important if component mounts after state was set)
     */
    const currentValue = sharedStateStore.get(key);
    if (currentValue !== undefined && currentValue !== state) {
      setStateValue(currentValue as T);
    }

    /**
     * Add listener to receive future updates
     */
    listeners.add(updateState);

    /**
     * Cleanup listener on unmount
     */
    return () => {
      listeners.delete(updateState);
      /**
       * Clean up empty listener sets
       */
      if (listeners.size === 0) {
        stateListeners.delete(key);
      }
    };
  }, [key, initialValue, state]);

  /**
   * Set state and notify all listeners (all components using this hook with the same key)
   *
   * @param value - New state value
   */
  const setState = useCallback(
    (value: T | ((prev: T) => T)) => {
      const newValue =
        typeof value === 'function'
          ? (value as (prev: T) => T)(sharedStateStore.get(key) as T)
          : value;

      sharedStateStore.set(key, newValue);

      const listeners = stateListeners.get(key);
      if (listeners) {
        listeners.forEach((listener) => listener(newValue));
      }
    },
    [key]
  );

  /**
   * Reset state to initial value
   */
  const resetState = useCallback(() => {
    sharedStateStore.set(key, initialValue);

    const listeners = stateListeners.get(key);
    if (listeners) {
      listeners.forEach((listener) => listener(initialValue));
    }
  }, [key, initialValue]);

  return { state, setState, resetState };
}
