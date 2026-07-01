import { createContext } from '../../helpers/internal/utils';
import type { TextInputComponentContextValue } from './types';

const [TextInputComponentProvider, useTextInputComponent] =
  createContext<TextInputComponentContextValue>({
    name: 'TextInputComponentContext',
  });

export { TextInputComponentProvider, useTextInputComponent };
