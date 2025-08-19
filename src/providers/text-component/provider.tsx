import { createContext } from '../../helpers/utils';
import type { TextComponentContextValue } from './types';

const [TextComponentProvider, useTextComponentContext] =
  createContext<TextComponentContextValue>({
    name: 'TextComponentContext',
  });

export { TextComponentProvider, useTextComponentContext };
