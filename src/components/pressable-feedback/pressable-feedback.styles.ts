/* eslint-disable prettier/prettier */
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../providers/theme/helpers';

const root = tv({
  base: 'relative overflow-hidden',
});

const ripple = tv({
  base: 'absolute pointer-events-none rounded-full',
});

const pressableFeedbackStyles = combineStyles({
  root,
  ripple,
});

export default pressableFeedbackStyles;
