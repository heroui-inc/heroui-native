/**
 * Big thank you to https://github.com/yjose/input-otp-native for logic and inspiration
 */

import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  type BlurEvent,
  type FocusEvent,
} from 'react-native';
import { useControllableState } from '../../helpers/internal/hooks';
import * as SlotPrimitive from '../slot';
import type {
  GroupProps,
  GroupRef,
  InputOTPContext,
  RootProps,
  RootRef,
  SeparatorProps,
  SeparatorRef,
  SlotData,
  SlotProps,
  SlotRef,
} from './input-otp.types';
import { defaultPasteTransformer } from './input-otp.utils';

const InputOTPContext = createContext<InputOTPContext | null>(null);

/**
 * Hook to access InputOTP context
 * @throws Error if used outside InputOTP component
 */
function useInputOTPContext(): InputOTPContext {
  const context = useContext(InputOTPContext);

  if (!context) {
    throw new Error(
      'InputOTP compound components cannot be rendered outside the InputOTP component'
    );
  }

  return context;
}

// --------------------------------------------------

const Root = forwardRef<RootRef, RootProps>(
  (
    {
      maxLength,
      onComplete,
      isDisabled = false,
      isInvalid = false,
      variant,
      pattern,
      inputMode = 'numeric',
      pasteTransformer,
      value: valueProp,
      defaultValue,
      onChange,
      placeholder,
      placeholderTextColor,
      placeholderTextClassName,
      children,
      onFocus: onFocusProp,
      onBlur: onBlurProp,
      textInputProps,
      style,
      className,
    },
    ref
  ) => {
    const [value = '', setValue] = useControllableState<string>({
      prop: valueProp,
      defaultProp: defaultValue,
      onChange,
    });
    const [isFocused, setIsFocused] = useState(false);

    const inputRef = useRef<TextInput>(null);

    const slots = useMemo<SlotData[]>(() => {
      return Array.from({ length: maxLength }).map((_, slotIdx) => {
        const isActive = isFocused && slotIdx === value.length;
        const char = value[slotIdx] !== undefined ? value[slotIdx] : null;
        const placeholderChar = isActive
          ? null
          : value[slotIdx] !== undefined
            ? null
            : (placeholder?.[slotIdx] ?? null);

        return {
          index: slotIdx,
          char,
          placeholderChar,
          isActive,
          isCaretVisible: isActive && char === null,
        };
      });
    }, [isFocused, maxLength, value, placeholder]);

    // --------------------------------------------------
    // TextInput onChangeText handler
    // --------------------------------------------------

    // Convert pattern string to RegExp if provided
    const regexp = useMemo(() => {
      if (!pattern) return null;
      return typeof pattern === 'string' ? new RegExp(pattern) : pattern;
    }, [pattern]);

    // Get paste transformer function
    const pasteTransformFn = useMemo(() => {
      return pasteTransformer ?? defaultPasteTransformer(maxLength);
    }, [pasteTransformer, maxLength]);

    // Handle text change
    const onChangeText = useCallback(
      (text: string) => {
        // Detect paste operation: if text length increases by more than 1 character
        // it's likely a paste operation rather than normal typing
        const isPaste = text.length > value.length + 1;
        const transformedText =
          isPaste && pasteTransformFn ? pasteTransformFn(text) : text;
        // Slice the text to the maxLength as we're not limiting the input length to handle paste properly
        const newValue = transformedText.slice(0, maxLength);
        // Validate against pattern if provided
        if (newValue.length > 0 && regexp && !regexp.test(newValue)) {
          return;
        }

        setValue(newValue);

        if (newValue.length === maxLength) {
          onComplete?.(newValue);
        }
      },
      [maxLength, regexp, setValue, onComplete, pasteTransformFn, value.length]
    );

    // --------------------------------------------------
    // TextInput event handlers
    // --------------------------------------------------

    const onFocus = useCallback(
      (e: FocusEvent) => {
        setIsFocused(true);
        onFocusProp?.(e);
      },
      [onFocusProp]
    );

    const onBlur = useCallback(
      (e: BlurEvent) => {
        setIsFocused(false);
        onBlurProp?.(e);
      },
      [onBlurProp]
    );

    // --------------------------------------------------
    // Imperative actions
    // --------------------------------------------------

    const focus = useCallback(() => {
      inputRef.current?.focus();
    }, []);

    const blur = useCallback(() => {
      inputRef.current?.blur();
    }, []);

    const clear = useCallback(() => {
      inputRef.current?.clear();
      setValue('');
    }, [setValue]);

    useImperativeHandle(
      ref,
      () => ({
        setValue: (newValue: string) => {
          onChangeText(newValue);
        },
        focus,
        blur,
        clear,
      }),
      [focus, blur, clear, onChangeText]
    );

    // --------------------------------------------------
    // Context value
    // --------------------------------------------------

    const contextValue = useMemo<InputOTPContext>(
      () => ({
        value,
        maxLength,
        isFocused,
        isDisabled,
        isInvalid,
        variant,
        slots,
        placeholderTextColor,
        placeholderTextClassName,
        handlers: {
          onChangeText,
          onFocus,
          onBlur,
        },
        actions: {
          focus,
          clear,
        },
        inputRef,
      }),
      [
        value,
        maxLength,
        isFocused,
        isDisabled,
        isInvalid,
        variant,
        slots,
        placeholderTextColor,
        placeholderTextClassName,
        onChangeText,
        onFocus,
        onBlur,
        focus,
        clear,
      ]
    );

    // --------------------------------------------------
    // Accessibility
    // --------------------------------------------------

    const accessibilityState = useMemo(
      () => ({
        disabled: isDisabled,
      }),
      [isDisabled]
    );

    const accessibilityValue = useMemo(
      () => ({
        text:
          value.length > 0
            ? `${value.length} of ${maxLength} digits entered`
            : `0 of ${maxLength} digits entered`,
      }),
      [value, maxLength]
    );

    // --------------------------------------------------
    // Render
    // --------------------------------------------------

    return (
      <InputOTPContext.Provider value={contextValue}>
        <Pressable
          onPress={focus}
          disabled={isDisabled}
          accessible={false}
          accessibilityRole="none"
          style={style}
          className={className}
        >
          {children}
          <TextInput
            ref={inputRef}
            style={[
              StyleSheet.absoluteFillObject,
              /**
               * On iOS if the input has an opacity of 0, we can't paste text into it.
               * This is a workaround to allow pasting text into the input.
               */
              Platform.select({
                ios: {
                  opacity: 0.02,
                  color: 'transparent',
                },
                android: {
                  opacity: 0,
                },
              }),
            ]}
            value={value}
            onChangeText={onChangeText}
            onFocus={onFocus}
            onBlur={onBlur}
            maxLength={maxLength}
            inputMode={inputMode}
            /**
             * On iOS if the input has an opacity of 0, we can't paste text into it.
             * As we're setting the opacity to 0.02, we need to hide the caret.
             */
            caretHidden={Platform.OS === 'ios'}
            autoComplete={
              Platform.OS === 'android' ? 'sms-otp' : 'one-time-code'
            }
            autoCorrect={false}
            autoCapitalize="none"
            textContentType="oneTimeCode"
            accessible
            accessibilityRole="text"
            accessibilityLabel={`One-time passcode input, ${maxLength} digits`}
            accessibilityHint={`Enter ${maxLength} digit verification code`}
            accessibilityState={accessibilityState}
            accessibilityValue={accessibilityValue}
            editable={!isDisabled}
            {...textInputProps}
          />
        </Pressable>
      </InputOTPContext.Provider>
    );
  }
);

