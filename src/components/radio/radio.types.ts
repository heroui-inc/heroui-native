import type { ViewProps } from 'react-native';
import type { AnimatedProps } from 'react-native-reanimated';
import type { SpringConfig, TimingConfig } from '../../helpers/types';
import type { ItemProps } from '../../primitives/radio-group';
import type {
  FormFieldDescriptionProps,
  FormFieldLabelProps,
} from '../form-field';

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
 * Context values shared between Radio compound components
 */
export interface RadioContextValue {
  /** Current color variant */
  color: RadioColor;
  /** Whether the radio is selected */
  isSelected: boolean;
  /** Whether the radio is disabled */
  isDisabled?: boolean;
}

/**
 * Props for the Radio component
 */
export interface RadioProps extends ItemProps {
  /** Radio content */
  children?: React.ReactNode;
  /** Color variant */
  color?: RadioColor;
  /** Alignment of the indicator */
  alignIndicator?: 'start' | 'end';
  /** Whether the radio is invalid @default false */
  isInvalid?: boolean;
  /** Custom class name */
  className?: string;
}

/**
 * Props for RadioGroup.Indicator component
 */
export interface RadioIndicatorProps extends AnimatedProps<ViewProps> {
  /** Indicator content */
  children?: React.ReactNode;
  /** Custom class name */
  className?: string;
  /** Custom border colors */
  colors?: Pick<RadioColors, 'defaultBorder' | 'selectedBorder'>;
  /** Animation configuration */
  animationConfig?: TimingConfig;
}

/**
 * Props for RadioGroup.Background component
 */
export interface RadioIndicatorBackgroundProps
  extends AnimatedProps<ViewProps> {
  /** Background content */
  children?: React.ReactNode;
  /** Custom class name */
  className?: string;
  /** Custom background colors */
  colors?: Pick<RadioColors, 'defaultBackground' | 'selectedBackground'>;
}

/**
 * Props for RadioGroup.Thumb component
 */
export interface RadioIndicatorThumbProps extends AnimatedProps<ViewProps> {
  /** Thumb content */
  children?: React.ReactNode;
  /** Custom class name */
  className?: string;
  /** Custom thumb colors */
  colors?: Pick<RadioColors, 'selectedThumb'>;
  /** Animation configuration */
  animationConfig?: SpringConfig;
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
export interface RadioLabelProps extends FormFieldLabelProps {}

/**
 * Props for Radio.Description component
 */
export interface RadioDescriptionProps extends FormFieldDescriptionProps {}
