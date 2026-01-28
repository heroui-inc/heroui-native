import { forwardRef, useMemo } from 'react';
import type { GestureResponderEvent, Text as RNText } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { FullWindowOverlay, HeroText } from '../../helpers/internal/components';
import {
  AnimationSettingsProvider,
  useAnimationSettings,
} from '../../helpers/internal/contexts';
import {
  usePopupDialogContentAnimation,
  usePopupOverlayAnimation,
  usePopupRootAnimation,
} from '../../helpers/internal/hooks';
import type { PressableRef } from '../../helpers/internal/types';
import * as DialogPrimitives from '../../primitives/dialog';
import * as DialogPrimitivesTypes from '../../primitives/dialog/dialog.types';
import { CloseButton } from '../close-button';
import {
  DialogAnimationProvider,
  useDialogAnimation,
} from './dialog.animation';
import { DISPLAY_NAME } from './dialog.constants';
import { dialogClassNames, dialogStyleSheet } from './dialog.styles';
import type {
  DialogCloseProps,
  DialogContentProps,
  DialogDescriptionProps,
  DialogOverlayProps,
  DialogPortalProps,
  DialogRootProps,
  DialogTitleProps,
  DialogTriggerProps,
} from './dialog.types';

const AnimatedOverlay = Animated.createAnimatedComponent(
  DialogPrimitives.Overlay
);

const AnimatedContent = Animated.createAnimatedComponent(
  DialogPrimitives.Content
);

const useDialog = DialogPrimitives.useRootContext;

// --------------------------------------------------

const DialogRoot = forwardRef<DialogPrimitivesTypes.RootRef, DialogRootProps>(
  (
    {
      children,
      closeDelay = 300,
      isDismissKeyboardOnClose = true,
      isOpen: isOpenProp,
      isDefaultOpen,
      onOpenChange: onOpenChangeProp,
      animation,
      ...props
    },
    ref
  ) => {
    const {
      internalIsOpen,
      componentState,
      progress,
      isDragging,
      isGestureReleaseAnimationRunning,
      onOpenChange,
      isAllAnimationsDisabled,
    } = usePopupRootAnimation({
      isOpen: isOpenProp,
      isDefaultOpen,
      onOpenChange: onOpenChangeProp,
      closeDelay,
      isDismissKeyboardOnClose,
      animation,
    });

    const animationContextValue = useMemo(
      () => ({
        dialogState: componentState,
        progress,
        isDragging,
        isGestureReleaseAnimationRunning,
      }),
      [componentState, progress, isDragging, isGestureReleaseAnimationRunning]
    );

    const animationSettingsContextValue = useMemo(
      () => ({
        isAllAnimationsDisabled,
      }),
      [isAllAnimationsDisabled]
    );

    return (
      <AnimationSettingsProvider value={animationSettingsContextValue}>
        <DialogAnimationProvider value={animationContextValue}>
          <DialogPrimitives.Root
            ref={ref}
            isOpen={internalIsOpen}
            isDefaultOpen={isDefaultOpen}
            onOpenChange={onOpenChange}
            {...props}
          >
            {children}
          </DialogPrimitives.Root>
        </DialogAnimationProvider>
      </AnimationSettingsProvider>
    );
  }
);

// --------------------------------------------------

const DialogTrigger = forwardRef<
  DialogPrimitivesTypes.TriggerRef,
  DialogTriggerProps
>((props, ref) => {
  return <DialogPrimitives.Trigger ref={ref} {...props} />;
});

// --------------------------------------------------

const DialogPortal = ({
  className,
  children,
  style,
  ...props
}: DialogPortalProps) => {
  const animationSettingsContext = useAnimationSettings();
  const animationContext = useDialogAnimation();

  const portalClassName = dialogClassNames.portal({ className });

  return (
    <DialogPrimitives.Portal {...props}>
      <AnimationSettingsProvider value={animationSettingsContext}>
        <DialogAnimationProvider value={animationContext}>
          <FullWindowOverlay>
            <Animated.View className={portalClassName} style={style}>
              {children}
            </Animated.View>
          </FullWindowOverlay>
        </DialogAnimationProvider>
      </AnimationSettingsProvider>
    </DialogPrimitives.Portal>
  );
};

// --------------------------------------------------

const DialogOverlay = forwardRef<
  DialogPrimitivesTypes.OverlayRef,
  DialogOverlayProps
>(
  (
    { className, style, animation, isAnimatedStyleActive = true, ...props },
    ref
  ) => {
    const { progress, isDragging, isGestureReleaseAnimationRunning } =
      useDialogAnimation();

    const overlayClassName = dialogClassNames.overlay({ className });

    const { rContainerStyle } = usePopupOverlayAnimation({
      progress,
      isDragging,
      isGestureReleaseAnimationRunning,
      animation,
    });

    const overlayStyle = isAnimatedStyleActive
      ? [rContainerStyle, style]
      : style;

    return (
      <AnimatedOverlay
        ref={ref}
        className={overlayClassName}
        style={overlayStyle}
        {...props}
      />
    );
  }
);

// --------------------------------------------------

