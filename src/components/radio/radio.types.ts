import type { TextProps as LabelTextProps } from '@/primitives/label';
import type {
  IndicatorProps,
  IndicatorRef,
  ItemProps,
  ItemRef,
  RootProps,
  RootRef,
} from '@/primitives/radio-group';
import type { TextProps, ViewProps } from 'react-native';
import type { EasingFunction } from 'react-native-reanimated';

/**
 * Radio size variant
 * @default 'md'
 */
export type RadioSize = 'sm' | 'md' | 'lg';

/**
 * Radio color variant
 * @default 'default'
 */
export type RadioColor = 'default' | 'success' | 'warning' | 'danger';

/**
 * Custom color configuration for Radio
 */
export interface RadioColors {
  /** Border color when not selected */
  defaultBorder?: string;
  /** Border color when selected */
  selectedBorder?: string;
  /** Background color when not selected */
  defaultBackground?: string;
  /** Background color when selected */
  selectedBackground?: string;
  /** Thumb color when selected */
  selectedThumb?: string;
}

/**
 * Animation configuration for Radio transitions
 */
export interface RadioAnimationConfig {
  /** Animation duration in milliseconds */
  duration?: number;
  /** Easing function for animations */
  easing?: EasingFunction;
  /** Spring animation config */
  spring?: {
    damping?: number;
    stiffness?: number;
    mass?: number;
  };
}

/**
 * Props for RadioGroup root component
 */
export interface RadioGroupProps extends Omit<RootProps, 'asChild'> {
  ref?: React.RefObject<RootRef>;
  /** Radio group content */
  children?: React.ReactNode;
  /** Custom class name */
  className?: string;
}

/**
 * Context values shared between Radio compound components
 */
export interface RadioContextValue {
  /** Current size variant */
  size: RadioSize;
  /** Current color variant */
  color: RadioColor;
  /** Whether the radio is selected */
  isSelected: boolean;
  /** Whether the radio is disabled */
  isDisabled?: boolean;
  /** Whether the radio is read-only */
  isReadOnly?: boolean;
}

/**
 * Props for the Radio component
 */
export interface RadioProps extends ItemProps {
  ref?: React.RefObject<ItemRef>;
  /** Radio content */
  children?: React.ReactNode;
  /** Size variant */
  size?: RadioSize;
  /** Color variant */
  color?: RadioColor;
  /** Alignment of the indicator */
  alignIndicator?: 'start' | 'end';
  /** Whether the radio is read-only */
  isReadOnly?: boolean;
  /** Custom class name */
  className?: string;
  /** Animation configuration */
  animationConfig?: RadioAnimationConfig;
}

/**
 * Props for RadioGroup.Indicator component
 */
export interface RadioIndicatorProps extends ViewProps {
  /** Indicator content */
  children?: React.ReactNode;
  /** Custom class name */
  className?: string;
  /** Custom border colors */
  colors?: Pick<RadioColors, 'defaultBorder' | 'selectedBorder'>;
  /** Animation configuration */
  animationConfig?: RadioAnimationConfig;
}

/**
 * Props for RadioGroup.Background component
 */
export interface RadioBackgroundProps extends IndicatorProps {
  ref?: React.RefObject<IndicatorRef>;
  /** Background content */
  children?: React.ReactNode;
  /** Custom class name */
  className?: string;
  /** Custom background colors */
  colors?: Pick<RadioColors, 'defaultBackground' | 'selectedBackground'>;
  /** Animation configuration */
  animationConfig?: RadioAnimationConfig;
}

/**
 * Props for RadioGroup.Thumb component
 */
export interface RadioThumbProps extends ViewProps {
  /** Thumb content */
  children?: React.ReactNode;
  /** Custom class name */
  className?: string;
  /** Custom thumb colors */
  colors?: Pick<RadioColors, 'selectedThumb'>;
  /** Animation configuration */
  animationConfig?: RadioAnimationConfig;
}

/**
 * Props for Radio.Content component
 */
export interface RadioContentProps extends ViewProps {
  /** Content children */
  children?: React.ReactNode;
  /** Custom class name */
  className?: string;
}

/**
 * Props for Radio.Label component
 */
export interface RadioLabelProps extends LabelTextProps {
  /** Label content */
  children?: React.ReactNode;
  /** Custom class name */
  className?: string;
}

/**
 * Props for Radio.Description component
 */
export interface RadioDescriptionProps extends TextProps {
  /** Description content */
  children?: React.ReactNode;
  /** Custom class name */
  className?: string;
}
