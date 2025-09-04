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
