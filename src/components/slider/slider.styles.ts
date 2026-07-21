import { StyleSheet } from 'react-native';
import { tv } from '../../helpers/external/utils/cn';
import { combineStyles } from '../../helpers/internal/utils';

const root = tv({
  base: 'slider__root',
  variants: {
    orientation: {
      horizontal: 'slider__root--orientation-horizontal',
      vertical: 'slider__root--orientation-vertical',
    },
    isDisabled: {
      true: 'slider__root--is-disabled',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    isDisabled: false,
  },
});

const output = tv({
  slots: {
    container: '',
    text: 'slider__output-text',
  },
});

const track = tv({
  base: 'slider__track',
  variants: {
    orientation: {
      horizontal: 'slider__track--orientation-horizontal',
      vertical: 'slider__track--orientation-vertical',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

const fill = tv({
  base: 'slider__fill',
  variants: {
    orientation: {
      horizontal: 'slider__fill--orientation-horizontal',
      vertical: 'slider__fill--orientation-vertical',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

const thumb = tv({
  slots: {
    thumbContainer: 'slider__thumb-container',
    thumbKnob: 'slider__thumb-knob',
  },
  variants: {
    orientation: {
      horizontal: {
        thumbContainer: 'slider__thumb-container--orientation-horizontal',
      },
      vertical: {
        thumbContainer: 'slider__thumb-container--orientation-vertical',
      },
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

const sliderClassNames = combineStyles({
  root,
  output,
  track,
  fill,
  thumb,
});

export const styleSheet = StyleSheet.create({
  borderCurve: {
    borderCurve: 'continuous',
  },
});

export type OutputSlots = keyof ReturnType<typeof output>;
export type ThumbSlots = keyof ReturnType<typeof thumb>;

export { sliderClassNames };
export default sliderClassNames;
