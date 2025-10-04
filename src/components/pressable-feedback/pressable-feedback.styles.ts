import { type ViewStyle } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../providers/theme/helpers';

const root = tv({
  base: 'relative overflow-hidden',
});

const rippleLayer: ViewStyle = {
  position: 'absolute',
  zIndex: -1,
  pointerEvents: 'none',
} as const;

const highlightLayer: ViewStyle = {
  ...rippleLayer,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
} as const;

const pressableFeedbackStyles = combineStyles({
  root,
  rippleLayer,
  highlightLayer,
});

export default pressableFeedbackStyles;
