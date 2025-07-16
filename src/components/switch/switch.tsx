import { createContext } from '@/helpers/utils';
import * as SwitchPrimitives from '@/primitives/switch';
import { useTheme } from '@/theme';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import switchStyles from './switch.styles';
import type {
  SwitchColor,
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
    color = 'default',
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

  const { base, contentPaddingContainer, contentContainer } = switchStyles.root(
    {
      size,
      isDisabled,
      isReadOnly,
    }
  );

  const backgroundColorMap: Record<SwitchColor, string> = {
    default: themeColors.accent,
    success: themeColors.success,
    warning: themeColors.warning,
    danger: themeColors.danger,
  };

  const borderColorMap: Record<SwitchColor, string> = {
    default: themeColors.accent,
    success: themeColors.success,
    warning: themeColors.warning,
    danger: themeColors.danger,
  };

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
          ? (colors?.selectedBackground ?? backgroundColorMap[color])
          : (colors?.defaultBackground ?? themeColors.base),
        timingConfig
      ),
      borderColor: withTiming(
        isSelected
          ? (colors?.selectedBorder ?? borderColorMap[color])
          : (colors?.defaultBorder ?? 'rgba(0, 0, 0, 0.1)'),
        timingConfig
      ),
    };
  });

  const contextValue = useMemo(
    () => ({
      size,
      isSelected,
      contentContainerWidth,
      contentContainerHeight,
    }),
    [size, isSelected, contentContainerWidth, contentContainerHeight]
  );

  return (
    <SwitchProvider value={contextValue}>
      <AnimatedSwitchPrimitivesRoot
        layout={layout}
        className={base({
          className: [className, classNames?.container],
        })}
        style={[
          // Default styles
          styles.switchRoot,
          // Animated styles
          containerAnimatedStyle,
          // Outer custom styles
          style,
        ]}
        isSelected={isSelected}
        onSelectedChange={onSelectedChange}
        isDisabled={isDisabled}
        {...restProps}
      >
        {/* 
          This container is useful when you want to animate start or end content entering 
          and you want it to be hidden outside of switch right by the switch border.
          The overflow-hidden ensures content stays within the switch boundaries.
        */}
        <View
          className={contentPaddingContainer({
            className: classNames?.contentPaddingContainer,
          })}
        >
          <View
            className={contentContainer({
              className: classNames?.contentContainer,
            })}
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

  const widthMap: Record<SwitchSize, number> = {
    sm: 14,
    md: 18,
    lg: 21,
  };

  const computedWidth = width ?? widthMap[size];

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
      className={switchStyles.thumb({
        className,
      })}
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
      className={switchStyles.startContent({
        className,
      })}
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
      className={switchStyles.endContent({
        className,
      })}
    >
      {children}
    </View>
  );
}

// --------------------------------------------------

Switch.displayName = 'HeroUINative.Switch.Root';
SwitchThumb.displayName = 'HeroUINative.Switch.Thumb';
SwitchStartContent.displayName = 'HeroUINative.Switch.StartContent';
SwitchEndContent.displayName = 'HeroUINative.Switch.EndContent';

const CompoundSwitch = Object.assign(Switch, {
  Thumb: SwitchThumb,
  StartContent: SwitchStartContent,
  EndContent: SwitchEndContent,
});

export default CompoundSwitch;
