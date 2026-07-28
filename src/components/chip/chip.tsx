import { forwardRef, useMemo } from 'react';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import {
  HeroText,
  ThemeBackground,
  useHasDefaultThemeBackground,
} from '../../helpers/internal/components';
import { AnimationSettingsProvider } from '../../helpers/internal/contexts';
import type { PressableRef, ViewRef } from '../../helpers/internal/types';
import { childrenToString, createContext } from '../../helpers/internal/utils';
import { useChipRootAnimation } from './chip.animation';
import { DISPLAY_NAME } from './chip.constants';
import { chipClassNames, chipStyleSheet } from './chip.styles';
import type {
  ChipBackgroundProps,
  ChipContextValue,
  ChipLabelProps,
  ChipProps,
} from './chip.types';

const [ChipProvider, useChip] = createContext<ChipContextValue>({
  name: 'ChipContext',
});

// --------------------------------------------------

/**
 * Generic absolute-fill background container rendered behind the chip
 * surface (clipped by the root's `overflow: hidden`). With no `children`,
 * the active library theme decides the default content: `glass` renders a
 * `GlassView` blur layer; other themes render nothing. Pass `children` to
 * host arbitrary content (gradients, images) with the container's
 * positioning and clipping applied.
 */
const ChipBackground = forwardRef<ViewRef, ChipBackgroundProps>(
  ({ className, ...props }, ref) => {
    const backgroundClassName = chipClassNames.background({ className });

    return (
      <ThemeBackground
        ref={ref}
        className={backgroundClassName}
        fallbackColor="default"
        {...props}
      />
    );
  }
);

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
    background,
    ...restProps
  } = props;

  const hasDefaultThemeBackground = useHasDefaultThemeBackground();

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

  /**
   * Whether the resolved variant / color combination paints its surface with
   * the default color token (secondary variant, or primary / soft variants
   * with the default color).
   */
  const hasDefaultColorSurface =
    variant === 'secondary' ||
    ((variant === 'primary' || variant === 'soft') && color === 'default');

  /**
   * Background layer rendered behind the chip surface.
   * - `undefined`: theme-aware default for default-colored surfaces when the
   *   active theme registers default background content
   * - custom node: replaces the default layer
   * - `null`: removes the layer
   */
  const backgroundElement =
    background !== undefined ? (
      background
    ) : hasDefaultThemeBackground && hasDefaultColorSurface ? (
      <ChipBackground />
    ) : null;

  return (
    <AnimationSettingsProvider value={animationSettingsContextValue}>
      <ChipProvider value={contextValue}>
        <Pressable
          ref={ref}
          className={rootClassName}
          style={[chipStyleSheet.root, style] as StyleProp<ViewStyle>}
          {...restProps}
        >
          {backgroundElement}
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
ChipBackground.displayName = DISPLAY_NAME.CHIP_BACKGROUND;

/**
 * Compound Chip component with sub-components
 *
 * @component Chip - Main container that displays a compact element. Renders with
 * string children as label or accepts compound components for custom layouts.
 *
 * @component Chip.Label - Text content of the chip. When string is provided,
 * it renders as Text. Otherwise renders children as-is.
 *
 * @component Chip.Background - Absolute-fill background container behind the
 * chip surface. With no children, the active library theme decides the
 * default content (e.g. a glass blur layer)
 *
 * Props flow from Chip to sub-components via context (size, variant, color).
 * All components use animated views with layout transitions for smooth animations.
 *
 * @see Full documentation: https://heroui.com/docs/native/components/chip
 */
const CompoundChip = Object.assign(Chip, {
  /** Chip label - renders text or custom content */
  Label: ChipLabel,
  /** Chip background - absolute-fill container behind the chip surface */
  Background: ChipBackground,
});

export { useChip };
export default CompoundChip;
