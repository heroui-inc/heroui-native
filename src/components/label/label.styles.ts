import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/internal/utils';

const root = tv({
  base: '',
  variants: {
    isDisabled: {
      true: 'pointer-events-none opacity-disabled',
    },
  },
});

const label = tv({
  slots: {
    text: 'text-base text-foreground font-medium',
    asterisk: 'text-lg/6 text-danger',
  },
  variants: {
    isDisabled: {
      true: {
        text: '',
        asterisk: 'text-muted',
      },
    },
    isInvalid: {
      true: {
        text: 'text-danger',
      },
    },
  },
});

const labelStyles = combineStyles({
  root,
  label,
});

export type LabelSlots = keyof ReturnType<typeof label>;

export default labelStyles;
