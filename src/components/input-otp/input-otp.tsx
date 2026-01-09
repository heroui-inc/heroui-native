import { forwardRef, useMemo } from 'react';
import Animated from 'react-native-reanimated';
import { HeroText } from '../../helpers/components';
import { AnimationSettingsProvider } from '../../helpers/contexts/animation-settings-context';
import * as InputOTPPrimitives from '../../primitives/input-otp';
import {
  useInputOTPRootAnimation,
  useInputOTPSlotCaretAnimation,
} from './input-otp.animation';
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
  InputOTPSlotTextProps,
  InputOTPSlotTextRef,
} from './input-otp.types';

const useInputOTP = InputOTPPrimitives.useInputOTPContext;

// --------------------------------------------------

const InputOTPRoot = forwardRef<InputOTPRootRef, InputOTPRootProps>(
  (props, ref) => {
    const { className, animation, ...restProps } = props;

    const tvStyles = inputOTPStyles.root({ className });

    const { isAllAnimationsDisabled } = useInputOTPRootAnimation({
      animation,
    });

    const animationSettingsContextValue = useMemo(
      () => ({
        isAllAnimationsDisabled,
      }),
      [isAllAnimationsDisabled]
    );

    return (
      <AnimationSettingsProvider value={animationSettingsContextValue}>
        <InputOTPPrimitives.Root
          ref={ref}
          className={tvStyles}
          {...restProps}
        />
      </AnimationSettingsProvider>
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
    const { className, style, index, children, ...restProps } = props;

    const { slots, isDisabled, isInvalid } = useInputOTP();

    const slot = slots[index];
    const isActive = slot?.isActive ?? false;
    const isCaretVisible = slot?.isCaretVisible ?? false;

    const slotClassName = inputOTPStyles.slot({
      isActive,
      isInvalid,
      isDisabled,
      className,
    });

    const isPlaceholder = slot?.isPlaceholder ?? false;
    const displayChar = slot?.displayChar ?? '';

    const slotTextStyle =
      isPlaceholder && slot?.placeholderTextColor
        ? { color: slot.placeholderTextColor }
        : undefined;
    const slotTextClassName =
      isPlaceholder && slot?.placeholderTextClassName
        ? slot.placeholderTextClassName
        : undefined;

    const defaultChildren = displayChar ? (
      <InputOTPSlotText
        isPlaceholder={isPlaceholder}
        className={slotTextClassName}
        style={slotTextStyle}
      >
        {displayChar}
      </InputOTPSlotText>
    ) : null;

    return (
      <InputOTPPrimitives.Slot
        ref={ref}
        index={index}
        className={slotClassName}
        style={[styleSheet.slotRoot, style]}
        {...restProps}
      >
        {children !== undefined ? children : defaultChildren}
        {isCaretVisible ? <InputOTPSlotCaret /> : null}
      </InputOTPPrimitives.Slot>
    );
  }
);

// --------------------------------------------------

const InputOTPSlotText = forwardRef<InputOTPSlotTextRef, InputOTPSlotTextProps>(
  (props, ref) => {
    const { className, children, isPlaceholder, ...restProps } = props;

    const slotTextClassName = inputOTPStyles.slotText({
      isPlaceholder,
      className,
    });

    return (
      <HeroText ref={ref} className={slotTextClassName} {...restProps}>
        {children}
      </HeroText>
    );
  }
);

// --------------------------------------------------

const InputOTPSlotCaret = forwardRef<
  InputOTPSlotCaretRef,
  InputOTPSlotCaretProps
>((props, ref) => {
  const {
    className,
    animation,
    isAnimatedStyleActive = true,
    pointerEvents = 'none',
    style,
    ...restProps
  } = props;

  const tvStyles = inputOTPStyles.slotCaret({ className });

  const { rContainerStyle } = useInputOTPSlotCaretAnimation({
    animation,
  });

  const containerStyle = isAnimatedStyleActive
    ? [rContainerStyle, style]
    : style;

  return (
    <Animated.View
      ref={ref}
      className={tvStyles}
      style={containerStyle}
      pointerEvents={pointerEvents}
      {...restProps}
    />
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
InputOTPSlotText.displayName = DISPLAY_NAME.SLOT_TEXT;
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
 * @component InputOTP.SlotText - Text component that displays the character
 * or placeholder for a slot. Used by default in Slot if no children provided.
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
  /** @optional Text component that displays the character or placeholder for a slot */
  SlotText: InputOTPSlotText,
  /** @optional Visual separator between groups of slots */
  Separator: InputOTPSeparator,
});

export default InputOTP;
export { useInputOTP };
