import { cn, createContext } from '@/helpers/utils';
import * as SwitchPrimitives from '@/primitives/switch';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import type {
  SwitchContextValue,
  SwitchProps,
  SwitchThumbProps,
} from './switch.types';

const AnimatedSwitchPrimitivesRoot = Animated.createAnimatedComponent(
  SwitchPrimitives.Root
);

const AnimatedSwitchPrimitivesThumb = Animated.createAnimatedComponent(
  SwitchPrimitives.Thumb
);

export const [SwitchProvider, useSwitchContext] =
  createContext<SwitchContextValue>({
    name: 'SwitchContext',
  });

// ----------------------------------------------------------------------------------

function Switch(props: SwitchProps) {
  const {
    children,
    width = 40,
    height = 25,
    isReadOnly,
    isDisabled,
    isSelected,
    onSelectedChange,
    colors,
    className,
    classNames,
    style,
    ...restProps
  } = props;

  const contentContainerWidth = useSharedValue(0);
  const contentContainerHeight = useSharedValue(0);

  const rContainerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        isSelected
          ? (colors?.selectedBackground ?? '#0A0A0A')
          : (colors?.defaultBackground ?? '#FAFAFA'),
        {
          easing: Easing.out(Easing.ease),
        }
      ),
      borderColor: isSelected
        ? withDelay(300, withTiming(colors?.selectedBorder ?? '#0A0A0A'))
        : (colors?.defaultBorder ?? 'rgba(0, 0, 0, 0.1)'),
    };
  });

  const contextValue: SwitchContextValue = {
    isSelected,
    contentContainerWidth,
    contentContainerHeight,
  };

  return (
    <SwitchProvider value={contextValue}>
      <AnimatedSwitchPrimitivesRoot
        className={cn(
          'p-[3px] shadow-sm border-[0.5px] rounded-full',
          isDisabled && (classNames?.containerDisabled || 'opacity-50'),
          isReadOnly && 'pointer-events-none',
          classNames?.container,
          className
        )}
        style={[
          {
            width,
            height,
          },
          styles.switchRoot,
          rContainerStyle,
          style,
        ]}
        checked={isSelected}
        onCheckedChange={onSelectedChange}
        disabled={isDisabled}
        {...restProps}
      >
        <View
          className={cn(
            'w-full h-full justify-center',
            classNames?.contentContainer
          )}
          onLayout={(e) => {
            contentContainerWidth.set(e.nativeEvent.layout.width);
            contentContainerHeight.set(e.nativeEvent.layout.height);
          }}
        >
          {children}
        </View>
      </AnimatedSwitchPrimitivesRoot>
    </SwitchProvider>
  );
}

const styles = StyleSheet.create({
  switchRoot: {
    borderCurve: 'continuous',
  },
});

// ----------------------------------------------------------------------------------

function SwitchThumb(props: SwitchThumbProps) {
  const { children, className, width = 18, height, colors } = props;

  const { isSelected, contentContainerWidth } = useSwitchContext();

  const rContainerStyle = useAnimatedStyle(() => {
    const isMounted = contentContainerWidth.get() > 0;

    // This is done to prevent the thumb from moving from the default position to the right
    // when the component is mounted with `isSelected` set to `true`,
    // and the user hasn't touched the switch yet.
    if (!isMounted) {
      if (isSelected) {
        return {
          right: 0,
          backgroundColor: colors?.selectedBackground ?? '#FFFFFF',
        };
      }
      return {
        left: 0,
        backgroundColor: colors?.defaultBackground ?? '#D4D4D4',
      };
    }

    return {
      left: withSpring(isSelected ? contentContainerWidth.get() - width : 0, {
        damping: 25,
        stiffness: 300,
      }),
      backgroundColor: withTiming(
        isSelected
          ? (colors?.selectedBackground ?? '#FFFFFF')
          : (colors?.defaultBackground ?? '#D4D4D4'),
        {
          easing: Easing.out(Easing.ease),
        }
      ),
    };
  });

  return (
    <AnimatedSwitchPrimitivesThumb
      className={cn(
        'absolute items-center justify-center rounded-full overflow-hidden',
        className
      )}
      style={[
        {
          width,
          height: height ?? width,
        },
        rContainerStyle,
      ]}
    >
      {children}
    </AnimatedSwitchPrimitivesThumb>
  );
}

Switch.displayName = 'HeroUI.Switch';
SwitchThumb.displayName = 'HeroUI.SwitchThumb';

export default Switch;
export { SwitchThumb };
