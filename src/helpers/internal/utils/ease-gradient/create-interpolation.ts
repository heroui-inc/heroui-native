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

type ColorInterpolateFunction = (input: number) => string;

type InterpolationConfig = Parameters<Animated.Value['interpolate']>[0];

/**
 * Private `Animated.Interpolation` internals. Typed locally because they are
 * not part of the public typings (legacy or Strict TypeScript API).
 */
type AnimatedInterpolationInternals = {
  __createInterpolation?: (
    config: InterpolationConfig
  ) => ColorInterpolateFunction;
  new (
    parent: { __getValue: () => number },
    config: InterpolationConfig
  ): { __getValue: () => string };
};

const AnimatedInterpolation = (
  Animated as unknown as { Interpolation: AnimatedInterpolationInternals }
).Interpolation;

function createInterpolation(
  config: InterpolationConfig
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
