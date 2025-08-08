import { forwardRef, useMemo } from 'react';
import { Text, View } from 'react-native';
import { createContext } from '../../helpers/utils';
import { getElementByDisplayName } from '../../helpers/utils/get-element-by-display-name';
import { getElementWithDefault } from '../../helpers/utils/get-element-with-default';
import { DISPLAY_NAME } from './chip.constants';
import chipStyles, { nativeStyles } from './chip.styles';
import type {
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

const Chip = forwardRef<View, ChipProps>((props, ref) => {
  const {
    children,
    variant = 'primary',
    size = 'md',
    color = 'accent',
    className,
    style,
    ...restProps
  } = props;

  const startContentElement = useMemo(
    () => getElementByDisplayName(children, DISPLAY_NAME.CHIP_START_CONTENT),
    [children]
  );

  const labelElement = useMemo(
    () =>
      getElementWithDefault(
        children,
        DISPLAY_NAME.CHIP_LABEL,
        <ChipLabel>Label</ChipLabel>
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
    }),
    [size, variant, color]
  );

  return (
    <ChipProvider value={contextValue}>
      <View
        ref={ref}
        className={tvStyles}
        style={[nativeStyles.root, style]}
        {...restProps}
      >
        {startContentElement}
        {labelElement}
        {endContentElement}
      </View>
    </ChipProvider>
  );
});

// --------------------------------------------------

const ChipStartContent = forwardRef<View, ChipStartContentProps>(
  (props, ref) => {
    const { children, className, style, ...restProps } = props;

    const tvStyles = chipStyles.startContent({
      className,
    });

    return (
      <View ref={ref} className={tvStyles} style={style} {...restProps}>
        {children}
      </View>
    );
  }
);

// --------------------------------------------------

const ChipLabel = forwardRef<Text, ChipLabelProps>((props, ref) => {
  const { children, className, style, ...restProps } = props;

  const { size, variant, color } = useChipContext();

  const tvStyles = chipStyles.label({
    size,
    variant,
    color,
    className,
  });

  return (
    <Text ref={ref} className={tvStyles} style={style} {...restProps}>
      {children}
    </Text>
  );
});

// --------------------------------------------------

const ChipEndContent = forwardRef<View, ChipEndContentProps>((props, ref) => {
  const { children, className, style, ...restProps } = props;

  const tvStyles = chipStyles.endContent({
    className,
  });

  return (
    <View ref={ref} className={tvStyles} style={style} {...restProps}>
      {children}
    </View>
  );
});

// --------------------------------------------------

Chip.displayName = DISPLAY_NAME.CHIP_ROOT;
ChipStartContent.displayName = DISPLAY_NAME.CHIP_START_CONTENT;
ChipLabel.displayName = DISPLAY_NAME.CHIP_LABEL;
ChipEndContent.displayName = DISPLAY_NAME.CHIP_END_CONTENT;

/**
 * Compound Chip component with sub-components
 *
 * @component Chip - Main container that displays a compact element. Renders with
 * default label "Label" if no children provided. Supports three variants and five colors.
 *
 * @component Chip.StartContent - Optional leading content displayed before the label.
 * Use for icons or other visual elements at the start of the chip.
 *
 * @component Chip.Label - Text content of the chip. Defaults to "Label" if not provided.
 * Inherits size, variant, and color from parent Chip via context.
 *
 * @component Chip.EndContent - Optional trailing content displayed after the label.
 * Use for icons, badges, or interactive elements at the end of the chip.
 *
 * Props flow from Chip to sub-components via context (size, variant, color).
 * The chip layout is horizontal with consistent spacing between elements.
 *
 * @see Full documentation: https://heroui.com/components/chip
 */
const CompoundChip = Object.assign(Chip, {
  /** @optional Leading content like icons */
  StartContent: ChipStartContent,
  /** Text label content */
  Label: ChipLabel,
  /** @optional Trailing content like icons or badges */
  EndContent: ChipEndContent,
});

export { useChipContext };
export default CompoundChip;
