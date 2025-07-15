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
  SwitchSize,
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
    size = 'md',
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

  const containerAnimatedStyle = useAnimatedStyle(() => {
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
    size,
    isSelected,
    contentContainerWidth,
    contentContainerHeight,
  };

  return (
    <SwitchProvider value={contextValue}>
      <AnimatedSwitchPrimitivesRoot
        layout={layout}
        className={cn(
          // Default base styles
          'shadow-sm border-[0.5px] rounded-full',
          // Size variants
          size === 'sm' && 'w-[32px] h-[20px]',
          size === 'md' && 'w-[40px] h-[25px]',
          size === 'lg' && 'w-[48px] h-[30px]',
          // State variants
          isDisabled && (classNames?.containerDisabled || 'opacity-disabled'),
          isReadOnly && 'pointer-events-none',
          // Outer custom styles
          classNames?.container,
          className
        )}
        style={[
          // Default styles
          styles.switchRoot,
          // Animated styles
          containerAnimatedStyle,
          // Outer custom styles
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
            // Default styles
            'flex-1  overflow-hidden',
            // Size variants
            size === 'sm' && 'px-[3px]',
            size === 'md' && 'px-[3.5px]',
            size === 'lg' && 'px-[4.5px]',
            // Outer custom styles
            classNames?.contentPaddingContainer
          )}
        >
          <View
            className={cn(
              // Default styles
              'flex-1 justify-center',
              // Outer custom styles
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
    width,
    height,
    colors,
    animatedMotionConfig,
    animatedStylesConfig,
  } = props;

  const { size, isSelected, contentContainerWidth } = useSwitchContext();

  const { colors: themeColors } = useTheme();

  const defaultWidth: Record<SwitchSize, number> = {
    sm: 14,
    md: 18,
    lg: 21,
  };

  const computedWidth = width ?? defaultWidth[size];

  const springConfig = animatedMotionConfig ?? {
    damping: 25,
    stiffness: 400,
    mass: 1,
  };

  const timingConfig = animatedStylesConfig ?? {
    duration: DURATION,
    easing: EASING,
  };

  const containerAnimatedStyle = useAnimatedStyle(() => {
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
        isSelected ? contentContainerWidth.get() - computedWidth + 0.5 : -0.5,
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
        // Default styles
        'absolute items-center justify-center rounded-full overflow-hidden',
        // Outer custom styles
        className
      )}
      style={[
        // Default styles
        {
          width: computedWidth,
          height: height ?? computedWidth,
        },
        // Animated styles
        containerAnimatedStyle,
      ]}
    >
      {children}
    </AnimatedSwitchPrimitivesThumb>
  );
}

// --------------------------------------------------

function SwitchStartContent(props: SwitchContentProps) {
  const { children, className } = props;

  return (
    <View
      className={cn(
        // Default styles
        'absolute left-0',
        // Outer custom styles
        className
      )}
    >
      {children}
    </View>
  );
}

// --------------------------------------------------

function SwitchEndContent(props: SwitchContentProps) {
  const { children, className } = props;

  return (
    <View
      className={cn(
        // Default styles
        'absolute right-0',
        // Outer custom styles
        className
      )}
    >
      {children}
    </View>
  );
}

Switch.displayName = 'HeroUI.Switch';
SwitchThumb.displayName = 'HeroUI.SwitchThumb';
SwitchStartContent.displayName = 'HeroUI.SwitchStartContent';
SwitchEndContent.displayName = 'HeroUI.SwitchEndContent';

export default Switch;
export { SwitchEndContent, SwitchStartContent, SwitchThumb };
