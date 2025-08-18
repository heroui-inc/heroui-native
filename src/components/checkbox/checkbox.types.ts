import type { ViewProps } from 'react-native';
import type { TimingConfig } from '../../helpers/types';
import * as CheckboxPrimitivesTypes from '../../primitives/checkbox/checkbox.types';

/**
 * Base checkbox color variants
 */
export type CheckboxColor = 'default' | 'success' | 'warning' | 'danger';

/**
 * Custom colors for checkbox border states
 */
export interface CheckboxBorderColors {
  /** Border color when checkbox is not selected */
  defaultBorder?: string;
  /** Border color when checkbox is selected */
  selectedBorder?: string;
}

/**
 * Custom colors for checkbox background states
 */
export interface CheckboxBackgroundColors {
  /** Background color when checkbox is not selected */
  defaultBackground?: string;
  /** Background color when checkbox is selected */
  selectedBackground?: string;
}

/**
 * Checkbox Indicator Icon Props
 */
export interface CheckboxIndicatorIconProps {
  /** Indicator size */
  size?: number;
  /** Indicator stroke width */
  strokeWidth?: number;
  /** Indicator color */
  color?: string;
}

/**
 * Props for the main Checkbox component
 */
export interface CheckboxProps extends CheckboxPrimitivesTypes.RootProps {
  /** Child elements to render inside the checkbox */
  children?: React.ReactNode;

  /** Color theme of the checkbox @default 'default' */
  color?: CheckboxColor;

  /** Whether the checkbox is invalid @default false */
  isInvalid?: boolean;

  /** Custom class name for the checkbox */
  className?: string;

  /** Custom colors for different checkbox states */
  colors?: CheckboxBorderColors;

  /** Animation configuration for checkbox border color transition */
  animationConfig?: TimingConfig;
}

/**
 * Props for the CheckboxBackground component
 */
export interface CheckboxBackgroundProps extends ViewProps {
  /** Child elements to render inside the background */
  children?: React.ReactNode;

  /** Custom class name for the background */
  className?: string;

  /** Custom colors for different checkbox background states */
  colors?: CheckboxBackgroundColors;

  /** Animation configuration for checkbox background color transition */
  animationConfig?: TimingConfig;
}

/**
 * Props for the CheckboxIndicator component
 */
export interface CheckboxIndicatorProps
  extends CheckboxPrimitivesTypes.IndicatorProps {
  /** Custom class name for the indicator */
  className?: string;

  /** Custom icon props for the indicator */
  iconProps?: CheckboxIndicatorIconProps;

  /** Animation configuration for checkbox indicator scale transition */
  animationConfig?: TimingConfig;
}

/**
 * Context value for checkbox components
 */
export interface CheckboxContextValue
  extends Pick<CheckboxProps, 'isSelected'> {
  /** Color theme of the checkbox */
  color: CheckboxColor;
}
