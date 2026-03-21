/**
 * Easing gradient utilities for React Native
 *
 * Original source: https://github.com/phamfoo/react-native-easing-gradient
 * Author: @phamfoo
 * License: MIT
 *
 * This code has been adapted for use in HeroUI Native with modifications
 * for TypeScript compatibility and integration with the animation system.
 */

import { Animated } from 'react-native';
// @ts-expect-error
const AnimatedInterpolation = Animated.Interpolation;

type ColorInterpolateFunction = (input: number) => string;

function createInterpolation(
  config: Animated.InterpolationConfigType
): ColorInterpolateFunction {
  if (AnimatedInterpolation.__createInterpolation) {
    return AnimatedInterpolation.__createInterpolation(config);
  }

  return (input) => {
    const interpolation = new AnimatedInterpolation(
      { __getValue: () => input },
      config
    );

    return interpolation.__getValue();
  };
}

export { createInterpolation };
