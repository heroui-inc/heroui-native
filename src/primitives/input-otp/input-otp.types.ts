import type {
  BlurEvent,
  FocusEvent,
  PressableProps,
  TextInput,
  TextInputProps,
} from 'react-native';
import type { SlottableViewProps, ViewRef } from '../../helpers/internal/types';

/**
 * Slot data structure for each OTP slot
 */
export type SlotData = {
  /** Zero-based index of the slot */
  index: number;
  /** The character at this slot index, or null if empty */
  char: string | null;
  /** Placeholder character for this slot, or null if not applicable */
  placeholderChar: string | null;
  /** Whether this slot is currently active (where cursor is) */
  isActive: boolean;
  /** Whether to show fake caret (when active but empty) */
  isCaretVisible: boolean;
};

/**
 * Internal context type for the InputOTP root component
 */
export type InputOTPContext = {
  /** Current OTP value */
  value: string;
  /** Maximum length of the OTP */
  maxLength: number;
  /** Whether the input is currently focused */
  isFocused: boolean;
  /** Whether the input is disabled */
  isDisabled: boolean;
  /** Whether the input is in an invalid state */
  isInvalid: boolean;
  /** Variant style for the input OTP */
  variant?: 'primary' | 'secondary';
  /** Array of slot data for each position */
  slots: SlotData[];
  /** Placeholder text color for all slots */
  placeholderTextColor?: TextInputProps['placeholderTextColor'];
  /** Placeholder text class name for all slots */
  placeholderTextClassName?: string | undefined;
  /** Event handlers */
  handlers: {
    /** Handler for text changes */
    onChangeText: (text: string) => void;
    /** Handler for focus events */
    onFocus: (e: FocusEvent) => void;
    /** Handler for blur events */
    onBlur: (e: BlurEvent) => void;
  };
  /** Imperative actions */
  actions: {
    /** Focus the input */
    focus: () => void;
    /** Clear the input value */
    clear: () => void;
  };
  /** Ref to the underlying TextInput */
  inputRef: React.RefObject<TextInput | null>;
};

/**
 * Props for the InputOTP root component
 */
export type RootProps = {
  /** Children elements */
  children?: React.ReactNode;
  /** Maximum length of the OTP (required) */
  maxLength: number;
  /** Whether the input is disabled @default false */
  isDisabled?: boolean;
  /** Whether the input is in an invalid state @default false */
  isInvalid?: boolean;
  /** Variant style for the input OTP */
  variant?: 'primary' | 'secondary';
  /** Regex pattern for allowed characters (e.g., REGEXP_ONLY_DIGITS) */
  pattern?: string;
  /** Input mode for the input */
  inputMode?: TextInputProps['inputMode'];
  /** Transform pasted text (e.g., remove hyphens) */
  pasteTransformer?: (text: string) => string;
  /** Placeholder text for the input */
  placeholder?: TextInputProps['placeholder'];
  /** Placeholder text color for the input */
  placeholderTextColor?: TextInputProps['placeholderTextColor'];
  /** Placeholder text class name for the input */
  placeholderTextClassName?: string | undefined;
  /** Controlled value */
  value?: TextInputProps['value'];
  /** Default value for uncontrolled usage */
  defaultValue?: TextInputProps['defaultValue'];
  /** Callback when value changes */
  onChange?: TextInputProps['onChangeText'];
  /** Handler for focus events */
  onFocus?: TextInputProps['onFocus'];
  /** Handler for blur events */
  onBlur?: TextInputProps['onBlur'];
  /** Handler called when all slots are filled */
  onComplete?: (value: string) => void;
  /** Rest props to pass to the underlying TextInput component */
  textInputProps?: Omit<
    TextInputProps,
    | 'value'
    | 'onChangeText'
    | 'maxLength'
    | 'placeholder'
    | 'placeholderTextColor'
    | 'placeholderTextClassName'
    | 'style'
    | 'className'
    | 'inputMode'
    | 'onFocus'
    | 'onBlur'
  >;
  /** Style to pass to the container Pressable component */
  style?: PressableProps['style'];
  /** Additional CSS classes for the container Pressable component */
  className?: string;
};

/**
 * Ref type for InputOTP root component
 * Provides imperative methods to control the input
 */
export type RootRef = {
  /** Set the OTP value programmatically */
  setValue: (value: string) => void;
  /** Focus the input */
  focus: () => void;
  /** Blur the input */
  blur: () => void;
  /** Clear the input value */
  clear: () => void;
};

/**
 * Props for the InputOTP.Group component
 */
export type GroupProps = SlottableViewProps;

/** Ref type for InputOTP.Group */
export type GroupRef = ViewRef;

/**
 * Props for the InputOTP.Slot component
 */
export type SlotProps = SlottableViewProps & {
  /** Zero-based index of the slot (required) */
  index: number;
  /** Additional CSS classes for the slot */
  className?: string;
};

/** Ref type for InputOTP.Slot */
export type SlotRef = ViewRef;

/**
 * Props for the InputOTP.Separator component
 */
export type SeparatorProps = SlottableViewProps;

/** Ref type for InputOTP.Separator */
export type SeparatorRef = ViewRef;
