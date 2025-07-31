import type {
  SlottableTextProps,
  SlottableViewProps,
} from '@/helpers/types/primitives';
import type { ElementSlots } from '@/theme';
import type { TextInputProps } from 'react-native';
import type { InputSlots, LabelSlots } from './text-field.styles';

/**
 * Props for the TextField.Root component
 */
export interface TextFieldRootProps extends SlottableViewProps {
  /**
   * Children elements to be rendered inside the root container
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Whether the entire text field is disabled
   * @default false
   */
  isDisabled?: boolean;
}

/**
 * Props for the TextField.Label component
 */
export interface TextFieldLabelProps extends SlottableViewProps {
  /**
   * Children elements to be rendered as the label text
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Additional CSS classes for different parts of the label
   */
  classNames?: ElementSlots<LabelSlots>;
  /**
   * Whether to hide the asterisk for required fields
   * @default false
   */
  hideAsterisk?: boolean;
}

/**
 * Props for the TextField.Input component
 */
export interface TextFieldInputProps extends TextInputProps {
  /**
   * Children elements to be rendered inside the input container
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Additional CSS classes for different parts of the input
   */
  classNames?: ElementSlots<InputSlots>;
}

/**
 * Props for the TextField.InputStartContent component
 */
export interface TextFieldInputStartContentProps extends SlottableViewProps {
  /**
   * Children elements to be rendered at the start of the input
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for the TextField.InputEndContent component
 */
export interface TextFieldInputEndContentProps extends SlottableViewProps {
  /**
   * Children elements to be rendered at the end of the input
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for the TextField.Description component
 */
export interface TextFieldDescriptionProps extends SlottableTextProps {
  /**
   * Children elements to be rendered as the description text
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}
