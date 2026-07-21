import { tv } from '../../helpers/external/utils/cn';
import { combineStyles } from '../../helpers/internal/utils';

const root = tv({
  base: 'search-field__root',
});

const group = tv({
  base: 'search-field__group',
});

const searchIcon = tv({
  base: 'search-field__search-icon',
});

/**
 * @note This only applies SearchField-specific overrides (flex-1, pl-9).
 * Base input styling (bg, border, focus, variants, etc.) comes from the Input component.
 * @see {@link ../input/input.styles.ts} for the base Input styles.
 */
const input = tv({
  base: 'search-field__input',
});

const clearButton = tv({
  base: 'search-field__clear-button',
});

export const searchFieldClassNames = combineStyles({
  root,
  group,
  searchIcon,
  input,
  clearButton,
});
