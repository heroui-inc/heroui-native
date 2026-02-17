import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/internal/utils';

const root = tv({
  base: 'gap-1.5',
});

const group = tv({
  base: 'flex-row items-center',
});

const searchIcon = tv({
  base: 'absolute left-3 z-10',
});

/**
 * @note This only applies SearchField-specific overrides (flex-1, pl-9).
 * Base input styling (bg, border, focus, variants, etc.) comes from the Input component.
 * @see {@link ../input/input.styles.ts} for the base Input styles.
 */
const input = tv({
  base: 'flex-1 pl-9 pr-12',
});

const clearButton = tv({
  base: 'absolute right-3 size-6',
});

export const searchFieldClassNames = combineStyles({
  root,
  group,
  searchIcon,
  input,
  clearButton,
});
