import type {
  PressableRef,
  SlottablePressableProps,
  SlottableViewProps,
  ViewRef,
} from '@/helpers/types';

/**
 * Props for the checkbox root component.
 *
 * @extends SlottablePressableProps Inherits pressable props except 'disabled'
 */
type RootProps = Omit<SlottablePressableProps, 'disabled'> & {
  /** Whether the checkbox is currently selected */
  isSelected: boolean;
  /** Callback fired when the checkbox selection state changes */
  onSelectedChange: (isSelected: boolean) => void;
  /** Whether the checkbox is disabled and cannot be interacted with */
  isDisabled?: boolean;
};

/**
 * Props for the checkbox indicator component.
 *
 * @extends SlottableViewProps Inherits view props except 'disabled'
 */
type IndicatorProps = Omit<SlottableViewProps, 'disabled'>;

/** Reference type for the checkbox root component */
type RootRef = PressableRef;

/** Reference type for the checkbox indicator component */
type IndicatorRef = ViewRef;

export type { IndicatorProps, IndicatorRef, RootProps, RootRef };
