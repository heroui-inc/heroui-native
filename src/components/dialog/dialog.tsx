import { forwardRef, useMemo } from 'react';
import type { Text as RNText } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { CloseIcon, FullWindowOverlay } from '../../helpers/components';
import { Text } from '../../helpers/components/text';
import { useDialogContentAnimation } from '../../helpers/hooks';
import { useThemeColor } from '../../helpers/theme';
import * as DialogPrimitives from '../../primitives/dialog';
import * as DialogPrimitivesTypes from '../../primitives/dialog/dialog.types';
import {
  DialogAnimationProvider,
  useDialogAnimation,
  useDialogRootAnimation,
} from './dialog.animation';
import { DISPLAY_NAME } from './dialog.constants';
import dialogStyles, { styleSheet } from './dialog.styles';
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
      closeDelay = 500,
      isDismissKeyboardOnClose = true,
      isOpen: isOpenProp,
      isDefaultOpen,
      onOpenChange: onOpenChangeProp,
      progressAnimationConfigs,
      ...props
    },
    ref
  ) => {
    const { internalIsOpen, dialogState, progress, isDragging, onOpenChange } =
      useDialogRootAnimation({
        isOpen: isOpenProp,
        isDefaultOpen,
        onOpenChange: onOpenChangeProp,
        closeDelay,
        isDismissKeyboardOnClose,
        progressAnimationConfigs,
      });

    const animationContextValue = useMemo(
      () => ({
        dialogState,
        progress,
        isDragging,
      }),
      [dialogState, progress, isDragging]
    );

    return (
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
  const animationContext = useDialogAnimation();

  const tvStyles = dialogStyles.portal({ className });

  return (
    <DialogPrimitives.Portal {...props}>
      <DialogAnimationProvider value={animationContext}>
        <FullWindowOverlay>
          <Animated.View className={tvStyles} style={style}>
            {children}
          </Animated.View>
        </FullWindowOverlay>
      </DialogAnimationProvider>
    </DialogPrimitives.Portal>
  );
};

// --------------------------------------------------

const DialogOverlay = forwardRef<
  DialogPrimitivesTypes.OverlayRef,
  DialogOverlayProps
>(({ className, style, isDefaultAnimationDisabled = false, ...props }, ref) => {
  const { progress, isDragging } = useDialogAnimation();

  const rContainerStyle = useAnimatedStyle(() => {
    if (isDefaultAnimationDisabled) {
      return {};
    }

    if (isDragging.get() && progress.get() <= 1) {
      return { opacity: 1 };
    }

    const opacity = interpolate(progress.get(), [0, 1, 2], [0, 1, 0]);

    return {
      opacity,
    };
  });

  const tvStyles = dialogStyles.overlay({
    className,
    isDefaultAnimationDisabled,
  });

  return (
    <AnimatedOverlay
      ref={ref}
      className={tvStyles}
      style={[rContainerStyle, style]}
      {...props}
    />
  );
});

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
      isDefaultAnimationDisabled = false,
      ...props
    },
    ref
  ) => {
    const { progress, isDragging, dialogState } = useDialogAnimation();
    const { onOpenChange } = useDialog();

    const tvStyles = dialogStyles.content({ className });

    const {
      contentY,
      contentHeight,
      panGesture,
      rDragContainerStyle,
      rContainerStyle,
    } = useDialogContentAnimation({
      progress,
      isDragging,
      dialogState,
      onOpenChange,
      isDefaultAnimationDisabled,
    });

    return (
      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={rDragContainerStyle}
          className="pointer-events-box-none"
          onLayout={(event) => {
            contentY.set(event.nativeEvent.layout.y);
            contentHeight.set(event.nativeEvent.layout.height);
            onLayout?.(event);
          }}
        >
          <AnimatedContent
            ref={ref}
            className={tvStyles}
            style={[styleSheet.contentContainer, rContainerStyle, style]}
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

const DialogClose = forwardRef<
  DialogPrimitivesTypes.CloseRef,
  DialogCloseProps
>(({ className, iconProps, hitSlop = 12, children, ...props }, ref) => {
  const themeColorMuted = useThemeColor('muted');
  const defaultIconColor = themeColorMuted;

  const tvStyles = dialogStyles.close({ className });

  return (
    <DialogPrimitives.Close
      ref={ref}
      className={tvStyles}
      hitSlop={hitSlop}
      {...props}
    >
      {children || (
        <CloseIcon
          size={iconProps?.size ?? 18}
          color={iconProps?.color ?? defaultIconColor}
        />
      )}
    </DialogPrimitives.Close>
  );
});

// --------------------------------------------------

const DialogTitle = forwardRef<RNText, DialogTitleProps>(
  ({ className, children, ...props }, ref) => {
    const { nativeID } = useDialog();
    const tvStyles = dialogStyles.title({ className });

    return (
      <Text
        ref={ref}
        role="heading"
        accessibilityRole="header"
        nativeID={`${nativeID}_label`}
        className={tvStyles}
        {...props}
      >
        {children}
      </Text>
    );
  }
);

// --------------------------------------------------

const DialogDescription = forwardRef<RNText, DialogDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    const { nativeID } = useDialog();

    const tvStyles = dialogStyles.description({
      className,
    });

    return (
      <Text
        ref={ref}
        accessibilityRole="text"
        nativeID={`${nativeID}_desc`}
        className={tvStyles}
        {...props}
      >
        {children}
      </Text>
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
 * @see Full documentation: https://heroui.com/components/dialog
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
