import { forwardRef, useMemo } from 'react';
import Animated from 'react-native-reanimated';
import { useIsOnSurface } from '../../helpers/external/hooks';
import { HeroText } from '../../helpers/internal/components';
import { AnimationSettingsProvider } from '../../helpers/internal/contexts';
import { createContext } from '../../helpers/internal/utils';
import * as InputOTPPrimitives from '../../primitives/input-otp';
import {
  useInputOTPRootAnimation,
  useInputOTPSlotCaretAnimation,
  useInputOTPSlotValueAnimation,
} from './input-otp.animation';
import { DISPLAY_NAME } from './input-otp.constants';
import { inputOTPClassNames, inputOTPStyleSheet } from './input-otp.styles';
import type {
  InputOTPGroupProps,
  InputOTPGroupRef,
  InputOTPGroupRenderProps,
  InputOTPRef,
  InputOTPRootProps,
  InputOTPSeparatorProps,
  InputOTPSeparatorRef,
  InputOTPSlotCaretProps,
  InputOTPSlotCaretRef,
  InputOTPSlotContextValue,
  InputOTPSlotPlaceholderProps,
  InputOTPSlotPlaceholderRef,
  InputOTPSlotProps,
  InputOTPSlotRef,
  InputOTPSlotValueProps,
  InputOTPSlotValueRef,
} from './input-otp.types';

const AnimatedText = Animated.createAnimatedComponent(HeroText);

const [InputOTPSlotProvider, useInputOTPSlot] =
  createContext<InputOTPSlotContextValue>({
    name: 'InputOTPSlotContext',
  });

const useInputOTP = InputOTPPrimitives.useInputOTPContext;

const REGEXP_ONLY_CHARS = InputOTPPrimitives.REGEXP_ONLY_CHARS;
const REGEXP_ONLY_DIGITS = InputOTPPrimitives.REGEXP_ONLY_DIGITS;
const REGEXP_ONLY_DIGITS_AND_CHARS =
  InputOTPPrimitives.REGEXP_ONLY_DIGITS_AND_CHARS;

// --------------------------------------------------

const InputOTPRoot = forwardRef<InputOTPRef, InputOTPRootProps>(
  (props, ref) => {
    const { className, animation, ...restProps } = props;

    const rootClassName = inputOTPClassNames.root({ className });

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
          className={rootClassName}
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

    const groupClassName = inputOTPClassNames.group({ className });

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
      <InputOTPPrimitives.Group
        ref={ref}
        className={groupClassName}
        {...restProps}
      >
        {content}
      </InputOTPPrimitives.Group>
    );
  }
);

// --------------------------------------------------

const InputOTPSlot = forwardRef<InputOTPSlotRef, InputOTPSlotProps>(
  (props, ref) => {
    const { className, style, index, variant, children, ...restProps } = props;

    const {
      slots,
      isDisabled,
      isInvalid,
      variant: groupVariant,
    } = useInputOTP();

    const slot = slots[index];
    const isActive = slot?.isActive ?? false;
    const isCaretVisible = slot?.isCaretVisible ?? false;

    const isOnSurfaceAutoDetected = useIsOnSurface();
    const finalVariant =
      variant !== undefined
        ? variant
        : groupVariant !== undefined
          ? groupVariant
          : isOnSurfaceAutoDetected
            ? 'secondary'
            : 'primary';

    const slotClassName = inputOTPClassNames.slot({
      variant: finalVariant,
      isActive,
      isInvalid,
      isDisabled,
      className,
    });

    const slotContextValue = useMemo<InputOTPSlotContextValue>(
      () => ({
        slot,
        isActive,
        isCaretVisible,
        variant: finalVariant,
      }),
      [slot, isActive, isCaretVisible, finalVariant]
    );

    return (
      <InputOTPSlotProvider value={slotContextValue}>
        <InputOTPPrimitives.Slot
          ref={ref}
          index={index}
          className={slotClassName}
          style={[inputOTPStyleSheet.slotRoot, style]}
          {...restProps}
        >
          {children !== undefined ? (
            children
          ) : (
            <>
              <InputOTPSlotPlaceholder />
              <InputOTPSlotValue />
              <InputOTPSlotCaret />
            </>
          )}
        </InputOTPPrimitives.Slot>
      </InputOTPSlotProvider>
    );
  }
);

// --------------------------------------------------

/**
 * Component that displays the placeholder character for an InputOTP slot
 * Used when the slot is empty and should show a placeholder
 */
const InputOTPSlotPlaceholder = forwardRef<
  InputOTPSlotPlaceholderRef,
  InputOTPSlotPlaceholderProps
