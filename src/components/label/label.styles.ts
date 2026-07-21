import { tv } from '../../helpers/external/utils/cn';
import { combineStyles } from '../../helpers/internal/utils';

const root = tv({
  base: '',
  variants: {
    isDisabled: {
      true: 'label__root--is-disabled',
    },
    isInsideField: {
      true: 'label__root--is-inside-field',
    },
    isInsideControlField: {
      true: 'label__root--is-inside-control-field',
    },
  },
});

const label = tv({
  slots: {
    text: 'label__text',
    asterisk: 'label__asterisk',
  },
  variants: {
    isDisabled: {
      true: {
        text: '',
        asterisk: 'label__asterisk--is-disabled',
      },
    },
    isInvalid: {
      true: {
        text: 'label__text--is-invalid',
      },
    },
  },
});

export const labelClassNames = combineStyles({
  root,
  label,
});

export type LabelSlots = keyof ReturnType<typeof label>;
