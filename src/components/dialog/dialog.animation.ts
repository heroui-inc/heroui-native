import { createContext } from '../../helpers/utils';
import type { DialogAnimationContextValue } from './dialog.types';

const [DialogAnimationProvider, useDialogAnimation] =
  createContext<DialogAnimationContextValue>({
    name: 'DialogAnimationContext',
  });

export { DialogAnimationProvider, useDialogAnimation };
