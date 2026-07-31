import { tv } from '../../helpers/external/utils/cn';
import { combineStyles } from '../../helpers/internal/utils';

const root = tv({
  base: 'search-field__root',
});

const group = tv({
  base: 'search-field__group',
});

/**
 * @note `rtl:-scale-x-100` mirrors the magnifying glass horizontally in RTL
 * layouts (its handle should point toward the reading direction). It lives
 * here because the uniwind CSS parser has no rtl variant for custom CSS
 * classes.
 */
const searchIcon = tv({
  base: 'search-field__search-icon rtl:-scale-x-100',
});

/**
 * Input container override — the Input's outer container must stretch in
 * the row group, so `flex: 1` lives here rather than on the text input.
 */
const inputContainer = tv({
  base: 'search-field__input-container',
});

/**
 * @note This only applies SearchField-specific overrides (icon paddings).
 * Base input styling (bg, border, focus, variants, etc.) comes from the Input component.
 * @see {@link ../input/input.styles.ts} for the base Input styles.
 *
 * @note Unlike `Text`, `TextInput` maps `textAlign: left/right` to physical
 * edges regardless of layout direction, so the RTL alignment needs an
 * explicit `rtl:text-right` override. It lives here because the uniwind CSS
 * parser has no rtl variant for custom CSS classes.
 */
const input = tv({
  base: 'search-field__input rtl:text-right',
});

const clearButton = tv({
  base: 'search-field__clear-button',
});

export const searchFieldClassNames = combineStyles({
  root,
  group,
  searchIcon,
  inputContainer,
  input,
  clearButton,
});
