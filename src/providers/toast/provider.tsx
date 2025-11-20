import { useMemo } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createContext } from '../../helpers/utils';
import type { ToastContextValue, ToastProviderProps } from './types';

const [ToasterProvider, useToaster] = createContext<ToastContextValue>({
  name: 'ToastContext',
});

export function Toaster({ insets }: ToastProviderProps) {
  const safeAreaInsets = useSafeAreaInsets();

  const finalInsets = useMemo(() => {
    return {
      top: insets?.top ?? safeAreaInsets.top + 12,
      bottom: insets?.bottom ?? safeAreaInsets.bottom + 12,
      left: insets?.left ?? safeAreaInsets.left + 12,
      right: insets?.right ?? safeAreaInsets.right + 12,
    };
  }, [safeAreaInsets, insets]);

  const contextValue = useMemo<ToastContextValue>(() => {
    return {};
  }, []);

  return (
    <ToasterProvider value={contextValue}>
      <View
        className="absolute inset-0 pointer-events-box-none"
        style={{
          paddingTop: finalInsets.top,
          paddingBottom: finalInsets.bottom,
          paddingLeft: finalInsets.left,
          paddingRight: finalInsets.right,
        }}
      >
        <View className="flex-1">
          {/* Visible toasts will be rendered here */}
        </View>
      </View>
    </ToasterProvider>
  );
}

export { useToaster };
