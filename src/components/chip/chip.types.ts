import type { SlottableViewProps } from '@/helpers/types';
import type { ViewProps } from 'react-native';

/**
 * Chip size variants
 */
export type ChipSize = 'sm' | 'md' | 'lg';

/**
 * Chip variant types
 */
export type ChipVariant = 'primary' | 'secondary' | 'tertiary';

/**
 * Chip color variants
 */
export type ChipColor = 'accent' | 'default' | 'success' | 'warning' | 'danger';

/**
 * Props for the main Chip component
 */
export interface ChipProps extends SlottableViewProps {
  /** Child elements to render inside the chip */
  children?: React.ReactNode;

  /** Visual variant of the chip @default 'primary' */
  variant?: ChipVariant;

  /** Size of the chip @default 'md' */
  size?: ChipSize;

  /** Color theme of the chip @default 'accent' */
  color?: ChipColor;

  /** Custom class name for the chip */
  className?: string;
}

/**
 * Props for the ChipStartContent component
 */
export interface ChipStartContentProps extends ViewProps {
  /** Child elements to render inside the start content */
  children?: React.ReactNode;

  /** Custom class name for the start content */
  className?: string;
}

/**
 * Props for the ChipLabel component
 */
export interface ChipLabelProps extends ViewProps {
  /** Child elements to render as the label */
  children?: React.ReactNode;

  /** Custom class name for the label */
  className?: string;
}

/**
 * Props for the ChipEndContent component
 */
export interface ChipEndContentProps extends ViewProps {
  /** Child elements to render inside the end content */
  children?: React.ReactNode;

  /** Custom class name for the end content */
  className?: string;
}

/**
 * Context value for chip components
 */
export interface ChipContextValue {
  /** Size of the chip */
  size: ChipSize;

  /** Variant of the chip */
  variant: ChipVariant;

  /** Color theme of the chip */
  color: ChipColor;
}
