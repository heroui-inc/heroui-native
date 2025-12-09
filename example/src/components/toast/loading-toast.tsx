import Feather from '@expo/vector-icons/Feather';
import {
  cn,
  Spinner,
  Toast,
  useThemeColor,
  type ToastComponentProps,
} from 'heroui-native';
import { useEffect } from 'react';
import { View } from 'react-native';
import { LinearTransition } from 'react-native-reanimated';
import { withUniwind } from 'uniwind';
import { useSharedState } from './use-shared-state';

const StyledFeather = withUniwind(Feather);

const LOADING_STATE_KEY = 'loading-toast-state';

/**
 * Hook to access and update shared loading state
 * Can be used in both parent component and toast component
 *
 * When setIsLoading is called, all components using this hook will re-render
 * with the new loading state, even if they're memoized or rendered separately
 */
export const useLoadingState = () => {
  const { state: isLoading, setState: setIsLoading } = useSharedState<boolean>(
    LOADING_STATE_KEY,
    false
  );

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
        'mx-auto flex-row items-center gap-3 rounded-full border-[4px]',
        isLoading ? 'w-[115px]' : 'w-[185px]'
      )}
      isSwipeable={false}
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
        <Toast.Title
          className={cn(
            'text-sm',
            isLoading ? 'text-muted/75' : 'text-success'
          )}
        >
          {isLoading ? 'Loading...' : 'Loaded successfully'}
        </Toast.Title>
      </View>
    </Toast>
  );
};
