import { tv } from '../../helpers/external/utils/cn';
import { combineStyles } from '../../helpers/internal/utils';

const root = tv({
  slots: {
    container: '',
    text: 'field-error__text',
  },
  variants: {
    isInsideField: {
      true: {
        container: 'field-error__container--is-inside-field',
        text: '',
      },
    },
  },
});

export const fieldErrorClassNames = combineStyles({
  root,
});

export type FieldErrorSlots = keyof ReturnType<typeof root>;
