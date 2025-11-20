import { Fragment, useCallback, useId, useMemo, useReducer } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createContext } from '../../helpers/utils';
import { toastReducer } from './reducer';
import type { ToasterContextValue, ToastProviderProps } from './types';

const [ToasterProvider, useToaster] = createContext<ToasterContextValue>({
  name: 'ToasterContext',
});

export function Toaster({ insets, children }: ToastProviderProps) {
  const safeAreaInsets = useSafeAreaInsets();
  const baseId = useId();
  const [toasts, dispatch] = useReducer(toastReducer, []);
  console.log('🔴 🔴', toasts); // VS remove

  const finalInsets = useMemo(() => {
    return {
      top: insets?.top ?? safeAreaInsets.top + 12,
      bottom: insets?.bottom ?? safeAreaInsets.bottom + 12,
      left: insets?.left ?? safeAreaInsets.left + 12,
      right: insets?.right ?? safeAreaInsets.right + 12,
    };
  }, [safeAreaInsets, insets]);

  const prepare = useCallback(
    (options: { component: (id: string) => React.ReactElement }) => {
      const id = `${baseId}-${Date.now()}-${Math.random()}`;
      dispatch({
        type: 'ADD',
        payload: {
          id,
          component: options.component,
          visible: false,
        },
      });
      return id;
    },
    [baseId]
  );

  const show = useCallback((id: string) => {
    dispatch({
      type: 'UPDATE',
      payload: { id, visible: true },
    });
  }, []);

  const hide = useCallback((id: string) => {
    dispatch({
      type: 'UPDATE',
      payload: { id, visible: false },
    });
  }, []);

  const remove = useCallback((id: string) => {
    dispatch({
      type: 'REMOVE',
      payload: { id },
    });
  }, []);

  const contextValue = useMemo<ToasterContextValue>(() => {
    return {
      prepare,
      show,
      hide,
      remove,
    };
  }, [prepare, show, hide, remove]);

  return (
    <ToasterProvider value={contextValue}>
      {children}
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
          {toasts.map((toast) => {
            if (!toast.visible) return null;
            return (
              <Fragment key={toast.id}>{toast.component(toast.id)}</Fragment>
            );
          })}
        </View>
      </View>
    </ToasterProvider>
  );
}

export { useToaster };