>((props, ref) => {
  const { className, style, children, ...restProps } = props;

  const { slot, isActive } = useInputOTPSlot();
  const { placeholderTextColor, placeholderTextClassName } = useInputOTP();

  const displayChar = children ?? slot?.placeholderChar ?? '';

  if (slot?.char || isActive || !displayChar) {
    return null;
  }

  const slotPlaceholderTextStyle = placeholderTextColor
    ? { color: placeholderTextColor }
    : undefined;

  const slotPlaceholderTextClassName = placeholderTextClassName
    ? placeholderTextClassName
    : undefined;

  const slotPlaceholderClassName = inputOTPClassNames.slotPlaceholder({
    className: [slotPlaceholderTextClassName, className],
  });

  return (
    <HeroText
      ref={ref}
      className={slotPlaceholderClassName}
      style={[slotPlaceholderTextStyle, style]}
      {...restProps}
    >
      {displayChar}
    </HeroText>
  );
});

// --------------------------------------------------

/**
 * Component that displays the actual character value for an InputOTP slot
 * Used when the slot has a value and should display it with animations
 */
const InputOTPSlotValue = forwardRef<
  InputOTPSlotValueRef,
  InputOTPSlotValueProps
>((props, ref) => {
  const { className, children, animation, ...restProps } = props;

  const { slot } = useInputOTPSlot();

  const displayChar = children ?? slot?.char ?? '';

  const { wrapperEntering, wrapperExiting, textEntering, textExiting } =
    useInputOTPSlotValueAnimation({
      animation,
    });

  const slotValueClassName = inputOTPClassNames.slotValue({
    className,
  });

  if (!displayChar) {
    return null;
  }

  return (
    <Animated.View entering={wrapperEntering} exiting={wrapperExiting}>
      <AnimatedText
        ref={ref}
        entering={textEntering}
        exiting={textExiting}
        className={slotValueClassName}
        maxFontSizeMultiplier={1.6}
        {...restProps}
      >
        {displayChar}
      </AnimatedText>
    </Animated.View>
  );
});

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
  const { isCaretVisible } = useInputOTPSlot();

  const { rContainerStyle } = useInputOTPSlotCaretAnimation({
    animation,
  });

  const slotCaretClassName = inputOTPClassNames.slotCaret({ className });

  const containerStyle = isAnimatedStyleActive
    ? [rContainerStyle, style]
    : style;

  if (!isCaretVisible) return null;

  return (
    <Animated.View
      ref={ref}
      className={slotCaretClassName}
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

  const separatorClassName = inputOTPClassNames.separator({ className });

  return (
    <InputOTPPrimitives.Separator
      ref={ref}
      className={separatorClassName}
      {...restProps}
    />
  );
});

// --------------------------------------------------

// Display names
InputOTPRoot.displayName = DISPLAY_NAME.ROOT;
InputOTPGroup.displayName = DISPLAY_NAME.GROUP;
InputOTPSlot.displayName = DISPLAY_NAME.SLOT;
InputOTPSlotPlaceholder.displayName = DISPLAY_NAME.SLOT_PLACEHOLDER;
InputOTPSlotValue.displayName = DISPLAY_NAME.SLOT_VALUE;
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
 * @component InputOTP.SlotPlaceholder - Text component that displays the
 * placeholder character for a slot when it's empty. Used by default in Slot
 * if no children provided.
 *
 * @component InputOTP.SlotValue - Text component that displays the actual
 * character value for a slot with animations. Used by default in Slot
 * if no children provided.
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
 * @see Full documentation: https://heroui.com/docs/native/components/input-otp
 */
const InputOTP = Object.assign(InputOTPRoot, {
  /** @optional Container for grouping multiple slots together */
  Group: InputOTPGroup,
  /** @optional Individual slot that displays a single character or placeholder */
  Slot: InputOTPSlot,
  /** @optional Text component that displays the placeholder character for a slot */
  SlotPlaceholder: InputOTPSlotPlaceholder,
  /** @optional Text component that displays the actual character value for a slot */
  SlotValue: InputOTPSlotValue,
  /** @optional Animated caret indicator for the current input position */
  SlotCaret: InputOTPSlotCaret,
  /** @optional Visual separator between groups of slots */
  Separator: InputOTPSeparator,
});

export default InputOTP;
export {
  REGEXP_ONLY_CHARS,
  REGEXP_ONLY_DIGITS,
  REGEXP_ONLY_DIGITS_AND_CHARS,
  useInputOTP,
  useInputOTPSlot,
};
