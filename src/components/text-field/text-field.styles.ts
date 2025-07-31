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
});

const input = tv({
  slots: {
    container:
      'flex-row gap-3 py-2 px-3 rounded-lg border border-border bg-base',
    input: 'text-base text-foreground flex-1',
  },
  variants: {
    isFocused: {
      true: {
        container: 'bg-transparent border-[3px]',
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
  base: 'text-sm text-muted-foreground m-1 font-medium',
});

const textFieldStyles = combineStyles({
  root,
  label,
  input,
  inputStartContent,
  inputEndContent,
  description,
});

export type InputSlots = keyof ReturnType<typeof input>;
export type LabelSlots = keyof ReturnType<typeof label>;

export default textFieldStyles;
