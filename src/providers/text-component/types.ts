import type { TextProps } from 'react-native';

/**
 * Props for helper text component
 */
export type TextComponentProps = Omit<TextProps, 'children'> & {
  className?: string;
};

/**
 * Context value for text component configuration
 */
export interface TextComponentContextValue {
  textProps?: TextComponentProps;
}
