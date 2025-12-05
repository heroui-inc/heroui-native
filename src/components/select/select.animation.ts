import { createContext } from '../../helpers/utils';
import type { SelectAnimationContextValue } from './select.types';

const [SelectAnimationProvider, useSelectAnimation] =
  createContext<SelectAnimationContextValue>({
    name: 'SelectAnimationContext',
  });

export { SelectAnimationProvider, useSelectAnimation };
