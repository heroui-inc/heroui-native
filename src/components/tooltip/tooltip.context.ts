import { createContext } from '../../helpers/internal/utils';
import type {
  TooltipContentContextValue,
  TooltipTriggerContextValue,
} from './tooltip.types';

/**
 * Provides trigger configuration (mode, delay) from Root to Trigger.
 */
const [TooltipTriggerProvider, useTooltipTrigger] =
  createContext<TooltipTriggerContextValue>({
    name: 'TooltipTriggerContext',
  });

/**
 * Provides resolved placement from Content to Arrow.
 */
const [TooltipContentProvider, useTooltipContent] =
  createContext<TooltipContentContextValue>({
    name: 'TooltipContentContext',
    strict: false,
  });

export {
  TooltipContentProvider,
  TooltipTriggerProvider,
  useTooltipContent,
  useTooltipTrigger,
};
