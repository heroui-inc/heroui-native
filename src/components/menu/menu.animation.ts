import { createContext } from '../../helpers/internal/utils';
import type { MenuAnimationContextValue } from './menu.types';

const [MenuAnimationProvider, useMenuAnimation] =
  createContext<MenuAnimationContextValue>({
    name: 'MenuAnimationContext',
  });

export { MenuAnimationProvider, useMenuAnimation };