const DialogContent = forwardRef<
  DialogPrimitivesTypes.ContentRef,
  DialogContentProps
>(
  (
    {
      className,
      style,
      children,
      onLayout,
      animation,
      isSwipeable = true,
      isAnimatedStyleActive = true,
      ...props
    },
    ref
  ) => {
    const { onOpenChange } = useDialog();

    const {
      progress,
      isDragging,
      isGestureReleaseAnimationRunning,
      dialogState,
    } = useDialogAnimation();

    const contentClassName = dialogClassNames.content({ className });

    const {
      contentY,
      contentHeight,
      panGesture,
      rDragContainerStyle,
      rContainerStyle,
    } = usePopupDialogContentAnimation({
      progress,
      isDragging,
      isGestureReleaseAnimationRunning,
      dialogState,
      onOpenChange,
      animation,
      isSwipeable,
    });

    const contentStyle = isAnimatedStyleActive
      ? [dialogStyleSheet.contentContainer, rContainerStyle, style]
      : [dialogStyleSheet.contentContainer, style];

    return (
      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={rDragContainerStyle}
          pointerEvents="box-none"
          onLayout={(event) => {
            contentY.set(event.nativeEvent.layout.y);
            contentHeight.set(event.nativeEvent.layout.height);
            onLayout?.(event);
          }}
        >
          <AnimatedContent
            ref={ref}
            className={contentClassName}
            style={contentStyle}
            {...props}
          >
            {children}
          </AnimatedContent>
        </Animated.View>
      </GestureDetector>
    );
  }
);

// --------------------------------------------------

const DialogClose = forwardRef<PressableRef, DialogCloseProps>((props, ref) => {
  const { onPress: onPressProp, ...restProps } = props;
  const { onOpenChange } = useDialog();

  const onPress = (ev: GestureResponderEvent) => {
    onOpenChange(false);
    if (typeof onPressProp === 'function') {
      onPressProp(ev);
    }
  };

  return <CloseButton ref={ref} onPress={onPress} {...restProps} />;
});

// --------------------------------------------------

const DialogTitle = forwardRef<RNText, DialogTitleProps>(
  ({ className, children, ...props }, ref) => {
    const { nativeID } = useDialog();
    const titleClassName = dialogClassNames.label({ className });

    return (
      <HeroText
        ref={ref}
        role="heading"
        accessibilityRole="header"
        nativeID={`${nativeID}_label`}
        className={titleClassName}
        {...props}
      >
        {children}
      </HeroText>
    );
  }
);

// --------------------------------------------------

const DialogDescription = forwardRef<RNText, DialogDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    const { nativeID } = useDialog();

    const descriptionClassName = dialogClassNames.description({
      className,
    });

    return (
      <HeroText
        ref={ref}
        accessibilityRole="text"
        nativeID={`${nativeID}_desc`}
        className={descriptionClassName}
        {...props}
      >
        {children}
      </HeroText>
    );
  }
);

// --------------------------------------------------

DialogRoot.displayName = DISPLAY_NAME.ROOT;
DialogTrigger.displayName = DISPLAY_NAME.TRIGGER;
DialogPortal.displayName = DISPLAY_NAME.PORTAL;
DialogOverlay.displayName = DISPLAY_NAME.OVERLAY;
DialogContent.displayName = DISPLAY_NAME.CONTENT;
DialogClose.displayName = DISPLAY_NAME.CLOSE;
DialogTitle.displayName = DISPLAY_NAME.TITLE;
DialogDescription.displayName = DISPLAY_NAME.DESCRIPTION;

/**
 * Compound Dialog component with sub-components
 *
 * @component Dialog.Root - Main container that manages open/close state.
 * Provides the dialog context to child components.
 *
 * @component Dialog.Trigger - Button or element that opens the dialog.
 * Accepts any pressable element as children.
 *
 * @component Dialog.Portal - Portal container for dialog overlay and content.
 * Renders children in a portal with centered layout.
 *
 * @component Dialog.Overlay - Background overlay that covers the screen.
 * Typically closes the dialog when clicked.
 *
 * @component Dialog.Content - The dialog content container.
 * Contains the main dialog UI elements.
 *
 * @component Dialog.Close - Close button for the dialog.
 * Can accept custom children or uses default close icon.
 *
 * @component Dialog.Title - The dialog title text.
 * Automatically linked for accessibility.
 *
 * @component Dialog.Description - The dialog description text.
 * Automatically linked for accessibility.
 *
 * @see Full documentation: https://v3.heroui.com/docs/native/components/dialog
 */
const Dialog = Object.assign(DialogRoot, {
  /** @optional Trigger element to open the dialog */
  Trigger: DialogTrigger,
  /** @optional Portal container for overlay and content */
  Portal: DialogPortal,
  /** @optional Background overlay */
  Overlay: DialogOverlay,
  /** @optional Main dialog content container */
  Content: DialogContent,
  /** @optional Close button for the dialog */
  Close: DialogClose,
  /** @optional Dialog title text */
  Title: DialogTitle,
  /** @optional Dialog description text */
  Description: DialogDescription,
});

export { useDialog, useDialogAnimation };
export default Dialog;
