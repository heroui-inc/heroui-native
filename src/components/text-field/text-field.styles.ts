import { combineStyles } from '@/theme/utils';
import { tv } from 'tailwind-variants';

const root = tv({
  base: 'gap-1',
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
        asterisk: 'text-muted-foreground',
      },
    },
    isValid: {
      false: {
        text: 'text-danger',
      },
    },
  },
});

const input = tv({
  slots: {
    container: 'h-[44px] px-3 rounded-lg border flex-row items-center gap-3',
    input: 'flex-1 h-full text-base/5 text-foreground',
  },
  variants: {
    isMultiline: {
      true: {
        container: 'h-[120px]',
        input: 'py-2.5',
      },
    },
  },
});

const inputStartContent = tv({
  base: '',
});

const inputEndContent = tv({
  base: '',
});

const description = tv({
  base: 'm-1 text-sm text-muted-foreground  font-medium',
});

const errorMessage = tv({
  base: 'text-sm text-danger m-1',
});

const textFieldStyles = combineStyles({
  root,
  label,
  input,
  inputStartContent,
  inputEndContent,
  description,
  errorMessage,
});

export type LabelSlots = keyof ReturnType<typeof label>;
export type InputSlots = keyof ReturnType<typeof input>;

export default textFieldStyles;
