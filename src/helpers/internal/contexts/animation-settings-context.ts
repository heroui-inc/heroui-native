import { createContext } from '../utils';

/**
 * Context value for global animation settings
 */
export interface AnimationSettingsContextValue {
  /**
   * Whether all animations should be disabled (cascading from parent)
   */
  isAllAnimationsDisabled: boolean;
}

const [AnimationSettingsProvider, useAnimationSettings] =
  createContext<AnimationSettingsContextValue>({
    name: 'AnimationSettingsContext',
    strict: false,
  });

export { AnimationSettingsProvider, useAnimationSettings };
