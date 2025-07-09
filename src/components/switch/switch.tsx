// import { useColorScheme } from '@/helpers/hooks/use-color-scheme';
import { cn } from '@/helpers/utils';
import * as SwitchPrimitives from '@/primitives/switch';
import { StyleSheet } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { dimensions as defaultDimensions } from './switch.constants';
import type { SwitchProps } from './switch.types';
import { getSwitchDimensions } from './switch.utils';

const AnimatedSwitchPrimitivesRoot = Animated.createAnimatedComponent(
  SwitchPrimitives.Root
);

const AnimatedSwitchPrimitivesThumb = Animated.createAnimatedComponent(
  SwitchPrimitives.Thumb
);

function Switch(props: SwitchProps) {
  const { isSelected, disabled, size = 'md', colors, dimensions } = props;

  // const { colorScheme } = useColorScheme();

  const switchDimensions = getSwitchDimensions(
    dimensions ?? defaultDimensions[size]
  );
  const {
    switchWidth,
    switchHeight,
    switchBorderWidth,
    switchThumbSize,
    switchPadding,
    switchThumbMaxTranslateX,
  } = switchDimensions;

  const thumbTranslateX = useDerivedValue(() =>
    withSpring(isSelected ? switchThumbMaxTranslateX : 0, {
      damping: 25,
      stiffness: 300,
    })
  );

  const rSwitchRootStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        thumbTranslateX.get(),
        [0, switchThumbMaxTranslateX],
        [colors?.trackDefault ?? '#FAFAFA', colors?.trackSelected ?? '#0A0A0A']
      ),
      borderColor: isSelected
        ? withTiming(colors?.switchBorderSelected ?? '#0A0A0A', {
            duration: 200,
          })
        : (colors?.switchBorderDefault ?? 'rgba(0, 0, 0, 0.1)'),
    };
  });

  const rThumbStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      thumbTranslateX.get(),
      [0, switchThumbMaxTranslateX],
      [colors?.thumbDefault ?? '#D4D4D4', colors?.thumbSelected ?? '#FFFFFF']
    ),
    transform: [{ translateX: thumbTranslateX.get() }],
  }));

  return (
    <AnimatedSwitchPrimitivesRoot
      className={cn('shadow-sm', disabled && 'opacity-50')}
      style={[
        styles.switchRoot,
        rSwitchRootStyle,
        {
          width: switchWidth,
          height: switchHeight,
          padding: switchPadding,
          borderWidth: switchBorderWidth,
          borderRadius: switchHeight / 2,
        },
      ]}
      {...props}
    >
      <AnimatedSwitchPrimitivesThumb
        className="shadow-sm"
        style={[
          rThumbStyle,
          {
            width: switchThumbSize,
            height: switchThumbSize,
            borderRadius: switchThumbSize / 2,
          },
        ]}
      />
    </AnimatedSwitchPrimitivesRoot>
  );
}

const styles = StyleSheet.create({
  switchRoot: {
    borderCurve: 'continuous',
  },
});

Switch.displayName = 'HeroUI.Switch';

export default Switch;
