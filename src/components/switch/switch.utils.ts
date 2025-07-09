import { dimensions } from './switch.constants';
import type { Dimensions } from './switch.types';

export const getSwitchDimensions = (size?: 'sm' | 'md' | 'lg'): Dimensions => {
  switch (size) {
    case 'sm':
      return {
        ...dimensions.sm,
        switchHeight:
          dimensions.sm.switchThumbSize +
          dimensions.sm.switchVerticalPadding * 2,
        switchMaxTranslateX:
          dimensions.sm.switchWidth -
          dimensions.sm.switchThumbSize -
          dimensions.sm.switchVerticalPadding * 2,
      };
    case 'lg':
      return {
        ...dimensions.lg,
        switchHeight:
          dimensions.lg.switchThumbSize +
          dimensions.lg.switchVerticalPadding * 2,
        switchMaxTranslateX:
          dimensions.lg.switchWidth -
          dimensions.lg.switchThumbSize -
          dimensions.lg.switchVerticalPadding * 2,
      };
    default:
      return {
        ...dimensions.md,
        switchHeight:
          dimensions.md.switchThumbSize +
          dimensions.md.switchVerticalPadding * 2,
        switchMaxTranslateX:
          dimensions.md.switchWidth -
          dimensions.md.switchThumbSize -
          dimensions.md.switchVerticalPadding * 2,
      };
  }
};
