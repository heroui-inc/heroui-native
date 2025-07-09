import type { BaseDimensions, Dimensions } from './switch.types';

const getSwitchPadding = (
  switchHeight: number,
  thumbSize: number,
  switchBorderWidth: number
) => {
  return (switchHeight - thumbSize) / 2 - switchBorderWidth;
};

const getSwitchThumbMaxTranslateX = (
  switchWidth: number,
  thumbSize: number,
  switchPadding: number,
  switchBorderWidth: number
) => {
  return switchWidth - thumbSize - switchPadding * 2 - switchBorderWidth * 2;
};

export const getSwitchDimensions = (dimensions: BaseDimensions): Dimensions => {
  const { switchWidth, switchHeight, switchBorderWidth, switchThumbSize } =
    dimensions;

  const switchPadding = getSwitchPadding(
    switchHeight,
    switchThumbSize,
    switchBorderWidth
  );

  return {
    ...dimensions,
    switchPadding,
    switchThumbMaxTranslateX: getSwitchThumbMaxTranslateX(
      switchWidth,
      switchThumbSize,
      switchPadding,
      switchBorderWidth
    ),
  };
};
