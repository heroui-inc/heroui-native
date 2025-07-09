// import { useColorScheme } from '@/helpers/hooks/use-color-scheme';
import { cn } from '@/helpers/utils';
import * as SwitchPrimitives from '@/primitives/switch';
import { Platform } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
import type { SwitchProps } from './switch.types';
import { getSwitchDimensions } from './switch.utils';

function SwitchNative(props: SwitchProps) {
  const { isSelected, size = 'md' } = props;

  // const { colorScheme } = useColorScheme();

  const dimension = getSwitchDimensions(size);

  const translateX = useDerivedValue(() =>
    withSpring(isSelected ? dimension.switchMaxTranslateX : 0, {
      damping: 25,
      stiffness: 300,
    })
  );

  const animatedRootStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        translateX.value,
        [0, 18],
        ['#93c5fd', '#4f46e5']
      ),
    };
  });

  const rThumbContainerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.get() }],
  }));

  return (
    <Animated.View
      style={[
        animatedRootStyle,
        {
          width: dimension.switchWidth,
          height: dimension.switchHeight,
          borderRadius: dimension.switchHeight / 2,
        },
      ]}
      className={cn('', props.disabled && 'opacity-50')}
    >
      <SwitchPrimitives.Root
        className={cn('', props.className)}
        style={{
          width: dimension.switchWidth,
          height: dimension.switchHeight,
          borderRadius: dimension.switchHeight / 2,
          paddingHorizontal: dimension.switchHorizontalPadding,
          paddingVertical: dimension.switchVerticalPadding,
        }}
        {...props}
      >
        <Animated.View style={rThumbContainerStyle}>
          <SwitchPrimitives.Thumb
            className={'shadow-md shadow-foreground/25 bg-white'}
            style={{
              width: dimension.switchThumbSize,
              height: dimension.switchThumbSize,
              borderRadius: dimension.switchThumbSize / 2,
            }}
          />
        </Animated.View>
      </SwitchPrimitives.Root>
    </Animated.View>
  );
}

const Switch = Platform.select({
  default: SwitchNative,
});

export { Switch };
