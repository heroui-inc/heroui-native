import type {
  ForceMountable,
  PressableRef,
  SlottablePressableProps,
  SlottableViewProps,
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
  ListProps,
  ListRef,
  RootProps,
  RootRef,
  TriggerProps,
  TriggerRef,
};
