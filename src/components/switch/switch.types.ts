import type { TimingConfig } from '@/helpers/types';
import * as SwitchPrimitivesTypes from '@/primitives/switch/switch.types';
import type {
  BaseAnimationBuilder,
  LayoutAnimationFunction,
  SharedValue,
} from 'react-native-reanimated';
import type { SpringConfig } from 'react-native-reanimated/lib/typescript/animation/springUtils';

interface SwitchProps
  extends Omit<
    SwitchPrimitivesTypes.RootProps,
    'disabled' | 'checked' | 'onCheckedChange'
  > {
  ref?: React.RefObject<SwitchPrimitivesTypes.RootRef>;
  children?: React.ReactNode;
  width?: number;
  height?: number;
  isReadOnly?: boolean;
  isDisabled?: boolean;
  isSelected: boolean;
  onSelectedChange: (isSelected: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'success' | 'warning' | 'danger';
  colors?: {
    defaultBorder?: string;
    selectedBorder?: string;
    defaultBackground?: string;
    selectedBackground?: string;
  };
  className?: string;
  classNames?: {
    container?: string;
    containerDisabled?: string;
    contentPaddingContainer?: string;
    contentContainer?: string;
  };
  layout?:
    | BaseAnimationBuilder
    | LayoutAnimationFunction
    | typeof BaseAnimationBuilder
    | undefined;
  containerAnimatedStyle?: Record<string, string>;
  disableAnimation?: boolean;
  animatedStylesConfig?: TimingConfig;
}

interface SwitchThumbProps extends SwitchPrimitivesTypes.ThumbProps {
  children?: React.ReactNode;
  width?: number;
  height?: number;
  colors?: {
    defaultBackground?: string;
    selectedBackground?: string;
  };
  className?: string;
  animatedMotionConfig?: SpringConfig;
  animatedStylesConfig?: TimingConfig;
}

type SwitchContentProps = {
  children?: React.ReactNode;
  className?: string;
};

interface SwitchContextValue extends Pick<SwitchProps, 'isSelected'> {
  contentContainerWidth: SharedValue<number>;
  contentContainerHeight: SharedValue<number>;
}

export type {
  SwitchContentProps,
  SwitchContextValue,
  SwitchProps,
  SwitchThumbProps,
};
