import type { TextProps } from 'react-native';
import type { TextRef } from '../../helpers/types/primitives';

/**
 * Props for the Description component
 */
export interface DescriptionProps extends TextProps {
  /**
   * Description text content
   */
  children?: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Native ID for accessibility. Used to link description to form fields via aria-describedby.
   * When provided, form fields can reference this description using aria-describedby={nativeID}.
   */
  nativeID?: string;
}

/**
 * Reference type for the Description component
 */
export type DescriptionRef = TextRef;
