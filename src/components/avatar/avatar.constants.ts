/**
 * Display names for Avatar components
 */
export const DISPLAY_NAME = {
  ROOT: 'HeroUINative.Avatar.Root',
  IMAGE: 'HeroUINative.Avatar.Image',
  FALLBACK: 'HeroUINative.Avatar.Fallback',
};

/**
 * Default avatar sizes
 */
export const AVATAR_SIZES = {
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
} as const;

/**
 * Default avatar radius values
 */
export const AVATAR_RADIUS = {
  sm: 'rounded-md',
  md: 'rounded-lg',
  lg: 'rounded-xl',
  xl: 'rounded-2xl',
  full: 'rounded-full',
} as const;
