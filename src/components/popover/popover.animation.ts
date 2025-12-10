import { createContext } from '../../helpers/utils';
import type { PopoverAnimationContextValue } from './popover.types';

const [PopoverAnimationProvider, usePopoverAnimation] =
  createContext<PopoverAnimationContextValue>({
    name: 'PopoverAnimationContext',
  });

export { PopoverAnimationProvider, usePopoverAnimation };
