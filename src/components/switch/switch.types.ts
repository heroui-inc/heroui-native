import type { TimingConfig } from '@/helpers/types';
import * as SwitchPrimitivesTypes from '@/primitives/switch/switch.types';
import type {
  BaseAnimationBuilder,
  LayoutAnimationFunction,
  SharedValue,
} from 'react-native-reanimated';
import type { SpringConfig } from 'react-native-reanimated/lib/typescript/animation/springUtils';

/** Switch size variants */
type SwitchSize = 'sm' | 'md' | 'lg';

interface SwitchProps
  extends Omit<
    SwitchPrimitivesTypes.RootProps,
    'disabled' | 'checked' | 'onCheckedChange'
  > {
  // Required props
  /** Whether the switch is selected or not */
  isSelected: boolean;
  /** Callback function called when the switch state changes */
  onSelectedChange: (isSelected: boolean) => void;

  // Optional layout props
  /** Width of the switch component */
  width?: number;
  /** Height of the switch component */
  height?: number;
  /** Size variant of the switch @default 'md' */
  size?: SwitchSize;

  // Optional style props
  /** Color theme of the switch @default 'base' */
  color?: 'base' | 'success' | 'warning' | 'danger';
  /** Custom colors for different states */
  colors?: {
    defaultBorder?: string;
    selectedBorder?: string;
    defaultBackground?: string;
    selectedBackground?: string;
  };
  /** CSS class name for the root element */
  className?: string;
  /** CSS class names for different parts of the component */
  classNames?: {
    container?: string;
    containerDisabled?: string;
    contentPaddingContainer?: string;
    contentContainer?: string;
  };

  // Optional behavior props
  /** Whether the switch is read-only @default false */
  isReadOnly?: boolean;
  /** Whether the switch is disabled @default false */
  isDisabled?: boolean;

  // Optional animation props
  /** Whether to disable animations @default false */
  disableAnimation?: boolean;
  /** Animation configuration for styles */
  animatedStylesConfig?: TimingConfig;
  /** Layout animation configuration */
  layout?:
    | BaseAnimationBuilder
    | LayoutAnimationFunction
    | typeof BaseAnimationBuilder
    | undefined;
  /** Custom animated styles for the container */
  containerAnimatedStyle?: Record<string, string>;

  // Optional ref
  /** Reference to the switch component */
  ref?: React.RefObject<SwitchPrimitivesTypes.RootRef>;

  // Children
  /** Content to render inside the switch */
  children?: React.ReactNode;
}

interface SwitchThumbProps extends SwitchPrimitivesTypes.ThumbProps {
  // Optional layout props
  /** Width of the thumb component */
  width?: number;
  /** Height of the thumb component */
  height?: number;

  // Optional style props
  /** Custom colors for different states */
  colors?: {
    defaultBackground?: string;
    selectedBackground?: string;
  };
  /** CSS class name for the thumb element */
  className?: string;

  // Optional behavior props

  // Optional animation props
  /** Spring animation configuration for thumb motion */
  animatedMotionConfig?: SpringConfig;
  /** Timing animation configuration for styles */
  animatedStylesConfig?: TimingConfig;

  // Children
  /** Content to render inside the thumb */
  children?: React.ReactNode;
}

type SwitchContentProps = {
  // Optional style props
  /** CSS class name for the content element */
  className?: string;

  // Children
  /** Content to render inside the switch content */
  children?: React.ReactNode;
};

interface SwitchContextValue extends Pick<SwitchProps, 'isSelected'> {
  size: SwitchSize;
  contentContainerWidth: SharedValue<number>;
  contentContainerHeight: SharedValue<number>;
}

export type {
  SwitchContentProps,
  SwitchContextValue,
  SwitchProps,
  SwitchSize,
  SwitchThumbProps,
};
