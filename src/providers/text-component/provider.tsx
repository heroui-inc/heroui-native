import { createContext } from '../../helpers/utils';
import type { TextComponentContextValue } from './types';

const [TextComponentProvider, useTextComponent] =
  createContext<TextComponentContextValue>({
    name: 'TextComponentContext',
  });

export { TextComponentProvider, useTextComponent };
