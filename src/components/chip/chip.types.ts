import type { ViewProps } from 'react-native';
import type {
  AnimatedProps,
  BaseAnimationBuilder,
  LayoutAnimationFunction,
} from 'react-native-reanimated';
import type { ElementSlots } from '../../theme';
import type { LabelSlots } from './chip.styles';

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
export interface ChipProps extends AnimatedProps<ViewProps> {
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
 * Props for the ChipBackground component
 */
export interface ChipBackgroundProps extends AnimatedProps<ViewProps> {
  /** Content to be rendered as the chip background */
  children?: React.ReactNode;

  /** Custom class name for the background */
  className?: string;
}

/**
 * Props for the ChipStartContent component
 */
export interface ChipStartContentProps extends AnimatedProps<ViewProps> {
  /** Child elements to render inside the start content */
  children?: React.ReactNode;

  /** Custom class name for the start content */
  className?: string;
}

/**
 * Props for the ChipLabel component
 */
export interface ChipLabelProps extends AnimatedProps<ViewProps> {
  /** Child elements to render as the label. If string, will be wrapped in Text component */
  children?: React.ReactNode;

  /** Custom class name for the label */
  className?: string;

  /** Additional CSS classes for the different parts of the label */
  classNames?: ElementSlots<LabelSlots>;
}

/**
 * Props for the ChipEndContent component
 */
export interface ChipEndContentProps extends AnimatedProps<ViewProps> {
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

  /** Layout transition for animated components */
  layout?:
    | BaseAnimationBuilder
    | LayoutAnimationFunction
    | typeof BaseAnimationBuilder;
}
