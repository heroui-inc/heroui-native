import { Select, useSelectAnimation } from 'heroui-native';
import { type FC, type PropsWithChildren } from 'react';
import Animated, {
  Easing,
  FadeOut,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

const AnimatedSelectContent = Animated.createAnimatedComponent(Select.Content);

export const SelectContentContainer: FC<PropsWithChildren> = ({ children }) => {
  const { progress } = useSelectAnimation();

  const rContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(progress.get(), [0, 1, 2], [0, 1, 0]),
    };
  });

  return (
    <AnimatedSelectContent
      presentation="dialog"
      // @ts-ignore
      classNames={{
        wrapper: 'p-0 justify-start',
        content: 'size-full p-0 border-0 bg-transparent gap-2',
      }}
      style={rContainerStyle}
      isSwipeable={false}
      animation={{
        entering: undefined,
        exiting: FadeOut.duration(150).easing(Easing.out(Easing.quad)),
      }}
    >
      {children}
    </AnimatedSelectContent>
  );
};
