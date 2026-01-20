import { createContext } from '../../helpers/internal/utils';
import type { SelectAnimationContextValue } from './select.types';

const [SelectAnimationProvider, useSelectAnimation] =
  createContext<SelectAnimationContextValue>({
    name: 'SelectAnimationContext',
  });

export { SelectAnimationProvider, useSelectAnimation };
