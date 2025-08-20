import type {
  ForceMountable,
  PressableRef,
  SlottablePressableProps,
  SlottableViewProps,
  ViewRef,
} from '../../helpers/types';

/**
 * Internal context type for the Accordion root component
 */
type RootContext = {
  /** Whether the accordion allows single or multiple expanded items */
  selectionMode?: 'single' | 'multiple';
  /** Currently expanded item(s) - string for single, array for multiple */
  value: (string | undefined) | string[];
  /** Callback when expanded items change */
  onValueChange: (
    value: string | undefined
  ) => void | ((value: string[]) => void);
  /** Whether expanded items can be collapsed */
  isCollapsible: boolean;
  /** Whether all accordion items are disabled */
  isDisabled?: boolean;
};

/**
 * Props for single-selection accordion
 */
type SingleRootProps = {
  /** Single selection mode */
  selectionMode?: 'single';
  /** Default expanded item in uncontrolled mode */
  defaultValue?: string | undefined;
  /** Controlled expanded item */
  value?: string | undefined;
  /** Callback when the expanded item changes */
  onValueChange?: (value: string | undefined) => void;
};

/**
 * Props for multiple-selection accordion
 */
type MultipleRootProps = {
  /** Multiple selection mode */
  selectionMode?: 'multiple';
  /** Default expanded items in uncontrolled mode */
  defaultValue?: string[];
  /** Controlled expanded items */
  value?: string[];
  /** Callback when expanded items change */
  onValueChange?: (value: string[]) => void;
};

/**
 * Props for the Accordion root component
 */
type RootProps = (SingleRootProps | MultipleRootProps) & {
  /** Default expanded item(s) - type depends on single/multiple mode */
  defaultValue?: string | string[];
  /** Whether all accordion items are disabled */
  isDisabled?: boolean;
  /** Whether expanded items can be collapsed (defaults to true) */
  isCollapsible?: boolean;
} & SlottableViewProps;

type RootRef = ViewRef;

/**
 * Props for individual accordion items
 */
type ItemProps = {
  /** Unique value to identify this item */
  value: string;
  /** Whether this specific item is disabled */
  isDisabled?: boolean;
} & SlottableViewProps;

type ItemRef = ViewRef;

/** Props for accordion item content */
type ContentProps = ForceMountable & SlottableViewProps;
/** Ref type for accordion content */
type ContentRef = ViewRef;

/** Props for accordion item header */
type HeaderProps = SlottableViewProps;
/** Ref type for accordion header */
type HeaderRef = ViewRef;

/** Props for accordion item trigger */
type TriggerProps = Omit<SlottablePressableProps, 'disabled'> & {
  isDisabled?: boolean;
};
/** Ref type for accordion trigger */
type TriggerRef = PressableRef;

/** Props for accordion item indicator */
type IndicatorProps = SlottableViewProps;
/** Ref type for accordion indicator */
type IndicatorRef = ViewRef;

export type {
  ContentProps,
  ContentRef,
  HeaderProps,
  HeaderRef,
  IndicatorProps,
  IndicatorRef,
  ItemProps,
  ItemRef,
  RootContext,
  RootProps,
  RootRef,
  TriggerProps,
  TriggerRef,
};
