import type {
  ForceMountable,
  PressableRef,
  SlottablePressableProps,
  SlottableTextProps,
  SlottableViewProps,
  TextRef,
  ViewRef,
} from '../../helpers/types';

/**
 * Props for the Tabs root component
 */
type RootProps = SlottableViewProps & {
  /** Currently active tab value */
  value: string;
  /** Callback when the active tab changes */
  onValueChange: (value: string) => void;
};

/** Ref type for Tabs root */
type RootRef = ViewRef;

/** Props for the Tabs list container */
type ListProps = SlottableViewProps;
/** Ref type for Tabs list */
type ListRef = ViewRef;

/**
 * Props for individual tab triggers
 */
type TriggerProps = SlottablePressableProps & {
  /** Unique value to identify this tab */
  value: string;
};
/** Ref type for tab trigger */
type TriggerRef = PressableRef;

/**
 * Props for tab trigger labels
 */
type LabelProps = SlottableTextProps;
/** Ref type for tab label */
type LabelRef = TextRef;

/**
 * Props for tab indicator
 */
type IndicatorProps = SlottableViewProps;
/** Ref type for tab indicator */
type IndicatorRef = ViewRef;

/**
 * Props for tab content panels
 */
type ContentProps = SlottableViewProps &
  ForceMountable & {
    /** Value of the tab this content belongs to */
    value: string;
  };
/** Ref type for tab content */
type ContentRef = ViewRef;

export type {
  ContentProps,
  ContentRef,
  IndicatorProps,
  IndicatorRef,
  LabelProps,
  LabelRef,
  ListProps,
  ListRef,
  RootProps,
  RootRef,
  TriggerProps,
  TriggerRef,
};
