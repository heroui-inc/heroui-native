import React from 'react';
import { Easing, withTiming } from 'react-native-reanimated';
import type { ToastPosition } from './toast.types';

export const easeInOutCubic = Easing.bezier(0.645, 0.045, 0.355, 1);
export const easeOutCirc = Easing.bezier(0.075, 0.82, 0.165, 1);
export const easeInOutCircFn = Easing.bezierFn(0.785, 0.135, 0.15, 0.86);

export const ANIMATION_DURATION = 300;

export const useToastLayoutAnimations = () => {
  // Always use top-center position for consistent top positioning
  const position: ToastPosition = 'top-center';

  return React.useMemo(
    () => ({
      entering: () => {
        'worklet';
        return getToastEntering({ position });
      },
      exiting: () => {
        'worklet';
        return getToastExiting({ position });
      },
    }),
    [position]
  );
};

type GetToastAnimationParams = {
  position: ToastPosition;
};

export const getToastEntering = ({ position }: GetToastAnimationParams) => {
  'worklet';

  const animations = {
    opacity: withTiming(1, { easing: easeOutCirc }),
    transform: [
      { scale: withTiming(1, { easing: easeOutCirc }) },
      {
        translateY: withTiming(0, {
          easing: easeOutCirc,
        }),
      },
    ],
  };

  const translateY = (() => {
    if (position === 'top-center') {
      return -50;
    }

    if (position === 'bottom-center') {
      return 50;
    }

    return 0;
  })();

  const initialValues = {
    opacity: 0,
    transform: [
      { scale: 0 },
      {
        translateY,
      },
    ],
  };

  return {
    initialValues,
    animations,
  };
};

export const getToastExiting = ({ position }: GetToastAnimationParams) => {
  'worklet';

  const translateY = (() => {
    if (position === 'top-center') {
      return -150;
    }

    if (position === 'bottom-center') {
      return 150;
    }

    return 50;
  })();

  const animations = {
    opacity: withTiming(0, { easing: easeInOutCubic }),
    transform: [
      {
        translateY: withTiming(translateY, {
          easing: easeInOutCubic,
        }),
      },
    ],
  };

  const initialValues = {
    opacity: 1,
    transform: [
      {
        translateY: 0,
      },
    ],
  };

  return {
    initialValues,
    animations,
  };
};
