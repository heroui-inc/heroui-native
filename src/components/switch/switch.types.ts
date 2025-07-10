import * as SwitchPrimitivesTypes from '@/primitives/switch/switch.types';
import type { SharedValue } from 'react-native-reanimated';

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
  disableAnimation?: boolean;
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
