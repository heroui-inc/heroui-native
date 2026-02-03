// This project uses code from WorkOS/Radix Primitives.
// The code is licensed under the MIT License.
// https://github.com/radix-ui/primitives/tree/main

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/**
 * Parameters for the useControllableState hook
 */
type UseControllableStateParams<T> = {
  /** The controlled value prop */
  prop?: T | undefined;
  /** The default value for uncontrolled mode */
  defaultProp?: T | undefined;
  /** Callback fired when the value changes */
  onChange?: (state: T) => void;
};

/**
 * Function type for state setter callbacks
 */
type SetStateFn<T> = (prevState?: T) => T;

/**
 * A hook that supports both controlled and uncontrolled state.
 * When a value prop is provided, the component is controlled.
 * When no value prop is provided, the component manages its own state.
 *
 * @param params - Configuration object with prop, defaultProp, and onChange
 * @returns A tuple of [value, setValue] similar to useState
 */
function useControllableState<T>({
  prop,
  defaultProp,
  onChange = () => {},
}: UseControllableStateParams<T>) {
  const [uncontrolledProp, setUncontrolledProp] = useUncontrolledState({
    defaultProp,
    onChange,
  });
  const isControlled = prop !== undefined;
  const value = isControlled ? prop : uncontrolledProp;
  const handleChange = useCallbackRef(onChange);

  const setValue: React.Dispatch<React.SetStateAction<T | undefined>> =
    useCallback(
      (nextValue) => {
        if (isControlled) {
          const setter = nextValue as SetStateFn<T>;
          const val =
            typeof nextValue === 'function' ? setter(prop) : nextValue;
          if (val !== prop) handleChange(val as T);
        } else {
          setUncontrolledProp(nextValue);
        }
      },
      [isControlled, prop, setUncontrolledProp, handleChange]
    );

  return [value, setValue] as const;
}

/**
 * Internal hook for managing uncontrolled state with change callbacks
 */
function useUncontrolledState<T>({
  defaultProp,
  onChange,
}: Omit<UseControllableStateParams<T>, 'prop'>) {
  const uncontrolledState = useState<T | undefined>(defaultProp);
  const [value] = uncontrolledState;
  const prevValueRef = useRef(value);
  const handleChange = useCallbackRef(onChange);

  useEffect(() => {
    if (prevValueRef.current !== value) {
      handleChange(value as T);
      prevValueRef.current = value;
    }
  }, [value, prevValueRef, handleChange]);

  return uncontrolledState;
}

/**
 * A custom hook that converts a callback to a ref to avoid triggering re-renders when passed as a
 * prop or avoid re-executing effects when passed as a dependency
 */
function useCallbackRef<T extends (...args: any[]) => any>(
  callback: T | undefined
): T {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  // https://github.com/facebook/react/issues/19240
  return useMemo(() => ((...args) => callbackRef.current?.(...args)) as T, []);
}

export { useControllableState };
