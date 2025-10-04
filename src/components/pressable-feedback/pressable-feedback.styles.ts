import { tv } from 'tailwind-variants';
import { combineStyles } from '../../providers/theme/helpers';

const root = tv({
  base: 'relative overflow-hidden',
});

const ripple = tv({
  base: 'absolute -z-10 pointer-events-none',
});

const highlight = tv({
  base: 'absolute -z-10 pointer-events-none inset-0',
});

const pressableFeedbackStyles = combineStyles({
  root,
  ripple,
  highlight,
});

export default pressableFeedbackStyles;