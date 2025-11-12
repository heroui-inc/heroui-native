import type {
  SharedValue,
  WithSpringConfig,
  WithTimingConfig,
} from 'react-native-reanimated';
import type { ElementSlots } from '../../helpers/theme/types';
import * as SwitchPrimitivesTypes from '../../primitives/switch/switch.types';
import type { RootSlots } from './switch.styles';

/**
 * Custom colors for switch states
 */
export interface SwitchColors {
  /** Border color when switch is not selected */
  defaultBorder?: string;
  /** Border color when switch is selected */
  selectedBorder?: string;
  /** Background color when switch is not selected */
  defaultBackground?: string;
  /** Background color when switch is selected */
  selectedBackground?: string;
}

/**
 * Props for the main Switch component
 */
export interface SwitchProps extends SwitchPrimitivesTypes.RootProps {
  /** Content to render inside the switch */
  children?: React.ReactNode;

  /** Whether the switch is disabled @default false */
  isDisabled?: boolean;

  /** Custom class name for the switch */
  className?: string;

  /** Custom class names for different parts of the component */
  classNames?: ElementSlots<RootSlots>;

  /** Custom colors for different switch states */
  colors?: SwitchColors;

  /** Animation configuration for switch background and border colors transition */
  animationConfig?: WithTimingConfig;
}

/**
 * Custom colors for switch thumb states
 */
export interface SwitchThumbColors {
  /** Background color when switch is not selected */
  defaultBackground?: string;
  /** Background color when switch is selected */
  selectedBackground?: string;
}

/**
 * Animation configuration for switch thumb
 */
export interface SwitchThumbAnimationConfig {
  /** Spring animation configuration for thumb motion */
  translateX?: WithSpringConfig;
  /** Timing animation configuration for background color transition */
  backgroundColor?: WithTimingConfig;
}

/**
 * Props for the SwitchThumb component
 */
export interface SwitchThumbProps extends SwitchPrimitivesTypes.ThumbProps {
  /** Content to render inside the thumb */
  children?: React.ReactNode;

  /** Custom class name for the thumb element */
  className?: string;

  /** Custom colors for different states */
  colors?: SwitchThumbColors;

  /** Animation configuration for thumb */
  animationConfig?: SwitchThumbAnimationConfig;
}

/**
 * Props for the SwitchContent component
 */
export interface SwitchContentProps {
  /** Content to render inside the switch content */
  children?: React.ReactNode;

  /** Custom class name for the content element */
  className?: string;
}

/**
 * Context value for switch components
 */
export interface SwitchContextValue extends Pick<SwitchProps, 'isSelected'> {
  /** Width of the content container */
  contentContainerWidth: SharedValue<number>;

  /** Height of the content container */
  contentContainerHeight: SharedValue<number>;
}
