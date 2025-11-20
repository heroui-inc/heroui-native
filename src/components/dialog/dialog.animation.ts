import { useCallback, useEffect, useRef, useState } from 'react';
import { Keyboard } from 'react-native';
import {
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { createContext } from '../../helpers/utils';
import type {
  DialogAnimationContextValue,
  DialogProgressAnimationConfigs,
  DialogState,
} from './dialog.types';

const [DialogAnimationProvider, useDialogAnimation] =
  createContext<DialogAnimationContextValue>({
    name: 'DialogAnimationContext',
  });

export { DialogAnimationProvider, useDialogAnimation };

// --------------------------------------------------

/**
 * Root animation hook for Dialog component
 * Manages dialog state transitions and animation coordination
 */
export function useDialogRootAnimation(options: {
  /** The external controlled isOpen state */
  isOpen: boolean | undefined;
  /** The default open state for uncontrolled mode */
  isDefaultOpen?: boolean;
  /** Callback to trigger when open state should change */
  onOpenChange: ((value: boolean) => void) | undefined;
  /** Delay in milliseconds before the dialog closes (for exit animations) */
  closeDelay?: number;
  /** Whether to dismiss the keyboard when the dialog closes */
  isDismissKeyboardOnClose?: boolean;
  /** Animation configurations for open/close progress animations */
  progressAnimationConfigs?: DialogProgressAnimationConfigs;
}) {
  const {
    isOpen: externalIsOpen,
    isDefaultOpen,
    onOpenChange: externalOnOpenChange,
    closeDelay = 300,
    isDismissKeyboardOnClose = true,
    progressAnimationConfigs,
  } = options;

  // Internal isOpen state that gets delayed when closing
  const [internalIsOpen, setInternalIsOpen] = useState<boolean>(
    () => externalIsOpen ?? isDefaultOpen ?? false
  );

  const [dialogState, setDialogState] = useState<DialogState>(() =>
    (externalIsOpen ?? isDefaultOpen) ? 'open' : 'idle'
  );
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const progressValue: Record<DialogState, number> = {
    idle: 0,
    open: 1,
    close: 2,
  };

  const progress = useSharedValue(progressValue[dialogState]);
  const isDragging = useSharedValue(false);

  // Animation function for opening
  const animateOpen = useCallback(() => {
    const openConfig = progressAnimationConfigs?.onOpen;
    if (openConfig?.animationType === 'spring') {
      progress.set(withSpring(1, openConfig.animationConfig));
    } else if (openConfig?.animationType === 'timing') {
      progress.set(withTiming(1, openConfig.animationConfig));
    } else {
      progress.set(withTiming(1, { duration: 200 }));
    }
  }, [progress, progressAnimationConfigs]);

  // Animation function for closing
  const animateClose = useCallback(() => {
    const closeConfig = progressAnimationConfigs?.onClose;
    if (closeConfig?.animationType === 'spring') {
      progress.set(withSpring(2, closeConfig.animationConfig));
    } else if (closeConfig?.animationType === 'timing') {
      progress.set(withTiming(2, closeConfig.animationConfig));
    } else {
      progress.set(withTiming(2, { duration: 200 }));
    }
  }, [progress, progressAnimationConfigs]);

  // Reusable function to handle open/close state changes
  const updateDialogState = useCallback(
    (value: boolean, callback?: (value: boolean) => void) => {
      if (value) {
        // Immediate open
        clearTimeout(timeoutRef.current);
        setInternalIsOpen(true);
        setDialogState('open');
        animateOpen();
        callback?.(value);
      } else {
        // Delayed close
        setDialogState('close');
        animateClose();
        if (isDismissKeyboardOnClose) {
          Keyboard.dismiss();
        }
        if (closeDelay > 0) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => {
            setInternalIsOpen(false);
            setDialogState('idle');
            progress.set(0);
            callback?.(value);
          }, closeDelay);
        } else {
          setInternalIsOpen(false);
          setDialogState('idle');
          progress.set(0);
          callback?.(value);
        }
      }
    },
    [closeDelay, isDismissKeyboardOnClose, progress, animateOpen, animateClose]
  );

  // Sync internal state when external isOpen changes
  useEffect(() => {
    if (externalIsOpen !== undefined) {
      updateDialogState(externalIsOpen);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalIsOpen]);

  // Wrapped onOpenChange that handles animation state transitions
  const handleOpenChange = useCallback(
    (value: boolean) => {
      updateDialogState(value, externalOnOpenChange);
    },
    [updateDialogState, externalOnOpenChange]
  );

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    internalIsOpen,
    dialogState,
    progress,
    isDragging,
    onOpenChange: handleOpenChange,
  };
}
