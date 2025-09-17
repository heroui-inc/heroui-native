import * as React from 'react';
import { Platform, View } from 'react-native';
import { FullWindowOverlay } from 'react-native-screens';
import { useToastLayoutAnimations } from './animations';
import { Toast } from './toast';
import { toastDefaultValues } from './toast.constants';
import { ToastContext } from './toast.context';
import type {
  AddToastContextHandler,
  ToasterContextType,
  ToasterProps,
  ToastProps,
} from './toast.types';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

let addToastHandler: AddToastContextHandler;
let dismissToastHandler: (id: string | number) => void;

export const Toaster: React.FC<ToasterProps> = ({
  ToasterOverlayWrapper,
  ...toasterProps
}) => {
  const toastsCounter = React.useRef(1);
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);
  const [toastsVisible, setToastsVisible] = React.useState(false);

  

  React.useLayoutEffect(() => {
    if (toasts.length > 0) {
      setToastsVisible(true);
      return;
    }

    // let the animation finish
    const timeout = setTimeout(() => {
      setToastsVisible(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [toasts.length]);

  const props = React.useMemo(() => {
    return {
      ...toasterProps,
      toasts,
      setToasts,
      toastsCounter,
    };
  }, [toasterProps, toasts]);

  if (!toastsVisible) {
    return <ToasterUI {...props} />;
  }

  if (ToasterOverlayWrapper) {
    return (
      <ToasterOverlayWrapper>
        <ToasterUI {...props} />
      </ToasterOverlayWrapper>
    );
  }

  if (Platform.OS === 'ios') {
    return (
      <FullWindowOverlay>
        <ToasterUI {...props} />
      </FullWindowOverlay>
    );
  }

  return <ToasterUI {...props} />;
};

export const ToasterUI: React.FC<
  ToasterProps & {
    toasts: ToastProps[];
    setToasts: React.Dispatch<React.SetStateAction<ToastProps[]>>;
    toastsCounter: React.MutableRefObject<number>;
  }
> = ({
  duration = toastDefaultValues.duration,
  visibleToasts = toastDefaultValues.visibleToasts,
  closeButton = toastDefaultValues.closeButton,
  toastOptions = {},
  gap = toastDefaultValues.gap,
  toasts,
  setToasts,
  toastsCounter,
  ToastWrapper,
  ...props
}) => {
  const { top, bottom } = useSafeAreaInsets();

  addToastHandler = React.useCallback(
    (options) => {
      const id =
        typeof options?.id === 'number' ||
        (options.id && options.id?.length > 0)
          ? options.id
          : toastsCounter.current++;

      setToasts((currentToasts) => {
        const newToast: ToastProps = {
          ...options,
          id: options?.id ?? id,
          variant: options.variant ?? toastDefaultValues.variant,
          duration: options.duration ?? duration,
        };

        const existingToast = currentToasts.find(
          (currentToast) => currentToast.id === newToast.id
        );

        const shouldUpdate = existingToast && options?.id;

        if (shouldUpdate) {
          return currentToasts.map((currentToast) => {
            if (currentToast.id === options.id) {
              return {
                ...currentToast,
                ...newToast,
                duration: options.duration ?? duration,
                id: options.id,
              };
            }
            return currentToast;
          });
        } else {
          const newToasts: ToastProps[] = [...currentToasts, newToast];

          if (newToasts.length > visibleToasts) {
            newToasts.shift();
          }
          return newToasts;
        }
      });

      return id;
    },
    [toastsCounter, visibleToasts, duration, setToasts]
  );

  const dismissToast = React.useCallback(
    (id: string | number | undefined) => {
      if (!id) {
        toasts.forEach((currentToast) => {
          currentToast.onDismiss?.(currentToast.id);
        });
        setToasts([]);
        toastsCounter.current = 1;
        return;
      }

      setToasts((currentToasts) =>
        currentToasts.filter((currentToast) => currentToast.id !== id)
      );

      const toastForCallback = toasts.find(
        (currentToast) => currentToast.id === id
      );
      toastForCallback?.onDismiss?.(id);

      return id;
    },
    [setToasts, toasts, toastsCounter]
  );

  dismissToastHandler = React.useCallback(
    (id) => {
      return dismissToast(id);
    },
    [dismissToast]
  );

  const value = React.useMemo<ToasterContextType>(
    () => ({
      duration: duration ?? toastDefaultValues.duration,
      position: toastDefaultValues.position,
      closeButton: closeButton ?? toastDefaultValues.closeButton,
      gap: gap ?? toastDefaultValues.gap,
      toastOptions,
      addToast: addToastHandler,
      dismissToast: dismissToastHandler,
    }),
    [duration, closeButton, gap, toastOptions]
  );

  const onDismiss = React.useCallback(
    (id: string | number) => {
      dismissToast(id);
    },
    [dismissToast]
  );

  const onAutoClose = React.useCallback(
    (id: string | number) => {
      dismissToast(id);
    },
    [dismissToast]
  );

  // Get animations based on position
  const { entering, exiting } = useToastLayoutAnimations();

  return (
    <>
      <ToastContext.Provider value={value}>
        <View
          className="fixed top-4 right-4 z-50 flex-col gap-2"
          style={{ gap, top, bottom }}
        >
          {toasts.map((toastToRender) => {
            const ToastToRender = (
              <Toast
                {...toastToRender}
                duration={toastToRender.duration ?? duration}
                onDismiss={onDismiss}
                onAutoClose={onAutoClose}
                key={toastToRender.id}
                entering={entering}
                exiting={exiting}
                {...props}
              />
            );

            if (ToastWrapper) {
              return (
                <ToastWrapper key={toastToRender.id} toastId={toastToRender.id}>
                  {ToastToRender}
                </ToastWrapper>
              );
            }
            return ToastToRender;
          })}
        </View>
      </ToastContext.Provider>
    </>
  );
};

export const getToastContext = () => {
  if (!addToastHandler || !dismissToastHandler) {
    throw new Error('ToastContext is not initialized');
  }
  return {
    addToast: addToastHandler,
    dismissToast: dismissToastHandler,
  };
};
