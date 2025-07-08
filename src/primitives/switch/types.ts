import type {
  PressableRef,
  SlottablePressableProps,
  SlottableViewProps,
  ViewRef,
} from '@/helpers/types';

type RootProps = SlottablePressableProps & {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
};

type ThumbProps = SlottableViewProps;

type RootRef = PressableRef;
type ThumbRef = ViewRef;

export type { RootProps, RootRef, ThumbProps, ThumbRef };
