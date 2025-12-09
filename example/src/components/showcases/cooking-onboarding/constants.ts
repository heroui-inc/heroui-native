import type { PopoverRootAnimation } from 'heroui-native';
import { Easing } from 'react-native-reanimated';

export const popoverAnimation: PopoverRootAnimation = {
  entering: {
    type: 'timing',
    config: { duration: 300, easing: Easing.out(Easing.ease) },
  },
};
