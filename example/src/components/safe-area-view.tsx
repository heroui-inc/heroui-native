import { useHeaderHeight } from '@react-navigation/elements';
import { cn } from 'heroui-native';
import { type FC, type PropsWithChildren } from 'react';
import { Platform, View, type ScrollViewProps } from 'react-native';
import Animated, { type AnimatedProps } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AnimatedView = Animated.createAnimatedComponent(View);

interface Props extends AnimatedProps<ScrollViewProps> {
  className?: string;
  contentContainerClassName?: string;
}

export const SafeAreaView: FC<PropsWithChildren<Props>> = ({
  children,
  className,
  ...props
}) => {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  return (
    <AnimatedView
      className={cn('bg-background', className)}
      style={{
        paddingTop: Platform.select({
          ios: headerHeight,
          android: 0,
        }),
        paddingBottom: insets.bottom + 32,
      }}
      {...props}
    >
      {children}
    </AnimatedView>
  );
};
