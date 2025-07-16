import type {
  EasingFunction,
  EasingFunctionFactory,
} from 'react-native-reanimated';

export interface TimingConfig {
  duration?: number;
  easing?: EasingFunction | EasingFunctionFactory;
}
