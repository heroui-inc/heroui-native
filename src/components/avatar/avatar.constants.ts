import { Easing, FadeIn } from 'react-native-reanimated';

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
