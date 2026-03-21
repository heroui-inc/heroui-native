import { createContext, forwardRef, useContext, useId } from 'react';
import {
  Pressable,
  Text,
  View,
  type GestureResponderEvent,
} from 'react-native';
import * as Slot from '../slot';
import type {
  ActionProps,
  ActionRef,
  CloseProps,
  CloseRef,
  DescriptionProps,
  DescriptionRef,
  RootContext,
  RootProps,
  RootRef,
  TitleProps,
  TitleRef,
} from './toast.types';

const ToastContext = createContext<RootContext | null>(null);

const Root = forwardRef<RootRef, RootProps>(
  ({ asChild, id, ...viewProps }, ref) => {
    const generatedId = useId();
    const nativeID = id || generatedId;

    const Component = asChild ? Slot.View : View;
    return (
      <ToastContext.Provider
        value={{
          nativeID,
        }}
      >
        <Component
          ref={ref}
          role="status"
          aria-live="polite"
          aria-atomic={true}
          nativeID={nativeID}
          {...viewProps}
        />
      </ToastContext.Provider>
    );
  }
);

function useRootContext() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error(
      'Toast compound components cannot be rendered outside the Toast component'
    );
  }
  return context;
}

Root.displayName = 'HeroUINative.Primitive.Toast.Root';

// --------------------------------------------------

const Title = forwardRef<TitleRef, TitleProps>((props, ref) => {
  const { nativeID } = useRootContext();
  return (
    <Text
      ref={ref}
      role="heading"
      aria-level={3}
      nativeID={`${nativeID}_label`}
      {...props}
    />
  );
});

Title.displayName = 'HeroUINative.Primitive.Toast.Title';

// --------------------------------------------------

const Description = forwardRef<DescriptionRef, DescriptionProps>(
  (props, ref) => {
    const { nativeID } = useRootContext();
    return <Text ref={ref} nativeID={`${nativeID}_desc`} {...props} />;
  }
);

Description.displayName = 'HeroUINative.Primitive.Toast.Description';

// --------------------------------------------------

const Action = forwardRef<ActionRef, ActionProps>(
  ({ asChild, altText, disabled = false, ...props }, ref) => {
    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <Component
        ref={ref}
        role="button"
        aria-disabled={disabled ?? undefined}
        aria-label={altText}
        disabled={disabled ?? undefined}
        {...props}
      />
    );
  }
);

Action.displayName = 'HeroUINative.Primitive.Toast.Action';

// --------------------------------------------------

const Close = forwardRef<CloseRef, CloseProps>(
  ({ asChild, disabled = false, onPress: onPressProp, ...props }, ref) => {
    function onPress(ev: GestureResponderEvent) {
      if (disabled) return;
      onPressProp?.(ev);
    }

    const Component = asChild ? Slot.Pressable : Pressable;
    return (
      <Component
        ref={ref}
        role="button"
        aria-label="Close"
        aria-disabled={disabled ?? undefined}
        onPress={onPress}
        disabled={disabled ?? undefined}
        {...props}
      />
    );
  }
);

Close.displayName = 'HeroUINative.Primitive.Toast.Close';

// --------------------------------------------------

export { Action, Close, Description, Root, Title, useRootContext };
