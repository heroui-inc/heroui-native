import type { ViewProps } from 'react-native';
import type { AnimatedProps } from 'react-native-reanimated';
import type { SpringConfig, TimingConfig } from '../../helpers/types';
import type { ItemProps, RootProps } from '../../primitives/radio-group';
import type { ErrorViewRootProps } from '../error-view/error-view.types';
import type {
  FormFieldDescriptionProps,
  FormFieldTitleProps,
} from '../form-field';

/**
 * Props for RadioGroup root component
 */
export interface RadioGroupProps extends Omit<RootProps, 'asChild'> {
  /** Radio group content */
  children?: React.ReactNode;
  /** Custom class name */
  className?: string;
}

/**
 * Props for RadioGroup.ErrorMessage component
 */
export interface RadioGroupErrorMessageProps extends ErrorViewRootProps {}

/**
 * RadioGroupItem color variant
 * @default 'default'
 */
export type RadioGroupItemColor = 'default' | 'success' | 'warning' | 'danger';

/**
 * Custom color configuration for RadioGroupItem
 */
export interface RadioGroupItemColors {
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
 * Context values shared between RadioGroupItem compound components
 */
export interface RadioGroupItemContextValue {
  /** Current color variant */
  color: RadioGroupItemColor;
  /** Whether the radio item is selected */
  isSelected: boolean;
  /** Whether the radio item is disabled */
  isDisabled?: boolean;
}

/**
 * Props for the RadioGroupItem component
 */
export interface RadioGroupItemProps extends ItemProps {
  /** Radio item content */
  children?: React.ReactNode;
  /** Color variant */
  color?: RadioGroupItemColor;
  /** Alignment of the indicator */
  alignIndicator?: 'start' | 'end';
  /** Whether the radio item is invalid @default false */
  isInvalid?: boolean;
  /** Custom class name */
  className?: string;
}

/**
 * Props for RadioGroupItem.Indicator component
 */
export interface RadioGroupItemIndicatorProps extends AnimatedProps<ViewProps> {
  /** Indicator content */
  children?: React.ReactNode;
  /** Custom class name */
  className?: string;
  /** Custom border colors */
  colors?: Pick<RadioGroupItemColors, 'defaultBorder' | 'selectedBorder'>;
  /** Animation configuration */
  animationConfig?: TimingConfig;
}

/**
 * Props for RadioGroupItem.IndicatorBackground component
 */
export interface RadioGroupItemIndicatorBackgroundProps
  extends AnimatedProps<ViewProps> {
  /** Background content */
  children?: React.ReactNode;
  /** Custom class name */
  className?: string;
  /** Custom background colors */
  colors?: Pick<
    RadioGroupItemColors,
    'defaultBackground' | 'selectedBackground'
  >;
}

/**
 * Props for RadioGroupItem.IndicatorThumb component
 */
export interface RadioGroupItemIndicatorThumbProps
  extends AnimatedProps<ViewProps> {
  /** Thumb content */
  children?: React.ReactNode;
  /** Custom class name */
  className?: string;
  /** Custom thumb colors */
  colors?: Pick<RadioGroupItemColors, 'selectedThumb'>;
  /** Animation configuration */
  animationConfig?: SpringConfig;
}

/**
 * Props for RadioGroupItem.Content component
 */
export interface RadioGroupItemContentProps extends ViewProps {
  /** Content children */
  children?: React.ReactNode;
  /** Custom class name */
  className?: string;
}

/**
 * Props for RadioGroupItem.Title component
 */
export interface RadioGroupItemTitleProps extends FormFieldTitleProps {}

/**
 * Props for RadioGroupItem.Description component
 */
export interface RadioGroupItemDescriptionProps
  extends FormFieldDescriptionProps {}
