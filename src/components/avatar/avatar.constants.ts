import { Easing, FadeIn } from 'react-native-reanimated';
import type { AvatarSize } from './avatar.types';

/**
 * Display names for Avatar components
 */
export const AVATAR_DISPLAY_NAME = {
  ROOT: 'HeroUINative.Avatar',
  IMAGE: 'HeroUINative.Avatar.Image',
  FALLBACK: 'HeroUINative.Avatar.Fallback',
};

/**
 * Animation configuration for fade in effect
 */
export const AVATAR_ENTERING_ANIMATION = FadeIn.duration(200).easing(
  Easing.in(Easing.ease)
);

/**
 * Default icon sizes for different avatar sizes
 */
export const AVATAR_DEFAULT_ICON_SIZE: Record<AvatarSize, number> = {
  sm: 14,
  md: 16,
  lg: 20,
};
