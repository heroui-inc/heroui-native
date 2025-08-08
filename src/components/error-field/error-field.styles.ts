import { tv } from 'tailwind-variants';
import { combineStyles } from '../../theme/utils';

const root = tv({
  slots: {
    container: '',
    text: 'text-sm text-danger',
  },
});

const errorFieldStyles = combineStyles({
  root,
});

export type ErrorFieldSlots = keyof ReturnType<typeof root>;

export default errorFieldStyles;
