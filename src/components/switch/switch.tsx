import { cn, createContext } from '@/helpers/utils';
import * as SwitchPrimitives from '@/primitives/switch';
import { useTheme } from '@/theme';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import type {
  SwitchContentProps,
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

const DURATION = 175;
const EASING = Easing.bezier(0.25, 0.1, 0.25, 1);

export const [SwitchProvider, useSwitchContext] =
  createContext<SwitchContextValue>({
    name: 'SwitchContext',
  });

// --------------------------------------------------

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
    layout,
    animatedStylesConfig,
    ...restProps
  } = props;

  const { colors: themeColors } = useTheme();

  const contentContainerWidth = useSharedValue(0);
  const contentContainerHeight = useSharedValue(0);

  const timingConfig = animatedStylesConfig ?? {
    duration: DURATION,
    easing: EASING,
  };

  const rContainerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        isSelected
          ? (colors?.selectedBackground ?? themeColors.accent)
          : (colors?.defaultBackground ?? themeColors.base),
        timingConfig
      ),
      borderColor: withTiming(
        isSelected
          ? (colors?.selectedBorder ?? themeColors.accent)
          : (colors?.defaultBorder ?? 'rgba(0, 0, 0, 0.1)'),
        timingConfig
      ),
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
        layout={layout}
        className={cn(
          'shadow-sm border-[0.5px] rounded-full',
          isDisabled && (classNames?.containerDisabled || 'opacity-disabled'),
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
        {/* 
          This container is useful when you want to animate start or end content entering 
          and you want it to be hidden outside of switch right by the switch border.
          The overflow-hidden ensures content stays within the switch boundaries.
        */}
        <View
          className={cn(
            'flex-1 px-[3.5px] overflow-hidden',
            classNames?.contentPaddingContainer
          )}
        >
          <View
            className={cn(
              'flex-1 justify-center',
              classNames?.contentContainer
            )}
            onLayout={(e) => {
              contentContainerWidth.set(e.nativeEvent.layout.width);
              contentContainerHeight.set(e.nativeEvent.layout.height);
            }}
          >
            {children ?? <SwitchThumb />}
          </View>
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

// --------------------------------------------------

function SwitchThumb(props: SwitchThumbProps) {
  const {
    children,
    className,
    width = 18,
    height,
    colors,
    animatedMotionConfig,
    animatedStylesConfig,
  } = props;

  const { colors: themeColors } = useTheme();

  const { isSelected, contentContainerWidth } = useSwitchContext();

  const springConfig = animatedMotionConfig ?? {
    damping: 25,
    stiffness: 400,
    mass: 1,
  };

  const timingConfig = animatedStylesConfig ?? {
    duration: DURATION,
    easing: EASING,
  };

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
      left: withSpring(
        isSelected ? contentContainerWidth.get() - width + 0.5 : -0.5,
        springConfig
      ),
      backgroundColor: withTiming(
        isSelected
          ? (colors?.selectedBackground ?? themeColors.background)
          : (colors?.defaultBackground ?? themeColors.mutedForeground),
        timingConfig
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

// --------------------------------------------------

function SwitchStartContent(props: SwitchContentProps) {
  const { children, className } = props;

  return <View className={cn('absolute left-0', className)}>{children}</View>;
}

// --------------------------------------------------

function SwitchEndContent(props: SwitchContentProps) {
  const { children, className } = props;

  return <View className={cn('absolute right-0', className)}>{children}</View>;
}

Switch.displayName = 'HeroUI.Switch';
SwitchThumb.displayName = 'HeroUI.SwitchThumb';
SwitchStartContent.displayName = 'HeroUI.SwitchStartContent';
SwitchEndContent.displayName = 'HeroUI.SwitchEndContent';

export default Switch;
export { SwitchEndContent, SwitchStartContent, SwitchThumb };
