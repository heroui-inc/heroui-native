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

import { Easing, type EasingFunction } from 'react-native';
import { createInterpolation } from './create-interpolation';

interface ColorStops {
  [location: number]: {
    color: string;
    easing?: EasingFunction;
  };
}

interface GradientParams {
  colorStops: ColorStops;
  extraColorStopsPerTransition?: number;
  easing?: EasingFunction;
}

const easeInOut = Easing.bezier(0.42, 0, 0.58, 1);

function easeGradient({
  colorStops,
  easing = easeInOut,
  extraColorStopsPerTransition = 12,
}: GradientParams): {
  colors: [string, string, ...string[]];
  locations: [number, number, ...number[]];
} {
  const colors: string[] = [];
  const locations: number[] = [];

  const initialLocations = Object.keys(colorStops)
    .map((key) => Number(key))
    .sort();

  const totalColorStops = initialLocations.length;

  for (
    let currentStopIndex = 0;
    currentStopIndex < totalColorStops - 1;
    currentStopIndex++
  ) {
    const startLocation = initialLocations[currentStopIndex];
    const endLocation = initialLocations[currentStopIndex + 1];

    if (startLocation === undefined || endLocation === undefined) {
      continue;
    }

    const startStop = colorStops[startLocation];
    const endStop = colorStops[endLocation];

    if (!startStop || !endStop) {
      continue;
    }

    const startColor = startStop.color;
    const endColor = endStop.color;
    const currentEasing = startStop.easing ?? easing;

    const colorScale = createInterpolation({
      inputRange: [0, 1],
      outputRange: [startColor, endColor],
      easing: currentEasing,
    });

    const currentTransitionLength = endLocation - startLocation;
    const stepSize = 1 / (extraColorStopsPerTransition + 1);

    for (
      let stepIndex = 0;
      stepIndex <= extraColorStopsPerTransition + 1;
      stepIndex++
    ) {
      const progress = stepIndex * stepSize;
      const color = colorScale(progress);
      colors.push(color);
      locations.push(startLocation + currentTransitionLength * progress);
    }
  }

  return {
    colors: colors as [string, string, ...string[]],
    locations: locations as [number, number, ...number[]],
  };
}

export { easeGradient };
