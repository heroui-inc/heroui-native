import { forwardRef, useEffect } from 'react';
import Animated, {
  interpolate,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import * as DialogPrimitives from '../../primitives/dialog';
import * as DialogPrimitivesTypes from '../../primitives/dialog/dialog.types';
import { cn, useTheme } from '../../providers/theme';
import { CloseIcon } from './close-icon';
import { DISPLAY_NAME } from './dialog.constants';
import dialogStyles, { nativeStyles } from './dialog.styles';
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
  ({ children, isOpen, onOpenChange, closeDelay = 300, ...props }, ref) => {
    return (
      <DialogPrimitives.Root
        ref={ref}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        closeDelay={closeDelay}
        {...props}
      >
        {children}
      </DialogPrimitives.Root>
    );
  }
);

// --------------------------------------------------

const DialogTrigger = forwardRef<
  DialogPrimitivesTypes.TriggerRef,
  DialogTriggerProps
>((props, ref) => {
  return <DialogPrimitives.Trigger ref={ref} asChild {...props} />;
});

// --------------------------------------------------

const DialogPortal = ({
  className,
  children,
  style,
  progressAnimationConfigs,
  ...props
}: DialogPortalProps) => {
  const { dialogState, progress } = useDialog();

  const tvStyles = dialogStyles.portal({ className });

  useEffect(() => {
    if (dialogState === 'open') {
      // Transition to open state (progress = 1)
      const openConfig = progressAnimationConfigs?.onOpen;
      if (openConfig?.animationType === 'spring') {
        progress.set(withSpring(1, openConfig.animationConfig));
      } else if (openConfig?.animationType === 'timing') {
        progress.set(withTiming(1, openConfig.animationConfig));
      } else {
        progress.set(withTiming(1, { duration: 200 }));
      }
    } else if (dialogState === 'close') {
      // Transition to close state (progress = 2)
      const closeConfig = progressAnimationConfigs?.onClose;
      if (closeConfig?.animationType === 'spring') {
        progress.set(withSpring(2, closeConfig.animationConfig));
      } else if (closeConfig?.animationType === 'timing') {
        progress.set(withTiming(2, closeConfig.animationConfig));
      } else {
        progress.set(withTiming(2, { duration: 200 }));
      }
    }
  }, [dialogState, progress, progressAnimationConfigs]);

  return (
    <DialogPrimitives.Portal {...props}>
      <Animated.View className={tvStyles} style={style}>
        {children}
      </Animated.View>
    </DialogPrimitives.Portal>
  );
};

// --------------------------------------------------

const DialogOverlay = forwardRef<
  DialogPrimitivesTypes.OverlayRef,
  DialogOverlayProps
>(({ children, className, ...props }, ref) => {
  const { progress } = useDialog();

  const rContainerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(progress.get(), [0, 1, 2], [0, 1, 0]);
    return {
      opacity,
    };
  });

  const tvStyles = dialogStyles.overlay({ className });

  if (children) {
    return (
      <DialogPrimitives.Overlay
        ref={ref}
        className={cn(tvStyles, 'bg-transparent')}
        {...props}
      >
        {children}
      </DialogPrimitives.Overlay>
    );
  }

  return (
    <AnimatedOverlay
      ref={ref}
      className={tvStyles}
      style={rContainerStyle}
      {...props}
    />
  );
});

// --------------------------------------------------

const DialogContent = forwardRef<
  DialogPrimitivesTypes.ContentRef,
  DialogContentProps
>(({ className, style, children, ...props }, ref) => {
  const { progress } = useDialog();

  const tvStyles = dialogStyles.content({ className });

  const rContainerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(progress.get(), [0, 1, 2], [0, 1, 0]);
    return {
      opacity,
    };
  });

  return (
    <AnimatedContent
      ref={ref}
      className={tvStyles}
      style={[nativeStyles.contentContainer, rContainerStyle, style]}
      {...props}
    >
      {children}
    </AnimatedContent>
  );
});

// --------------------------------------------------

const DialogClose = forwardRef<
  DialogPrimitivesTypes.CloseRef,
  DialogCloseProps
>(({ className, iconProps, hitSlop = 12, children, ...props }, ref) => {
  const { colors } = useTheme();

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
          color={iconProps?.color ?? colors.foreground}
        />
      )}
    </DialogPrimitives.Close>
  );
});

// --------------------------------------------------

const DialogTitle = forwardRef<
  DialogPrimitivesTypes.TitleRef,
  DialogTitleProps
>(({ className, ...props }, ref) => {
  const tvStyles = dialogStyles.title({ className });

  return <DialogPrimitives.Title ref={ref} className={tvStyles} {...props} />;
});

// --------------------------------------------------

const DialogDescription = forwardRef<
  DialogPrimitivesTypes.DescriptionRef,
  DialogDescriptionProps
>(({ className, ...props }, ref) => {
  const tvStyles = dialogStyles.description({ className });

  return (
    <DialogPrimitives.Description ref={ref} className={tvStyles} {...props} />
  );
});

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

export { useDialog };
export default Dialog;
