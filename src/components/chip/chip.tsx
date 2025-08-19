import { forwardRef, useMemo } from 'react';
import { Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { Text } from '../../helpers/components';
import type { PressableRef } from '../../helpers/types';
import { createContext, getElementByDisplayName } from '../../helpers/utils';
import { getElementWithDefault } from '../../helpers/utils/get-element-with-default';
import { DEFAULT_LAYOUT_TRANSITION, DISPLAY_NAME } from './chip.constants';
import chipStyles, { nativeStyles } from './chip.styles';
import type {
  ChipBackgroundProps,
  ChipContextValue,
  ChipEndContentProps,
  ChipLabelProps,
  ChipProps,
  ChipStartContentProps,
} from './chip.types';

const [ChipProvider, useChipContext] = createContext<ChipContextValue>({
  name: 'ChipContext',
});

// --------------------------------------------------

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Chip = forwardRef<PressableRef, ChipProps>((props, ref) => {
  const {
    children,
    layout = DEFAULT_LAYOUT_TRANSITION,
    variant = 'primary',
    size = 'md',
    color = 'accent',
    className,
    style,
    ...restProps
  } = props;

  const backgroundElement = useMemo(
    () => getElementByDisplayName(children, DISPLAY_NAME.CHIP_BACKGROUND),
    [children]
  );

  const startContentElement = useMemo(
    () => getElementByDisplayName(children, DISPLAY_NAME.CHIP_START_CONTENT),
    [children]
  );

  const labelElement = useMemo(
    () =>
      getElementWithDefault(
        children,
        DISPLAY_NAME.CHIP_LABEL,
        typeof children === 'string' ? (
          <ChipLabel>{children}</ChipLabel>
        ) : (
          <ChipLabel />
        )
      ),
    [children]
  );

  const endContentElement = useMemo(
    () => getElementByDisplayName(children, DISPLAY_NAME.CHIP_END_CONTENT),
    [children]
  );

  const tvStyles = chipStyles.root({
    size,
    variant,
    color,
    className,
  });

  const contextValue = useMemo(
    () => ({
      size,
      variant,
      color,
      layout,
    }),
    [size, variant, color, layout]
  );

  return (
    <ChipProvider value={contextValue}>
      <AnimatedPressable
        ref={ref}
        layout={layout}
        className={tvStyles}
        style={[nativeStyles.root, style]}
        {...restProps}
      >
        {backgroundElement}
        {startContentElement}
        {labelElement}
        {endContentElement}
      </AnimatedPressable>
    </ChipProvider>
  );
});

// --------------------------------------------------

const ChipBackground = forwardRef<View, ChipBackgroundProps>((props, ref) => {
  const { layout: contextLayout } = useChipContext();

  const { children, layout: layoutProp, className, ...restProps } = props;

  const tvStyles = chipStyles.background({
    className,
  });

  return (
    <Animated.View
      ref={ref}
      layout={layoutProp || contextLayout}
      className={tvStyles}
      {...restProps}
    >
      {children}
    </Animated.View>
  );
});

// --------------------------------------------------

const ChipStartContent = forwardRef<View, ChipStartContentProps>(
  (props, ref) => {
    const { layout: contextLayout } = useChipContext();

    const { children, layout: layoutProp, className, ...restProps } = props;

    const tvStyles = chipStyles.startContent({
      className,
    });

    return (
      <Animated.View
        ref={ref}
        layout={layoutProp || contextLayout}
        className={tvStyles}
        {...restProps}
      >
        {children}
      </Animated.View>
    );
  }
);

// --------------------------------------------------

const ChipLabel = forwardRef<View, ChipLabelProps>((props, ref) => {
  const { size, variant, color, layout: contextLayout } = useChipContext();

  const {
    children,
    layout: layoutProp,
    className,
    classNames,
    ...restProps
  } = props;

  const { text, container } = chipStyles.label({
    size,
    variant,
    color,
  });

  const tvContainerStyles = container({
    className: [className, classNames?.container],
  });

  const tvTextStyles = text({
    className: classNames?.text,
  });

  if (typeof children === 'string') {
    return (
      <Animated.View
        ref={ref}
        layout={layoutProp || contextLayout}
        className={tvContainerStyles}
        {...restProps}
      >
        <Text className={tvTextStyles}>{children}</Text>
      </Animated.View>
    );
  }

  return (
    <Animated.View
      ref={ref}
      layout={layoutProp || contextLayout}
      className={tvContainerStyles}
      {...restProps}
    >
      {children}
    </Animated.View>
  );
});

// --------------------------------------------------

const ChipEndContent = forwardRef<View, ChipEndContentProps>((props, ref) => {
  const { layout: contextLayout } = useChipContext();

  const { children, layout: layoutProp, className, ...restProps } = props;

  const tvStyles = chipStyles.endContent({
    className,
  });

  return (
    <Animated.View
      ref={ref}
      layout={layoutProp || contextLayout}
      className={tvStyles}
      {...restProps}
    >
      {children}
    </Animated.View>
  );
});

// --------------------------------------------------

Chip.displayName = DISPLAY_NAME.CHIP_ROOT;
ChipBackground.displayName = DISPLAY_NAME.CHIP_BACKGROUND;
ChipStartContent.displayName = DISPLAY_NAME.CHIP_START_CONTENT;
ChipLabel.displayName = DISPLAY_NAME.CHIP_LABEL;
ChipEndContent.displayName = DISPLAY_NAME.CHIP_END_CONTENT;

/**
 * Compound Chip component with sub-components
 *
 * @component Chip - Main container that displays a compact element. Renders with
 * string children as label or accepts compound components for custom layouts.
 *
 * @component Chip.Background - Optional background element with absolute positioning.
 * Rendered beneath all other content. Use for gradients or custom backgrounds.
 *
 * @component Chip.StartContent - Optional leading content displayed before the label.
 * Use for icons or other visual elements at the start of the chip.
 *
 * @component Chip.Label - Text content of the chip. When string is provided,
 * it renders as Text. Otherwise renders children as-is.
 *
 * @component Chip.EndContent - Optional trailing content displayed after the label.
 * Use for icons, badges, or interactive elements at the end of the chip.
 *
 * Props flow from Chip to sub-components via context (size, variant, color).
 * All components use animated views with layout transitions for smooth animations.
 *
 * @see Full documentation: https://heroui.com/components/chip
 */
const CompoundChip = Object.assign(Chip, {
  /** @optional Background element - absolute positioned beneath content */
  Background: ChipBackground,
  /** @optional Leading content like icons */
  StartContent: ChipStartContent,
  /** Chip label - renders text or custom content */
  Label: ChipLabel,
  /** @optional Trailing content like icons or badges */
  EndContent: ChipEndContent,
});

export { useChipContext };
export default CompoundChip;
