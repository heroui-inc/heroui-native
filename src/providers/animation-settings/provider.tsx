import React from 'react';
import { createContext } from '../../helpers/utils';
import type {
  GlobalAnimationSettingsContextValue,
  GlobalAnimationSettingsProviderProps,
} from './types';

const [GlobalAnimationSettingsProvider, useGlobalAnimationSettings] =
  createContext<GlobalAnimationSettingsContextValue>({
    name: 'GlobalAnimationSettingsContext',
    strict: false,
  });

export { useGlobalAnimationSettings };

/**
 * GlobalAnimationSettingsProvider Component
 *
 * @description
 * Provider component that controls global animation settings across the application.
 * When animation is set to 'disable-all', all animations will be disabled globally.
 *
 * This provider wraps AnimationSettingsProvider to cascade the global setting
 * down through the component tree.
 *
 * @param {GlobalAnimationSettingsProviderProps} props - Provider props
 * @param {AnimationRootDisableAll} [props.animation] - Global animation setting
 * @param {ReactNode} props.children - Child components to wrap
 */
export const GlobalAnimationSettingsProviderComponent: React.FC<
  GlobalAnimationSettingsProviderProps
> = ({ animation, children }) => {
  const globalIsAllAnimationsDisabled = animation === 'disable-all';

  return (
    <GlobalAnimationSettingsProvider value={{ globalIsAllAnimationsDisabled }}>
      {children}
    </GlobalAnimationSettingsProvider>
  );
};

export default GlobalAnimationSettingsProviderComponent;
