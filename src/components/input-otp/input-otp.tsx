import { forwardRef, useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { HeroText } from '../../helpers/components';
import * as InputOTPPrimitives from '../../primitives/input-otp';
import { DISPLAY_NAME } from './input-otp.constants';
import inputOTPStyles, { styleSheet } from './input-otp.styles';
import type {
  InputOTPGroupProps,
  InputOTPGroupRef,
  InputOTPGroupRenderProps,
  InputOTPRootProps,
  InputOTPRootRef,
  InputOTPSeparatorProps,
  InputOTPSeparatorRef,
  InputOTPSlotCaretProps,
  InputOTPSlotCaretRef,
  InputOTPSlotProps,
  InputOTPSlotRef,
} from './input-otp.types';

const useInputOTP = InputOTPPrimitives.useInputOTPContext;

// --------------------------------------------------

const InputOTPRoot = forwardRef<InputOTPRootRef, InputOTPRootProps>(
  (props, ref) => {
    const { className, ...restProps } = props;

    const tvStyles = inputOTPStyles.root({ className });

    return (
      <InputOTPPrimitives.Root ref={ref} className={tvStyles} {...restProps} />
    );
  }
);

// --------------------------------------------------

const InputOTPGroup = forwardRef<InputOTPGroupRef, InputOTPGroupProps>(
  (props, ref) => {
    const { className, children, ...restProps } = props;

    const { slots, maxLength, value, isFocused, isDisabled, isInvalid } =
      useInputOTP();

    const tvStyles = inputOTPStyles.group({ className });

    const renderProps: InputOTPGroupRenderProps = {
      slots,
      maxLength,
      value,
      isFocused,
      isDisabled,
      isInvalid,
    };

    const content =
      typeof children === 'function' ? children(renderProps) : children;

    return (
      <InputOTPPrimitives.Group ref={ref} className={tvStyles} {...restProps}>
        {content}
      </InputOTPPrimitives.Group>
    );
  }
);

// --------------------------------------------------

const InputOTPSlot = forwardRef<InputOTPSlotRef, InputOTPSlotProps>(
  (props, ref) => {
    const { className, style, index, textProps, ...restProps } = props;
    const { className: textClassName, ...restTextProps } = textProps ?? {};

    const { slots, isDisabled, isInvalid } = useInputOTP();

    const slot = slots[index];
    const isActive = slot?.isActive ?? false;
    const char = slot?.char ?? null;
    const placeholderChar = slot?.placeholderChar ?? null;
    const isCaretVisible = slot?.isCaretVisible ?? false;

    const slotClassName = inputOTPStyles.slot({
      isActive,
      isInvalid,
      isDisabled,
      className,
    });

    const slotTextClassName = inputOTPStyles.slotText({
      className: textClassName,
    });

    return (
      <InputOTPPrimitives.Slot
        ref={ref}
        index={index}
        className={slotClassName}
        style={[styleSheet.slotRoot, style]}
        {...restProps}
      >
        {char !== null ? (
          <HeroText className={slotTextClassName} {...restTextProps}>
            {char}
          </HeroText>
        ) : placeholderChar !== null ? (
          <HeroText className={slotTextClassName} {...restTextProps}>
            {placeholderChar}
          </HeroText>
        ) : null}
        {isCaretVisible ? <InputOTPSlotCaret /> : null}
      </InputOTPPrimitives.Slot>
    );
  }
);

// --------------------------------------------------

const InputOTPSlotCaret = forwardRef<
  InputOTPSlotCaretRef,
  InputOTPSlotCaretProps
>((props, ref) => {
  const { className, pointerEvents = 'none', ...restProps } = props;

  const opacity = useSharedValue(1);
  const height = useSharedValue(24);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 500 }),
        withTiming(1, { duration: 500 })
      ),
      -1,
      true
    );

    height.value = withRepeat(
      withSequence(
        withTiming(20, { duration: 500 }),
        withTiming(28, { duration: 500 })
      ),
      -1,
      true
    );
  }, [opacity, height]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    height: height.value,
  }));

  const tvStyles = inputOTPStyles.slotCaret({ className });

  const baseStyle = {
    width: 2,
    backgroundColor: '#111827',
    borderRadius: 1,
  };

  return (
    <View
      ref={ref}
      className={tvStyles}
      pointerEvents={pointerEvents}
      {...restProps}
    >
      <Animated.View style={[baseStyle, animatedStyle]} />
    </View>
  );
});

// --------------------------------------------------

const InputOTPSeparator = forwardRef<
  InputOTPSeparatorRef,
  InputOTPSeparatorProps
>((props, ref) => {
  const { className, ...restProps } = props;

  const tvStyles = inputOTPStyles.separator({ className });

  return (
    <InputOTPPrimitives.Separator
      ref={ref}
      className={tvStyles}
      {...restProps}
    />
  );
});

// --------------------------------------------------

// Display names
InputOTPRoot.displayName = DISPLAY_NAME.ROOT;
InputOTPGroup.displayName = DISPLAY_NAME.GROUP;
InputOTPSlot.displayName = DISPLAY_NAME.SLOT;
InputOTPSlotCaret.displayName = DISPLAY_NAME.SLOT_CARET;
InputOTPSeparator.displayName = DISPLAY_NAME.SEPARATOR;

/**
 * Compound InputOTP component with sub-components
 *
 * @component InputOTP - Main container for OTP input. Manages the input state,
 * handles text changes, and provides context to child components.
 *
 * @component InputOTP.Group - Container for grouping multiple slots together.
 * Use this to visually group related slots (e.g., groups of 3 digits).
 *
 * @component InputOTP.Slot - Individual slot that displays a single character
 * or placeholder. Each slot must have a unique index matching its position
 * in the OTP sequence.
 *
 * @component InputOTP.SlotCaret - Animated caret indicator that shows the
 * current input position. Place this inside a Slot to show where the user
 * is currently typing.
 *
 * @component InputOTP.Separator - Visual separator between groups of slots.
 * Use this to visually separate different groups of OTP digits.
 *
 * Props flow from InputOTP to sub-components via context (value, isDisabled,
 * isInvalid, slots). The component handles focus management, text input,
 * and validation automatically.
 *
 * @see Full documentation: https://heroui.com/components/input-otp
 */
const InputOTP = Object.assign(InputOTPRoot, {
  /** @optional Container for grouping multiple slots together */
  Group: InputOTPGroup,
  /** @optional Individual slot that displays a single character or placeholder */
  Slot: InputOTPSlot,
  /** @optional Animated caret indicator for the current input position */
  SlotCaret: InputOTPSlotCaret,
  /** @optional Visual separator between groups of slots */
  Separator: InputOTPSeparator,
});

export default InputOTP;
export { useInputOTP };
