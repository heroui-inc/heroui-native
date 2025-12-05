import type { SharedValue } from 'react-native-reanimated';
import { createContext } from '../../helpers/utils';
import type { SelectState } from './select.types';

/**
 * Context value for select animation state
 */
export interface SelectAnimationContextValue {
  /** Extended internal state for animation control */
  selectState: SelectState;
  /** Animation progress shared value (0=idle, 1=open, 2=close) */
  progress: SharedValue<number>;
  /** Dragging state shared value */
  isDragging: SharedValue<boolean>;
  /** Gesture release animation running state shared value */
  isGestureReleaseAnimationRunning: SharedValue<boolean>;
}

const [SelectAnimationProvider, useSelectAnimation] =
  createContext<SelectAnimationContextValue>({
    name: 'SelectAnimationContext',
  });

export { SelectAnimationProvider, useSelectAnimation };
