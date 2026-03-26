import { forwardRef, useMemo } from 'react';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { HeroText } from '../../helpers/internal/components';
import { AnimationSettingsProvider } from '../../helpers/internal/contexts';
import type { PressableRef } from '../../helpers/internal/types';
import { childrenToString, createContext } from '../../helpers/internal/utils';
import { useChipRootAnimation } from './chip.animation';
import { DISPLAY_NAME } from './chip.constants';
import { chipClassNames, chipStyleSheet } from './chip.styles';
import type { ChipContextValue, ChipLabelProps, ChipProps } from './chip.types';

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
    animation,
    ...restProps
  } = props;

  const stringifiedChildren = childrenToString(children);

  const rootClassName = chipClassNames.root({
    size,
    variant,
    color,
    className,
  });

  const { isAllAnimationsDisabled } = useChipRootAnimation({
    animation,
  });

  const animationSettingsContextValue = useMemo(
    () => ({
      isAllAnimationsDisabled,
    }),
    [isAllAnimationsDisabled]
  );

  const contextValue = useMemo(
    () => ({
      size,
      variant,
      color,
    }),
    [size, variant, color]
  );

  return (
    <AnimationSettingsProvider value={animationSettingsContextValue}>
      <ChipProvider value={contextValue}>
        <Pressable
          ref={ref}
          className={rootClassName}
          style={[chipStyleSheet.root, style] as StyleProp<ViewStyle>}
          {...restProps}
        >
          {stringifiedChildren ? (
            <ChipLabel>{stringifiedChildren}</ChipLabel>
          ) : (
            children
          )}
        </Pressable>
      </ChipProvider>
    </AnimationSettingsProvider>
  );
});

// --------------------------------------------------

const ChipLabel = forwardRef<View, ChipLabelProps>((props, ref) => {
  const { children, className, ...restProps } = props;

  const { size, variant, color } = useChip();

  const labelClassName = chipClassNames.label({
    size,
    variant,
    color,
    className,
  });

  return (
    <HeroText ref={ref} className={labelClassName} {...restProps}>
      {children}
    </HeroText>
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
 * @see Full documentation: https://heroui.com/docs/native/components/chip
 */
const CompoundChip = Object.assign(Chip, {
  /** Chip label - renders text or custom content */
  Label: ChipLabel,
});

export { useChip };
export default CompoundChip;
