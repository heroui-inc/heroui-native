import { createContext } from '../../helpers/internal/utils';
import type { PopoverAnimationContextValue } from './popover.types';

const [PopoverAnimationProvider, usePopoverAnimation] =
  createContext<PopoverAnimationContextValue>({
    name: 'PopoverAnimationContext',
  });

export { PopoverAnimationProvider, usePopoverAnimation };
