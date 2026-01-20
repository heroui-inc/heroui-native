import { useCallback, useEffect, useRef, useState } from 'react';
import { Keyboard } from 'react-native';
import {
  Easing,
  useSharedValue,
  withSpring,
  withTiming,
  type WithTimingConfig,
} from 'react-native-reanimated';
import type {
  AnimationRoot,
  PopupRootAnimationConfig,
} from '../types/animation';
import {
  getIsAnimationDisabledValue,
  getRootAnimationState,
} from '../utils/animation';
import { useCombinedAnimationDisabledState } from './use-combined-animation-disabled-state';

/**
 * Component state type for popup-like components
 */
type ComponentState = 'idle' | 'open' | 'close';

/**
 * Default entering animation type
 */
const DEFAULT_ENTERING_TYPE = 'timing' as const;

/**
 * Default exiting animation type
 */
const DEFAULT_EXITING_TYPE = 'timing' as const;

/**
 * Default entering animation configuration
 */
const DEFAULT_ENTERING_CONFIG: WithTimingConfig = {
  duration: 200,
  easing: Easing.out(Easing.ease),
};

/**
 * Default exiting animation configuration
 */
const DEFAULT_EXITING_CONFIG: WithTimingConfig = {
  duration: 150,
  easing: Easing.bezier(0.4, 0, 1, 1),
};

/**
 * Root animation hook for popup-like components (Dialog, Select, etc.)
 * Manages component state transitions and animation coordination
 */
export function usePopupRootAnimation(options: {
  /** The external controlled isOpen state */
  isOpen: boolean | undefined;
  /** The default open state for uncontrolled mode */
  isDefaultOpen?: boolean;
  /** Callback to trigger when open state should change */
  onOpenChange: ((value: boolean) => void) | undefined;
  /** Delay in milliseconds before the component closes (for exit animations) */
  closeDelay?: number;
  /** Whether to dismiss the keyboard when the component closes */
  isDismissKeyboardOnClose?: boolean;
  /** Animation configuration for component root */
  animation?: AnimationRoot<PopupRootAnimationConfig>;
}) {
  const {
    isOpen: externalIsOpen,
    isDefaultOpen,
    onOpenChange: externalOnOpenChange,
    closeDelay = 300,
    isDismissKeyboardOnClose = true,
    animation,
  } = options;

  const { animationConfig, isAnimationDisabled } =
    getRootAnimationState(animation);

  // Combine parent and own disable-all states (parent wins)
  const isAllAnimationsDisabled = useCombinedAnimationDisabledState(animation);

  const isAnimationDisabledValue = getIsAnimationDisabledValue({
    isAnimationDisabled,
    isAllAnimationsDisabled,
  });

  // Extract entering animation configuration
  const enteringAnimation = animationConfig?.entering;
  const enteringType = enteringAnimation?.type ?? DEFAULT_ENTERING_TYPE;
  const enteringConfig = enteringAnimation?.config ?? DEFAULT_ENTERING_CONFIG;

  // Extract exiting animation configuration
  const exitingAnimation = animationConfig?.exiting;
  const exitingType = exitingAnimation?.type ?? DEFAULT_EXITING_TYPE;
  const exitingConfig = exitingAnimation?.config ?? DEFAULT_EXITING_CONFIG;

  // If animation is disabled, closeDelay should be 0
  const closeDelayValue = isAnimationDisabledValue ? 0 : closeDelay;

  // Internal isOpen state that gets delayed when closing
  const [internalIsOpen, setInternalIsOpen] = useState<boolean>(
    () => externalIsOpen ?? isDefaultOpen ?? false
  );

  const [componentState, setComponentState] = useState<ComponentState>(() =>
    (externalIsOpen ?? isDefaultOpen) ? 'open' : 'idle'
  );
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const previousExternalIsOpenRef = useRef<boolean | undefined>(externalIsOpen);

  const progressValue: Record<ComponentState, number> = {
    idle: 0,
    open: 1,
    close: 2,
  };

  const progress = useSharedValue(progressValue[componentState]);
  const isDragging = useSharedValue(false);
  const isGestureReleaseAnimationRunning = useSharedValue(false);

  // Animation function for opening
  const animateOpen = useCallback(() => {
    if (isAnimationDisabledValue) {
      progress.set(1);
      return;
    }

    if (enteringType === 'spring') {
      progress.set(withSpring(1, enteringConfig));
    } else {
      progress.set(withTiming(1, enteringConfig));
    }
  }, [progress, enteringType, enteringConfig, isAnimationDisabledValue]);

  // Animation function for closing
  const animateClose = useCallback(() => {
    if (isAnimationDisabledValue) {
      progress.set(2);
      return;
    }

    if (exitingType === 'spring') {
      progress.set(withSpring(2, exitingConfig));
    } else {
      progress.set(withTiming(2, exitingConfig));
    }
  }, [progress, exitingType, exitingConfig, isAnimationDisabledValue]);

  // Reusable function to handle open/close state changes
  const updateComponentState = useCallback(
    (value: boolean, callback?: (value: boolean) => void) => {
      if (value) {
        // Immediate open
        clearTimeout(timeoutRef.current);
        setInternalIsOpen(true);
        setComponentState('open');
        animateOpen();
        callback?.(value);
      } else {
        // Delayed close
        setComponentState('close');
        animateClose();
        if (isDismissKeyboardOnClose) {
          Keyboard.dismiss();
        }
        if (closeDelayValue > 0) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => {
            setInternalIsOpen(false);
            setComponentState('idle');
            progress.set(0);
            callback?.(value);
          }, closeDelayValue);
        } else {
          setInternalIsOpen(false);
          setComponentState('idle');
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
      const previousValue = previousExternalIsOpenRef.current;
      const hasChanged = previousValue !== externalIsOpen;
      previousExternalIsOpenRef.current = externalIsOpen;

      // Check if internal state already matches external state
      // If we're already in sync or transitioning to the same state, don't call callback
      // (prevents double-calling when prop change is a reaction to our callback)
      const isAlreadyOpen = externalIsOpen && componentState === 'open';
      // When closing, 'close' state means we're already transitioning to closed
      const isAlreadyClosed =
        !externalIsOpen &&
        (componentState === 'idle' || componentState === 'close');
      const isAlreadySynced = isAlreadyOpen || isAlreadyClosed;

      // Only call callback when syncing if:
      // 1. The value actually changed, AND
      // 2. We're not already in sync (to prevent double-calling)
      if (hasChanged && !isAlreadySynced) {
        updateComponentState(externalIsOpen, externalOnOpenChange);
      } else {
        updateComponentState(externalIsOpen);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalIsOpen]);

  // Wrapped onOpenChange that handles animation state transitions
  const handleOpenChange = useCallback(
    (value: boolean) => {
      updateComponentState(value, externalOnOpenChange);
    },
    [updateComponentState, externalOnOpenChange]
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
    componentState,
    progress,
    isDragging,
    isGestureReleaseAnimationRunning,
    onOpenChange: handleOpenChange,
    isAllAnimationsDisabled,
  };
}
