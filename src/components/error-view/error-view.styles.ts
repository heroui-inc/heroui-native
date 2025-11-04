import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/theme/utils/combine-styles';

const root = tv({
  slots: {
    container: '',
    text: 'text-sm text-danger font-normal',
  },
});

const errorViewStyles = combineStyles({
  root,
});

export type ErrorViewSlots = keyof ReturnType<typeof root>;

export default errorViewStyles;
