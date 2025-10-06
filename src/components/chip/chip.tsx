import { forwardRef, useMemo } from 'react';
import { Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';
import type { PressableRef } from '../../helpers/types';
import { childrenToString, createContext } from '../../helpers/utils';
import { DEFAULT_LAYOUT_TRANSITION, DISPLAY_NAME } from './chip.constants';
import chipStyles, { stylesheet } from './chip.styles';
import type { ChipContextValue, ChipLabelProps, ChipProps } from './chip.types';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const [ChipProvider, useChipContext] = createContext<ChipContextValue>({
  name: 'ChipContext',
});

// --------------------------------------------------

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

  const stringifiedChildren = childrenToString(children);

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
        style={[stylesheet.root, style]}
        {...restProps}
      >
        {stringifiedChildren ? (
          <ChipLabel>{stringifiedChildren}</ChipLabel>
        ) : (
          children
        )}
      </AnimatedPressable>
    </ChipProvider>
  );
});

// --------------------------------------------------

const ChipLabel = forwardRef<View, ChipLabelProps>((props, ref) => {
  const { children, layout: layoutProp, className, ...restProps } = props;

  const { size, variant, color, layout: contextLayout } = useChipContext();

  const tvStyles = chipStyles.label({
    size,
    variant,
    color,
    className,
  });

  return (
    <Animated.Text
      ref={ref}
      layout={layoutProp || contextLayout}
      className={tvStyles}
      {...restProps}
    >
      {children}
    </Animated.Text>
  );
});

// --------------------------------------------------

Chip.displayName = DISPLAY_NAME.CHIP_ROOT;
ChipLabel.displayName = DISPLAY_NAME.CHIP_LABEL_CONTENT;

/**
 * Compound Chip component with sub-components
 *
 * @component Chip - Main container that displays a compact element. Renders with
 * string children as label or accepts compound components for custom layouts.
 *
 * @component Chip.Label - Text content of the chip. When string is provided,
 * it renders as Text. Otherwise renders children as-is.
 *
 * Props flow from Chip to sub-components via context (size, variant, color).
 * All components use animated views with layout transitions for smooth animations.
 *
 * @see Full documentation: https://heroui.com/components/chip
 */
const CompoundChip = Object.assign(Chip, {
  /** Chip label - renders text or custom content */
  Label: ChipLabel,
});

export { useChipContext };
export default CompoundChip;