Root.displayName = 'HeroUINative.Primitive.InputOTP.Root';

// --------------------------------------------------

const Group = forwardRef<GroupRef, GroupProps>(
  (
    { asChild, accessible = false, accessibilityRole = 'none', ...props },
    ref
  ) => {
    useInputOTPContext(); // Ensure we're inside InputOTP

    const Component = asChild ? SlotPrimitive.View : View;

    return (
      <Component
        ref={ref}
        accessible={accessible}
        accessibilityRole={accessibilityRole}
        {...props}
      />
    );
  }
);

Group.displayName = 'HeroUINative.Primitive.InputOTP.Group';

// --------------------------------------------------

const Slot = forwardRef<SlotRef, SlotProps>(
  (
    {
      asChild,
      index,
      accessible = false,
      accessibilityRole = 'none',
      accessibilityLabel,
      ...props
    },
    ref
  ) => {
    const { slots, maxLength } = useInputOTPContext();

    if (index < 0 || index >= slots.length) {
      throw new Error(
        `InputOTP.Slot index ${index} is out of range. Must be between 0 and ${slots.length - 1}.`
      );
    }

    const slot = slots[index];
    const computedAccessibilityLabel =
      accessibilityLabel ??
      (accessible && slot
        ? `Digit ${index + 1} of ${maxLength}${slot.char ? `, value ${slot.char}` : ', empty'}`
        : undefined);

    const Component = asChild ? SlotPrimitive.View : View;

    return (
      <Component
        ref={ref}
        accessible={accessible}
        accessibilityRole={accessibilityRole}
        accessibilityLabel={computedAccessibilityLabel}
        {...props}
      />
    );
  }
);

Slot.displayName = 'HeroUINative.Primitive.InputOTP.Slot';

// --------------------------------------------------

const Separator = forwardRef<SeparatorRef, SeparatorProps>(
  (
    { asChild, accessible = false, accessibilityRole = 'none', ...props },
    ref
  ) => {
    useInputOTPContext(); // Ensure we're inside InputOTP

    const Component = asChild ? SlotPrimitive.View : View;

    return (
      <Component
        ref={ref}
        accessible={accessible}
        accessibilityRole={accessibilityRole}
        {...props}
      />
    );
  }
);

Separator.displayName = 'HeroUINative.Primitive.InputOTP.Separator';

// --------------------------------------------------

export { Group, Root, Separator, Slot, useInputOTPContext };
