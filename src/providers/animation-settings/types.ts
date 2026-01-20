import type { ReactNode } from 'react';
import type { AnimationRootDisableAll } from '../../helpers/internal/types/animation';

/**
 * Props for GlobalAnimationSettingsProvider component
 */
export interface GlobalAnimationSettingsProviderProps {
  /**
   * Global animation setting
   * When set to 'disable-all', all animations across the app will be disabled
   */
  animation?: AnimationRootDisableAll;
  /**
   * Child components to render within the provider
   */
  children: ReactNode;
}

/**
 * Context value for global animation settings
 */
export interface GlobalAnimationSettingsContextValue {
  /**
   * Whether all animations should be disabled globally
   */
  globalIsAllAnimationsDisabled: boolean;
}
