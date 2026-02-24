import type {
  PressableRef,
  SlottablePressableProps,
  SlottableTextProps,
  SlottableViewProps,
  TextRef,
  ViewRef,
} from '../../helpers/internal/types';

/** Key type for identifying tags within a TagGroup */
type TagKey = string | number;

/** Selection mode for the TagGroup */
type SelectionMode = 'none' | 'single' | 'multiple';

/**
 * Props for the TagGroup root component.
 * Manages selection state, disabled keys, and remove functionality.
 *
 * @extends SlottableViewProps Inherits view props with asChild support
 */
type RootProps = SlottableViewProps & {
  /** The type of selection allowed in the tag group @default "none" */
  selectionMode?: SelectionMode;
  /** The currently selected keys (controlled) */
  selectedKeys?: Iterable<TagKey>;
  /** The initial selected keys (uncontrolled) */
  defaultSelectedKeys?: Iterable<TagKey>;
  /** Handler called when the selection changes */
  onSelectionChange?: (keys: Set<TagKey>) => void;
  /** Keys of tags that should be disabled */
  disabledKeys?: Iterable<TagKey>;
  /** Whether the entire tag group is disabled */
  isDisabled?: boolean;
  /** Handler called when tags are removed */
  onRemove?: (keys: Set<TagKey>) => void;
};

/**
 * Props for the TagGroup list container component.
 *
 * @extends SlottableViewProps Inherits view props with asChild support
 */
type ListProps = SlottableViewProps;

/**
 * Props for an individual tag item component.
 *
 * @extends SlottablePressableProps Inherits pressable props with asChild support
 */
type ItemProps = Omit<SlottablePressableProps, 'id'> & {
  /** Unique identifier for this tag */
  id: TagKey;
  /** Whether this specific tag is disabled */
  isDisabled?: boolean;
};

/**
 * Props for the tag item label component.
 * Renders the text content of a tag and provides accessibility labeling.
 *
 * @extends SlottableTextProps Inherits text props with asChild support
 */
type ItemLabelProps = SlottableTextProps;

/**
 * Props for the tag remove button component.
 *
 * @extends SlottablePressableProps Inherits pressable props with asChild support
 */
type RemoveButtonProps = SlottablePressableProps;

/** Reference type for the TagGroup root component */
type RootRef = ViewRef;

/** Reference type for the TagGroup list component */
type ListRef = ViewRef;

/** Reference type for the tag item component */
type ItemRef = PressableRef;

/** Reference type for the tag item label component */
type ItemLabelRef = TextRef;

/** Reference type for the tag remove button component */
type RemoveButtonRef = PressableRef;

export type {
  ItemLabelProps,
  ItemLabelRef,
  ItemProps,
  ItemRef,
  ListProps,
  ListRef,
  RemoveButtonProps,
  RemoveButtonRef,
  RootProps,
  RootRef,
  SelectionMode,
  TagKey,
};
