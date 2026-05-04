import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/internal/utils';

/**
 * Typography style map driven by Tailwind utility classes.
 *
 * Token mapping rationale (derived from existing native component usage):
 *   h1  → text-3xl  font-bold       (largest heading)
 *   h2  → text-2xl  font-bold
 *   h3  → text-xl   font-semibold
 *   h4  → text-lg   font-semibold
 *   h5  → text-base font-semibold
 *   h6  → text-sm   font-semibold
 *   body    → text-base font-normal  (default running text, matches HeroText)
 *   body-sm → text-sm   font-normal
 *   body-xs → text-xs   font-normal
 *   code    → text-sm   font-normal  (monospaced via fontFamily style)
 */
const root = tv({
  base: 'text-foreground',
  variants: {
    type: {
      'h1': 'text-3xl font-bold',
      'h2': 'text-2xl font-bold',
      'h3': 'text-xl font-semibold',
      'h4': 'text-lg font-semibold',
      'h5': 'text-base font-semibold',
      'h6': 'text-sm font-semibold',
      'body': 'text-base font-normal',
      'body-sm': 'text-sm font-normal',
      'body-xs': 'text-xs font-normal',
      'code': 'text-sm font-normal',
    },
  },
  defaultVariants: {
    type: 'body',
  },
});

export const textClassNames = combineStyles({
  root,
});
