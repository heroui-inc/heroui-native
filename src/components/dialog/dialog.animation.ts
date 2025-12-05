import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Keyboard } from 'react-native';
import {
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useAnimationSettings } from '../../helpers/contexts/animation-settings-context';
import { createContext } from '../../helpers/utils';
import {
  getCombinedAnimationDisabledState,
  getRootAnimationState,
} from '../../helpers/utils/animation';
import {
  DEFAULT_ENTERING_CONFIG,
  DEFAULT_ENTERING_TYPE,
  DEFAULT_EXITING_CONFIG,
  DEFAULT_EXITING_TYPE,
} from './dialog.constants';
import type {
  DialogAnimationContextValue,
  DialogRootAnimation,
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
  /** Animation configuration for dialog root */
  animation?: DialogRootAnimation;
}) {
  const {
    isOpen: externalIsOpen,
    isDefaultOpen,
    onOpenChange: externalOnOpenChange,
    closeDelay = 300,
    isDismissKeyboardOnClose = true,
    animation,
  } = options;

  // Read parent animation disabled state from global context
  const parentAnimationSettingsContext = useAnimationSettings();
  const parentIsAllAnimationsDisabled =
    parentAnimationSettingsContext?.isAllAnimationsDisabled;

  const {
    animationConfig,
    isAnimationDisabled,
    isAllAnimationsDisabled: ownIsAllAnimationsDisabled,
  } = getRootAnimationState(animation);

  // Combine parent and own disable-all states (parent wins)
  const isAllAnimationsDisabled = getCombinedAnimationDisabledState({
    parentIsAllAnimationsDisabled,
    ownIsAllAnimationsDisabled,
  });

  // Extract entering animation configuration
  const enteringAnimation = animationConfig?.entering;
  const enteringType = enteringAnimation?.type ?? DEFAULT_ENTERING_TYPE;
  const enteringConfig = useMemo(
    () => enteringAnimation?.config ?? DEFAULT_ENTERING_CONFIG,
    [enteringAnimation?.config]
  );

  // Extract exiting animation configuration
  const exitingAnimation = animationConfig?.exiting;
  const exitingType = exitingAnimation?.type ?? DEFAULT_EXITING_TYPE;
  const exitingConfig = useMemo(
    () => exitingAnimation?.config ?? DEFAULT_EXITING_CONFIG,
    [exitingAnimation?.config]
  );

  // If animation is disabled, closeDelay should be 0
  const closeDelayValue =
    isAnimationDisabled || isAllAnimationsDisabled ? 0 : closeDelay;

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
    if (isAnimationDisabled || isAllAnimationsDisabled) {
      progress.set(1);
      return;
    }

    if (enteringType === 'spring') {
      progress.set(withSpring(1, enteringConfig));
    } else {
      progress.set(withTiming(1, enteringConfig));
    }
  }, [
    progress,
    enteringType,
    enteringConfig,
    isAnimationDisabled,
    isAllAnimationsDisabled,
  ]);

  // Animation function for closing
  const animateClose = useCallback(() => {
    if (isAnimationDisabled || isAllAnimationsDisabled) {
      progress.set(2);
      return;
    }

    if (exitingType === 'spring') {
      progress.set(withSpring(2, exitingConfig));
    } else {
      progress.set(withTiming(2, exitingConfig));
    }
  }, [
    progress,
    exitingType,
    exitingConfig,
    isAnimationDisabled,
    isAllAnimationsDisabled,
  ]);

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
        if (closeDelayValue > 0) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => {
            setInternalIsOpen(false);
            setDialogState('idle');
            progress.set(0);
            callback?.(value);
          }, closeDelayValue);
        } else {
          setInternalIsOpen(false);
          setDialogState('idle');
          progress.set(0);
          callback?.(value);
        }
      }
    },
    [
      closeDelayValue,
      isDismissKeyboardOnClose,
      progress,
      animateOpen,
      animateClose,
    ]
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
    isAllAnimationsDisabled,
  };
}
