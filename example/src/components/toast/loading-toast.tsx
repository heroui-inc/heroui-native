import Feather from '@expo/vector-icons/Feather';
import {
  cn,
  Spinner,
  Toast,
  useThemeColor,
  type ToastComponentProps,
} from 'heroui-native';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { LinearTransition } from 'react-native-reanimated';
import { withUniwind } from 'uniwind';

const StyledFeather = withUniwind(Feather);

/**
 * Shared loading state management
 *
 * Why we need this:
 * - The toast component is rendered via a memoized callback that doesn't depend on isLoading
 * - When parent updates loading state, the toast component needs to be notified to re-render
 * - We use sharedLoadingState to track current value and listeners to notify components
 */
let sharedLoadingState = false;
const loadingStateListeners = new Set<(loading: boolean) => void>();

/**
 * Hook to access and update shared loading state
 * Can be used in both parent component and toast component
 *
 * When setIsLoading is called, all components using this hook will re-render
 * with the new loading state, even if they're memoized or rendered separately
 */
export const useLoadingState = () => {
  /**
   * Initialize state from shared value (important if component mounts after loading starts)
   */
  const [isLoading, setIsLoadingState] = useState(() => sharedLoadingState);

  useEffect(() => {
    /**
     * Subscribe to loading state changes
     * When setIsLoading is called elsewhere, this component will update
     */
    const updateState = (loading: boolean) => {
      setIsLoadingState(loading);
    };

    /**
     * Sync with current shared state immediately (important if component mounts after state was set)
     */
    setIsLoadingState(sharedLoadingState);

    /**
     * Add listener to receive future updates
     */
    loadingStateListeners.add(updateState);

    /**
     * Cleanup listener on unmount
     */
    return () => {
      loadingStateListeners.delete(updateState);
    };
  }, []);

  /**
   * Set loading state and notify all listeners (all components using this hook)
   */
  const setIsLoading = useCallback((loading: boolean) => {
    sharedLoadingState = loading;
    loadingStateListeners.forEach((listener) => listener(loading));
  }, []);

  return { isLoading, setIsLoading };
};

/**
 * Loading toast component that shows "Loading..." initially
 * and switches to "Loaded successfully" after loading completes
 * Uses shared loading state from useLoadingState hook
 */
export const LoadingToast = (props: ToastComponentProps) => {
  const { id, hide } = props;
  const { isLoading } = useLoadingState();

  const themeColorMuted = useThemeColor('muted');

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        hide(id);
      }, 750);
    }
  }, [isLoading, hide, id]);

  return (
    <Toast
      // @ts-ignore
      layout={LinearTransition.springify().mass(2)}
      className={cn(
        'mx-auto flex-row items-center gap-3 rounded-full p-1',
        isLoading ? 'w-[115px]' : 'w-[185px]'
      )}
      {...props}
    >
      <View className="flex-1 flex-row items-center gap-2">
        <View
          className={cn(
            'size-7 items-center justify-center rounded-full',
            isLoading ? 'bg-muted/10' : 'bg-success/10'
          )}
        >
          {isLoading ? (
            <Spinner size="sm" color={themeColorMuted} />
          ) : (
            <StyledFeather name="check" size={18} className="text-success" />
          )}
        </View>
        <Toast.Label
          className={cn(
            'text-sm',
            isLoading ? 'text-muted/75' : 'text-success'
          )}
        >
          {isLoading ? 'Loading...' : 'Loaded successfully'}
        </Toast.Label>
      </View>
    </Toast>
  );
};
