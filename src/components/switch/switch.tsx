import { forwardRef, useMemo } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useResolvedStyleProperty } from '../../helpers/hooks';
import { useThemeColor } from '../../helpers/theme';
import { createContext } from '../../helpers/utils';
import * as SwitchPrimitives from '../../primitives/switch';
import * as SwitchPrimitivesTypes from '../../primitives/switch/switch.types';
import {
  DEFAULT_SPRING_CONFIG,
  DEFAULT_THUMB_WIDTH,
  DEFAULT_TIMING_CONFIG,
  DISPLAY_NAME,
} from './switch.constants';
import switchStyles, { styleSheet } from './switch.styles';
import type {
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

const Switch = forwardRef<SwitchPrimitivesTypes.RootRef, SwitchProps>(
  (props, ref) => {
    const {
      children,
      isDisabled,
      isSelected,
      onSelectedChange,
      className,
      style,
      colors,
      animationConfig,
      ...restProps
    } = props;

    const tvStyles = switchStyles.root({
      isDisabled,
      className,
    });

    const themeColorAccent = useThemeColor('accent');
    const themeColorSurfaceQuaternary = useThemeColor('surface-quaternary');

    const contentContainerWidth = useSharedValue(0);
    const contentContainerHeight = useSharedValue(0);

    const timingConfig = animationConfig ?? DEFAULT_TIMING_CONFIG;

    const rContainerStyle = useAnimatedStyle(() => {
      return {
        backgroundColor: withTiming(
          isSelected
            ? (colors?.selectedBackground ?? themeColorAccent)
            : (colors?.defaultBackground ?? themeColorSurfaceQuaternary),
          timingConfig
        ),
      };
    });

    const contextValue = useMemo(
      () => ({
        isSelected,
        contentContainerWidth,
        contentContainerHeight,
      }),
      [isSelected, contentContainerWidth, contentContainerHeight]
    );

    return (
      <SwitchProvider value={contextValue}>
        <AnimatedSwitchRoot
          ref={ref}
          className={tvStyles}
          style={[styleSheet.borderCurve, rContainerStyle, style]}
          isSelected={isSelected}
          onSelectedChange={onSelectedChange}
          isDisabled={isDisabled}
          onLayout={(e) => {
            contentContainerWidth.set(e.nativeEvent.layout.width);
            contentContainerHeight.set(e.nativeEvent.layout.height);
          }}
          {...restProps}
        >
          {children ?? <SwitchThumb />}
        </AnimatedSwitchRoot>
      </SwitchProvider>
    );
  }
);

// --------------------------------------------------

const SwitchThumb = forwardRef<
  SwitchPrimitivesTypes.ThumbRef,
  SwitchThumbProps
>((props, ref) => {
  const { children, className, style, colors, animationConfig } = props;

  const { isSelected, contentContainerWidth } = useSwitchContext();

  const themeColorAccentForeground = useThemeColor('accent-foreground');

  const tvStyles = switchStyles.thumb({
    className,
  });

  const width = useResolvedStyleProperty({
    className: tvStyles,
    style,
    propertyName: 'width',
  });
  const computedWidth = typeof width === 'number' ? width : DEFAULT_THUMB_WIDTH;

  const left = useResolvedStyleProperty({
    className: tvStyles,
    style,
    propertyName: 'left',
  });
  const computedLeft = typeof left === 'number' ? left : 0;

  const springConfig = animationConfig?.translateX ?? DEFAULT_SPRING_CONFIG;

  const timingConfig =
    animationConfig?.backgroundColor ?? DEFAULT_TIMING_CONFIG;

  const rContainerStyle = useAnimatedStyle(() => {
    const isMounted = contentContainerWidth.get() > 0;

    // This is done to prevent the thumb from moving from the default position to the right
    // when the component is mounted with `isSelected` set to `true`,
    // and the user hasn't touched the switch yet.
    if (!isMounted) {
      if (isSelected) {
        return {
          right: 0,
          backgroundColor:
            colors?.selectedBackground ?? themeColorAccentForeground,
        };
      }
      return {
        left: 0,
        backgroundColor: colors?.defaultBackground ?? 'white',
      };
    }

    return {
      left: withSpring(
        isSelected
          ? contentContainerWidth.get() - computedWidth - computedLeft
          : computedLeft,
        springConfig
      ),
      backgroundColor: withTiming(
        isSelected
          ? (colors?.selectedBackground ?? themeColorAccentForeground)
          : (colors?.defaultBackground ?? 'white'),
        timingConfig
      ),
    };
  });

  return (
    <AnimatedSwitchThumb
      ref={ref}
      className={tvStyles}
      style={[styleSheet.borderCurve, rContainerStyle, style]}
    >
      {children}
    </AnimatedSwitchThumb>
  );
});

// --------------------------------------------------

const SwitchStartContent = forwardRef<View, SwitchContentProps>(
  (props, ref) => {
    const { children, className, ...restProps } = props;

    const tvStyles = switchStyles.startContent({
      className,
    });

    return (
      <View ref={ref} className={tvStyles} {...restProps}>
        {children}
      </View>
    );
  }
);

// --------------------------------------------------

const SwitchEndContent = forwardRef<View, SwitchContentProps>((props, ref) => {
  const { children, className, ...restProps } = props;

  const tvStyles = switchStyles.endContent({
    className,
  });

  return (
    <View ref={ref} className={tvStyles} {...restProps}>
      {children}
    </View>
  );
});

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
 * Props flow from Switch to sub-components via context (isSelected).
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
