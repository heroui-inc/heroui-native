import { createContext } from '@/helpers/utils';
import * as SwitchPrimitives from '@/primitives/switch';
import { useTheme } from '@/theme';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  DEFAULT_SPRING_CONFIG,
  DEFAULT_TIMING_CONFIG,
  DISPLAY_NAME,
  THUMB_WIDTH_MAP,
} from './switch.constants';
import switchStyles from './switch.styles';
import type {
  SwitchColor,
  SwitchContentProps,
  SwitchContextValue,
  SwitchProps,
  SwitchThumbProps,
} from './switch.types';

const AnimatedSwitchRoot = Animated.createAnimatedComponent(
  SwitchPrimitives.Root
);

const AnimatedSwitchThumb = Animated.createAnimatedComponent(
  SwitchPrimitives.Thumb
);

const [SwitchProvider, useSwitchContext] = createContext<SwitchContextValue>({
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
    animationConfig,
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

  const tvBaseStyles = base({
    className: [className, classNames?.container],
  });

  const tvContentPaddingContainerStyles = contentPaddingContainer({
    className: classNames?.contentPaddingContainer,
  });

  const tvContentContainerStyles = contentContainer({
    className: classNames?.contentContainer,
  });

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

  const timingConfig = animationConfig ?? DEFAULT_TIMING_CONFIG;

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
          : (colors?.defaultBorder ?? themeColors.border),
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
      <AnimatedSwitchRoot
        className={tvBaseStyles}
        style={[styles.switchRoot, containerAnimatedStyle, style]}
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
        <View className={tvContentPaddingContainerStyles}>
          <View
            className={tvContentContainerStyles}
            onLayout={(e) => {
              contentContainerWidth.set(e.nativeEvent.layout.width);
              contentContainerHeight.set(e.nativeEvent.layout.height);
            }}
          >
            {children ?? <SwitchThumb />}
          </View>
        </View>
      </AnimatedSwitchRoot>
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
  const { children, className, width, height, colors, animationConfig } = props;

  const { size, isSelected, contentContainerWidth } = useSwitchContext();

  const { colors: themeColors } = useTheme();

  const tvStyles = switchStyles.thumb({
    className,
  });

  const computedWidth = width ?? THUMB_WIDTH_MAP[size];

  const springConfig = animationConfig?.translateX ?? DEFAULT_SPRING_CONFIG;

  const timingConfig =
    animationConfig?.backgroundColor ?? DEFAULT_TIMING_CONFIG;

  const containerAnimatedStyle = useAnimatedStyle(() => {
    const isMounted = contentContainerWidth.get() > 0;

    // This is done to prevent the thumb from moving from the default position to the right
    // when the component is mounted with `isSelected` set to `true`,
    // and the user hasn't touched the switch yet.
    if (!isMounted) {
      if (isSelected) {
        return {
          right: 0,
          backgroundColor: colors?.selectedBackground ?? themeColors.background,
        };
      }
      return {
        left: 0,
        backgroundColor:
          colors?.defaultBackground ?? themeColors.mutedForeground,
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
    <AnimatedSwitchThumb
      className={tvStyles}
      style={[
        {
          width: computedWidth,
          height: height ?? computedWidth,
        },
        containerAnimatedStyle,
      ]}
    >
      {children}
    </AnimatedSwitchThumb>
  );
}

// --------------------------------------------------

function SwitchStartContent(props: SwitchContentProps) {
  const { children, className } = props;

  const tvStyles = switchStyles.startContent({
    className,
  });

  return <View className={tvStyles}>{children}</View>;
}

// --------------------------------------------------

function SwitchEndContent(props: SwitchContentProps) {
  const { children, className } = props;

  const tvStyles = switchStyles.endContent({
    className,
  });

  return <View className={tvStyles}>{children}</View>;
}

// --------------------------------------------------

Switch.displayName = DISPLAY_NAME.SWITCH_ROOT;
SwitchThumb.displayName = DISPLAY_NAME.SWITCH_THUMB;
SwitchStartContent.displayName = DISPLAY_NAME.SWITCH_START_CONTENT;
SwitchEndContent.displayName = DISPLAY_NAME.SWITCH_END_CONTENT;

/**
 * Compound Switch component with sub-components
 *
 * @component Switch - Main container that handles toggle state and user interaction.
 * Renders default thumb if no children provided. Animates background and border colors
 * based on selection state. Acts as a pressable area for toggling.
 *
 * @component Switch.Thumb - Optional sliding thumb element that moves between positions.
 * Uses spring animation for smooth transitions. Can contain custom content like icons
 * or be customized with different colors and sizes.
 *
 * @component Switch.StartContent - Optional content displayed on the left side of the switch.
 * Typically used for icons or text that appear when switch is off. Positioned absolutely
 * within the switch container.
 *
 * @component Switch.EndContent - Optional content displayed on the right side of the switch.
 * Typically used for icons or text that appear when switch is on. Positioned absolutely
 * within the switch container.
 *
 * Props flow from Switch to sub-components via context (size, isSelected).
 * The switch supports controlled and uncontrolled modes through isSelected/onSelectedChange.
 * Content components provide visual feedback without affecting the toggle functionality.
 *
 * @see Full documentation: https://heroui.com/components/switch
 */
const CompoundSwitch = Object.assign(Switch, {
  /** @optional Sliding thumb with spring animations */
  Thumb: SwitchThumb,
  /** @optional Content shown when switch is off (left side) */
  StartContent: SwitchStartContent,
  /** @optional Content shown when switch is on (right side) */
  EndContent: SwitchEndContent,
});

export { useSwitchContext };
export default CompoundSwitch;
