import {
  type ForceMountable,
  type PressableRef,
  type SlottablePressableProps,
  type SlottableViewProps,
  type ViewRef,
} from '@/helpers/types';

/**
 * Props for the radio group root component.
 *
 * @extends SlottableViewProps Inherits view props except 'disabled'
 */
type RootProps = Omit<SlottableViewProps, 'disabled'> & {
  /** The currently selected value of the radio group */
  value: string | undefined;
  /** Callback fired when the selected value changes */
  onValueChange: (val: string) => void;
  /** Whether the entire radio group is disabled */
  isDisabled?: boolean;
};

/**
 * Props for the radio group item component.
 *
 * @extends SlottablePressableProps Inherits pressable props except 'disabled'
 */
type ItemProps = Omit<SlottablePressableProps, 'disabled'> & {
  /** Whether this specific radio item is disabled */
  'isDisabled'?: boolean;
  /** The value associated with this radio item */
  'value': string;
  /** ID of the element that labels this radio item */
  'aria-labelledby'?: string;
};

/**
 * Props for the radio group indicator component.
 *
 * @extends SlottableViewProps Inherits view props
 * @extends ForceMountable Supports forced mounting behavior
 */
type IndicatorProps = SlottableViewProps & ForceMountable;

/** Reference type for the radio group root component */
type RootRef = ViewRef;

/** Reference type for the radio group item component */
type ItemRef = PressableRef;

/** Reference type for the radio group indicator component */
type IndicatorRef = ViewRef;

export type {
  IndicatorProps,
  IndicatorRef,
  ItemProps,
  ItemRef,
  RootProps,
  RootRef,
};
