import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/internal/utils';

const root = tv({
  slots: {
    container: '',
    text: 'text-sm text-danger',
  },
});

const errorViewStyles = combineStyles({
  root,
});

export type ErrorViewSlots = keyof ReturnType<typeof root>;

export default errorViewStyles;
