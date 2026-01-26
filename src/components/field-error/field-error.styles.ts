import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/internal/utils';

const root = tv({
  slots: {
    container: '',
    text: 'text-sm text-danger',
  },
  variants: {
    isInsideTextField: {
      true: {
        container: 'px-1.5',
        text: '',
      },
    },
  },
});

const fieldErrorStyles = combineStyles({
  root,
});

export type FieldErrorSlots = keyof ReturnType<typeof root>;

export default fieldErrorStyles;
