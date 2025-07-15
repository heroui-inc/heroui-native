import type {
  PressableRef,
  SlottablePressableProps,
  SlottableViewProps,
  ViewRef,
} from '@/helpers/types';

/**
 * Props for the primitive Root Switch component
 * Extends SlottablePressableProps to support slot-based styling and pressable behavior
 */
interface RootProps extends SlottablePressableProps {
  /**
   * Whether the switch is currently selected/checked
   * @type {boolean}
   */
  isSelected: boolean;

  /**
   * Callback function fired when the switch selection state changes
   * @param {boolean} isSelected - The new selection state
   * @type {(isSelected: boolean) => void}
   */
  onSelectedChange: (isSelected: boolean) => void;

  /**
   * Whether the switch is disabled and cannot be interacted with
   * @type {boolean | undefined}
   * @default false
   */
  isDisabled?: boolean;
}

/**
 * Props for the primitive Switch Thumb component
 * Extends SlottableViewProps to support slot-based styling for the thumb element
 * @type {SlottableViewProps}
 */
type ThumbProps = SlottableViewProps;

/**
 * Ref type for the primitive Root Switch component
 * Uses PressableRef since the root element is a Pressable component
 * @type {PressableRef}
 */
type RootRef = PressableRef;

/**
 * Ref type for the primitive Switch Thumb component
 * Uses ViewRef since the thumb element is a View component
 * @type {ViewRef}
 */
type ThumbRef = ViewRef;

export type { RootProps, RootRef, ThumbProps, ThumbRef };
