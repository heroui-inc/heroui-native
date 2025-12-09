import { forwardRef, useMemo } from 'react';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { Text } from '../../helpers/components';
import type { PressableRef } from '../../helpers/types';
import { childrenToString, createContext } from '../../helpers/utils';
import { DISPLAY_NAME } from './chip.constants';
import chipStyles, { styleSheet } from './chip.styles';
import type { ChipContextValue, ChipProps, ChipTitleProps } from './chip.types';

const [ChipProvider, useChip] = createContext<ChipContextValue>({
  name: 'ChipContext',
});

// --------------------------------------------------

const Chip = forwardRef<PressableRef, ChipProps>((props, ref) => {
  const {
    children,
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
    }),
    [size, variant, color]
  );

  return (
    <ChipProvider value={contextValue}>
      <Pressable
        ref={ref}
        className={tvStyles}
        style={[styleSheet.root, style] as StyleProp<ViewStyle>}
        {...restProps}
      >
        {stringifiedChildren ? (
          <ChipTitle>{stringifiedChildren}</ChipTitle>
        ) : (
          children
        )}
      </Pressable>
    </ChipProvider>
  );
});

// --------------------------------------------------

const ChipTitle = forwardRef<View, ChipTitleProps>((props, ref) => {
  const { children, className, ...restProps } = props;

  const { size, variant, color } = useChip();

  const tvStyles = chipStyles.label({
    size,
    variant,
    color,
    className,
  });

  return (
    <Text ref={ref} className={tvStyles} {...restProps}>
      {children}
    </Text>
  );
});

// --------------------------------------------------

Chip.displayName = DISPLAY_NAME.CHIP_ROOT;
ChipTitle.displayName = DISPLAY_NAME.CHIP_TITLE;

/**
 * Compound Chip component with sub-components
 *
 * @component Chip - Main container that displays a compact element. Renders with
 * string children as label or accepts compound components for custom layouts.
 *
 * @component Chip.Title - Text content of the chip. When string is provided,
 * it renders as Text. Otherwise renders children as-is.
 *
 * Props flow from Chip to sub-components via context (size, variant, color).
 * All components use animated views with layout transitions for smooth animations.
 *
 * @see Full documentation: https://heroui.com/components/chip
 */
const CompoundChip = Object.assign(Chip, {
  /** Chip title - renders text or custom content */
  Title: ChipTitle,
});

export default CompoundChip;
